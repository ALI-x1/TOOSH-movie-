import React from 'react';
import { RefreshCw, WifiOff } from 'lucide-react';
import { formatApiError } from '../services/api';

interface SplashOverlayProps {
  visible: boolean;
  error: string;
  onRetry: () => void;
  onOpenDiag: () => void;
}

export const SplashOverlay: React.FC<SplashOverlayProps> = ({
  visible,
  error,
  onRetry,
  onOpenDiag,
}) => {
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="mb-8 flex flex-col items-center">
        <div
          className="px-4 pt-1 pb-0.5 border-[3px] shadow-[4px_4px_0_var(--ink)] -rotate-2 mb-4"
          style={{
            backgroundColor: 'var(--primary)',
            borderColor: 'var(--ink)',
            fontFamily: 'var(--font-display)',
            fontSize: '2.75rem',
            lineHeight: 1,
            letterSpacing: '0.06em',
            color: '#fff',
          }}
        >
          TOOSH
        </div>
        <span className="text-sm font-black tracking-wide" style={{ color: 'var(--text)' }}>
          TOOSH MOVIE
        </span>
        <span className="text-[11px] font-bold mt-1" style={{ color: 'var(--secondary)' }}>
          سینمای جیبی شما
        </span>
      </div>

      {!error ? (
        <div className="flex flex-col items-center gap-4">
          <div className="tm-spin" style={{ width: '34px', height: '34px' }} />
          <p className="text-sm font-bold animate-pulse" style={{ color: 'var(--secondary)' }}>
            در حال اتصال به سرور...
          </p>
        </div>
      ) : (
        <div
          className="w-full max-w-sm rounded-3xl p-6 border-2"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--ink)',
            boxShadow: '5px 5px 0 var(--ink)',
          }}
        >
          <div
            className="w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center border-2"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--primary) 18%, transparent)',
              borderColor: 'var(--ink)',
              color: 'var(--primary-bright)',
            }}
          >
            <WifiOff className="w-7 h-7" />
          </div>
          <h3 className="text-base font-black mb-2" style={{ color: 'var(--text)' }}>
            اتصال برقرار نشد
          </h3>
          <p className="text-xs leading-6 mb-4" style={{ color: 'var(--secondary)' }}>
            {formatApiError(error)}
          </p>
          <p
            className="text-[11px] leading-5 mb-5 px-3 py-2 rounded-xl border"
            style={{
              backgroundColor: 'var(--surface-2)',
              borderColor: 'var(--border-strong)',
              color: 'var(--text-2)',
            }}
          >
            در صورت روشن بودن فیلترشکن (VPN)، آن را خاموش کنید و دوباره امتحان کنید.
          </p>
          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              onClick={onRetry}
              className="w-full py-3 rounded-xl font-black text-sm text-white flex items-center justify-center gap-2 cursor-pointer"
              style={{
                backgroundColor: 'var(--primary)',
                border: '2px solid var(--ink)',
                boxShadow: '3px 3px 0 var(--ink)',
              }}
            >
              <RefreshCw className="w-4 h-4" />
              <span>تلاش مجدد</span>
            </button>
            <button
              type="button"
              onClick={onOpenDiag}
              className="w-full py-2.5 rounded-xl font-bold text-xs cursor-pointer"
              style={{
                backgroundColor: 'var(--surface-2)',
                color: 'var(--text)',
                border: '2px solid var(--ink)',
              }}
            >
              مشاهده جزئیات اتصال
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
