import React from 'react';
import { RefreshCw, WifiOff } from 'lucide-react';

interface OfflineBannerProps {
  message?: string;
  onRetry: () => void;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-14 px-5 text-center">
    <div
      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border-2"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--ink)',
        boxShadow: '4px 4px 0 var(--ink)',
        color: 'var(--primary-bright)',
      }}
    >
      <WifiOff className="w-8 h-8" />
    </div>
    <h3 className="text-base font-black mb-1.5" style={{ color: 'var(--text)' }}>
      خطا در دریافت اطلاعات
    </h3>
    <p className="text-xs leading-6 max-w-xs mb-5" style={{ color: 'var(--secondary)' }}>
      {message || 'اتصال اینترنت یا وضعیت فیلترشکن خود را بررسی کنید و دوباره تلاش کنید.'}
    </p>
    <button
      type="button"
      onClick={onRetry}
      className="px-6 py-2.5 rounded-xl font-black text-sm text-white flex items-center gap-2 cursor-pointer"
      style={{
        backgroundColor: 'var(--primary)',
        border: '2px solid var(--ink)',
        boxShadow: '3px 3px 0 var(--ink)',
      }}
    >
      <RefreshCw className="w-4 h-4" />
      <span>تلاش مجدد</span>
    </button>
  </div>
);
