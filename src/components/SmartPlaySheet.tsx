import React, { useEffect, useMemo, useState } from 'react';
import { Movie, Season, SourceLink } from '../types/movie';
import {
  audioCategory,
  cleanTitle,
  extractSources,
  extractSubtitles,
  getFileExt,
  getMovieId,
  getMovieTitle,
  getMovieType,
  groupSources,
  normalizeQualityLabel,
  pickSeriesEpisode,
  resolutionValue,
  sortSources,
} from '../utils/media';
import { getPlayPref, getWatchedData, savePlayPref } from '../utils/storage';
import { fetchMovieLinks, fetchSeriesSeasons } from '../services/api';

interface SmartPlaySheetProps {
  movie: Movie;
  initialSources?: SourceLink[];
  initialSeasons?: Season[];
  onClose: () => void;
  onPlay: (
    source: SourceLink,
    opts?: {
      sIdx?: number;
      eIdx?: number;
      epTitle?: string;
      seasons?: Season[];
      epSources?: SourceLink[];
      subtitles?: Array<{ url: string; label: string }>;
    }
  ) => void;
  onShowAllQualities: () => void;
}

export const SmartPlaySheet: React.FC<SmartPlaySheetProps> = ({
  movie,
  initialSources,
  initialSeasons,
  onClose,
  onPlay,
  onShowAllQualities,
}) => {
  const movieId = getMovieId(movie);
  const title = getMovieTitle(movie);
  const isSeries = getMovieType(movie) === 'series';

  const [loading, setLoading] = useState(true);
  const [seasons, setSeasons] = useState<Season[]>(initialSeasons || []);
  const [sources, setSources] = useState<SourceLink[]>(initialSources || []);
  const [selectedSeason, setSelectedSeason] = useState(0);
  const [selectedEpisode, setSelectedEpisode] = useState(0);
  const [activeGroupKey, setActiveGroupKey] = useState<'sub' | 'dub' | 'other'>('sub');
  const [pref] = useState(() => getPlayPref());
  const watched = useMemo(() => getWatchedData(), []);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      if (isSeries) {
        let sList = initialSeasons?.length ? initialSeasons : await fetchSeriesSeasons(movieId);
        if (!active) return;
        setSeasons(sList);
        if (sList.length) {
          const picked = pickSeriesEpisode(sList, movieId, watched.episodes);
          setSelectedSeason(picked.sIdx);
          setSelectedEpisode(picked.eIdx);
          const ep = (sList[picked.sIdx]?.episodes || sList[picked.sIdx]?.items || sList[picked.sIdx]?.episode || [])[picked.eIdx];
          const epSrc = ep ? sortSources(extractSources(ep)) : [];
          setSources(epSrc);
        } else {
          setSources([]);
        }
      } else {
        let srcs = initialSources?.length ? initialSources : [];
        if (!srcs.length) {
          const linksRes = await fetchMovieLinks(movieId);
          srcs = sortSources([
            ...extractSources(movie.sources),
            ...extractSources(linksRes),
          ]);
        }
        if (!active) return;
        setSources(srcs);
      }
      setLoading(false);
    };
    load();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId, isSeries]);

  const handleEpisodeSelect = (sIdx: number, eIdx: number) => {
    setSelectedSeason(sIdx);
    setSelectedEpisode(eIdx);
    const se = seasons[sIdx];
    const eps = se?.episodes || se?.items || se?.episode || [];
    const ep = eps[eIdx];
    const epSrc = ep ? sortSources(extractSources(ep)) : [];
    setSources(epSrc);
  };

  const groups = useMemo(() => groupSources(sources), [sources]);

  useEffect(() => {
    if (!groups.length) return;
    setActiveGroupKey((cur) => {
      if (pref?.a && groups.some((g) => g.key === pref.a)) {
        return pref.a;
      }
      return groups.some((g) => g.key === cur) ? cur : groups[0].key;
    });
  }, [groups, pref]);

  const currentGroup = groups.find((g) => g.key === activeGroupKey) || groups[0];

  const getRecommendedSource = (): SourceLink | null => {
    if (!sources.length) return null;
    if (pref?.r && pref?.a) {
      const targetGroup = groups.find((g) => g.key === pref.a) || groups[0];
      const exact = targetGroup?.items.find((x) => resolutionValue(x.quality) === pref.r);
      if (exact) return exact;
      if (targetGroup?.items.length) {
        const sorted = [...targetGroup.items].sort(
          (a, b) =>
            Math.abs(resolutionValue(a.quality) - (pref.r || 720)) -
            Math.abs(resolutionValue(b.quality) - (pref.r || 720))
        );
        return sorted[0];
      }
    }
    return currentGroup?.items[0] || sources[0];
  };

  const handlePlaySource = (src: SourceLink) => {
    savePlayPref({
      a: audioCategory(src.quality),
      r: resolutionValue(src.quality) || 720,
    });
    const se = seasons[selectedSeason];
    const eps = se?.episodes || se?.items || se?.episode || [];
    const ep = eps[selectedEpisode];
    const epTitle = isSeries
      ? cleanTitle(ep?.title || ep?.name || `قسمت ${selectedEpisode + 1}`)
      : undefined;
    const epSubs = [
      ...extractSubtitles(movie),
      ...(isSeries && ep ? extractSubtitles(ep) : []),
    ];
    onPlay(
      src,
      isSeries
        ? { sIdx: selectedSeason, eIdx: selectedEpisode, epTitle, seasons, epSources: sources, subtitles: epSubs }
        : { epSources: sources, subtitles: epSubs }
    );
  };

  const quickSrc = getRecommendedSource();
  const quickRes = quickSrc ? resolutionValue(quickSrc.quality) : 0;
  const quickAudio = quickSrc ? audioCategory(quickSrc.quality) : 'sub';

  const curSeasonObj = seasons[selectedSeason];
  const curEpisodes = curSeasonObj?.episodes || curSeasonObj?.items || curSeasonObj?.episode || [];
  const subLabel = isSeries && curSeasonObj
    ? `${title} · ${cleanTitle(curSeasonObj.title || curSeasonObj.name || `فصل ${selectedSeason + 1}`)} · قسمت ${selectedEpisode + 1}`
    : title;

  return (
    <div
      className="tm-sheet-bg"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="tm-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="tm-sheet-grip" />
        <div className="tm-sheet-head">
          <div>
            <b className="tm-sheet-title">پخش فوری</b>
            <span className="tm-sheet-sub">{subLabel}</span>
          </div>
          <button type="button" className="tm-x" aria-label="بستن" onClick={onClose}>
            <span className="tm-ic tm-ic-x" />
          </button>
        </div>

        {loading ? (
          <div className="tm-sheet-msg">
            <span className="tm-spin" />
            <span>در حال آماده‌سازی لینک‌ها...</span>
          </div>
        ) : (
          <>
            {isSeries && seasons.length > 0 && (
              <div className="tm-ep">
                <div className="tm-ep-lab">انتخاب فصل و قسمت:</div>
                {seasons.length > 1 && (
                  <div className="tm-ep-seas">
                    {seasons.map((se, si) => (
                      <button
                        key={si}
                        type="button"
                        className={`tm-ep-sb${si === selectedSeason ? ' on' : ''}`}
                        onClick={() => handleEpisodeSelect(si, 0)}
                      >
                        {cleanTitle(se.title || se.name || `فصل ${si + 1}`)}
                      </button>
                    ))}
                  </div>
                )}
                <div className="tm-ep-grid">
                  {curEpisodes.map((_ep, ei) => {
                    const seen = Boolean(watched.episodes[`${movieId}_${selectedSeason}_${ei}`]);
                    return (
                      <button
                        key={ei}
                        type="button"
                        className={`tm-ep-b${ei === selectedEpisode ? ' on' : ''}${seen ? ' seen' : ''}`}
                        onClick={() => handleEpisodeSelect(selectedSeason, ei)}
                      >
                        {ei + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {quickSrc && (
              <button
                type="button"
                className="tm-quick"
                onClick={() => handlePlaySource(quickSrc)}
              >
                <span className="tm-ic tm-ic-play" />
                <span>
                  پخش سریع ({quickRes ? `${quickRes}p` : normalizeQualityLabel(quickSrc.quality)} ·{' '}
                  {quickAudio === 'dub' ? 'دوبله' : quickAudio === 'sub' ? 'زیرنویس' : 'اصلی'})
                </span>
              </button>
            )}

            {groups.length > 1 && (
              <div className="tm-seg">
                {groups.map((g) => (
                  <button
                    key={g.key}
                    type="button"
                    className={`tm-seg-b${g.key === activeGroupKey ? ' on' : ''}`}
                    onClick={() => setActiveGroupKey(g.key)}
                  >
                    <span>{g.key === 'sub' ? 'زیرنویس' : g.key === 'dub' ? 'دوبله' : 'سایر'}</span>
                    <em>({g.items.length})</em>
                  </button>
                ))}
              </div>
            )}

            {currentGroup?.items.length ? (
              <div className="tm-rows">
                {currentGroup.items.map((src, i) => {
                  const resVal = resolutionValue(src.quality);
                  const ext = getFileExt(src.url);
                  return (
                    <button
                      key={`${src.url}_${i}`}
                      type="button"
                      className="tm-row"
                      onClick={() => handlePlaySource(src)}
                    >
                      <span className="tm-ic tm-ic-play" />
                      <span className="tm-row-q">
                        {resVal ? `${resVal}p` : normalizeQualityLabel(src.quality)}
                      </span>
                      {ext && <span className="tm-row-t">{ext}</span>}
                      <span className="tm-row-s">{src.size || normalizeQualityLabel(src.quality)}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="tm-sheet-msg">
                <span>لینک پخشی برای این عنوان یافت نشد</span>
              </div>
            )}

            <button
              type="button"
              className="tm-more"
              onClick={() => {
                onClose();
                onShowAllQualities();
              }}
            >
              مشاهده تمام کیفیت‌ها و دانلود
            </button>
          </>
        )}
      </div>
    </div>
  );
};
