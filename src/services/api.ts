import { HomeData, Movie, Season, SlideSection, Star } from '../types/movie';
import { addDiagLog } from '../utils/diag';
import { showDomToast } from '../utils/themes';
import { cleanTitle, filterPeopleOut, filterWebVersion, getMovieId } from '../utils/media';

export const API_PRIMARY = 'https://mihan-cdn.com/api/';
export const API_BACKUP = 'https://appnxm.com/api/';

let authToken = '';
let tokenPromise: Promise<string> | null = null;
let lastBackupToast = 0;

// Polite cache & queue state (mirrors toosh-boost)
const CACHE_IDX = 'toosh-cidx-v1';
const CACHE_PRE = 'toosh-c1:';
const MAX_CACHE_ENTRIES = 40;
const MAX_CACHE_BYTES = 350000;
const MAX_CACHE_AGE = 3 * 86400 * 1000;
const FRESH_MS = 45000;
const MAX_CONCURRENCY = 2;

const negCache: Record<string, { t: number; s: number }> = {};
const inflightMap: Record<string, Promise<unknown>> = {};
const queue: Array<{ fn: () => Promise<unknown>; res: (v: unknown) => void; rej: (e: unknown) => void }> = [];
let activeCount = 0;
let holdUntil = 0;
let lastBusyToast = 0;

function readCacheIndex(): string[] {
  try {
    return JSON.parse(localStorage.getItem(CACHE_IDX) || '[]');
  } catch {
    return [];
  }
}

function getCachedEntry(key: string): { t: number; b: string } | null {
  try {
    const raw = localStorage.getItem(CACHE_PRE + key);
    if (!raw) return null;
    const o = JSON.parse(raw);
    return o && Date.now() - o.t < MAX_CACHE_AGE ? o : null;
  } catch {
    return null;
  }
}

function putCacheEntry(key: string, bodyText: string): void {
  if (!bodyText || bodyText.length >= MAX_CACHE_BYTES || bodyText.startsWith('<')) return;
  try {
    const ix = readCacheIndex().filter((x) => x !== key);
    ix.push(key);
    while (ix.length > MAX_CACHE_ENTRIES) {
      const oldest = ix.shift();
      if (oldest) localStorage.removeItem(CACHE_PRE + oldest);
    }
    const payload = JSON.stringify({ t: Date.now(), b: bodyText });
    try {
      localStorage.setItem(CACHE_PRE + key, payload);
    } catch {
      for (let i = 0; i < 8 && ix.length > 1; i++) {
        const drop = ix.shift();
        if (drop) localStorage.removeItem(CACHE_PRE + drop);
      }
      localStorage.setItem(CACHE_PRE + key, payload);
    }
    localStorage.setItem(CACHE_IDX, JSON.stringify(ix));
  } catch {
    // ignore storage limits
  }
}

function pumpQueue(): void {
  const now = Date.now();
  if (now < holdUntil) {
    setTimeout(pumpQueue, holdUntil - now + 20);
    return;
  }
  while (activeCount < MAX_CONCURRENCY && queue.length) {
    const item = queue.shift()!;
    activeCount++;
    let p: Promise<unknown>;
    try {
      p = item.fn();
    } catch (err) {
      p = Promise.reject(err);
    }
    p.then(item.res, item.rej).finally(() => {
      activeCount--;
      setTimeout(pumpQueue, 140);
    });
  }
}

function scheduleRequest<T>(fn: () => Promise<T>): Promise<T> {
  return new Promise<T>((res, rej) => {
    queue.push({
      fn: fn as () => Promise<unknown>,
      res: res as (v: unknown) => void,
      rej,
    });
    pumpQueue();
  });
}

export function getApiBase(): string {
  return window.__tmBk && window.__tmBk > Date.now() ? API_BACKUP : API_PRIMARY;
}

export async function ensureGuestToken(forceRefresh = false, overrideBase?: string): Promise<string> {
  if (authToken && !forceRefresh) return authToken;
  if (tokenPromise && !forceRefresh) return tokenPromise;

  const base = overrideBase || getApiBase();
  tokenPromise = (async () => {
    const res = await fetch(`${base}auth/guest-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: '{}',
      mode: 'cors',
      credentials: 'omit',
    });
    if (!res.ok) throw new Error(`AUTH HTTP ${res.status}`);
    const data = await res.json();
    const token = data.token || data.access_token || data?.data?.token || '';
    if (!token) throw new Error('Token missing in response');
    authToken = token;
    addDiagLog('ok', `POST auth/guest-token -> ${res.status}`);
    return token;
  })();

  try {
    return await tokenPromise;
  } finally {
    tokenPromise = null;
  }
}

export function formatApiError(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err || 'خطای نامشخص');
  if (raw.includes('AUTH')) return 'دریافت توکن از سرور ناموفق بود. احتمالاً اینترنت یا فیلترشکن مشکل دارد.';
  if (raw.includes('Failed to fetch') || raw.includes('NetworkError')) {
    return 'عدم دسترسی به اینترنت یا سرور (فیلترشکن را خاموش یا روشن کرده و امتحان کنید).';
  }
  if (raw.includes('AbortError')) return 'پاسخ سرور بیش از حد طول کشید (Timeout).';
  return raw;
}

async function rawFetchWithRetry(
  url: string,
  init: RequestInit,
  cacheKey: string | null,
  attempt = 0
): Promise<Response> {
  const t0 = Date.now();
  const res = await scheduleRequest(() => fetch(url, init));
  const ms = Date.now() - t0;
  const method = String(init.method || 'GET').toUpperCase();
  const shortUrl = url.replace(/^https?:\/\//, '').slice(0, 100);

  if (res.status === 429 && attempt < 3 && (!cacheKey || !getCachedEntry(cacheKey))) {
    if (Date.now() - lastBusyToast > 15000) {
      lastBusyToast = Date.now();
      showDomToast('سرور شلوغ است؛ چند لحظه صبر کنید، خودکار دوباره تلاش می‌شود');
    }
    const ra = parseFloat(res.headers.get('Retry-After') || '0') || 0;
    const wait = Math.min(7000, (ra ? ra * 1000 : 1200 * Math.pow(2, attempt)) + Math.random() * 400);
    holdUntil = Math.max(holdUntil, Date.now() + wait);
    addDiagLog('err', `429 rate-limited: waiting ${Math.round(wait)}ms then retry ${attempt + 1}`);
    await new Promise((r) => setTimeout(r, wait));
    if (init.signal?.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }
    return rawFetchWithRetry(url, init, cacheKey, attempt + 1);
  }

  if (res.ok) {
    addDiagLog('ok', `${method} ${shortUrl} -> ${res.status} (${ms}ms)`);
  } else {
    addDiagLog('err', `${method} ${shortUrl} -> ${res.status} (${ms}ms)`);
  }
  return res;
}

export async function apiRequest<T = Record<string, unknown>>(
  path: string,
  options: { method?: 'GET' | 'POST'; body?: unknown } = {}
): Promise<T> {
  const method = (options.method || 'GET').toUpperCase();
  const cacheKey = method === 'GET' && !path.startsWith('auth/') ? path : null;

  if (cacheKey) {
    const neg = negCache[cacheKey];
    if (neg && Date.now() - neg.t < 600000) {
      addDiagLog('ok', `NEG-CACHE ${neg.s} ${cacheKey.slice(0, 50)}`);
      return { success: false, message: 'cached error', data: [] } as unknown as T;
    }
    const cached = getCachedEntry(cacheKey);
    if (cached && Date.now() - cached.t < FRESH_MS) {
      addDiagLog('ok', `CACHE-FRESH ${cacheKey.slice(0, 60)}`);
      return JSON.parse(cached.b) as T;
    }
  }

  const runOnBase = async (base: string): Promise<T> => {
    const token = await ensureGuestToken(false, base);
    const headers: Record<string, string> = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 18000);
    const init: RequestInit = {
      method,
      headers,
      mode: 'cors',
      credentials: 'omit',
      signal: controller.signal,
    };
    if (options.body) {
      headers['Content-Type'] = 'application/json';
      init.body = JSON.stringify(options.body);
    }

    try {
      let res = await rawFetchWithRetry(base + path, init, cacheKey);
      if (res.status === 401 || res.status === 403) {
        const freshToken = await ensureGuestToken(true, base);
        headers.Authorization = `Bearer ${freshToken}`;
        res = await rawFetchWithRetry(base + path, init, cacheKey);
      }

      if (res.status === 400 || res.status === 404) {
        if (cacheKey) negCache[cacheKey] = { t: Date.now(), s: res.status };
      }

      if (!res.ok) {
        if (cacheKey && (res.status === 429 || (base === API_BACKUP && res.status >= 500))) {
          const stale = getCachedEntry(cacheKey);
          if (stale) {
            showDomToast('اتصال برقرار نشد؛ اطلاعات ذخیره‌شده نمایش داده شد');
            return JSON.parse(stale.b) as T;
          }
        }
        const txt = await res.text().catch(() => '');
        throw new Error(`HTTP ${res.status} (${txt.slice(0, 60)})`);
      }

      const txt = await res.text();
      if (cacheKey) putCacheEntry(cacheKey, txt);
      return JSON.parse(txt) as T;
    } finally {
      clearTimeout(timeout);
    }
  };

  if (cacheKey && cacheKey in inflightMap) {
    return inflightMap[cacheKey] as Promise<T>;
  }

  const exec = (async (): Promise<T> => {
    const primaryBase = getApiBase();
    try {
      return await runOnBase(primaryBase);
    } catch (err) {
      if (primaryBase === API_PRIMARY) {
        addDiagLog('err', `Primary API failed (${path}), failing over to backup`);
        window.__tmBk = Date.now() + 300000;
        if (Date.now() - lastBackupToast > 30000) {
          lastBackupToast = Date.now();
          showDomToast('سرور اصلی پاسخ نداد؛ به سرور پشتیبان وصل شدیم');
        }
        try {
          return await runOnBase(API_BACKUP);
        } catch (bkErr) {
          if (cacheKey) {
            const stale = getCachedEntry(cacheKey);
            if (stale) {
              showDomToast('اتصال برقرار نشد؛ اطلاعات ذخیره‌شده نمایش داده شد');
              return JSON.parse(stale.b) as T;
            }
          }
          throw bkErr;
        }
      }
      if (cacheKey) {
        const stale = getCachedEntry(cacheKey);
        if (stale) {
          showDomToast('اتصال برقرار نشد؛ اطلاعات ذخیره‌شده نمایش داده شد');
          return JSON.parse(stale.b) as T;
        }
      }
      throw err;
    }
  })();

  if (cacheKey) {
    inflightMap[cacheKey] = exec;
    exec.finally(() => {
      delete inflightMap[cacheKey];
    });
  }
  return exec;
}

export async function testServerConnectivity(): Promise<void> {
  addDiagLog('ok', `--- server test (online=${navigator.onLine}) ---`);
  await Promise.allSettled(
    [API_PRIMARY, API_BACKUP].map(async (b) => {
      const c = new AbortController();
      const tm = setTimeout(() => c.abort(), 10000);
      try {
        const t0 = Date.now();
        const r = await fetch(`${b}auth/guest-token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: '{}',
          mode: 'cors',
          credentials: 'omit',
          signal: c.signal,
        });
        addDiagLog(r.ok ? 'ok' : 'err', `POST ${b.replace('https://', '')}auth/guest-token -> ${r.status} (${Date.now() - t0}ms)`);
      } catch (e) {
        addDiagLog('err', `POST ${b.replace('https://', '')}auth/guest-token FAIL: ${e instanceof Error ? e.message : String(e)}`);
      } finally {
        clearTimeout(tm);
      }
    })
  );
}

export function extractArray(res: unknown): unknown[] {
  if (!res) return [];
  if (Array.isArray(res)) return res;
  if (typeof res !== 'object') return [];
  const obj = res as Record<string, unknown>;
  if (Array.isArray(obj.data)) return obj.data;
  if (Array.isArray(obj.movies)) return obj.movies;
  if (Array.isArray(obj.items)) return obj.items;
  if (Array.isArray(obj.results)) return obj.results;
  const dataObj = obj.data as Record<string, unknown> | undefined;
  if (dataObj && typeof dataObj === 'object') {
    if (Array.isArray(dataObj.movies)) return dataObj.movies;
    if (Array.isArray(dataObj.items)) return dataObj.items;
    if (Array.isArray(dataObj.results)) return dataObj.results;
    if (Array.isArray(dataObj.data)) return dataObj.data;
  }
  const nested = obj.slides as Record<string, unknown> | undefined;
  if (nested && Array.isArray(nested.movies)) return nested.movies;
  return [];
}

export async function fetchHome(): Promise<HomeData> {
  const res = await apiRequest<{ data?: HomeData; slides?: HomeData } & HomeData>('home');
  const root = res?.slides ? res : res?.data?.slides ? res.data : res?.data || res;
  const slides = (root.slides || root) as HomeData;
  return {
    movies: slides.movies || [],
    countries: slides.countries || root.countries || [],
    genres: slides.genres || root.genres || [],
    stars: slides.stars || root.stars || [],
  };
}

export async function fetchMovieDetails(id: string | number): Promise<Movie | null> {
  const [res1, res2] = await Promise.allSettled([
    apiRequest<{ data?: Movie; movie?: Movie } & Movie>(`movie/${id}`),
    apiRequest<{ data?: Movie; movie?: Movie } & Movie>(`movie/${id}/details`),
  ]);

  let detail: Movie = {};
  if (res1.status === 'fulfilled' && res1.value) {
    const r = res1.value;
    detail = { ...detail, ...((r.data || r.movie || r) as Movie) };
  }
  if (res2.status === 'fulfilled' && res2.value) {
    const r2 = res2.value;
    detail = { ...detail, ...((r2.data || r2.movie || r2) as Movie) };
  }
  return Object.keys(detail).length ? detail : null;
}

export async function fetchMovieLinks(id: string | number): Promise<unknown> {
  try {
    return await apiRequest(`movie/${id}/links`);
  } catch {
    return null;
  }
}

export async function fetchSeriesSeasons(id: string | number): Promise<Season[]> {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const r = await apiRequest<{ data?: { seasons?: Season[] } | Season[]; seasons?: Season[] }>(
        `movie/${id}/seasons`
      );
      if (Array.isArray(r?.data)) return r.data;
      if (r?.data && !Array.isArray(r.data) && Array.isArray(r.data.seasons)) return r.data.seasons;
      if (Array.isArray(r?.seasons)) return r.seasons;
      return [];
    } catch {
      if (attempt === 0) {
        await new Promise((res) => setTimeout(res, 900));
        continue;
      }
      return [];
    }
  }
  return [];
}

export interface SearchFilterParams {
  title?: string;
  genreIds?: Array<string | number>;
  countryIds?: Array<string | number>;
  startYear?: number;
  endYear?: number;
  imdbStart?: number;
  imdbEnd?: number;
  type?: string;
  subStatus?: string;
  isDubbed?: number | null;
  sortKey?: string;
  sortOrder?: string;
  page?: number;
}

export async function searchMovies(params: SearchFilterParams): Promise<Movie[]> {
  const payload = {
    title: params.title || '',
    genre_ids: params.genreIds || [],
    country_ids: params.countryIds || [],
    start_year: params.startYear || 1900,
    end_year: params.endYear || 2026,
    imdb_rating_start: params.imdbStart || 0,
    imdb_rating_end: params.imdbEnd || 10,
    type: params.type || '',
    sub_status: params.subStatus || '',
    is_dubbed: params.isDubbed ?? null,
    sort_key: params.sortKey || '',
    sort_order: params.sortOrder || 'DESC',
    page: params.page || 1,
  };

  try {
    const res = await apiRequest('v3/search', { method: 'POST', body: payload });
    const list = filterPeopleOut(filterWebVersion(extractArray(res) as Movie[]));
    if (list.length === 0 && payload.sort_key) {
      const res2 = await apiRequest('v3/search', {
        method: 'POST',
        body: { ...payload, sort_key: '', sort_order: '' },
      });
      return filterPeopleOut(filterWebVersion(extractArray(res2) as Movie[]));
    }
    return list;
  } catch {
    return [];
  }
}

export async function searchByTitle(query: string): Promise<Movie[]> {
  const q = query.trim();
  const list = await searchMovies({ title: q });
  if (list.length > 0) return list;

  // Fallback GET endpoints
  const endpoints = [
    `v3/search?q=${encodeURIComponent(q)}`,
    `search?q=${encodeURIComponent(q)}`,
  ];
  for (const ep of endpoints) {
    try {
      const r = await apiRequest(ep);
      const arr = filterPeopleOut(filterWebVersion(extractArray(r) as Movie[]));
      if (arr.length) return arr;
    } catch {
      // ignore
    }
  }
  return [];
}

export async function fetchByGenre(genreId: string | number, page = 1): Promise<Movie[]> {
  return searchMovies({ genreIds: [genreId], sortKey: 'newest', page });
}

export async function fetchByCountry(countryId: string | number, page = 1): Promise<Movie[]> {
  return searchMovies({ countryIds: [countryId], sortKey: 'newest', page });
}

export async function fetchByStar(starId: string | number, starName: string, homeSections: SlideSection[]): Promise<Movie[]> {
  const endpoints = [
    `star/${starId}`,
    `v3/star/${starId}`,
    `star/${starId}/movies`,
    `v3/star/${starId}/movies`,
    `movie/star/${starId}`,
    `stars/${starId}`,
  ];
  for (const ep of endpoints) {
    try {
      const r = await apiRequest(ep);
      const arr = filterPeopleOut(filterWebVersion(extractArray(r) as Movie[]));
      if (arr.length) return arr;
    } catch {
      // continue
    }
  }

  // Fallback 1: title search with star name if available
  if (starName) {
    const byName = await searchMovies({ title: starName });
    if (byName.length) return byName;
  }

  // Fallback 2: filter from cached home sections
  const matched: Movie[] = [];
  for (const sec of homeSections || []) {
    for (const m of sec.items || []) {
      const allStars = [...(m.stars || []), ...(m.actors || []), ...(m.casts || []), ...(m.cast || [])];
      if (allStars.some((s) => String(getMovieId(s)) === String(starId))) {
        matched.push(m);
      }
    }
  }
  return filterPeopleOut(filterWebVersion(matched));
}

export async function fetchStarsPage(page: number): Promise<Star[]> {
  const endpoints = [
    `stars?page=${page}`,
    `v3/stars?page=${page}`,
    `actors?page=${page}`,
    `v3/actors?page=${page}`,
    `star/list?page=${page}`,
    `stars/list?page=${page}`,
    `people?page=${page}`,
  ];
  for (const ep of endpoints) {
    try {
      const r = await apiRequest(ep);
      const arr = extractArray(r) as Star[];
      if (arr.length) return arr;
    } catch {
      // continue
    }
  }
  return [];
}

export async function fetchSectionAll(
  sec: SlideSection,
  sectionIndex = 0
): Promise<Movie[]> {
  const secId = sec.id || sec.section_id || sec.slide_id;
  const secTitle = cleanTitle(sec.title || sec.name || '');

  if (secId) {
    const allItems: Movie[] = [];
    const pageEndpoints = [
      `v3/section/${secId}`,
      `section/${secId}`,
      `v3/section/${secId}?page=1`,
      `v3/home/${secId}`,
    ];
    for (const ep of pageEndpoints) {
      try {
        const r = await apiRequest(ep);
        const arr = filterPeopleOut(filterWebVersion(extractArray(r) as Movie[]));
        if (arr.length) {
          allItems.push(...arr);
          break;
        }
      } catch {
        // continue
      }
    }

    if (allItems.length) {
      // Attempt pages 2..5
      for (let p = 2; p <= 5; p++) {
        try {
          const r = await apiRequest(`v3/section/${secId}?page=${p}`);
          const arr = filterPeopleOut(filterWebVersion(extractArray(r) as Movie[]));
          if (!arr.length) break;
          allItems.push(...arr);
        } catch {
          break;
        }
      }
      if (allItems.length > (sec.items?.length || 0)) return allItems;
    }
  }

  // Heuristic search fallback based on section title or index
  const t = secTitle;
  let heuristic: Movie[] = [];
  if (t.includes('انیمیشن')) heuristic = await searchMovies({ genreIds: [12], sortKey: 'newest' });
  else if (t.includes('کره')) heuristic = await searchMovies({ countryIds: [39], sortKey: 'newest' });
  else if (t.includes('ترکیه')) heuristic = await searchMovies({ countryIds: [40], sortKey: 'newest' });
  else if (t.includes('هند') || t.includes('بالیوود')) heuristic = await searchMovies({ countryIds: [36], sortKey: 'newest' });
  else if (t.includes('سریال')) heuristic = await searchMovies({ type: 'series', sortKey: 'newest' });
  else if (t.includes('جدید') || t.includes('به‌روز')) heuristic = await searchMovies({ sortKey: 'newest' });
  else if (t.includes('برتر') || t.includes('محبوب') || sectionIndex === 0) {
    heuristic = await searchMovies({ sortKey: 'imdb_rating' });
  }

  const combined = [...(sec.items || []), ...heuristic];
  return filterPeopleOut(filterWebVersion(combined));
}

export async function fetchCatalogByType(type: 'movie' | 'series', page = 1): Promise<Movie[]> {
  return searchMovies({ type, sortKey: 'newest', page });
}

export async function fetchApiHistory(): Promise<Movie[]> {
  try {
    const r = await apiRequest('history?page=1');
    return filterPeopleOut(filterWebVersion(extractArray(r) as Movie[]));
  } catch {
    return [];
  }
}

export async function fetchApiLikes(): Promise<Movie[]> {
  try {
    const r = await apiRequest('likes?page=1');
    return filterPeopleOut(filterWebVersion(extractArray(r) as Movie[]));
  } catch {
    return [];
  }
}
