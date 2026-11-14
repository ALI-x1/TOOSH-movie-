import { Episode, Movie, Season, SourceLink, Star } from '../types/movie';

export const MEDIA_BASE = 'https://media.mihan-cdn.com/';

export const POSTER_FALLBACK_SVG =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450' viewBox='0 0 300 450'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%231C1924'/%3E%3Cstop offset='100%25' stop-color='%230F0E13'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='450' fill='url(%23g)'/%3E%3Crect x='2' y='2' width='296' height='446' fill='none' stroke='%23ffffff1a' stroke-width='2' rx='12'/%3E%3Ccircle cx='150' cy='210' r='36' fill='%23ffffff08' stroke='%23ffffff20' stroke-width='2'/%3E%3Cpolygon points='142,194 142,226 168,210' fill='%23ffffff40'/%3E%3Ctext x='150' y='280' fill='%23888' font-family='sans-serif' font-size='14' text-anchor='middle' font-weight='bold'%3ETOOSH MOVIE%3C/text%3E%3C/svg%3E";

export function cleanTitle(value: unknown): string {
  if (!value) return '';
  let s = String(value);
  s = s.replace(/نکست\s*مووی/g, 'توش مووی');
  s = s.replace(/Next\s*Movies?/gi, 'TOOSH MOVIE');
  s = s.replace(/\bNXM\b/gi, 'TOOSH');
  s = s.replace(/نکست/g, 'توش');
  return s.trim();
}

export function getMovieId(m: Movie | Star | Record<string, unknown> | null | undefined): string | number {
  if (!m) return '';
  const obj = m as Record<string, unknown>;
  return (obj.id || obj.movie_id || obj.slug || obj.title || obj.name || '') as string | number;
}

export function getMovieTitle(m: Movie | null | undefined): string {
  return cleanTitle(m?.title || m?.name || m?.original_title || 'بدون عنوان');
}

export function getMovieYear(m: Movie | null | undefined): string {
  return String(m?.year || m?.release_year || m?.release_date?.slice?.(0, 4) || '');
}

export function getImdbRating(m: Movie | null | undefined): string {
  const raw = m?.imdb_rating || m?.rating || m?.imdb || m?.score;
  const num = parseFloat(String(raw ?? ''));
  return isNaN(num) || num <= 0 ? '' : num.toFixed(1);
}

export function resolveMediaUrl(rawUrl: unknown): string {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  const s = rawUrl.trim();
  if (!s) return '';
  if (s.startsWith('http://') || s.startsWith('https://')) return s;
  if (s.startsWith('/')) return MEDIA_BASE + s.slice(1);
  return MEDIA_BASE + s;
}

export function getPosterUrl(m: Movie | null | undefined): string {
  return resolveMediaUrl(m?.poster || m?.poster_url || m?.image || m?.cover || m?.thumbnail) || POSTER_FALLBACK_SVG;
}

export function getBackdropUrl(m: Movie | null | undefined): string {
  return (
    resolveMediaUrl(
      m?.backdrop || m?.backdrop_url || m?.cover || m?.poster || m?.poster_url || m?.image
    ) || POSTER_FALLBACK_SVG
  );
}

export function getPlotText(m: Movie | null | undefined): string {
  const s = cleanTitle(m?.description || m?.overview || m?.summary || m?.plot || m?.story || '');
  return s || 'توضیحاتی برای این عنوان ثبت نشده است.';
}

export function getMovieType(m: Movie | null | undefined): 'series' | 'movie' {
  const s = `${m?.type || ''}`.toLowerCase();
  return s.includes('series') || s.includes('serial') || s.includes('سریال') ? 'series' : 'movie';
}

export function isWebVersionNotice(m: Movie | null | undefined): boolean {
  if (!m) return false;
  const title = cleanTitle(m.title || m.name || m.original_title || '');
  return /نسخه\s*وب/.test(title) || /نسخه وب (?:کرال|توش)/.test(title);
}

export function filterWebVersion(list: Movie[]): Movie[] {
  return Array.isArray(list) ? list.filter((m) => !isWebVersionNotice(m)) : [];
}

export function dedupeMovies(list: Movie[]): Movie[] {
  const seen = new Set<string>();
  const out: Movie[] = [];
  for (const item of list) {
    if (!item || isWebVersionNotice(item)) continue;
    const id = String(getMovieId(item) || getMovieTitle(item));
    if (seen.has(id)) continue;
    seen.add(id);
    out.push(item);
  }
  return out;
}

export function cleanStreamUrl(raw: string): string {
  return typeof raw === 'string'
    ? raw
        .trim()
        .replace(/^["'[\s]+|["'\]\s]+$/g, '')
        .replace(/\\\//g, '/')
        .replace(/\s+/g, '%20')
    : '';
}

export function getFileExt(url: string): string {
  try {
    const clean = url.split('?')[0].split('#')[0];
    const last = clean.split('/').pop() || '';
    const idx = last.lastIndexOf('.');
    return idx >= 0 ? last.slice(idx + 1).toLowerCase() : '';
  } catch {
    return '';
  }
}

export function scoreStreamUrl(url: string): number {
  const ext = getFileExt(url);
  if (ext === 'mp4') return 100;
  if (ext === 'm3u8' || url.includes('.m3u8')) return 95;
  if (ext === 'webm') return 80;
  if (ext === 'mkv') return 50;
  if (ext === 'avi' || ext === 'flv') return 20;
  return 60;
}

export function extractSources(input: unknown): SourceLink[] {
  const found: SourceLink[] = [];
  const seen = new Set<string>();
  const visited = new Set<unknown>();

  const walk = (node: unknown, hint = '') => {
    if (!node) return;
    if (typeof node === 'string') {
      const cleaned = cleanStreamUrl(node);
      if (
        cleaned.startsWith('http') &&
        !cleaned.match(/\.(jpg|jpeg|png|webp|gif|svg|srt|vtt|ass|ssa|zip|rar)(\?|$)/i) &&
        !seen.has(cleaned)
      ) {
        seen.add(cleaned);
        found.push({
          url: cleaned,
          quality: cleanTitle(hint || 'کیفیت خودکار'),
          size: '',
          score: scoreStreamUrl(cleaned),
        });
      }
      return;
    }

    if (typeof node !== 'object' || visited.has(node)) return;
    visited.add(node);

    if (Array.isArray(node)) {
      for (const el of node) walk(el, hint);
      return;
    }

    const obj = node as Record<string, unknown>;
    const rawUrl = obj.url || obj.link || obj.file || obj.src || obj.stream_url || obj.video_url || obj.path;
    const rawQuality = cleanTitle(
      obj.quality || obj.label || obj.title || obj.name || obj.resolution || hint
    );

    if (typeof rawUrl === 'string') {
      const cleaned = cleanStreamUrl(rawUrl);
      if (
        cleaned.startsWith('http') &&
        !cleaned.match(/\.(jpg|jpeg|png|webp|gif|svg|srt|vtt|ass|ssa|zip|rar)(\?|$)/i) &&
        !seen.has(cleaned)
      ) {
        seen.add(cleaned);
        found.push({
          url: cleaned,
          quality: rawQuality || 'کیفیت خودکار',
          size: String(obj.size || obj.file_size || obj.volume || ''),
          score: scoreStreamUrl(cleaned),
          raw: obj,
        });
      }
    }

    for (const [k, v] of Object.entries(obj)) {
      if (
        ![
          'url',
          'link',
          'file',
          'src',
          'stream_url',
          'video_url',
          'path',
          'poster',
          'poster_url',
          'backdrop',
          'backdrop_url',
          'image',
          'cover',
          'thumbnail',
          'subtitles',
          'subtitle',
          'subs',
          'caption',
          'captions',
          'tracks',
          'trailer',
          'trailer_url',
          'teaser',
        ].includes(k)
      ) {
        walk(v, rawQuality || k);
      }
    }
  };

  walk(input);
  return found.filter((x) => !/تیزر|teaser|trailer/i.test(`${x.quality || ''} ${x.url || ''}`));
}

export interface SubtitleTrackRef {
  url: string;
  label: string;
}

export function extractSubtitles(input: unknown): SubtitleTrackRef[] {
  const out: SubtitleTrackRef[] = [];
  const seen = new Set<string>();
  const visited = new Set<unknown>();

  const walk = (node: unknown, label = 'زیرنویس فارسی') => {
    if (!node) return;
    if (typeof node === 'string') {
      const s = cleanStreamUrl(node);
      if (s.startsWith('http') && /\.(srt|vtt|ass|ssa)(\?|$)/i.test(s) && !seen.has(s)) {
        seen.add(s);
        out.push({ url: s, label });
      }
      return;
    }
    if (typeof node !== 'object' || visited.has(node)) return;
    visited.add(node);

    if (Array.isArray(node)) {
      for (const el of node) walk(el, label);
      return;
    }

    const obj = node as Record<string, unknown>;
    for (const [k, v] of Object.entries(obj)) {
      if (
        ['subtitles', 'subtitle', 'subs', 'caption', 'captions', 'tracks'].some((p) =>
          k.toLowerCase().includes(p)
        ) ||
        (typeof v === 'string' && /\.(srt|vtt|ass|ssa)(\?|$)/i.test(v))
      ) {
        walk(v, String(obj.label || obj.lang || obj.language || obj.title || label));
      } else if (typeof v === 'object') {
        walk(v, label);
      }
    }
  };

  walk(input);
  return out;
}

export function sortSources(sources: SourceLink[]): SourceLink[] {
  return [...sources].sort((a, b) => {
    const qa = String(a.quality || '');
    const qb = String(b.quality || '');
    const ra = parseInt(qa.match(/\d{3,4}/)?.[0] || '0', 10);
    const rb = parseInt(qb.match(/\d{3,4}/)?.[0] || '0', 10);
    if (ra !== rb) return rb - ra;
    return (b.score || 0) - (a.score || 0);
  });
}

export function normalizeQualityLabel(q: string): string {
  return cleanTitle(q || 'کیفیت خودکار')
    .replace(/زیرنویس\s*چسبیده/gi, 'زیرنویس')
    .replace(/دوبله\s*فارسی/gi, 'دوبله')
    .replace(/\bHardSub\b/gi, 'زیرنویس')
    .replace(/\bSoftSub\b/gi, 'زیرنویس')
    .replace(/\bDubbed\b/gi, 'دوبله')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractEpisodeNumber(ep: Episode, fallbackIdx: number): number {
  const s = `${ep?.title || ep?.name || ''}`.trim();
  let match =
    s.match(/[Ee](\d{1,4})/) ||
    s.match(/قسمت\s*(\d{1,4})/) ||
    s.match(/\b(\d{1,4})\b/);
  if (match) return parseInt(match[1], 10);
  if (Array.isArray(ep?.sources)) {
    for (const src of ep.sources) {
      const url = typeof src === 'string' ? src : String((src as Record<string, unknown>)?.url || '');
      match = url.match(/[Ee](\d{1,4})/) || url.match(/[._-](\d{1,3})\.(mkv|mp4|avi)/i);
      if (match) return parseInt(match[1], 10);
    }
  }
  return fallbackIdx + 1;
}

export function findTrailerUrl(movie: Movie | null | undefined, linksData?: unknown): string {
  if (!movie) return '';
  const direct = movie.trailer || movie.trailer_url || movie.teaser || movie.preview || movie.trailer_link;
  if (typeof direct === 'string' && direct.startsWith('http')) return direct;

  const inspect = (list: unknown): string => {
    if (!Array.isArray(list)) return '';
    for (const item of list) {
      const obj = typeof item === 'object' && item ? (item as Record<string, unknown>) : null;
      const u = typeof item === 'string' ? item : String(obj?.url || obj?.link || obj?.file || obj?.src || '');
      const lbl = obj ? String(obj.quality || obj.label || obj.title || obj.name || '') : '';
      if (u.startsWith('http') && /تیزر|teaser|trailer/i.test(`${lbl} ${u}`)) {
        return u;
      }
    }
    return '';
  };

  return (
    inspect(movie.sources) ||
    inspect(movie.links) ||
    inspect((linksData as Record<string, unknown>)?.data) ||
    inspect((linksData as Record<string, unknown>)?.sources) ||
    ''
  );
}

export function pickDownloadUrl(sources: SourceLink[]): SourceLink | null {
  if (!sources?.length) return null;
  const mp4 = sources.filter((x) => !/\.m3u8(\?|$)/i.test(x.url || ''));
  if (!mp4.length) return sources[0];
  return (
    mp4.find((x) => /720/.test(x.quality)) ||
    mp4.find((x) => /1080/.test(x.quality)) ||
    mp4.find((x) => /480/.test(x.quality)) ||
    mp4[0]
  );
}

export function audioCategory(quality: string): 'sub' | 'dub' | 'other' {
  const s = `${quality || ''}`;
  if (/دوبله|dub/i.test(s)) return 'dub';
  if (/زیرنویس|sub/i.test(s)) return 'sub';
  return 'other';
}

export function resolutionValue(quality: string): number {
  const m = String(quality || '').match(/\b(2160|1440|1080|720|480|360|240)\b/);
  return m ? parseInt(m[1], 10) : 0;
}

export interface AudioGroup {
  key: 'sub' | 'dub' | 'other';
  label: string;
  cls: string;
  items: SourceLink[];
}

export function groupSources(sources: SourceLink[]): AudioGroup[] {
  const groups: { sub: SourceLink[]; dub: SourceLink[]; other: SourceLink[] } = {
    sub: [],
    dub: [],
    other: [],
  };
  sources.forEach((s) => {
    groups[audioCategory(s.quality)].push(s);
  });

  const byResDesc = (a: SourceLink, b: SourceLink) => resolutionValue(b.quality) - resolutionValue(a.quality);
  groups.sub.sort(byResDesc);
  groups.dub.sort(byResDesc);
  groups.other.sort(byResDesc);

  const out: AudioGroup[] = [];
  if (groups.sub.length) out.push({ key: 'sub', label: 'زیرنویس فارسی', cls: 'tm-dl-sub', items: groups.sub });
  if (groups.dub.length) out.push({ key: 'dub', label: 'دوبله فارسی', cls: 'tm-dl-dub', items: groups.dub });
  if (groups.other.length) out.push({ key: 'other', label: 'سایر کیفیت‌ها', cls: 'tm-dl-other', items: groups.other });
  return out;
}

export function pickSeriesEpisode(
  seasons: Season[],
  movieId: string | number,
  watchedEpisodes: Record<string, { quality: string; timestamp: number }>
): { sIdx: number; eIdx: number } {
  const sList = seasons || [];
  let best = { sIdx: 0, eIdx: 0, ts: -1 };
  sList.forEach((se, sIdx) => {
    const eps = se.episodes || se.items || se.episode || [];
    eps.forEach((_ep, eIdx) => {
      const rec = watchedEpisodes[`${movieId}_${sIdx}_${eIdx}`];
      if (rec && rec.timestamp > best.ts) {
        best = { sIdx, eIdx, ts: rec.timestamp };
      }
    });
  });

  if (best.ts > -1) {
    const curSe = sList[best.sIdx];
    const eps = curSe?.episodes || curSe?.items || curSe?.episode || [];
    if (best.eIdx + 1 < eps.length) return { sIdx: best.sIdx, eIdx: best.eIdx + 1 };
    if (best.sIdx + 1 < sList.length) return { sIdx: best.sIdx + 1, eIdx: 0 };
    return { sIdx: best.sIdx, eIdx: best.eIdx };
  }
  return { sIdx: 0, eIdx: 0 };
}

export function buildNativeMeta(
  movie: Movie | null | undefined,
  extra?: { sIdx?: number; eIdx?: number; epTitle?: string; seasons?: Season[]; isTrailer?: boolean }
): string {
  const m = movie || {};
  const id = String(getMovieId(m));
  const title = getMovieTitle(m);
  const poster = getPosterUrl(m);
  const type = getMovieType(m);
  const year = getMovieYear(m);
  const meta: Record<string, unknown> = { id, title, poster, type, year };

  if (extra?.sIdx != null) {
    meta.s = extra.sIdx;
    meta.e = extra.eIdx;
    meta.ep = extra.epTitle || '';
  }
  if (extra?.isTrailer) meta.trailer = 1;

  const seasons = extra?.seasons || (window.__tmSeasons as Season[] | undefined);
  if (type === 'series' && Array.isArray(seasons)) {
    meta.seasons = seasons.map((se, si) => ({
      t: cleanTitle(se.title || se.name || `فصل ${se.season || si + 1}`),
      e: (se.episodes || se.items || se.episode || []).map((ep, ei) => ({
        t: cleanTitle(ep.title || ep.name || `قسمت ${ei + 1}`),
        q: sortSources(extractSources(ep)).map((q) => ({
          l: normalizeQualityLabel(q.quality),
          u: q.url,
          s: q.size || '',
        })),
      })),
    }));
  }

  return JSON.stringify(meta);
}

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function toPersianDigits(val: unknown): string {
  return String(val).replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

export function formatPersianDate(ts: number): string {
  try {
    return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(ts));
  } catch {
    return '';
  }
}

export function formatFileSize(sizeStr: string): string {
  if (!sizeStr) return '';
  if (/[GMK]B/i.test(sizeStr)) return sizeStr;
  const num = parseFloat(sizeStr);
  if (isNaN(num) || num <= 0) return sizeStr;
  return num > 1024 ? `${(num / 1024).toFixed(2)} GB` : `${num.toFixed(0)} MB`;
}

export function formatBytes(bytes: number): string {
  const n = Number(bytes) || 0;
  if (n <= 0) return '۰ B';
  if (n >= 1073741824) return toPersianDigits(`${(n / 1073741824).toFixed(2)} GB`);
  if (n >= 1048576) return toPersianDigits(`${(n / 1048576).toFixed(1)} MB`);
  if (n >= 1024) return toPersianDigits(`${Math.round(n / 1024)} KB`);
  return toPersianDigits(`${n} B`);
}

export function formatEta(seconds: number): string {
  const n = Math.floor(seconds);
  if (!isFinite(n) || n <= 0) return '';
  if (n < 60) return toPersianDigits(`${n} ثانیه`);
  if (n < 3600) {
    const mins = Math.floor(n / 60);
    const secs = n % 60;
    return toPersianDigits(`${mins} دقیقه${secs ? ` و ${secs} ثانیه` : ''}`);
  }
  const hrs = Math.floor(n / 3600);
  const mins = Math.floor((n % 3600) / 60);
  return toPersianDigits(`${hrs} ساعت${mins ? ` و ${mins} دقیقه` : ''}`);
}

export function formatDuration(seconds: number): string {
  if (!seconds || isNaN(seconds) || !isFinite(seconds)) return '00:00';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return h > 0
    ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    : `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function isPersonObject(item: Record<string, unknown> | null | undefined): boolean {
  if (!item || typeof item !== 'object') return false;
  if (item.poster || item.poster_url || item.backdrop || item.backdrop_url || item.imdb_rating || item.imdb) {
    return false;
  }
  const t = `${item.type || ''}`.toLowerCase();
  return (
    t === 'star' ||
    t === 'actor' ||
    t === 'person' ||
    Boolean(item.image && !item.poster && !item.poster_url && item.name && !item.year && !item.release_year)
  );
}

export function filterPeopleOut(list: Movie[]): Movie[] {
  return Array.isArray(list) ? list.filter((m) => !isPersonObject(m as Record<string, unknown>)) : [];
}

export function extractStarsFromMovies(movies: Movie[]): Star[] {
  const map = new Map<string, Star>();
  for (const movie of movies || []) {
    const lists = [movie.stars, movie.actors, movie.casts, movie.cast].filter(Array.isArray) as Star[][];
    for (const arr of lists) {
      for (const s of arr) {
        if (!s || typeof s !== 'object') continue;
        const id = s.id || s.star_id || s.actor_id || s.person_id || s.name || s.title;
        if (!id) continue;
        const key = String(id);
        const prev = map.get(key);
        if (!prev || (!prev.image && s.image)) {
          map.set(key, s);
        }
      }
    }
  }
  return Array.from(map.values());
}

export function mergeStars(primary: Star[], secondary: Star[]): Star[] {
  const map = new Map<string, Star>();
  const add = (list: Star[]) => {
    for (const item of list || []) {
      if (!item || typeof item !== 'object') continue;
      const key = String(item.id || item.star_id || item.name || item.title || '').trim();
      if (!key) continue;
      const prev = map.get(key);
      if (!prev) {
        map.set(key, item);
      } else if (!prev.image && item.image) {
        map.set(key, { ...prev, ...item });
      }
    }
  };
  add(primary);
  add(secondary);
  return Array.from(map.values());
}

export function shrinkAvatarImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    const objUrl = URL.createObjectURL(file);
    img.onload = () => {
      const size = Math.min(img.width, img.height);
      const sx = (img.width - size) / 2;
      const sy = (img.height - size) / 2;
      const canvas = document.createElement('canvas');
      canvas.width = 240;
      canvas.height = 240;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, sx, sy, size, size, 0, 0, 240, 240);
      URL.revokeObjectURL(objUrl);
      resolve(canvas.toDataURL('image/jpeg', 0.86));
    };
    img.onerror = () => {
      URL.revokeObjectURL(objUrl);
      resolve('');
    };
    img.src = objUrl;
  });
}
