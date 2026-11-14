import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  Download,
  Search,
  Send,
  Trash2,
  X,
} from 'lucide-react';
import {
  Country,
  Genre,
  HomeData,
  Movie,
  ProgressItem,
  Season,
  SlideSection,
  SourceLink,
  Star,
  TabId,
  ToastItem,
} from './types/movie';
import {
  fetchByCountry,
  fetchByGenre,
  fetchByStar,
  fetchCatalogByType,
  fetchHome,
  fetchMovieDetails,
  fetchSectionAll,
  fetchStarsPage,
  searchByTitle,
} from './services/api';
import {
  buildNativeMeta,
  cleanStreamUrl,
  cleanTitle,
  dedupeMovies,
  extractSources,
  extractStarsFromMovies,
  getMovieId,
  getMovieTitle,
  getMovieType,
  mergeStars,
  resolveMediaUrl,
  sortSources,
  toPersianDigits,
} from './utils/media';
import {
  addDownloadRecord,
  addToWatchHistory,
  clearWatchHistory,
  getDownloadRecords,
  getLikedMovies,
  getSavedDownloads,
  getUserProfile,
  getWatchHistory,
  markEpisodeWatched,
  markMovieWatched,
} from './utils/storage';
import {
  applyUserPrefs,
  getStoredTheme,
  initHapticClicks,
  openTelegramChannel,
  syncAutoTheme,
  syncNativeBars,
} from './utils/themes';
import { initPerformanceMonitoring } from './utils/diag';
import { SplashOverlay } from './components/SplashOverlay';
import { OfflineBanner } from './components/OfflineBanner';
import { SkeletonGrid } from './components/SkeletonGrid';
import { MovieCard } from './components/MovieCard';
import { ContinueWatching } from './components/ContinueWatching';
import { CategoriesView } from './components/CategoriesView';
import { ProfileView } from './components/ProfileView';
import { MovieDetails } from './components/MovieDetails';
import { SmartPlaySheet } from './components/SmartPlaySheet';
import { ChoosePlayerModal } from './components/ChoosePlayerModal';
import { VideoPlayer } from './components/VideoPlayer';
import { DownloadManager } from './components/DownloadManager';
import { ThemePage } from './components/ThemePage';
import { SettingsModal } from './components/SettingsModal';
import { DayNightButton } from './components/DayNightButton';
import { ExitDialog } from './components/ExitDialog';

const APP_VERSION = '2.4';

interface ListViewState {
  kind: 'section' | 'genre' | 'country' | 'star' | 'search' | 'all-stars' | 'countries';
  id?: string | number;
  title: string;
  section?: SlideSection;
  sectionIdx?: number;
  query?: string;
}

interface PlayerState {
  url: string;
  title: string;
  movie?: Movie | null;
  sources: SourceLink[];
  subtitles: Array<{ url: string; label: string }>;
  progressKey?: string;
  progressMeta?: string;
  initialPositionSec?: number;
}

const DOCK_TABS: Array<{ id: TabId; label: string; icon: string }> = [
  { id: 'home', label: 'خانه', icon: 'tm-ic-home' },
  { id: 'movies', label: 'فیلم‌ها', icon: 'tm-ic-film' },
  { id: 'series', label: 'سریال‌ها', icon: 'tm-ic-tv' },
  { id: 'cats', label: 'دسته‌بندی', icon: 'tm-ic-grid' },
  { id: 'me', label: 'پروفایل', icon: 'tm-ic-user' },
];

export default function App() {
  const [themeId, setThemeId] = useState<string>(() => getStoredTheme());
  const [splashVisible, setSplashVisible] = useState(true);
  const [splashError, setSplashError] = useState('');

  const [homeData, setHomeData] = useState<HomeData>({});
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [searchQuery, setSearchQuery] = useState('');

  // Navigation overlays/sub-pages
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [listView, setListView] = useState<ListViewState | null>(null);
  const [showDownloads, setShowDownloads] = useState(false);

  // Catalog tab feeds
  const [moviesList, setMoviesList] = useState<Movie[]>([]);
  const [moviesPage, setMoviesPage] = useState(1);
  const [moviesHasMore, setMoviesHasMore] = useState(true);
  const [moviesLoading, setMoviesLoading] = useState(false);

  const [seriesList, setSeriesList] = useState<Movie[]>([]);
  const [seriesPage, setSeriesPage] = useState(1);
  const [seriesHasMore, setSeriesHasMore] = useState(true);
  const [seriesLoading, setSeriesLoading] = useState(false);

  // Dynamic List view items & pagination
  const [listItems, setListItems] = useState<Movie[]>([]);
  const [listStars, setListStars] = useState<Star[]>([]);
  const [listPage, setListPage] = useState(1);
  const [listHasMore, setListHasMore] = useState(false);
  const [listLoading, setListLoading] = useState(false);

  // User data & counters
  const [profile, setProfile] = useState(() => getUserProfile());
  const [historyList, setHistoryList] = useState<Movie[]>(() => getWatchHistory());
  const [likesList, setLikesList] = useState<Movie[]>(() => getLikedMovies());
  const [savedCount, setSavedCount] = useState(() => getSavedDownloads().length);
  const [downloadsCount, setDownloadsCount] = useState(() => getDownloadRecords().length);
  const [resumeTick, setResumeTick] = useState(0);

  // Sheets & Modals
  const [smartSheetData, setSmartSheetData] = useState<{
    movie: Movie;
    sources: SourceLink[];
    seasons: Season[];
  } | null>(null);

  const [chooseModalData, setChooseModalData] = useState<{
    url: string;
    title: string;
    movie?: Movie;
    sources: SourceLink[];
    subtitles: Array<{ url: string; label: string }>;
    quality: string;
    sIdx?: number;
    eIdx?: number;
    epTitle?: string;
    seasons?: Season[];
  } | null>(null);

  const [playerState, setPlayerState] = useState<PlayerState | null>(null);
  const [themePageOpen, setThemePageOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [diagOpen, setDiagOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const loadMoreBtnRef = useRef<HTMLButtonElement | null>(null);
  const autoPageCountRef = useRef(0);

  const addToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev.slice(-3), { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const refreshUserCounts = useCallback(() => {
    setHistoryList(getWatchHistory());
    setLikesList(getLikedMovies());
    setSavedCount(getSavedDownloads().length);
    setDownloadsCount(getDownloadRecords().length);
  }, []);

  // Init system prefs, theme, haptics, diagnostics
  useEffect(() => {
    applyUserPrefs();
    initPerformanceMonitoring();
    const stopHaptics = initHapticClicks();
    syncNativeBars();
    syncAutoTheme((id) => setThemeId(id));

    const onFocus = () => {
      syncAutoTheme((id) => setThemeId(id));
      setResumeTick((t) => t + 1);
      refreshUserCounts();
    };
    window.addEventListener('focus', onFocus);
    return () => {
      stopHaptics();
      window.removeEventListener('focus', onFocus);
    };
  }, [refreshUserCounts]);

  const loadHome = useCallback(async () => {
    setSplashError('');
    try {
      const data = await fetchHome();
      const allHomeMovies: Movie[] = [];
      (data.movies || []).forEach((s) => {
        if (Array.isArray(s.items)) allHomeMovies.push(...s.items);
      });
      const derivedStars = extractStarsFromMovies(allHomeMovies);
      setHomeData({
        ...data,
        stars: mergeStars(data.stars || [], derivedStars),
      });
      setSplashVisible(false);
    } catch (err) {
      setSplashError(err instanceof Error ? err.message : String(err));
    }
  }, []);

  useEffect(() => {
    loadHome();
  }, [loadHome]);

  // Catalog tab loaders
  const loadMoviesCatalog = useCallback(async (page = 1, append = false) => {
    setMoviesLoading(true);
    try {
      const res = await fetchCatalogByType('movie', page);
      setMoviesList((prev) => dedupeMovies(append ? [...prev, ...res] : res));
      setMoviesPage(page);
      setMoviesHasMore(res.length >= 12);
    } finally {
      setMoviesLoading(false);
    }
  }, []);

  const loadSeriesCatalog = useCallback(async (page = 1, append = false) => {
    setSeriesLoading(true);
    try {
      const res = await fetchCatalogByType('series', page);
      setSeriesList((prev) => dedupeMovies(append ? [...prev, ...res] : res));
      setSeriesPage(page);
      setSeriesHasMore(res.length >= 12);
    } finally {
      setSeriesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'movies' && moviesList.length === 0 && !moviesLoading) {
      loadMoviesCatalog(1, false);
    } else if (activeTab === 'series' && seriesList.length === 0 && !seriesLoading) {
      loadSeriesCatalog(1, false);
    }
  }, [activeTab, moviesList.length, moviesLoading, seriesList.length, seriesLoading, loadMoviesCatalog, loadSeriesCatalog]);

  // Load ListView items
  const loadListViewData = useCallback(
    async (view: ListViewState, page = 1, append = false) => {
      setListLoading(true);
      try {
        if (view.kind === 'countries') {
          setListHasMore(false);
          return;
        }
        if (view.kind === 'all-stars') {
          const starsRes = await fetchStarsPage(page);
          setListStars((prev) => mergeStars(append ? prev : homeData.stars || [], starsRes));
          setListPage(page);
          setListHasMore(starsRes.length > 0);
          return;
        }
        if (view.kind === 'section' && view.section) {
          const items = await fetchSectionAll(view.section, view.sectionIdx || 0);
          setListItems(dedupeMovies(items));
          setListHasMore(false);
          return;
        }
        if (view.kind === 'genre' && view.id != null) {
          const items = await fetchByGenre(view.id, page);
          setListItems((prev) => dedupeMovies(append ? [...prev, ...items] : items));
          setListPage(page);
          setListHasMore(items.length >= 12);
          return;
        }
        if (view.kind === 'country' && view.id != null) {
          const items = await fetchByCountry(view.id, page);
          setListItems((prev) => dedupeMovies(append ? [...prev, ...items] : items));
          setListPage(page);
          setListHasMore(items.length >= 12);
          return;
        }
        if (view.kind === 'star' && view.id != null) {
          const items = await fetchByStar(view.id, view.title, homeData.movies || []);
          setListItems(dedupeMovies(items));
          setListHasMore(false);
          return;
        }
        if (view.kind === 'search' && view.query) {
          const items = await searchByTitle(view.query);
          setListItems(dedupeMovies(items));
          setListHasMore(false);
          return;
        }
      } finally {
        setListLoading(false);
      }
    },
    [homeData.movies, homeData.stars]
  );

  const openListView = (view: ListViewState) => {
    setSelectedMovie(null);
    setShowDownloads(false);
    setListView(view);
    setListItems([]);
    setListStars(view.kind === 'all-stars' ? homeData.stars || [] : []);
    setListPage(1);
    setListHasMore(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    loadListViewData(view, 1, false);
  };

  // Debounced live search
  useEffect(() => {
    const q = searchQuery.trim();
    if (!q) {
      if (listView?.kind === 'search') {
        setListView(null);
      }
      return;
    }
    const tm = setTimeout(() => {
      openListView({
        kind: 'search',
        query: q,
        title: `نتایج جستجو: «${q}»`,
      });
    }, 500);
    return () => clearTimeout(tm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // Reset auto-pagination counter when changing view/tab
  useEffect(() => {
    autoPageCountRef.current = 0;
  }, [activeTab, listView]);

  // Infinite scroll helper via IntersectionObserver
  useEffect(() => {
    const btn = loadMoreBtnRef.current;
    if (!btn || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && autoPageCountRef.current < 4 && !btn.disabled) {
          autoPageCountRef.current++;
          btn.click();
        }
      },
      { rootMargin: '600px 0px' }
    );
    io.observe(btn);
    return () => io.disconnect();
  }, [activeTab, listView, listHasMore, moviesHasMore, seriesHasMore, listLoading, moviesLoading, seriesLoading]);

  // Back button / popstate coordination
  const handleBack = useCallback((): boolean => {
    if (exitOpen) {
      setExitOpen(false);
      return true;
    }
    if (diagOpen) {
      setDiagOpen(false);
      return true;
    }
    if (themePageOpen) {
      setThemePageOpen(false);
      return true;
    }
    if (settingsOpen) {
      setSettingsOpen(false);
      return true;
    }
    if (chooseModalData) {
      setChooseModalData(null);
      return true;
    }
    if (smartSheetData) {
      setSmartSheetData(null);
      return true;
    }
    if (playerState) {
      setPlayerState(null);
      setResumeTick((t) => t + 1);
      return true;
    }
    if (selectedMovie) {
      setSelectedMovie(null);
      return true;
    }
    if (showDownloads) {
      setShowDownloads(false);
      return true;
    }
    if (listView) {
      setListView(null);
      if (listView.kind === 'search') setSearchQuery('');
      return true;
    }
    if (activeTab !== 'home') {
      setActiveTab('home');
      return true;
    }
    setExitOpen(true);
    return true;
  }, [
    exitOpen,
    diagOpen,
    themePageOpen,
    settingsOpen,
    chooseModalData,
    smartSheetData,
    playerState,
    selectedMovie,
    showDownloads,
    listView,
    activeTab,
  ]);

  const handleBackRef = useRef(handleBack);
  handleBackRef.current = handleBack;

  useEffect(() => {
    window.__tmBack = () => handleBackRef.current();
    const handlePop = () => {
      handleBackRef.current();
    };
    window.addEventListener('popstate', handlePop);
    return () => {
      delete window.__tmBack;
      window.removeEventListener('popstate', handlePop);
    };
  }, []);

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    if (!window.AndroidPlayer) {
      window.history.pushState({ tm: 'details' }, '');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInAppPlayer = (opts: {
    url: string;
    title: string;
    movie?: Movie;
    sources: SourceLink[];
    subtitles: Array<{ url: string; label: string }>;
    quality: string;
    sIdx?: number;
    eIdx?: number;
    epTitle?: string;
    seasons?: Season[];
    initialPositionSec?: number;
  }) => {
    const cleanUrl = cleanStreamUrl(opts.url);
    if (opts.movie) {
      const mId = getMovieId(opts.movie);
      addToWatchHistory(opts.movie, opts.quality);
      if (opts.sIdx != null && opts.eIdx != null) {
        markEpisodeWatched(mId, opts.sIdx, opts.eIdx, opts.quality);
      } else {
        markMovieWatched(mId, opts.quality);
      }
      refreshUserCounts();
    }

    const meta = opts.movie
      ? buildNativeMeta(opts.movie, {
          sIdx: opts.sIdx,
          eIdx: opts.eIdx,
          epTitle: opts.epTitle,
          seasons: opts.seasons,
        })
      : '{}';

    if (window.AndroidPlayer?.playNativeEx) {
      window.AndroidPlayer.playNativeEx(cleanUrl, opts.title, meta);
      return;
    }
    if (window.AndroidPlayer?.playNative) {
      window.AndroidPlayer.playNative(cleanUrl, opts.title);
      return;
    }

    const mId = opts.movie ? String(getMovieId(opts.movie)) : 'video';
    const progKey =
      opts.sIdx != null && opts.eIdx != null
        ? `${mId}_s${opts.sIdx}_e${opts.eIdx}`
        : `${mId}_movie`;

    setPlayerState({
      url: cleanUrl,
      title: opts.title,
      movie: opts.movie,
      sources: opts.sources,
      subtitles: opts.subtitles,
      progressKey: progKey,
      progressMeta: meta,
      initialPositionSec: opts.initialPositionSec || 0,
    });
  };

  const handleDownloadSource = (
    url: string,
    title: string,
    quality: string,
    movie: Movie
  ) => {
    const cleanUrl = cleanStreamUrl(url);
    const type = getMovieType(movie);
    const dmId = Date.now() + Math.floor(Math.random() * 1000);

    if (window.AndroidPlayer?.startDownload) {
      const payload = JSON.stringify({
        url: cleanUrl,
        title,
        quality,
        type,
      });
      const nativeId = window.AndroidPlayer.startDownload(payload);
      if (typeof nativeId === 'number' && nativeId <= 0) {
        addToast('شروع دانلود ناموفق بود', 'error');
        return;
      }
      addDownloadRecord({
        dmId: nativeId || dmId,
        url: cleanUrl,
        title,
        label: title,
        quality,
        type,
        fileName: `${title}.${quality}`,
        folder: 'Download/TOOSH',
        createdAt: Date.now(),
        status: 'running',
        percent: 0,
      });
      refreshUserCounts();
      addToast('به صف دانلود اضافه شد');
      return;
    }

    // Browser download trigger + history record
    addDownloadRecord({
      dmId,
      url: cleanUrl,
      title,
      label: title,
      quality,
      type,
      fileName: `${title} (${quality})`,
      folder: 'مرورگر (Downloads)',
      createdAt: Date.now(),
      status: 'successful',
      percent: 100,
    });
    refreshUserCounts();

    const a = document.createElement('a');
    a.href = cleanUrl;
    a.download = `${title}-${quality}`;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    a.remove();
    addToast('دانلود در مرورگر آغاز شد');
  };

  const handleResumeProgress = async (item: ProgressItem) => {
    if (window.AndroidPlayer?.playNativeEx) {
      window.AndroidPlayer.playNativeEx(item.url, item.title, item.meta || '{}');
      return;
    }
    let parsedMeta: { id?: string; title?: string } = {};
    try {
      parsedMeta = JSON.parse(item.meta || '{}');
    } catch {
      // ignore
    }
    let movie: Movie | undefined;
    if (parsedMeta.id) {
      const det = await fetchMovieDetails(parsedMeta.id);
      if (det) movie = det;
    }
    const srcs = movie ? sortSources(extractSources(movie.sources)) : [];
    setPlayerState({
      url: item.url,
      title: parsedMeta.title || item.title,
      movie,
      sources: srcs,
      subtitles: [],
      progressKey: item.k,
      progressMeta: item.meta || '{}',
      initialPositionSec: item.pos > 0 ? item.pos / 1000 : 0,
    });
  };

  const dockActiveIdx = useMemo(() => {
    const idx = DOCK_TABS.findIndex((t) => t.id === activeTab);
    if (idx >= 0) return idx;
    if (activeTab === 'history' || activeTab === 'likes') return 4;
    return 0;
  }, [activeTab]);

  const sections = homeData.movies || [];
  const countries = homeData.countries || [];
  const genres = homeData.genres || [];
  const stars = homeData.stars || [];

  const selectTab = (tab: TabId) => {
    setSelectedMovie(null);
    setListView(null);
    setShowDownloads(false);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}
    >
      <SplashOverlay
        visible={splashVisible}
        error={splashError}
        onRetry={loadHome}
        onOpenDiag={() => setDiagOpen(true)}
      />

      {/* Header */}
      <header
        className="sticky top-0 z-40 h-16 px-3 sm:px-5 flex items-center justify-between gap-2.5"
        style={{ backgroundColor: 'var(--header-bg)' }}
      >
        <button
          type="button"
          onClick={() => {
            setSearchQuery('');
            selectTab('home');
          }}
          className="flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span
            className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-sm tracking-tight"
            style={{
              backgroundColor: 'var(--primary)',
              border: '2px solid var(--ink)',
              boxShadow: '2px 2px 0 var(--ink)',
              fontFamily: 'var(--font-display)',
            }}
          >
            TM
          </span>
          <span className="hidden sm:inline-block font-extrabold tracking-wide text-lg">
            TOOSH MOVIE
          </span>
        </button>

        {/* Search bar */}
        <div className="flex-1 max-w-md relative">
          <Search
            className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--secondary)' }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجوی فیلم، سریال، بازیگر..."
            className="w-full h-10 pr-9 pl-8 rounded-2xl text-xs sm:text-sm font-bold outline-none transition-colors"
            style={{
              backgroundColor: 'var(--surface)',
              color: 'var(--text)',
              border: '2px solid var(--ink)',
            }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                if (listView?.kind === 'search') setListView(null);
              }}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: 'var(--surface-2)', color: 'var(--text)' }}
              aria-label="پاک کردن جستجو"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Theme Toggle + Settings */}
        <div className="flex items-center shrink-0">
          <DayNightButton onThemeChange={(id) => setThemeId(id)} />
          <button
            type="button"
            className="tm-set-btn"
            aria-label="تنظیمات"
            onClick={() => setSettingsOpen(true)}
          >
            <span className="tm-ic tm-ic-gear" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-3 sm:px-5 pt-4">
        <div
          key={`${selectedMovie ? 'det' : showDownloads ? 'dl' : listView ? listView.kind : activeTab}`}
          className="tm-page"
        >
          {/* Movie Details */}
          {selectedMovie ? (
            <MovieDetails
              movie={selectedMovie}
              onBack={handleBack}
              onOpenSmartSheet={(movie, sources, seasons) =>
                setSmartSheetData({ movie, sources, seasons })
              }
              onPlaySource={(url, title, sources, subtitles, ctx) =>
                setChooseModalData({
                  url,
                  title,
                  movie: ctx?.movie || selectedMovie,
                  sources,
                  subtitles,
                  quality: ctx?.quality || 'خودکار',
                  sIdx: ctx?.sIdx,
                  eIdx: ctx?.eIdx,
                  epTitle: ctx?.epTitle,
                  seasons: ctx?.seasons,
                })
              }
              onDownloadSource={handleDownloadSource}
              onLikesChanged={refreshUserCounts}
              onSavedChanged={refreshUserCounts}
              onToast={addToast}
            />
          ) : showDownloads ? (
            <DownloadManager
              onBack={handleBack}
              onSelectMovie={handleSelectMovie}
              onSavedChanged={refreshUserCounts}
              onToast={addToast}
            />
          ) : listView ? (
            /* List / Filter / Search Page */
            <div className="pb-12">
              <div
                className="mb-5 p-3 rounded-2xl border flex items-center justify-between gap-3"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 cursor-pointer"
                  style={{
                    backgroundColor: 'var(--surface-2)',
                    border: '2px solid var(--ink)',
                    color: 'var(--text)',
                  }}
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
                <h2 className="text-base sm:text-lg font-black truncate">{listView.title}</h2>
                <span className="px-2.5 py-1 text-xs font-black tabular-nums shrink-0">
                  {listView.kind === 'countries'
                    ? `${toPersianDigits(countries.length)} کشور`
                    : listView.kind === 'all-stars'
                    ? `${toPersianDigits(listStars.length)} هنرمند`
                    : `${toPersianDigits(listItems.length)} عنوان`}
                </span>
              </div>

              {listView.kind === 'countries' ? (
                <div className="tm-cats-grid">
                  {countries.map((c: Country, i: number) => {
                    const name = cleanTitle(c.name || c.title || '');
                    const img = resolveMediaUrl(c.image);
                    return (
                      <button
                        key={`${c.id || i}`}
                        type="button"
                        className="tm-cat"
                        style={{ '--i': i, '--c': 'var(--primary)' } as React.CSSProperties}
                        onClick={() =>
                          openListView({
                            kind: 'country',
                            id: c.id,
                            title: `محصولات ${name}`,
                          })
                        }
                      >
                        <span className="tm-cat-b" />
                        {img && (
                          <img
                            src={img}
                            alt={name}
                            className="w-8 h-8 rounded-full object-cover border border-[var(--ink)]"
                          />
                        )}
                        <span className="tm-cat-t">{name}</span>
                        <span className="tm-ic tm-ic-chev" />
                      </button>
                    );
                  })}
                </div>
              ) : listView.kind === 'all-stars' ? (
                <>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {listStars.map((st, idx) => {
                      const sName = cleanTitle(st.name || st.title || '');
                      const sImg = resolveMediaUrl(st.image);
                      const sId = getMovieId(st);
                      return (
                        <button
                          key={`${sId || idx}`}
                          type="button"
                          onClick={() =>
                            openListView({
                              kind: 'star',
                              id: sId,
                              title: `آثار ${sName}`,
                            })
                          }
                          className="p-3 rounded-2xl flex flex-col items-center gap-2 text-center cursor-pointer"
                          style={{ backgroundColor: 'var(--surface)' }}
                        >
                          <div className="tm-cc-a" style={{ width: '68px', height: '68px' }}>
                            {sImg ? (
                              <img src={sImg} alt={sName} loading="lazy" />
                            ) : (
                              <span className="tm-ic tm-ic-user" />
                            )}
                          </div>
                          <span className="text-xs font-black line-clamp-2">{sName}</span>
                        </button>
                      );
                    })}
                  </div>
                  {listHasMore && (
                    <div className="mt-6 flex justify-center">
                      <button
                        ref={loadMoreBtnRef}
                        type="button"
                        disabled={listLoading}
                        onClick={() => loadListViewData(listView, listPage + 1, true)}
                        className="px-7 py-3 rounded-2xl font-black text-sm text-white cursor-pointer"
                        style={{ backgroundColor: 'var(--primary)' }}
                      >
                        {listLoading ? 'در حال بارگذاری...' : 'نمایش هنرمندان بیشتر'}
                      </button>
                    </div>
                  )}
                </>
              ) : listLoading && listItems.length === 0 ? (
                <SkeletonGrid count={12} />
              ) : listItems.length === 0 ? (
                <div className="tm-empty">موردی یافت نشد</div>
              ) : (
                <>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {listItems.map((m) => (
                      <MovieCard
                        key={String(getMovieId(m))}
                        movie={m}
                        onClick={handleSelectMovie}
                      />
                    ))}
                  </div>
                  {listHasMore && (
                    <div className="mt-6 flex justify-center">
                      <button
                        ref={loadMoreBtnRef}
                        type="button"
                        disabled={listLoading}
                        onClick={() => loadListViewData(listView, listPage + 1, true)}
                        className="px-7 py-3 rounded-2xl font-black text-sm text-white cursor-pointer"
                        style={{ backgroundColor: 'var(--primary)' }}
                      >
                        {listLoading ? 'در حال بارگذاری...' : 'نمایش فیلم و سریال‌های بیشتر'}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : activeTab === 'home' ? (
            /* Home View */
            <div className="space-y-6 pb-8">
              <ContinueWatching
                refreshTick={resumeTick}
                onResume={handleResumeProgress}
              />

              {/* Telegram Banner */}
              <button
                type="button"
                onClick={openTelegramChannel}
                className="w-full p-3.5 rounded-2xl border flex items-center justify-between gap-3 text-right cursor-pointer"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 border-2"
                    style={{ backgroundColor: '#0088cc', borderColor: 'var(--ink)' }}
                  >
                    <Send className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-black truncate">
                      کانال تلگرام توش مووی
                    </h3>
                    <p className="text-[11px] font-bold truncate" style={{ color: 'var(--secondary)' }}>
                      اطلاع‌رسانی جدیدترین فیلم‌ها، سریال‌ها و بروزرسانی‌ها (@TOOSH_MOVIE)
                    </p>
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 shrink-0" />
              </button>

              {sections.length === 0 && !splashVisible ? (
                <OfflineBanner onRetry={loadHome} />
              ) : (
                sections.map((sec, idx) => {
                  const secTitle = cleanTitle(sec.title || sec.name || `بخش ${idx + 1}`);
                  const items = sec.items || [];
                  if (!items.length) return null;
                  return (
                    <section key={`${sec.id || idx}`}>
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-base font-black">{secTitle}</h2>
                        <button
                          type="button"
                          onClick={() =>
                            openListView({
                              kind: 'section',
                              id: sec.id,
                              title: secTitle,
                              section: sec,
                              sectionIdx: idx,
                            })
                          }
                          className="text-xs font-bold flex items-center gap-0.5 cursor-pointer"
                          style={{ color: 'var(--primary-bright)' }}
                        >
                          <span>مشاهده همه</span>
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                        {items.slice(0, 18).map((m) => (
                          <div key={String(getMovieId(m))} className="w-32 sm:w-36 shrink-0">
                            <MovieCard movie={m} onClick={handleSelectMovie} />
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                })
              )}
            </div>
          ) : activeTab === 'movies' ? (
            /* Movies Catalog */
            <div className="pb-12">
              <div
                className="mb-5 p-3 rounded-2xl border flex items-center justify-between gap-3"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <h2>فیلم‌های سینمایی</h2>
                <span className="px-2.5 py-1 text-xs font-black tabular-nums">
                  {toPersianDigits(moviesList.length)} فیلم
                </span>
              </div>
              {moviesLoading && moviesList.length === 0 ? (
                <SkeletonGrid count={12} />
              ) : (
                <>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {moviesList.map((m) => (
                      <MovieCard
                        key={String(getMovieId(m))}
                        movie={m}
                        onClick={handleSelectMovie}
                      />
                    ))}
                  </div>
                  {moviesHasMore && (
                    <div className="mt-6 flex justify-center">
                      <button
                        ref={loadMoreBtnRef}
                        type="button"
                        disabled={moviesLoading}
                        onClick={() => loadMoviesCatalog(moviesPage + 1, true)}
                        className="px-7 py-3 rounded-2xl font-black text-sm text-white cursor-pointer"
                        style={{ backgroundColor: 'var(--primary)' }}
                      >
                        {moviesLoading ? 'در حال بارگذاری...' : 'نمایش فیلم و سریال‌های بیشتر'}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : activeTab === 'series' ? (
            /* Series Catalog */
            <div className="pb-12">
              <div
                className="mb-5 p-3 rounded-2xl border flex items-center justify-between gap-3"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <h2>سریال‌ها</h2>
                <span className="px-2.5 py-1 text-xs font-black tabular-nums">
                  {toPersianDigits(seriesList.length)} سریال
                </span>
              </div>
              {seriesLoading && seriesList.length === 0 ? (
                <SkeletonGrid count={12} />
              ) : (
                <>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {seriesList.map((m) => (
                      <MovieCard
                        key={String(getMovieId(m))}
                        movie={m}
                        onClick={handleSelectMovie}
                      />
                    ))}
                  </div>
                  {seriesHasMore && (
                    <div className="mt-6 flex justify-center">
                      <button
                        ref={loadMoreBtnRef}
                        type="button"
                        disabled={seriesLoading}
                        onClick={() => loadSeriesCatalog(seriesPage + 1, true)}
                        className="px-7 py-3 rounded-2xl font-black text-sm text-white cursor-pointer"
                        style={{ backgroundColor: 'var(--primary)' }}
                      >
                        {seriesLoading ? 'در حال بارگذاری...' : 'نمایش فیلم و سریال‌های بیشتر'}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : activeTab === 'cats' ? (
            <CategoriesView
              countries={countries}
              genres={genres}
              stars={stars}
              onSelectGenre={(g: Genre) =>
                openListView({
                  kind: 'genre',
                  id: g.id,
                  title: cleanTitle(g.name || g.title || 'ژانر'),
                })
              }
              onSelectCountry={(c: Country) =>
                openListView({
                  kind: 'country',
                  id: c.id,
                  title: `محصولات ${cleanTitle(c.name || c.title || '')}`,
                })
              }
              onSelectStar={(st: Star) =>
                openListView({
                  kind: 'star',
                  id: getMovieId(st),
                  title: `آثار ${cleanTitle(st.name || st.title || '')}`,
                })
              }
              onOpenAllCountries={() =>
                openListView({ kind: 'countries', title: 'همه کشورها' })
              }
              onOpenAllStars={() =>
                openListView({ kind: 'all-stars', title: 'ستاره‌ها و هنرمندان' })
              }
            />
          ) : activeTab === 'history' ? (
            <div className="pb-12">
              <div
                className="mb-5 p-3 rounded-2xl border flex items-center justify-between gap-3"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('me')}
                    className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
                    style={{
                      backgroundColor: 'var(--surface-2)',
                      border: '2px solid var(--ink)',
                    }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <h2>تاریخچه تماشا</h2>
                </div>
                {historyList.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      clearWatchHistory();
                      refreshUserCounts();
                      addToast('تاریخچه پاک شد');
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 cursor-pointer"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: '#fff',
                      border: '2px solid var(--ink)',
                    }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>پاک کردن</span>
                  </button>
                )}
              </div>
              {historyList.length === 0 ? (
                <div className="tm-empty">هنوز فیلم یا سریالی تماشا نکرده‌اید</div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {historyList.map((m) => (
                    <MovieCard
                      key={String(getMovieId(m))}
                      movie={m}
                      onClick={handleSelectMovie}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : activeTab === 'likes' ? (
            <div className="pb-12">
              <div
                className="mb-5 p-3 rounded-2xl border flex items-center justify-between gap-3"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('me')}
                    className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
                    style={{
                      backgroundColor: 'var(--surface-2)',
                      border: '2px solid var(--ink)',
                    }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <h2>علاقه‌مندی‌ها</h2>
                </div>
                <span className="px-2.5 py-1 text-xs font-black tabular-nums">
                  {toPersianDigits(likesList.length)} مورد
                </span>
              </div>
              {likesList.length === 0 ? (
                <div className="tm-empty">لیست علاقه‌مندی‌ها خالی است</div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {likesList.map((m) => (
                    <MovieCard
                      key={String(getMovieId(m))}
                      movie={m}
                      onClick={handleSelectMovie}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <ProfileView
              profile={profile}
              onProfileChange={setProfile}
              historyCount={historyList.length}
              likesCount={likesList.length}
              savedCount={savedCount}
              downloadsCount={downloadsCount}
              onOpenDownloads={() => setShowDownloads(true)}
              onOpenHistory={() => setActiveTab('history')}
              onOpenLikes={() => setActiveTab('likes')}
              onOpenThemes={() => setThemePageOpen(true)}
              onOpenSettings={() => setSettingsOpen(true)}
              onToast={addToast}
              appVersion={APP_VERSION}
            />
          )}
        </div>
      </main>

      {/* Bottom Floating Navigation Dock */}
      {!playerState && !selectedMovie && !showDownloads && (
        <nav className="sticky top-16">
          <div>
            <div
              className="tm-dock"
              style={{ '--tm-i': dockActiveIdx } as React.CSSProperties}
            >
              {DOCK_TABS.map((t) => {
                const isActive =
                  activeTab === t.id ||
                  (t.id === 'me' && (activeTab === 'history' || activeTab === 'likes'));
                return (
                  <button
                    key={t.id}
                    type="button"
                    data-active={isActive ? 'true' : 'false'}
                    onClick={() => selectTab(t.id)}
                  >
                    <span className={`tm-ic ${t.icon}`} />
                    <span className="tm-tab-l">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      )}

      {/* Smart Play Sheet */}
      {smartSheetData && (
        <SmartPlaySheet
          movie={smartSheetData.movie}
          initialSources={smartSheetData.sources}
          initialSeasons={smartSheetData.seasons}
          onClose={() => setSmartSheetData(null)}
          onPlay={(src, opts) => {
            const m = smartSheetData.movie;
            const mTitle = getMovieTitle(m);
            const fullTitle = opts?.epTitle ? `${mTitle} - ${opts.epTitle}` : mTitle;
            setSmartSheetData(null);
            setChooseModalData({
              url: src.url,
              title: fullTitle,
              movie: m,
              sources: opts?.epSources?.length ? opts.epSources : smartSheetData.sources,
              subtitles: opts?.subtitles || [],
              quality: src.quality,
              sIdx: opts?.sIdx,
              eIdx: opts?.eIdx,
              epTitle: opts?.epTitle,
              seasons: opts?.seasons,
            });
          }}
          onShowAllQualities={() => {
            const box = document.getElementById('tm-dlbox');
            box?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        />
      )}

      {/* Choose Player / Download Modal */}
      {chooseModalData && (
        <ChoosePlayerModal
          url={chooseModalData.url}
          title={chooseModalData.title}
          onClose={() => setChooseModalData(null)}
          onPlayInApp={(u) =>
            handleOpenInAppPlayer({
              ...chooseModalData,
              url: u,
            })
          }
          onDownload={(u) => {
            if (chooseModalData.movie) {
              handleDownloadSource(
                u,
                chooseModalData.title,
                chooseModalData.quality,
                chooseModalData.movie
              );
            } else {
              const a = document.createElement('a');
              a.href = u;
              a.download = chooseModalData.title;
              a.target = '_blank';
              a.rel = 'noopener noreferrer';
              document.body.appendChild(a);
              a.click();
              a.remove();
            }
          }}
          onToast={addToast}
        />
      )}

      {/* In-App Video Player */}
      {playerState && (
        <VideoPlayer
          url={playerState.url}
          title={playerState.title}
          movie={playerState.movie}
          sources={playerState.sources}
          subtitleUrls={playerState.subtitles}
          progressKey={playerState.progressKey}
          progressMeta={playerState.progressMeta}
          initialPositionSec={playerState.initialPositionSec}
          onClose={() => {
            setPlayerState(null);
            setResumeTick((t) => t + 1);
          }}
          onSwitchSource={(src) => {
            setPlayerState((prev) =>
              prev
                ? {
                    ...prev,
                    url: cleanStreamUrl(src.url),
                    title: prev.movie
                      ? `${getMovieTitle(prev.movie)} (${src.quality})`
                      : prev.title,
                  }
                : null
            );
          }}
          onToast={addToast}
        />
      )}

      {/* Theme Page */}
      <ThemePage
        open={themePageOpen}
        currentTheme={themeId}
        onThemeChange={(id) => setThemeId(id)}
        onClose={() => setThemePageOpen(false)}
      />

      {/* Settings & Diagnostics */}
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        currentTheme={themeId}
        onThemeChange={(id) => setThemeId(id)}
        onOpenThemes={() => setThemePageOpen(true)}
        onHistoryCleared={refreshUserCounts}
        onToast={addToast}
        diagOpen={diagOpen}
        onOpenDiag={() => setDiagOpen(true)}
        onCloseDiag={() => setDiagOpen(false)}
        appVersion={APP_VERSION}
      />

      {/* Exit Dialog */}
      <ExitDialog
        open={exitOpen}
        onStay={() => setExitOpen(false)}
        onExit={() => {
          setExitOpen(false);
          if (window.AndroidPlayer?.exitApp) {
            window.AndroidPlayer.exitApp();
          } else {
            addToast('برای بستن، تب مرورگر را ببندید');
          }
        }}
      />

      {/* Toast Notifications */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[2147483001] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-center max-w-[86vw]"
            style={{
              backgroundColor: t.type === 'error' ? 'var(--primary)' : 'var(--surface-solid)',
              color: t.type === 'error' ? '#fff' : 'var(--text)',
              border: '2px solid var(--ink)',
              boxShadow: '3px 3px 0 var(--ink)',
            }}
          >
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}
