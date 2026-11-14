import React, { useEffect, useState } from 'react';
import { ProgressItem } from '../types/movie';
import { getProgressList, removeProgressItem } from '../utils/storage';
import { formatDuration, POSTER_FALLBACK_SVG } from '../utils/media';

interface ContinueWatchingProps {
  onResume: (item: ProgressItem) => void;
  refreshTick?: number;
}

export const ContinueWatching: React.FC<ContinueWatchingProps> = ({
  onResume,
  refreshTick = 0,
}) => {
  const [items, setItems] = useState<ProgressItem[]>([]);

  useEffect(() => {
    setItems(getProgressList());
  }, [refreshTick]);

  useEffect(() => {
    const onFocus = () => setItems(getProgressList());
    const onStorage = () => setItems(getProgressList());
    window.addEventListener('focus', onFocus);
    window.addEventListener('tm-progress-update', onStorage);
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('tm-progress-update', onStorage);
    };
  }, []);

  if (!items.length) return null;

  const parseMeta = (raw: string) => {
    try {
      return JSON.parse(raw || '{}') as {
        id?: string;
        title?: string;
        poster?: string;
        ep?: string;
      };
    } catch {
      return {};
    }
  };

  const handleRemove = (key: string) => {
    removeProgressItem(key);
    setItems((prev) => prev.filter((x) => x.k !== key));
  };

  return (
    <section className="tm-resume">
      <h2 className="tm-resume-h">ادامه‌ی تماشا</h2>
      <div className="tm-resume-row">
        {items.map((item) => {
          const meta = parseMeta(item.meta);
          const title = meta.title || item.title || 'بدون عنوان';
          const poster = meta.poster || POSTER_FALLBACK_SVG;
          const pct = item.dur > 0 ? Math.min(100, Math.round((item.pos / item.dur) * 100)) : 0;
          const left = item.dur > item.pos ? Math.round((item.dur - item.pos) / 60000) : 0;

          return (
            <div key={item.k} className="tm-rc">
              <button
                type="button"
                className="tm-rc-b"
                onClick={() => onResume(item)}
              >
                <span className="tm-rc-img">
                  <img
                    src={poster}
                    alt={title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = POSTER_FALLBACK_SVG;
                    }}
                  />
                  <span className="tm-ic tm-ic-play tm-rc-play" />
                  {pct > 0 && (
                    <span className="tm-rc-bar">
                      <b style={{ width: `${pct}%` }} />
                    </span>
                  )}
                </span>
                <span className="tm-rc-t">{title}</span>
                <span className="tm-rc-s">
                  {meta.ep ? `${meta.ep} · ` : ''}
                  {left > 0
                    ? `${left} دقیقه مانده`
                    : item.pos > 0
                    ? formatDuration(item.pos / 1000)
                    : ''}
                </span>
              </button>
              <button
                type="button"
                className="tm-rc-x"
                aria-label="حذف"
                onClick={() => handleRemove(item.k)}
              >
                <span className="tm-ic tm-ic-x" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
