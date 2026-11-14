import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Captions,
  Check,
  Copy,
  Download,
  ExternalLink,
  Layers,
  Loader2,
  Maximize,
  Minimize,
  Pause,
  Play,
  RefreshCw,
  RotateCcw,
  RotateCw,
  Upload,
} from 'lucide-react';
import { Movie, SourceLink, SubtitleCue } from '../types/movie';
import {
  cleanStreamUrl,
  formatDuration,
  getFileExt,
  getMovieTitle,
  normalizeQualityLabel,
} from '../utils/media';
import { saveProgressItem } from '../utils/storage';
import {
  extractMkvSubtitles,
  MkvTrack,
  parseVttToCues,
  srtToVtt,
} from '../utils/subtitles';
import { copyTextToClipboard, openExternalVideoPlayer } from '../utils/themes';

interface VideoPlayerProps {
  url: string;
  title: string;
  movie?: Movie | null;
  sources?: SourceLink[];
  subtitleUrls?: Array<{ url: string; label: string }>;
  progressKey?: string;
  progressMeta?: string;
  initialPositionSec?: number;
  onClose: () => void;
  onSwitchSource?: (src: SourceLink) => void;
  onToast: (msg: string, type?: 'success' | 'error') => void;
}

const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5, 2];

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  title,
  movie,
  sources = [],
  subtitleUrls = [],
  progressKey,
  progressMeta = '{}',
  initialPositionSec = 0,
  onClose,
  onSwitchSource,
  onToast,
}) => {
  const cleanUrl = useMemo(() => cleanStreamUrl(url), [url]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const seekBarRef = useRef<HTMLDivElement | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [playing, setPlaying] = useState(false);
  const [buffering, setBuffering] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [retrySeed, setRetrySeed] = useState(0);

  // Seek hover/drag state
  const [isDragging, setIsDragging] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPct, setHoverPct] = useState(0);

  // Modals / Drawers inside player
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);

  // Subtitles state
  const [subEnabled, setSubEnabled] = useState(true);
  const [subTracks, setSubTracks] = useState<
    Array<{ id: string; label: string; cues: SubtitleCue[] }>
  >([]);
  const [activeSubId, setActiveSubId] = useState<string>('');
  const [subStatus, setSubStatus] = useState('');
  const [subOffset, setSubOffset] = useState(0);

  const resolvedTitle = title || (movie ? getMovieTitle(movie) : 'پخش ویدئو');
  const subtitleUrlsKey = useMemo(
    () => subtitleUrls.map((s) => `${s.url}|${s.label}`).join('\n'),
    [subtitleUrls]
  );
  const progressTitleRef = useRef(resolvedTitle);
  const progressMetaRef = useRef(progressMeta);
  progressTitleRef.current = resolvedTitle;
  progressMetaRef.current = progressMeta;

  const persistProgress = (posSec: number, durSec: number) => {
    if (!progressKey || !durSec || posSec < 2) return;
    saveProgressItem({
      k: progressKey,
      url: cleanUrl,
      title: progressTitleRef.current,
      pos: Math.floor(posSec * 1000),
      dur: Math.floor(durSec * 1000),
      ts: Date.now(),
      meta: progressMetaRef.current,
    });
    window.dispatchEvent(new CustomEvent('tm-progress-update'));
  };

  useEffect(() => {
    window.AndroidPlayer?.setFullscreen?.(true);
    return () => {
      window.AndroidPlayer?.setFullscreen?.(false);
    };
  }, []);

  // Reset subtitle tracks only when switching video URL
  useEffect(() => {
    setSubTracks([]);
    setActiveSubId('');
    setSubStatus('');
  }, [cleanUrl]);

  // Load external subtitle URLs + MKV embedded subtitles
  useEffect(() => {
    let active = true;
    const ac = new AbortController();

    const loadExternalSubs = async () => {
      for (let i = 0; i < subtitleUrls.length; i++) {
        const sub = subtitleUrls[i];
        try {
          const r = await fetch(sub.url, { signal: ac.signal });
          if (!r.ok) continue;
          const text = await r.text();
          const vtt = srtToVtt(text);
          const cues = parseVttToCues(vtt);
          if (cues.length && active) {
            const id = `ext_${i}`;
            setSubTracks((prev) => {
              if (prev.some((t) => t.id === id)) return prev;
              return [...prev, { id, label: sub.label || `زیرنویس ${i + 1}`, cues }];
            });
            setActiveSubId((prev) => prev || id);
          }
        } catch {
          // ignore CORS/fetch errors for subtitle urls
        }
      }
    };

    const loadMkvSubs = async () => {
      if (getFileExt(cleanUrl) !== 'mkv') return;
      setSubStatus('در حال بررسی زیرنویس داخلی MKV...');
      try {
        const res = await extractMkvSubtitles(
          cleanUrl,
          (status, tracks, cuesMap) => {
            if (!active) return;
            setSubStatus(status);
            updateMkvTracks(tracks, cuesMap);
          },
          ac.signal
        );
        if (!active) return;
        if (res.error) {
          setSubStatus(res.error);
        } else if (res.tracks.length) {
          updateMkvTracks(res.tracks, res.cues);
          setSubStatus('');
        }
      } catch {
        if (active) setSubStatus('');
      }
    };

    const updateMkvTracks = (tracks: MkvTrack[], cuesMap: Record<number, SubtitleCue[]>) => {
      const next = tracks.map((t) => ({
        id: `mkv_${t.num}`,
        label: t.name || t.lang || `زیرنویس #${t.num}`,
        cues: cuesMap[t.num] || [],
      }));
      setSubTracks((prev) => {
        const ext = prev.filter((p) => !p.id.startsWith('mkv_'));
        return [...ext, ...next];
      });
      const fa = next.find((t) => /fa|per|farsi|persian|فارسی/i.test(t.label)) || next[0];
      if (fa) setActiveSubId((prev) => prev || fa.id);
    };

    // Bridge for native Android subtitle extractor if called
    window.__onNativeSubtitles = (jsonStr: string) => {
      try {
        const parsed = JSON.parse(jsonStr);
        if (Array.isArray(parsed?.cues)) {
          setSubTracks((prev) => [
            ...prev.filter((p) => p.id !== 'native_0'),
            { id: 'native_0', label: parsed.label || 'زیرنویس داخلی', cues: parsed.cues },
          ]);
          setActiveSubId((prev) => prev || 'native_0');
        }
      } catch {
        // ignore
      }
    };

    loadExternalSubs();
    loadMkvSubs();

    return () => {
      active = false;
      ac.abort();
      delete window.__onNativeSubtitles;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cleanUrl, subtitleUrlsKey]);

  // Auto-hide controls while playing
  const scheduleHideControls = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    setShowControls(true);
    hideTimerRef.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused && !showQualityMenu && !showSubMenu) {
        setShowControls(false);
      }
    }, 3600);
  };

  useEffect(() => {
    scheduleHideControls();
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, showQualityMenu, showSubMenu]);

  // Progress save interval
  useEffect(() => {
    const iv = setInterval(() => {
      const v = videoRef.current;
      if (v && !v.paused && v.duration > 0) {
        persistProgress(v.currentTime, v.duration);
      }
    }, 5000);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cleanUrl, progressKey]);

  const togglePlayPause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
    } else {
      v.pause();
      if (v.duration > 0) persistProgress(v.currentTime, v.duration);
    }
    scheduleHideControls();
  };

  const skipSeconds = (delta: number) => {
    const v = videoRef.current;
    if (!v) return;
    const next = Math.max(0, Math.min(v.duration || 0, v.currentTime + delta));
    v.currentTime = next;
    setCurrentTime(next);
    scheduleHideControls();
  };

  const cycleSpeed = () => {
    const idx = SPEED_OPTIONS.indexOf(playbackRate);
    const next = SPEED_OPTIONS[(idx + 1) % SPEED_OPTIONS.length];
    setPlaybackRate(next);
    if (videoRef.current) videoRef.current.playbackRate = next;
    scheduleHideControls();
  };

  const toggleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      // fallback if fullscreen API blocked
      setIsFullscreen((prev) => !prev);
    }
  };

  const computeSeekFromClientX = (clientX: number) => {
    const bar = seekBarRef.current;
    if (!bar || !duration) return null;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return { ratio, sec: ratio * duration };
  };

  const handleSeekPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    const res = computeSeekFromClientX(e.clientX);
    if (res) {
      setHoverTime(res.sec);
      setHoverPct(res.ratio * 100);
      setCurrentTime(res.sec);
      if (videoRef.current) videoRef.current.currentTime = res.sec;
    }
  };

  const handleSeekPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const res = computeSeekFromClientX(e.clientX);
    if (!res) return;
    setHoverTime(res.sec);
    setHoverPct(res.ratio * 100);
    if (isDragging) {
      setCurrentTime(res.sec);
      if (videoRef.current) videoRef.current.currentTime = res.sec;
    }
  };

  const handleSeekPointerUp = () => {
    setIsDragging(false);
    setHoverTime(null);
    scheduleHideControls();
  };

  const handleLocalSubtitleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const vtt = srtToVtt(text);
      const cues = parseVttToCues(vtt);
      if (!cues.length) {
        onToast('فایل زیرنویس معتبر نبود', 'error');
        return;
      }
      const id = `local_${Date.now()}`;
      setSubTracks((prev) => [...prev, { id, label: file.name, cues }]);
      setActiveSubId(id);
      setSubEnabled(true);
      onToast('زیرنویس با موفقیت اضافه شد');
    } catch {
      onToast('خطا در خواندن فایل زیرنویس', 'error');
    }
    e.target.value = '';
  };

  const activeTrack = subTracks.find((t) => t.id === activeSubId);
  const currentCueText = useMemo(() => {
    if (!subEnabled || !activeTrack) return '';
    const adj = currentTime - subOffset;
    const hit = activeTrack.cues.find((c) => adj >= c.start && adj <= c.end);
    return hit ? hit.text : '';
  }, [subEnabled, activeTrack, currentTime, subOffset]);

  const pct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black text-white flex flex-col select-none overflow-hidden"
      onClick={() => {
        if (!showQualityMenu && !showSubMenu) {
          setShowControls((prev) => !prev);
        }
      }}
    >
      {/* Top Bar */}
      <div
        className={`relative z-20 flex items-center justify-between gap-2 px-3 py-2.5 transition-opacity duration-200 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={() => {
              const v = videoRef.current;
              if (v && v.duration > 0) persistProgress(v.currentTime, v.duration);
              onClose();
            }}
            className="w-10 h-10 flex items-center justify-center bg-white/10 text-white cursor-pointer"
            aria-label="بازگشت"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h3 className="text-sm font-bold truncate">{resolvedTitle}</h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {sources.length > 1 && onSwitchSource && (
            <button
              type="button"
              onClick={() => {
                setShowSubMenu(false);
                setShowQualityMenu((v) => !v);
              }}
              className="px-2.5 h-9 flex items-center gap-1.5 text-xs font-bold bg-white/10 cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>کیفیت</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setShowQualityMenu(false);
              setShowSubMenu((v) => !v);
            }}
            className="px-2.5 h-9 flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            style={
              subEnabled && activeTrack
                ? { backgroundColor: 'var(--primary)', color: '#fff' }
                : undefined
            }
          >
            <Captions className="w-4 h-4" />
            <span>CC</span>
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="w-9 h-9 flex items-center justify-center bg-white/10 cursor-pointer"
            aria-label="تمام‌صفحه"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Video Surface */}
      <div className="relative flex-1 flex items-center justify-center bg-black overflow-hidden">
        <video
          key={`${cleanUrl}_${retrySeed}`}
          ref={videoRef}
          src={cleanUrl}
          playsInline
          autoPlay
          preload="metadata"
          className="w-full h-full object-contain"
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            setDuration(v.duration || 0);
            if (initialPositionSec > 2 && initialPositionSec < (v.duration || Infinity) - 5) {
              v.currentTime = initialPositionSec;
              setCurrentTime(initialPositionSec);
            }
            v.playbackRate = playbackRate;
            setBuffering(false);
            setErrorMsg('');
          }}
          onTimeUpdate={(e) => {
            if (!isDragging) {
              setCurrentTime(e.currentTarget.currentTime);
            }
          }}
          onPlay={() => {
            setPlaying(true);
            setBuffering(false);
          }}
          onPause={() => setPlaying(false)}
          onWaiting={() => setBuffering(true)}
          onCanPlay={() => setBuffering(false)}
          onSeeked={() => setBuffering(false)}
          onPlaying={() => {
            setBuffering(false);
            setPlaying(true);
          }}
          onEnded={() => {
            setPlaying(false);
            setBuffering(false);
            setShowControls(true);
          }}
          onError={() => {
            setBuffering(false);
            setPlaying(false);
            setErrorMsg(
              getFileExt(cleanUrl) === 'mkv'
                ? 'مرورگر از کدک صوتی/تصویری این فایل MKV پشتیبانی نمی‌کند یا دسترسی مستقیم محدود است.'
                : 'پخش مستقیم این لینک با خطا مواجه شد.'
            );
          }}
        />

        {/* Subtitle Overlay */}
        {currentCueText && (
          <div className="pointer-events-none absolute inset-x-4 bottom-24 z-10 flex justify-center text-center">
            <div className="px-3.5 py-1.5 rounded-lg bg-black/80 text-white text-sm sm:text-base font-bold leading-relaxed whitespace-pre-line border border-white/20 shadow-lg max-w-2xl">
              {currentCueText}
            </div>
          </div>
        )}

        {/* Buffering / Center Play Controls */}
        {!errorMsg && (buffering || showControls) && (
          <div
            className="absolute inset-0 flex items-center justify-center gap-6 pointer-events-none"
          >
            {showControls && !buffering && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  skipSeconds(-10);
                }}
                className="pointer-events-auto w-12 h-12 flex flex-col items-center justify-center bg-black/60 text-white cursor-pointer"
                aria-label="۱۰ ثانیه عقب"
              >
                <RotateCcw className="w-5 h-5" />
                <span className="text-[9px] font-black">10-</span>
              </button>
            )}

            {buffering ? (
              <div className="w-16 h-16 rounded-2xl bg-black/75 border-2 border-white/40 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
              </div>
            ) : (
              showControls && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlayPause();
                  }}
                  className="pointer-events-auto w-20 h-20 rounded-full flex items-center justify-center text-white cursor-pointer"
                  aria-label={playing ? 'توقف' : 'پخش'}
                >
                  {playing ? (
                    <Pause className="w-9 h-9 fill-white" />
                  ) : (
                    <Play className="w-9 h-9 fill-white ml-1" />
                  )}
                </button>
              )
            )}

            {showControls && !buffering && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  skipSeconds(10);
                }}
                className="pointer-events-auto w-12 h-12 flex flex-col items-center justify-center bg-black/60 text-white cursor-pointer"
                aria-label="۱۰ ثانیه جلو"
              >
                <RotateCw className="w-5 h-5" />
                <span className="text-[9px] font-black">10+</span>
              </button>
            )}
          </div>
        )}

        {/* Playback Error Recovery Card */}
        {errorMsg && (
          <div
            className="absolute inset-0 z-30 bg-black/90 flex items-center justify-center p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-md rounded-2xl p-5 bg-[#1b1814] border-2 border-[#f6efdc] text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h4 className="text-base font-black text-[#f6efdc]">خطا در پخش درون‌برنامه</h4>
              <p className="text-xs leading-6 text-[#eadfc6]">{errorMsg}</p>
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg('');
                    setBuffering(true);
                    setRetrySeed((s) => s + 1);
                  }}
                  className="py-2.5 px-3 bg-white/10 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>تلاش مجدد</span>
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    const ok = await copyTextToClipboard(cleanUrl);
                    onToast(ok ? 'لینک کپی شد' : 'کپی ناموفق', ok ? 'success' : 'error');
                  }}
                  className="py-2.5 px-3 bg-white/10 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  <span>کپی لینک</span>
                </button>
                <a
                  href={cleanUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-lg border-2 border-[#f6efdc] bg-amber-400 text-black text-xs font-black flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>دانلود مستقیم</span>
                </a>
                <button
                  type="button"
                  onClick={() => openExternalVideoPlayer(cleanUrl, 'org.videolan.vlc', onToast)}
                  className="py-2.5 px-3 bg-white/10 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>پخش در VLC</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quality Switcher Drawer */}
        {showQualityMenu && onSwitchSource && (
          <div
            className="absolute inset-x-0 bottom-0 z-30 max-h-[65%] overflow-y-auto p-4 space-y-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-base font-black">تغییر کیفیت پخش</h4>
              <button
                type="button"
                onClick={() => setShowQualityMenu(false)}
                className="px-3 py-1 bg-white/10 text-xs font-bold cursor-pointer"
              >
                بستن
              </button>
            </div>
            {sources.map((src, idx) => {
              const isCurrent = cleanStreamUrl(src.url) === cleanUrl;
              return (
                <button
                  key={`${src.url}_${idx}`}
                  type="button"
                  onClick={() => {
                    setShowQualityMenu(false);
                    onSwitchSource(src);
                  }}
                  className="w-full p-3 flex items-center justify-between text-right cursor-pointer"
                  style={
                    isCurrent
                      ? { backgroundColor: 'var(--primary)', color: '#fff' }
                      : { backgroundColor: '#26221c', color: '#f6efdc' }
                  }
                >
                  <span className="text-sm font-bold">{normalizeQualityLabel(src.quality)}</span>
                  <div className="flex items-center gap-2 text-xs">
                    {src.size && <span>{src.size}</span>}
                    {isCurrent && <Check className="w-4 h-4" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Subtitles Drawer */}
        {showSubMenu && (
          <div
            className="absolute inset-x-0 bottom-0 z-30 max-h-[65%] overflow-y-auto p-4 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-base font-black">تنظیمات زیرنویس</h4>
              <button
                type="button"
                onClick={() => setShowSubMenu(false)}
                className="px-3 py-1 bg-white/10 text-xs font-bold cursor-pointer"
              >
                بستن
              </button>
            </div>

            {subStatus && (
              <p className="text-xs text-amber-300 font-bold">{subStatus}</p>
            )}

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSubEnabled((v) => !v)}
                className="px-3 py-2 text-xs font-bold cursor-pointer"
                style={
                  subEnabled
                    ? { backgroundColor: 'var(--primary)', color: '#fff' }
                    : { backgroundColor: '#26221c' }
                }
              >
                {subEnabled ? 'زیرنویس: روشن' : 'زیرنویس: خاموش'}
              </button>

              <label className="px-3 py-2 rounded-lg border-2 border-[#f6efdc] bg-[#26221c] text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>افزودن فایل SRT / VTT</span>
                <input
                  type="file"
                  accept=".srt,.vtt,text/vtt,application/x-subrip"
                  className="hidden"
                  onChange={handleLocalSubtitleUpload}
                />
              </label>
            </div>

            {subTracks.length > 0 && (
              <div className="space-y-1.5">
                {subTracks.map((tr) => (
                  <button
                    key={tr.id}
                    type="button"
                    onClick={() => {
                      setActiveSubId(tr.id);
                      setSubEnabled(true);
                    }}
                    className="w-full p-2.5 flex items-center justify-between text-xs font-bold cursor-pointer"
                    style={
                      activeSubId === tr.id
                        ? { backgroundColor: 'var(--primary)', color: '#fff' }
                        : { backgroundColor: '#26221c' }
                    }
                  >
                    <span>
                      {tr.label} ({tr.cues.length} خط)
                    </span>
                    {activeSubId === tr.id && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-white/15">
              <span className="text-xs font-bold">همگام‌سازی زمانی ({subOffset >= 0 ? `+${subOffset}` : subOffset}s)</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSubOffset((o) => Number((o - 0.5).toFixed(1)))}
                  className="px-2.5 py-1 bg-white/10 text-xs font-bold cursor-pointer"
                >
                  -0.5s
                </button>
                <button
                  type="button"
                  onClick={() => setSubOffset(0)}
                  className="px-2.5 py-1 bg-white/10 text-xs font-bold cursor-pointer"
                >
                  صفر
                </button>
                <button
                  type="button"
                  onClick={() => setSubOffset((o) => Number((o + 0.5).toFixed(1)))}
                  className="px-2.5 py-1 bg-white/10 text-xs font-bold cursor-pointer"
                >
                  +0.5s
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Seek & Controls Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-20 px-4 pt-2 pb-4 transition-opacity duration-200 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Seek Bar */}
        <div
          ref={seekBarRef}
          className="py-3 cursor-pointer mb-1 relative"
          style={{ direction: 'ltr' }}
          onPointerDown={handleSeekPointerDown}
          onPointerMove={handleSeekPointerMove}
          onPointerUp={handleSeekPointerUp}
          onPointerLeave={() => {
            if (!isDragging) setHoverTime(null);
          }}
        >
          {hoverTime !== null && (
            <div
              className="absolute -top-7 -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 border border-white/30 text-[11px] font-mono font-bold text-amber-300 pointer-events-none"
              style={{ left: `${hoverPct}%` }}
            >
              {formatDuration(hoverTime)}
            </div>
          )}
          <div className="relative h-3 w-full rounded-full bg-white/25 overflow-visible">
            <div
              className="h-full rounded-full"
              style={{ width: `${pct}%`, backgroundColor: 'var(--primary)' }}
            />
            <div
              className="bg-white absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
              style={{ left: `${pct}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2" style={{ direction: 'ltr' }}>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlayPause}
              className="w-10 h-10 flex items-center justify-center bg-white/10 cursor-pointer"
              aria-label={playing ? 'توقف' : 'پخش'}
            >
              {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button
              type="button"
              onClick={() => skipSeconds(-10)}
              className="w-9 h-9 flex items-center justify-center bg-white/10 cursor-pointer"
              aria-label="-10s"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => skipSeconds(10)}
              className="w-9 h-9 flex items-center justify-center bg-white/10 cursor-pointer"
              aria-label="+10s"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold tabular-nums text-white/90 ml-1">
              {formatDuration(currentTime)} / {formatDuration(duration)}
            </span>
          </div>

          <button
            type="button"
            onClick={cycleSpeed}
            className="px-2.5 h-9 bg-white/10 text-xs font-mono font-extrabold cursor-pointer"
          >
            {playbackRate}x
          </button>
        </div>
      </div>
    </div>
  );
};
