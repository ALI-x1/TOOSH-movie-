import {
  DownloadRecord,
  Movie,
  ProgressItem,
  SavedDownloadItem,
  UserProfile,
  WatchedData,
} from '../types/movie';
import { getMovieId, getMovieTitle, getMovieType, getMovieYear, getPosterUrl } from './media';

const WATCHED_KEY = 'toosh-watched-v2';
const HISTORY_KEY = 'toosh-history-v2';
const LIKES_KEY = 'toosh-likes-v2';
const SAVED_KEY = 'toosh-saved-downloads-v1';
const DL_RECORDS_KEY = 'toosh-download-records-v1';
const PLAY_PREF_KEY = 'toosh-pref-v1';
const PROFILE_KEY = 'toosh-profile-v1';
const WEB_PROGRESS_KEY = 'toosh-progress-v1';

export function getWatchedData(): WatchedData {
  try {
    const raw = localStorage.getItem(WATCHED_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        qualities: parsed.qualities || {},
        episodes: parsed.episodes || {},
        movies: parsed.movies || {},
      };
    }
  } catch {
    // ignore
  }
  return { qualities: {}, episodes: {}, movies: {} };
}

function saveWatchedData(data: WatchedData): void {
  try {
    localStorage.setItem(WATCHED_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function markEpisodeWatched(
  movieId: string | number,
  seasonIdx: number,
  episodeIdx: number,
  quality: string
): void {
  const data = getWatchedData();
  const s = `${movieId}_${seasonIdx}_${episodeIdx}`;
  data.episodes[s] = { quality, timestamp: Date.now() };
  data.qualities[`${s}_${quality}`] = Date.now();
  saveWatchedData(data);
}

export function toggleEpisodeWatchedManual(
  movieId: string | number,
  seasonIdx: number,
  episodeIdx: number
): boolean {
  const data = getWatchedData();
  const s = `${movieId}_${seasonIdx}_${episodeIdx}`;
  const was = Boolean(data.episodes[s]);
  if (was) {
    delete data.episodes[s];
  } else {
    data.episodes[s] = { quality: 'دستی', timestamp: Date.now() };
  }
  saveWatchedData(data);
  return !was;
}

export function markMovieWatched(movieId: string | number, quality: string): void {
  const data = getWatchedData();
  data.movies[String(movieId)] = { quality, timestamp: Date.now() };
  data.qualities[`${movieId}_movie_${quality}`] = Date.now();
  saveWatchedData(data);
}

export function getWatchHistory(): Movie[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

export function addToWatchHistory(movie: Movie, quality = ''): void {
  if (!movie) return;
  const id = String(getMovieId(movie));
  if (!id) return;
  const list = getWatchHistory().filter((m) => String(getMovieId(m)) !== id);
  list.unshift({ ...movie, _watchedAt: Date.now(), _watchedQuality: quality });
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, 60)));
  } catch {
    // ignore
  }
}

export function clearWatchHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {
    // ignore
  }
}

export function getLikedMovies(): Movie[] {
  try {
    return JSON.parse(localStorage.getItem(LIKES_KEY) || '[]');
  } catch {
    return [];
  }
}

export function isMovieLiked(movieId: string | number): boolean {
  const s = String(movieId);
  return getLikedMovies().some((m) => String(getMovieId(m)) === s);
}

export function toggleLikeMovie(movie: Movie): boolean {
  const id = String(getMovieId(movie));
  const list = getLikedMovies();
  const idx = list.findIndex((m) => String(getMovieId(m)) === id);
  let liked = false;
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    list.unshift(movie);
    liked = true;
  }
  try {
    localStorage.setItem(LIKES_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
  return liked;
}

export function getSavedDownloads(): SavedDownloadItem[] {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isMovieSaved(movieId: string | number): boolean {
  const s = String(movieId);
  return getSavedDownloads().some((item) => String(item.id) === s);
}

export function toggleSaveMovie(movie: Movie): boolean {
  const id = String(getMovieId(movie));
  const list = getSavedDownloads();
  const idx = list.findIndex((item) => String(item.id) === id);
  let saved = false;
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    list.unshift({
      id,
      title: getMovieTitle(movie),
      poster: getPosterUrl(movie),
      type: getMovieType(movie) === 'series' ? 'series' : 'movie',
      year: getMovieYear(movie),
      savedAt: Date.now(),
      movie,
    });
    saved = true;
  }
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
  return saved;
}

export function getDownloadRecords(): DownloadRecord[] {
  try {
    return JSON.parse(localStorage.getItem(DL_RECORDS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveDownloadRecords(records: DownloadRecord[]): void {
  try {
    localStorage.setItem(DL_RECORDS_KEY, JSON.stringify(records));
  } catch {
    // ignore
  }
}

export function addDownloadRecord(record: DownloadRecord): void {
  const list = getDownloadRecords().filter((r) => r.dmId !== record.dmId);
  list.unshift(record);
  saveDownloadRecords(list);
}

export function removeDownloadRecord(dmId: number): void {
  const list = getDownloadRecords().filter((r) => r.dmId !== dmId);
  saveDownloadRecords(list);
}

export interface PlayPref {
  a?: 'sub' | 'dub' | 'other';
  r?: number;
}

export function getPlayPref(): PlayPref | null {
  try {
    const raw = localStorage.getItem(PLAY_PREF_KEY);
    return raw ? (JSON.parse(raw) as PlayPref) : null;
  } catch {
    return null;
  }
}

export function savePlayPref(pref: PlayPref): void {
  try {
    localStorage.setItem(PLAY_PREF_KEY, JSON.stringify(pref));
  } catch {
    // ignore
  }
}

export function clearPlayPref(): void {
  try {
    localStorage.removeItem(PLAY_PREF_KEY);
  } catch {
    // ignore
  }
}

export function getUserProfile(): UserProfile {
  try {
    const parsed = JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}');
    let joined = parsed.joined;
    if (!joined) {
      joined = Date.now();
      localStorage.setItem(
        PROFILE_KEY,
        JSON.stringify({ name: parsed.name || 'تماشاگر توش', avatar: parsed.avatar || '', joined })
      );
    }
    return {
      name: parsed.name || 'تماشاگر توش',
      avatar: parsed.avatar || '',
      joined,
    };
  } catch {
    return { name: 'تماشاگر توش', avatar: '', joined: Date.now() };
  }
}

export function saveUserProfile(partial: Partial<UserProfile>): UserProfile {
  const next = { ...getUserProfile(), ...partial };
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
  return next;
}

export function getProgressList(): ProgressItem[] {
  try {
    if (window.AndroidPlayer?.getProgress) {
      const raw = JSON.parse(window.AndroidPlayer.getProgress() || '[]');
      if (Array.isArray(raw)) return raw;
    }
  } catch {
    // fallback to web localStorage
  }
  try {
    const raw = JSON.parse(localStorage.getItem(WEB_PROGRESS_KEY) || '[]');
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

export function saveProgressItem(item: ProgressItem): void {
  try {
    const list = getProgressList().filter((p) => p.k !== item.k);
    list.unshift(item);
    localStorage.setItem(WEB_PROGRESS_KEY, JSON.stringify(list.slice(0, 30)));
  } catch {
    // ignore
  }
}

export function removeProgressItem(key: string): void {
  try {
    window.AndroidPlayer?.removeProgress?.(key);
  } catch {
    // ignore
  }
  try {
    const list = getProgressList().filter((p) => p.k !== key);
    localStorage.setItem(WEB_PROGRESS_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}
