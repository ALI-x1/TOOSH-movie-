import React from 'react';
import { Copy, Download, ExternalLink, PlayCircle, X } from 'lucide-react';
import { cleanStreamUrl, getFileExt } from '../utils/media';
import { copyTextToClipboard, openExternalVideoPlayer } from '../utils/themes';

interface ChoosePlayerModalProps {
  url: string | null;
  title: string;
  onClose: () => void;
  onPlayInApp: (url: string) => void;
  onDownload: (url: string) => void;
  onToast: (msg: string, type?: 'success' | 'error') => void;
}

export const ChoosePlayerModal: React.FC<ChoosePlayerModalProps> = ({
  url,
  title,
  onClose,
  onPlayInApp,
  onDownload,
  onToast,
}) => {
  if (!url) return null;

  const cleanUrl = cleanStreamUrl(url);
  const ext = getFileExt(cleanUrl);
  const isMkv = ext === 'mkv';

  const handleCopy = async () => {
    const ok = await copyTextToClipboard(cleanUrl);
    if (ok) {
      onToast('لینک مستقیم کپی شد');
      onClose();
    } else {
      onToast('کپی لینک ناموفق بود', 'error');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-md rounded-3xl p-5 shadow-2xl border animate-scale-up"
        style={{
          backgroundColor: 'var(--surface-solid)',
          borderColor: 'var(--border-strong)',
          color: 'var(--text)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="min-w-0">
            <h3 className="text-base font-black" style={{ color: 'var(--text)' }}>
              انتخاب نحوه پخش یا دانلود
            </h3>
            <p className="text-xs truncate mt-1" style={{ color: 'var(--secondary)' }}>
              {title}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full transition-colors cursor-pointer"
            style={{ backgroundColor: 'var(--surface-2)', color: 'var(--text)' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => {
              onClose();
              onPlayInApp(cleanUrl);
            }}
            className="w-full flex items-center gap-3 p-3.5 rounded-2xl transition-colors text-right cursor-pointer"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--primary) 16%, transparent)',
              border: '1px solid color-mix(in srgb, var(--primary) 40%, transparent)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <PlayCircle className="w-5 h-5" />
            </div>
            <div className="grow min-w-0">
              <div className="text-sm font-black" style={{ color: 'var(--text)' }}>
                پخش در همین برنامه
              </div>
              <div className="text-[11px] mt-0.5" style={{ color: 'var(--secondary)' }}>
                {isMkv
                  ? 'پخش مستقیم با استخراج خودکار زیرنویس MKV'
                  : 'پخش با کنترل‌های حرفه‌ای و انتخاب زیرنویس'}
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onDownload(cleanUrl);
            }}
            className="w-full flex items-center gap-3 p-3.5 rounded-2xl transition-colors text-right cursor-pointer"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--gold) 20%, transparent)',
                color: 'var(--gold)',
              }}
            >
              <Download className="w-5 h-5" />
            </div>
            <div className="grow min-w-0">
              <div className="text-sm font-bold" style={{ color: 'var(--text)' }}>
                دانلود فایل ویدئو
              </div>
              <div className="text-[11px] mt-0.5" style={{ color: 'var(--secondary)' }}>
                ذخیره مستقیم در دستگاه یا دانلود منیجر مرورگر
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              openExternalVideoPlayer(cleanUrl, 'com.mxtech.videoplayer.ad', onToast);
              onClose();
            }}
            className="w-full flex items-center gap-3 p-3.5 rounded-2xl transition-colors text-right cursor-pointer"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <ExternalLink className="w-5 h-5" />
            </div>
            <div className="grow min-w-0">
              <div className="text-sm font-bold" style={{ color: 'var(--text)' }}>
                پخش با MX Player
              </div>
              <div className="text-[11px] mt-0.5" style={{ color: 'var(--secondary)' }}>
                باز کردن مستقیم استریم در اپلیکیشن MX Player (اندروید)
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              openExternalVideoPlayer(cleanUrl, 'org.videolan.vlc', onToast);
              onClose();
            }}
            className="w-full flex items-center gap-3 p-3.5 rounded-2xl transition-colors text-right cursor-pointer"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
              <ExternalLink className="w-5 h-5" />
            </div>
            <div className="grow min-w-0">
              <div className="text-sm font-bold" style={{ color: 'var(--text)' }}>
                پخش با VLC Player
              </div>
              <div className="text-[11px] mt-0.5" style={{ color: 'var(--secondary)' }}>
                مناسب برای تمام فرمت‌ها و زیرنویس‌های MKV (اندروید)
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="w-full flex items-center gap-3 p-3.5 rounded-2xl transition-colors text-right cursor-pointer"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Copy className="w-5 h-5" />
            </div>
            <div className="grow min-w-0">
              <div className="text-sm font-bold" style={{ color: 'var(--text)' }}>
                کپی لینک مستقیم
              </div>
              <div className="text-[11px] mt-0.5" style={{ color: 'var(--secondary)' }}>
                برای استفاده در ADM، IDM یا هر پلیر دلخواه
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
