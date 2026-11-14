import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  Heart,
  Play,
  Star,
} from 'lucide-react';
import { Episode, Movie, Season, SourceLink } from '../types/movie';
import { fetchMovieDetails, fetchMovieLinks, fetchSeriesSeasons } from '../services/api';
import {
  buildNativeMeta,
  cleanStreamUrl,
  cleanTitle,
  extractEpisodeNumber,
  extractSources,
  extractSubtitles,
  formatFileSize,
  getBackdropUrl,
  getFileExt,
  getImdbRating,
  getMovieId,
  getMovieTitle,
  getMovieType,
  getMovieYear,
  getPosterUrl,
  groupSources,
  normalizeQualityLabel,
  pickDownloadUrl,
  POSTER_FALLBACK_SVG,
  resolutionValue,
  sortSources,
} from '../utils/media';
import {
  getWatchedData,
  isMovieLiked,
  isMovieSaved,
  toggleEpisodeWatchedManual,
  toggleLikeMovie,
  toggleSaveMovie,
} from '../utils/storage';
import { copyTextToClipboard } from '../utils/themes';
import { MovieInfo } from './MovieInfo';
import { TrailerButton } from './TrailerButton';
import { OfflineBanner } from './OfflineBanner';

interface MovieDetailsProps {
  movie: Movie;
  onBack: () => void;
  onOpenSmartSheet: (movie: Movie, sources: SourceLink[], seasons: Season[]) => void;
  onPlaySource: (
    url: string,
    title: string,
    sources: SourceLink[],
    subtitles: Array<{ url: string; label: string }>,
    ctx?: { movie: Movie; quality: string; sIdx?: number; eIdx?: number; epTitle?: string; seasons?: Season[] }
  ) => void;
  onDownloadSource: (
    url: string,
    title: string,
    quality: string,
    movie: Movie
  ) => void;
  onLikesChanged: () => void;
  onSavedChanged: () => void;
  onToast: (msg: string, type?: 'success' | 'error') => void;
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({
  movie,
  onBack,
  onOpenSmartSheet,
  onPlaySource,
  onDownloadSource,
  onLikesChanged,
  onSavedChanged,
  onToast,
}) => {
  const movieId = getMovieId(movie);
  const [details, setDetails] = useState<Movie>(movie);
  const [sources, setSources] = useState<SourceLink[]>([]);
  const [subtitles, setSubtitles] = useState<Array<{ url: string; label: string }>>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [linksData, setLinksData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openSeasonIdx, setOpenSeasonIdx] = useState<number>(0);

  const [liked, setLiked] = useState(() => isMovieLiked(movieId));
  const [saved, setSaved] = useState(() => isMovieSaved(movieId));
  const [watchedTick, setWatchedTick] = useState(0);
  const [dlFlash, setDlFlash] = useState(false);
  const loadSeqRef = useRef(0);

  const loadData = async () => {
    const seq = ++loadSeqRef.current;
    setLoading(true);
    setError('');
    try {
      const [det, lnk] = await Promise.all([
        fetchMovieDetails(movieId),
        fetchMovieLinks(movieId),
      ]);
      if (seq !== loadSeqRef.current) return;
      const merged: Movie = { ...movie, ...(det || {}) };
      setDetails(merged);
      setLinksData(lnk);

      const type = getMovieType(merged);
      const srcs = sortSources([...extractSources(merged.sources), ...extractSources(lnk)]);
      const subs = [...extractSubtitles(merged), ...extractSubtitles(lnk)];
      setSources(srcs);
      setSubtitles(subs);

      if (type === 'series') {
        const sList = await fetchSeriesSeasons(movieId);
        if (seq !== loadSeqRef.current) return;
        setSeasons(sList);
        window.__tmSeasons = sList;
      } else {
        setSeasons([]);
        window.__tmSeasons = undefined;
      }
    } catch {
      if (seq !== loadSeqRef.current) return;
      setError('خطا در دریافت اطلاعات فیلم/سریال');
    } finally {
      if (seq === loadSeqRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setDetails(movie);
    setSources([]);
    setSeasons([]);
    setLiked(isMovieLiked(movieId));
    setSaved(isMovieSaved(movieId));
    loadData();
    return () => {
      loadSeqRef.current++;
      window.__tmSeasons = undefined;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  const title = getMovieTitle(details);
  const year = getMovieYear(details);
  const imdb = getImdbRating(details);
  const poster = getPosterUrl(details);
  const backdrop = getBackdropUrl(details);
  const isSeries = getMovieType(details) === 'series';
  const watched = useMemo(() => {
    void watchedTick;
    return getWatchedData();
  }, [watchedTick, movieId]);

  const handleLike = () => {
    const next = toggleLikeMovie(details);
    setLiked(next);
    onLikesChanged();
    onToast(next ? 'به علاقه‌مندی‌ها اضافه شد' : 'از علاقه‌مندی‌ها حذف شد');
  };

  const handleSave = () => {
    const next = toggleSaveMovie(details);
    setSaved(next);
    onSavedChanged();
    onToast(next ? 'در لیست ذخیره‌ها ثبت شد' : 'از لیست ذخیره‌ها حذف شد');
  };

  const scrollToDownloadBox = () => {
    const box = document.getElementById('tm-dlbox');
    if (box) {
      box.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setDlFlash(true);
      setTimeout(() => setDlFlash(false), 1400);
    }
  };

  const handleCopySeasonLinks = async (se: Season) => {
    const eps = se.episodes || se.items || se.episode || [];
    const lines: string[] = [];
    eps.forEach((ep, ei) => {
      const epSrcs = sortSources(extractSources(ep));
      const best = pickDownloadUrl(epSrcs);
      if (best) {
        lines.push(`${cleanTitle(ep.title || ep.name || `قسمت ${ei + 1}`)}: ${best.url}`);
      }
    });
    if (!lines.length) {
      onToast('لینکی برای کپی پیدا نشد', 'error');
      return;
    }
    const ok = await copyTextToClipboard(lines.join('\n'));
    onToast(ok ? `لینک ${lines.length} قسمت کپی شد` : 'کپی ناموفق بود', ok ? 'success' : 'error');
  };

  const handleDownloadSeason = (se: Season) => {
    const eps = se.episodes || se.items || se.episode || [];
    let count = 0;
    eps.forEach((ep, ei) => {
      const epSrcs = sortSources(extractSources(ep));
      const best = pickDownloadUrl(epSrcs);
      if (best) {
        count++;
        const epTitle = cleanTitle(ep.title || ep.name || `قسمت ${ei + 1}`);
        onDownloadSource(best.url, `${title} - ${epTitle}`, normalizeQualityLabel(best.quality), details);
      }
    });
    if (!count) {
      onToast('لینکی برای دانلود یافت نشد', 'error');
    } else {
      onToast(`دانلود ${count} قسمت با کیفیت بهینه آغاز شد`);
    }
  };

  const groupedMovieSources = useMemo(() => groupSources(sources), [sources]);

  return (
    <div className="pb-10 flex flex-col items-center">
      {/* Action Row */}
      <div className="w-full max-w-4xl flex items-center justify-between gap-3 mb-4">
        <button
          type="button"
          onClick={onBack}
          className="px-3.5 py-2.5 rounded-xl font-black text-xs flex items-center gap-1.5 cursor-pointer"
          style={{
            backgroundColor: 'var(--surface)',
            color: 'var(--text)',
            border: '2px solid var(--ink)',
            boxShadow: '3px 3px 0 var(--ink)',
          }}
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت</span>
        </button>

        <button
          type="button"
          onClick={handleLike}
          className="px-3 py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer"
          style={
            liked
              ? {
                  backgroundColor: 'var(--primary)',
                  color: '#fff',
                  border: '2px solid var(--ink)',
                  boxShadow: '3px 3px 0 var(--ink)',
                }
              : {
                  backgroundColor: 'var(--surface)',
                  color: 'var(--text)',
                  border: '2px solid var(--ink)',
                  boxShadow: '3px 3px 0 var(--ink)',
                }
          }
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
          <span>{liked ? 'پسندیده‌شده' : 'علاقه‌مندی'}</span>
        </button>

        <button
          type="button"
          onClick={handleSave}
          className="px-3 py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer"
          style={
            saved
              ? {
                  backgroundColor: 'var(--accent)',
                  color: '#000',
                  border: '2px solid #000',
                  boxShadow: '3px 3px 0 #000',
                }
              : {
                  backgroundColor: 'var(--surface)',
                  color: 'var(--text)',
                  border: '2px solid var(--ink)',
                  boxShadow: '3px 3px 0 var(--ink)',
                }
          }
        >
          <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          <span>{saved ? 'ذخیره‌شد' : 'ذخیره'}</span>
        </button>
      </div>

      {/* Hero Card */}
      <div className="relative w-full max-w-4xl rounded-[26px] overflow-hidden mb-5">
        <div className="relative z-10 w-full overflow-hidden h-52 sm:h-64">
          <img
            src={backdrop}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = POSTER_FALLBACK_SVG;
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, var(--surface) 5%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.2) 100%)',
            }}
          />
        </div>

        <div className="relative z-20 px-5 pb-6 -mt-20 flex flex-col sm:flex-row items-center sm:items-end gap-5">
          <div className="relative rounded-[20px] w-36 sm:w-44 aspect-[2/3] shrink-0 overflow-visible">
            <img
              src={poster}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = POSTER_FALLBACK_SVG;
              }}
            />
          </div>

          <div className="flex-1 text-center sm:text-right w-full">
            <h1 className="text-2xl sm:text-3xl font-black leading-tight mb-2.5" style={{ color: 'var(--text)' }}>
              {title}
            </h1>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-4">
              <span
                className="px-2.5 py-1 rounded-md text-xs font-black text-white border-2"
                style={{ backgroundColor: 'var(--primary)', borderColor: 'var(--ink)' }}
              >
                {isSeries ? 'سریال' : 'فیلم سینمایی'}
              </span>
              {year && (
                <span
                  className="px-2.5 py-1 rounded-md text-xs font-black border-2"
                  style={{
                    backgroundColor: 'var(--surface-2)',
                    borderColor: 'var(--ink)',
                    color: 'var(--text)',
                  }}
                >
                  {year}
                </span>
              )}
              {imdb && (
                <span className="px-2.5 py-1 rounded-md text-xs font-black bg-amber-400 text-black border-2 border-black flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-black" />
                  <span>{imdb} IMDb</span>
                </span>
              )}
            </div>

            {/* Top Play & Download Buttons */}
            <div className="tm-top">
              <button
                type="button"
                className="tm-top-btn tm-top-primary flex-1 min-w-[140px]"
                onClick={() => onOpenSmartSheet(details, sources, seasons)}
              >
                <span className="tm-ic tm-ic-play" />
                <span>پخش آنلاین</span>
              </button>
              <button
                type="button"
                className="tm-top-btn tm-top-ghost flex-1 min-w-[140px]"
                onClick={scrollToDownloadBox}
              >
                <span className="tm-ic tm-ic-download" />
                <span>باکس دانلود</span>
              </button>
            </div>

            <TrailerButton
              movie={details}
              linksData={linksData}
              onPlayTrailer={(tUrl, tTitle) => {
                onPlaySource(tUrl, tTitle, [{ url: tUrl, quality: 'پیش‌نمایش', size: '', score: 90 }], [], {
                  movie: details,
                  quality: 'پیش‌نمایش',
                });
              }}
            />
          </div>
        </div>
      </div>

      {loading && (
        <div className="w-full max-w-4xl flex flex-col items-center py-8 gap-3">
          <span className="tm-spin" />
          <span className="text-xs font-bold" style={{ color: 'var(--secondary)' }}>
            در حال دریافت لینک‌ها و جزئیات...
          </span>
        </div>
      )}

      {error && !loading && <OfflineBanner message={error} onRetry={loadData} />}

      {/* Movie Info Facts + Plot */}
      <MovieInfo movie={details} />

      {/* Movie Download / Quality Tickets Box */}
      {!isSeries && !loading && (
        <div
          id="tm-dlbox"
          className={`w-full max-w-3xl mt-6 p-4 rounded-2xl border${dlFlash ? ' tm-flash' : ''}`}
          style={{ backgroundColor: 'var(--surface)' }}
        >
          <h3>لینک‌های پخش و دانلود</h3>
          {groupedMovieSources.length === 0 ? (
            <p className="text-sm font-bold py-4 text-center" style={{ color: 'var(--secondary)' }}>
              لینکی برای این فیلم ثبت نشده است.
            </p>
          ) : (
            groupedMovieSources.map((grp) => (
              <div key={grp.key} className="tm-dl-group">
                <span className={`tm-dl-title ${grp.cls}`}>{grp.label}</span>
                <div className="flex flex-wrap gap-2">
                  {grp.items.map((src, i) => {
                    const qLabel = normalizeQualityLabel(src.quality);
                    const resVal = resolutionValue(src.quality);
                    const ext = getFileExt(src.url);
                    const isWatchedQ = Boolean(
                      watched.qualities[`${movieId}_movie_${qLabel}`]
                    );
                    return (
                      <span key={`${src.url}_${i}`}>
                        <button
                          type="button"
                          onClick={() =>
                            onPlaySource(
                              src.url,
                              `${title} (${qLabel})`,
                              sources,
                              subtitles,
                              { movie: details, quality: qLabel }
                            )
                          }
                          className="flex items-center justify-between gap-3 cursor-pointer"
                          style={{
                            backgroundColor: isWatchedQ
                              ? 'color-mix(in srgb, var(--primary) 16%, var(--surface))'
                              : 'var(--surface)',
                            color: 'var(--text)',
                          }}
                        >
                          <span className="flex items-center gap-2 font-black">
                            <Play className="w-4 h-4 fill-current text-[var(--primary)]" />
                            <span className="tm-q">
                              <b>{resVal ? `${resVal}p` : qLabel}</b>
                              {ext && <em>{ext.toUpperCase()}</em>}
                            </span>
                            {isWatchedQ && (
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-black px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-500">
                                <Check className="w-3 h-3" />
                                دیده‌شده
                              </span>
                            )}
                          </span>
                          <span className="text-xs font-bold" style={{ color: 'var(--secondary)' }}>
                            {formatFileSize(src.size) || qLabel}
                          </span>
                        </button>
                        <button
                          type="button"
                          title={`دانلود ${qLabel}`}
                          onClick={() => onDownloadSource(src.url, title, qLabel, details)}
                          className="flex items-center justify-center cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Series Seasons & Episodes Accordion */}
      {isSeries && !loading && (
        <div id="tm-dlbox" className={`w-full max-w-4xl mt-6 flex flex-col gap-4${dlFlash ? ' tm-flash' : ''}`}>
          <div className="max-w-4xl mt-3 w-full space-y-4">
            {seasons.length === 0 ? (
              <div
                className="rounded-2xl p-6 text-center font-bold text-sm"
                style={{ backgroundColor: 'var(--surface)', color: 'var(--secondary)' }}
              >
                قسمتی برای این سریال یافت نشد.
              </div>
            ) : (
              seasons.map((se, sIdx) => {
                const isOpen = openSeasonIdx === sIdx;
                const eps = (se.episodes || se.items || se.episode || []) as Episode[];
                const sTitle = cleanTitle(se.title || se.name || `فصل ${se.season || sIdx + 1}`);
                return (
                  <div key={sIdx} className="rounded-2xl overflow-hidden">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setOpenSeasonIdx(isOpen ? -1 : sIdx)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') setOpenSeasonIdx(isOpen ? -1 : sIdx);
                      }}
                      className="p-4 flex items-center justify-between gap-2 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base font-black">{sTitle}</span>
                        <span className="text-xs font-bold" style={{ color: 'var(--secondary)' }}>
                          ({eps.length} قسمت)
                        </span>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5" style={{ color: 'var(--text)' }} />
                      ) : (
                        <ChevronDown className="w-5 h-5" style={{ color: 'var(--text)' }} />
                      )}
                    </div>

                    {isOpen && (
                      <>
                        <div className="p-3.5 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className="text-xs font-extrabold" style={{ color: 'var(--secondary)' }}>
                            ابزار سریع {sTitle}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => handleCopySeasonLinks(se)}
                              className="px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 cursor-pointer"
                              style={{
                                backgroundColor: 'var(--surface)',
                                color: 'var(--text)',
                                border: '2px solid var(--ink)',
                              }}
                            >
                              <Copy className="w-3.5 h-3.5" />
                              <span>کپی همه لینک‌ها</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDownloadSeason(se)}
                              className="px-3 py-1.5 rounded-lg text-xs font-black text-white flex items-center gap-1.5 cursor-pointer"
                              style={{
                                backgroundColor: 'var(--primary)',
                                border: '2px solid var(--ink)',
                              }}
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>دانلود کل فصل (720p)</span>
                            </button>
                          </div>
                        </div>

                        <div className="divide-y">
                          {eps.map((ep, eIdx) => {
                            const epNum = extractEpisodeNumber(ep, eIdx);
                            const epTitle = cleanTitle(ep.title || ep.name || `قسمت ${epNum}`);
                            const epSrcs = sortSources(extractSources(ep));
                            const epSubs = [...subtitles, ...extractSubtitles(ep)];
                            const isEpSeen = Boolean(
                              watched.episodes[`${movieId}_${sIdx}_${eIdx}`]
                            );

                            return (
                              <div key={eIdx} className="p-3.5 space-y-3">
                                <div className="flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-3 min-w-0">
                                    <span
                                      className="min-w-[2.6rem] h-8 px-2 flex items-center justify-center font-black text-xs shrink-0"
                                      style={
                                        isEpSeen
                                          ? { backgroundColor: 'var(--primary)', color: '#fff' }
                                          : { backgroundColor: 'var(--surface-2)', color: 'var(--text)' }
                                      }
                                    >
                                      E{epNum}
                                    </span>
                                    <div className="min-w-0">
                                      <h4 className="text-sm font-black truncate" style={{ color: 'var(--text)' }}>
                                        {epTitle}
                                      </h4>
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      toggleEpisodeWatchedManual(movieId, sIdx, eIdx);
                                      setWatchedTick((t) => t + 1);
                                    }}
                                    className="px-2.5 py-1 rounded-lg text-[11px] font-black flex items-center gap-1 shrink-0 cursor-pointer"
                                    style={
                                      isEpSeen
                                        ? {
                                            backgroundColor: 'var(--accent)',
                                            color: '#000',
                                            border: '2px solid #000',
                                          }
                                        : {
                                            backgroundColor: 'var(--surface-2)',
                                            color: 'var(--secondary)',
                                            border: '2px solid var(--ink)',
                                          }
                                    }
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                    <span>{isEpSeen ? 'دیده‌شده' : 'علامت زدن'}</span>
                                  </button>
                                </div>

                                {epSrcs.length > 0 && (
                                  <div className="flex flex-wrap gap-2 pr-0">
                                    {epSrcs.map((src, qi) => {
                                      const qLabel = normalizeQualityLabel(src.quality);
                                      const resVal = resolutionValue(src.quality);
                                      return (
                                        <span key={`${src.url}_${qi}`} className="inline-flex">
                                          <button
                                            type="button"
                                            onClick={() =>
                                              onPlaySource(
                                                cleanStreamUrl(src.url),
                                                `${title} - ${epTitle} (${qLabel})`,
                                                epSrcs,
                                                epSubs,
                                                {
                                                  movie: details,
                                                  quality: qLabel,
                                                  sIdx,
                                                  eIdx,
                                                  epTitle,
                                                  seasons,
                                                }
                                              )
                                            }
                                            className="px-3 py-1.5 text-xs font-black flex items-center gap-1.5 cursor-pointer"
                                            style={{
                                              backgroundColor: 'var(--surface-2)',
                                              color: 'var(--text)',
                                            }}
                                          >
                                            <Play className="w-3 h-3 fill-current text-[var(--primary)]" />
                                            <span>{resVal ? `${resVal}p` : qLabel}</span>
                                            {src.size && (
                                              <span className="opacity-70 text-[10px]">
                                                ({formatFileSize(src.size)})
                                              </span>
                                            )}
                                          </button>
                                          <button
                                            type="button"
                                            title={`دانلود ${qLabel}`}
                                            onClick={() =>
                                              onDownloadSource(
                                                src.url,
                                                `${title} - ${epTitle}`,
                                                qLabel,
                                                details
                                              )
                                            }
                                            className="px-2.5 py-1.5 flex items-center justify-center cursor-pointer"
                                          >
                                            <Download className="w-3.5 h-3.5" />
                                          </button>
                                        </span>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
