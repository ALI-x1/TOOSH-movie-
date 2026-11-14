export interface SourceLink {
  url: string;
  quality: string;
  size: string;
  score: number;
  raw?: Record<string, unknown>;
}

export interface Star {
  id?: string | number;
  star_id?: string | number;
  actor_id?: string | number;
  person_id?: string | number;
  cast_id?: string | number;
  slug?: string;
  name?: string;
  title?: string;
  image?: string;
}

export interface Genre {
  id?: string | number;
  title?: string;
  name?: string;
}

export interface Country {
  id?: string | number;
  title?: string;
  name?: string;
  image?: string;
}

export interface Episode {
  title?: string;
  name?: string;
  sources?: unknown[];
  links?: unknown[];
  files?: unknown[];
  [key: string]: unknown;
}

export interface Season {
  title?: string;
  name?: string;
  season?: number | string;
  episodes?: Episode[];
  items?: Episode[];
  episode?: Episode[];
}

export interface Movie {
  id?: string | number;
  movie_id?: string | number;
  slug?: string;
  title?: string;
  name?: string;
  original_title?: string;
  year?: string | number;
  release_year?: string | number;
  release_date?: string;
  imdb_rating?: string | number;
  rating?: string | number;
  imdb?: string | number;
  score?: string | number;
  poster?: string;
  poster_url?: string;
  image?: string;
  cover?: string;
  thumbnail?: string;
  backdrop?: string;
  backdrop_url?: string;
  description?: string;
  overview?: string;
  summary?: string;
  plot?: string;
  story?: string;
  type?: string;
  is_dubbed?: boolean;
  sub_status?: string;
  genres?: Array<string | Genre>;
  sources?: unknown[];
  stars?: Star[];
  actors?: Star[];
  casts?: Star[];
  cast?: Star[];
  _watchedAt?: number;
  _watchedQuality?: string;
  [key: string]: unknown;
}

export interface SlideSection {
  id?: string | number;
  section_id?: string | number;
  slide_id?: string | number;
  name?: string;
  title?: string;
  items?: Movie[];
}

export interface HomeData {
  movies?: SlideSection[];
  countries?: Country[];
  genres?: Genre[];
  stars?: Star[];
  slides?: HomeData;
}

export interface WatchedData {
  qualities: Record<string, number>;
  episodes: Record<string, { quality: string; timestamp: number }>;
  movies: Record<string, { quality: string; timestamp: number }>;
}

export interface SavedDownloadItem {
  id: string;
  title: string;
  poster: string;
  type: 'movie' | 'series';
  year: string;
  savedAt: number;
  movie: Movie;
}

export interface DownloadRecord {
  dmId: number;
  url: string;
  title: string;
  label: string;
  quality: string;
  type: 'movie' | 'series';
  fileName: string;
  folder: string;
  createdAt?: number;
  status?: string;
  downloaded?: number;
  total?: number;
  percent?: number;
  reason?: number;
}

export interface ProgressItem {
  k: string;
  url: string;
  title: string;
  pos: number;
  dur: number;
  ts: number;
  meta: string;
}

export interface ThemeConfig {
  id: string;
  fam: string;
  fl: string;
  d: number;
  bg: string;
  s: string;
  p: string;
  a: string;
  t: string;
  pair: string;
}

export interface UserPrefs {
  fs?: 's' | 'm' | 'l';
  lite?: boolean;
  novib?: boolean;
  auto?: boolean;
}

export interface UserProfile {
  name: string;
  avatar: string;
  joined: number;
}

export interface ToastItem {
  id: number;
  message: string;
  type: 'success' | 'error';
}

export type TabId = 'home' | 'movies' | 'series' | 'cats' | 'me' | 'history' | 'likes';

export type NavRoute =
  | { type: 'home' }
  | {
      type: 'list';
      kind: 'section' | 'genre' | 'country' | 'star' | 'search' | 'all-stars' | 'countries' | 'categories';
      id?: string | number;
      sectionIdx?: number;
      q?: string;
      title: string;
    }
  | { type: 'details'; id: string }
  | { type: 'player' }
  | { type: 'downloads' };

export interface PendingPlayContext {
  url: string;
  movieId: string;
  quality: string;
  sIdx?: number;
  eIdx?: number;
}

export interface SubtitleCue {
  start: number;
  end: number;
  text: string;
}

export interface AndroidPlayerBridge {
  isVpnActive?: () => boolean;
  setFullscreen?: (enter: boolean) => void;
  openTelegram?: () => void;
  exitApp?: () => void;
  playNative?: (url: string, title: string) => void;
  playNativeEx?: (url: string, title: string, meta: string) => void;
  setBars?: (status: string, nav: string, lightTheme: boolean) => void;
  isNightMode?: () => boolean;
  getProgress?: () => string;
  removeProgress?: (key: string) => void;
  openExternal?: (url: string, pkg: string) => void;
  extractSubtitles?: (url: string) => void;
  startDownload?: (json: string) => number;
  requestNotificationPermissionJs?: () => boolean;
  isBatteryOptimizationExempt?: () => boolean;
  requestBatteryOptimizationExemption?: () => boolean;
  setDownloadManagerVisible?: (visible: boolean) => void;
  resumeDownload?: (dmId: number) => boolean;
  listDownloads?: () => string | DownloadRecord[];
  deleteDownload?: (dmId: number) => boolean;
  playDownloaded?: (dmId: number) => boolean;
}

declare global {
  interface Window {
    AndroidPlayer?: AndroidPlayerBridge;
    __tmBk?: number;
    __tmSeasons?: Season[];
    __tmTr?: Record<string, string>;
    __onNativeSubtitles?: (json: string, isFinal: boolean) => void;
    __tmOpenThemes?: () => void;
    __tmOpenSettings?: () => void;
    __tmOpenDiag?: () => void;
    __tmBack?: () => boolean;
    __tooshLog?: (kind: 'ok' | 'err' | 'perf', message: string) => void;
  }
}
