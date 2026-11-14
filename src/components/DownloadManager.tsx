import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Download,
  ExternalLink,
  FolderOpen,
  Play,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import { DownloadRecord, Movie, SavedDownloadItem } from '../types/movie';
import { formatBytes, POSTER_FALLBACK_SVG, toPersianDigits } from '../utils/media';
import {
  getDownloadRecords,
  getSavedDownloads,
  removeDownloadRecord,
  toggleSaveMovie,
} from '../utils/storage';

interface DownloadManagerProps {
  onBack: () => void;
  onSelectMovie: (movie: Movie) => void;
  onSavedChanged: () => void;
  onToast: (msg: string, type?: 'success' | 'error') => void;
}

export const DownloadManager: React.FC<DownloadManagerProps> = ({
  onBack,
  onSelectMovie,
  onSavedChanged,
  onToast,
}) => {
  const [tab, setTab] = useState<'saved' | 'downloaded' | 'downloading'>('saved');
  const [typeFilter, setTypeFilter] = useState<'all' | 'movie' | 'series'>('all');
  const [savedList, setSavedList] = useState<SavedDownloadItem[]>(() => getSavedDownloads());
  const [records, setRecords] = useState<DownloadRecord[]>([]);

  const isNative = Boolean(window.AndroidPlayer?.listDownloads);

  const syncDownloads = () => {
    setSavedList(getSavedDownloads());
    if (window.AndroidPlayer?.listDownloads) {
      try {
        const raw = window.AndroidPlayer.listDownloads();
        const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
        if (Array.isArray(parsed)) {
          setRecords(parsed);
          return;
        }
      } catch {
        // fallback below
      }
    }
    setRecords(getDownloadRecords());
  };

  useEffect(() => {
    window.AndroidPlayer?.setDownloadManagerVisible?.(true);
    syncDownloads();
    const iv = setInterval(syncDownloads, 2000);
    return () => {
      clearInterval(iv);
      window.AndroidPlayer?.setDownloadManagerVisible?.(false);
    };
  }, []);

  const filteredSaved = savedList.filter(
    (x) => typeFilter === 'all' || x.type === typeFilter
  );

  const downloadingList = records.filter(
    (r) => r.status === 'running' || r.status === 'pending' || r.status === 'paused' || r.status === 'failed'
  );
  const completedList = records.filter(
    (r) => !r.status || r.status === 'successful'
  );

  const filterRecs = (list: DownloadRecord[]) =>
    list.filter((r) => typeFilter === 'all' || r.type === typeFilter);

  const handleUnsave = (item: SavedDownloadItem) => {
    toggleSaveMovie(item.movie);
    setSavedList(getSavedDownloads());
    onSavedChanged();
    onToast('از لیست ذخیره‌ها حذف شد');
  };

  const handleDeleteRecord = (dmId: number) => {
    try {
      window.AndroidPlayer?.deleteDownload?.(dmId);
    } catch {
      // ignore
    }
    removeDownloadRecord(dmId);
    syncDownloads();
    onToast('مورد دانلود حذف شد');
  };

  const handlePlayRecord = (rec: DownloadRecord) => {
    if (window.AndroidPlayer?.playDownloaded) {
      const ok = window.AndroidPlayer.playDownloaded(rec.dmId);
      if (!ok) onToast('فایل یافت نشد', 'error');
    } else if (rec.url) {
      const a = document.createElement('a');
      a.href = rec.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  return (
    <div className="pb-12 max-w-4xl mx-auto">
      <div
        className="mb-5 p-3 rounded-2xl border flex items-center justify-between gap-3"
        style={{ backgroundColor: 'var(--surface)' }}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
            style={{
              backgroundColor: 'var(--surface-2)',
              border: '2px solid var(--ink)',
              color: 'var(--text)',
            }}
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-black" style={{ color: 'var(--text)' }}>
            مدیریت دانلودها و ذخیره‌ها
          </h2>
        </div>
        <span
          className="px-2.5 py-1 text-xs font-black tabular-nums"
          style={{ backgroundColor: 'var(--accent)', color: '#000' }}
        >
          {toPersianDigits(savedList.length + records.length)} مورد
        </span>
      </div>

      {/* Main Tabs */}
      <div className="tm-seg mb-3">
        <button
          type="button"
          className={`tm-seg-b${tab === 'saved' ? ' on' : ''}`}
          onClick={() => setTab('saved')}
        >
          <Bookmark className="w-4 h-4" />
          <span>ذخیره‌شده</span>
          <em>({toPersianDigits(savedList.length)})</em>
        </button>
        <button
          type="button"
          className={`tm-seg-b${tab === 'downloaded' ? ' on' : ''}`}
          onClick={() => setTab('downloaded')}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>دانلودشده</span>
          <em>({toPersianDigits(completedList.length)})</em>
        </button>
        <button
          type="button"
          className={`tm-seg-b${tab === 'downloading' ? ' on' : ''}`}
          onClick={() => setTab('downloading')}
        >
          <Download className="w-4 h-4" />
          <span>در حال دانلود</span>
          <em>({toPersianDigits(downloadingList.length)})</em>
        </button>
      </div>

      {/* Type filter */}
      <div className="flex items-center gap-2 mb-4">
        {[
          { k: 'all' as const, l: 'همه' },
          { k: 'movie' as const, l: 'فیلم‌ها' },
          { k: 'series' as const, l: 'سریال‌ها' },
        ].map((opt) => (
          <button
            key={opt.k}
            type="button"
            onClick={() => setTypeFilter(opt.k)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-black cursor-pointer"
            style={
              typeFilter === opt.k
                ? {
                    backgroundColor: 'var(--primary)',
                    color: '#fff',
                    border: '2px solid var(--ink)',
                  }
                : {
                    backgroundColor: 'var(--surface)',
                    color: 'var(--secondary)',
                    border: '2px solid var(--ink)',
                  }
            }
          >
            {opt.l}
          </button>
        ))}
      </div>

      {!isNative && tab !== 'saved' && (
        <div
          className="mb-4 p-3.5 rounded-2xl border flex items-center gap-3 text-xs font-bold leading-6"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--ink)',
            color: 'var(--text-2)',
          }}
        >
          <FolderOpen className="w-5 h-5 shrink-0 text-[var(--primary)]" />
          <span>
            در نسخه وب، فایل‌ها مستقیماً توسط مدیریت دانلود مرورگر شما دانلود می‌شوند و تاریخچه لینک‌های دانلودشده در اینجا نگهداری می‌شود.
          </span>
        </div>
      )}

      {/* Saved List */}
      {tab === 'saved' && (
        <div className="space-y-3">
          {filteredSaved.length === 0 ? (
            <div className="tm-empty">لیست ذخیره‌های شما خالی است</div>
          ) : (
            filteredSaved.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl border flex items-center gap-3.5"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--ink)',
                  boxShadow: '3px 3px 0 var(--ink)',
                }}
              >
                <button
                  type="button"
                  onClick={() => onSelectMovie(item.movie)}
                  className="w-16 h-24 rounded-xl overflow-hidden shrink-0 border-2 cursor-pointer"
                  style={{ borderColor: 'var(--ink)' }}
                >
                  <img
                    src={item.poster || POSTER_FALLBACK_SVG}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = POSTER_FALLBACK_SVG;
                    }}
                  />
                </button>
                <div className="flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => onSelectMovie(item.movie)}
                    className="text-right font-black text-sm truncate block w-full cursor-pointer"
                    style={{ color: 'var(--text)' }}
                  >
                    {item.title}
                  </button>
                  <div className="flex items-center gap-2 mt-1.5 text-[11px] font-bold" style={{ color: 'var(--secondary)' }}>
                    <span>{item.type === 'series' ? 'سریال' : 'فیلم'}</span>
                    {item.year && <span>• {item.year}</span>}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleUnsave(item)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 cursor-pointer"
                  style={{
                    backgroundColor: 'var(--surface-2)',
                    border: '2px solid var(--ink)',
                    color: 'var(--primary-bright)',
                  }}
                  title="حذف"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Downloaded Records */}
      {tab === 'downloaded' && (
        <div className="space-y-3">
          {filterRecs(completedList).length === 0 ? (
            <div className="tm-empty">مورد دانلودشده‌ای ثبت نشده است</div>
          ) : (
            filterRecs(completedList).map((rec) => (
              <div
                key={rec.dmId}
                className="p-3.5 rounded-2xl border flex items-center justify-between gap-3"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--ink)',
                  boxShadow: '3px 3px 0 var(--ink)',
                }}
              >
                <div className="min-w-0 flex-1">
                  <h4 className="font-black text-sm truncate" style={{ color: 'var(--text)' }}>
                    {rec.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] font-bold" style={{ color: 'var(--secondary)' }}>
                    <span className="px-2 py-0.5 rounded bg-black/20">{rec.quality}</span>
                    {rec.total ? <span>{formatBytes(rec.total)}</span> : null}
                    <span>{rec.folder || 'Downloads'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handlePlayRecord(rec)}
                    className="px-3 py-2 rounded-xl text-xs font-black text-white flex items-center gap-1 cursor-pointer"
                    style={{
                      backgroundColor: 'var(--primary)',
                      border: '2px solid var(--ink)',
                    }}
                  >
                    {isNative ? <Play className="w-3.5 h-3.5" /> : <ExternalLink className="w-3.5 h-3.5" />}
                    <span>{isNative ? 'پخش' : 'دریافت مجدد'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteRecord(rec.dmId)}
                    className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
                    style={{
                      backgroundColor: 'var(--surface-2)',
                      border: '2px solid var(--ink)',
                      color: 'var(--primary-bright)',
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Downloading Records */}
      {tab === 'downloading' && (
        <div className="space-y-3">
          {filterRecs(downloadingList).length === 0 ? (
            <div className="tm-empty">در حال حاضر دانلود فعالی وجود ندارد</div>
          ) : (
            filterRecs(downloadingList).map((rec) => (
              <div
                key={rec.dmId}
                className="p-3.5 rounded-2xl border space-y-2.5"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--ink)',
                  boxShadow: '3px 3px 0 var(--ink)',
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <h4 className="font-black text-sm truncate" style={{ color: 'var(--text)' }}>
                      {rec.title}
                    </h4>
                    <span className="text-[11px] font-bold" style={{ color: 'var(--secondary)' }}>
                      {rec.quality} ·{' '}
                      {rec.status === 'failed'
                        ? 'خطا در دانلود'
                        : rec.status === 'paused'
                        ? 'متوقف‌شده'
                        : `${toPersianDigits(rec.percent || 0)}٪`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {rec.status === 'failed' && isNative && (
                      <button
                        type="button"
                        onClick={() => {
                          window.AndroidPlayer?.resumeDownload?.(rec.dmId);
                          syncDownloads();
                        }}
                        className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
                        style={{
                          backgroundColor: 'var(--primary)',
                          color: '#fff',
                          border: '2px solid var(--ink)',
                        }}
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDeleteRecord(rec.dmId)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
                      style={{
                        backgroundColor: 'var(--surface-2)',
                        border: '2px solid var(--ink)',
                        color: 'var(--primary-bright)',
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden bg-black/30 border border-[var(--ink)]">
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${Math.min(100, rec.percent || 0)}%`,
                      backgroundColor: 'var(--primary)',
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
