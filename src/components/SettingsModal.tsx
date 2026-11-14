import React, { useEffect, useState } from 'react';
import {
  clearApiCache,
  clearDiagLogs,
  getApiCacheSizeLabel,
  getDiagInfo,
  getDiagLogs,
} from '../utils/diag';
import { testServerConnectivity } from '../services/api';
import { clearPlayPref, clearWatchHistory } from '../utils/storage';
import {
  copyTextToClipboard,
  getUserPrefs,
  openTelegramChannel,
  setUserPref,
  syncAutoTheme,
  TM_THEMES,
} from '../utils/themes';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  currentTheme: string;
  onThemeChange: (id: string) => void;
  onOpenThemes: () => void;
  onHistoryCleared: () => void;
  onToast: (msg: string, type?: 'success' | 'error') => void;
  diagOpen: boolean;
  onOpenDiag: () => void;
  onCloseDiag: () => void;
  appVersion: string;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  open,
  onClose,
  currentTheme,
  onThemeChange,
  onOpenThemes,
  onHistoryCleared,
  onToast,
  diagOpen,
  onOpenDiag,
  onCloseDiag,
  appVersion,
}) => {
  const [prefs, setPrefs] = useState(() => getUserPrefs());
  const [cacheLabel, setCacheLabel] = useState(() => getApiCacheSizeLabel());
  const [diagLogs, setDiagLogs] = useState(() => getDiagLogs());
  const [copiedDiag, setCopiedDiag] = useState(false);

  useEffect(() => {
    if (open) {
      setPrefs(getUserPrefs());
      setCacheLabel(getApiCacheSizeLabel());
    }
  }, [open]);

  useEffect(() => {
    const sync = () => setDiagLogs([...getDiagLogs()]);
    window.addEventListener('tm-diag-update', sync);
    return () => window.removeEventListener('tm-diag-update', sync);
  }, []);

  const currentThemeObj = TM_THEMES.find((t) => t.id === currentTheme) || TM_THEMES[0];
  const isBackupActive = Boolean(window.__tmBk && window.__tmBk > Date.now());

  const updatePref = <K extends keyof typeof prefs>(k: K, val: (typeof prefs)[K]) => {
    setUserPref(k, val);
    setPrefs(getUserPrefs());
  };

  const handleToggleAuto = () => {
    const next = !prefs.auto;
    updatePref('auto', next);
    if (next) syncAutoTheme(onThemeChange);
  };

  const handleClearCache = () => {
    clearApiCache();
    setCacheLabel(getApiCacheSizeLabel());
    onToast('کش دریافت‌ها پاک شد');
  };

  const handleClearHistory = () => {
    clearWatchHistory();
    onHistoryCleared();
    onToast('تاریخچه تماشا پاک شد');
  };

  const handleClearPlayPref = () => {
    clearPlayPref();
    onToast('کیفیت و زبان پیش‌فرض بازنشانی شد');
  };

  const handleResetServer = () => {
    window.__tmBk = 0;
    onToast('اتصال به سرور اصلی بازنشانی شد');
  };

  const handleTestServers = async () => {
    onToast('در حال تست اتصال سرورها...');
    await testServerConnectivity();
    setDiagLogs([...getDiagLogs()]);
    onToast('نتیجه تست در گزارش فنی ثبت شد');
  };

  const handleCopyDiag = async () => {
    const info = getDiagInfo();
    const lines = [...diagLogs]
      .reverse()
      .map((x) => `${x.t} ${x.k === 'err' ? 'X' : x.k === 'perf' ? 'P' : 'ok'} ${x.m}`)
      .join('\n');
    const ok = await copyTextToClipboard(`${info}\n\n${lines}`);
    if (ok) {
      setCopiedDiag(true);
      setTimeout(() => setCopiedDiag(false), 1500);
    }
  };

  return (
    <>
      {open && (
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
                <b className="tm-sheet-title">تنظیمات</b>
                <span className="tm-sheet-sub">سفارشی‌سازی ظاهر، پخش و حافظه</span>
              </div>
              <button type="button" className="tm-x" aria-label="بستن" onClick={onClose}>
                <span className="tm-ic tm-ic-x" />
              </button>
            </div>

            {/* ظاهر */}
            <div className="tm-grp">
              <h3 className="tm-grp-h">
                <span className="tm-ic tm-ic-palette" />
                <span>ظاهر</span>
              </h3>
              <div className="tm-grp-b">
                <button
                  type="button"
                  className="tm-lr"
                  onClick={() => {
                    onClose();
                    onOpenThemes();
                  }}
                >
                  <span className="tm-ic tm-ic-palette" />
                  <span className="tm-lr-l">انتخاب تم و رنگ‌ها</span>
                  <span className="tm-lr-v">
                    {currentThemeObj.fl} ({currentThemeObj.d ? 'شب' : 'روز'})
                  </span>
                  <span className="tm-ic tm-ic-chev tm-lr-c" />
                </button>

                <button
                  type="button"
                  className={`tm-sw tm-sw-flat${prefs.auto ? ' on' : ''}`}
                  onClick={handleToggleAuto}
                >
                  <span>هماهنگی خودکار با سیستم</span>
                  <span className="tm-sw-k">
                    <i />
                  </span>
                </button>

                <div className="tm-grp-seg">
                  <span className="tm-grp-t">اندازه نوشته‌ها</span>
                  <div className="tm-seg">
                    {[
                      { k: 's' as const, l: 'کوچک' },
                      { k: 'm' as const, l: 'معمولی' },
                      { k: 'l' as const, l: 'بزرگ' },
                    ].map((opt) => {
                      const active = (prefs.fs || 'm') === opt.k;
                      return (
                        <button
                          key={opt.k}
                          type="button"
                          className={`tm-seg-b${active ? ' on' : ''}`}
                          onClick={() => updatePref('fs', opt.k)}
                        >
                          {opt.l}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* عملکرد و حس لمس */}
            <div className="tm-grp">
              <h3 className="tm-grp-h">
                <span className="tm-ic tm-ic-bolt" />
                <span>عملکرد و حس لمس</span>
              </h3>
              <div className="tm-grp-b">
                <button
                  type="button"
                  className={`tm-sw tm-sw-flat${prefs.lite ? ' on' : ''}`}
                  onClick={() => updatePref('lite', !prefs.lite)}
                >
                  <span>حالت سبک (کاهش انیمیشن‌ها)</span>
                  <span className="tm-sw-k">
                    <i />
                  </span>
                </button>
                <button
                  type="button"
                  className={`tm-sw tm-sw-flat${!prefs.novib ? ' on' : ''}`}
                  onClick={() => updatePref('novib', !prefs.novib)}
                >
                  <span>لرزش لمس دکمه‌ها</span>
                  <span className="tm-sw-k">
                    <i />
                  </span>
                </button>
              </div>
            </div>

            {/* پخش */}
            <div className="tm-grp">
              <h3 className="tm-grp-h">
                <span className="tm-ic tm-ic-play" />
                <span>پخش ویدئو</span>
              </h3>
              <div className="tm-grp-b">
                <button type="button" className="tm-lr" onClick={handleClearPlayPref}>
                  <span className="tm-ic tm-ic-refresh" />
                  <span className="tm-lr-l">بازنشانی کیفیت و زبان پیش‌فرض</span>
                  <span className="tm-ic tm-ic-chev tm-lr-c" />
                </button>
              </div>
            </div>

            {/* داده‌ها و حافظه */}
            <div className="tm-grp">
              <h3 className="tm-grp-h">
                <span className="tm-ic tm-ic-trash" />
                <span>داده‌ها و حافظه</span>
              </h3>
              <div className="tm-grp-b">
                <button type="button" className="tm-lr" onClick={handleClearCache}>
                  <span className="tm-ic tm-ic-refresh" />
                  <span className="tm-lr-l">پاک کردن کش دریافت‌ها</span>
                  <span className="tm-lr-v">{cacheLabel}</span>
                </button>
                <button type="button" className="tm-lr danger" onClick={handleClearHistory}>
                  <span className="tm-ic tm-ic-trash" />
                  <span className="tm-lr-l">پاک کردن تاریخچه تماشا</span>
                </button>
              </div>
            </div>

            {/* اتصال و عیب‌یابی */}
            <div className="tm-grp">
              <h3 className="tm-grp-h">
                <span className="tm-ic tm-ic-server" />
                <span>اتصال و سرورها</span>
              </h3>
              <div className="tm-grp-b">
                <button type="button" className="tm-lr" onClick={handleResetServer}>
                  <span className="tm-ic tm-ic-server" />
                  <span className="tm-lr-l">سرور فعال</span>
                  <span className="tm-lr-v">{isBackupActive ? 'پشتیبان (appnxm)' : 'اصلی (mihan-cdn)'}</span>
                </button>
                <button type="button" className="tm-lr" onClick={handleTestServers}>
                  <span className="tm-ic tm-ic-bolt" />
                  <span className="tm-lr-l">تست اتصال به سرورها</span>
                </button>
                <button
                  type="button"
                  className="tm-lr"
                  onClick={() => {
                    onClose();
                    onOpenDiag();
                  }}
                >
                  <span className="tm-ic tm-ic-info" />
                  <span className="tm-lr-l">مشاهده گزارش فنی (Log)</span>
                  <span className="tm-lr-v">{diagLogs.length} مورد</span>
                </button>
              </div>
            </div>

            {/* درباره */}
            <div className="tm-grp">
              <h3 className="tm-grp-h">
                <span className="tm-ic tm-ic-info" />
                <span>درباره برنامه</span>
              </h3>
              <div className="tm-grp-b">
                <div className="tm-set-info">
                  <span>نسخه برنامه</span>
                  <span>v{appVersion}</span>
                </div>
                <button type="button" className="tm-lr" onClick={openTelegramChannel}>
                  <span className="tm-ic tm-ic-send" />
                  <span className="tm-lr-l">کانال تلگرام توش مووی</span>
                  <span className="tm-lr-v">@TOOSH_MOVIE</span>
                </button>
              </div>
            </div>

            <p className="tm-set-ver">TOOSH MOVIE — سینمای جیبی شما</p>
          </div>
        </div>
      )}

      {diagOpen && (
        <div
          className="fixed inset-0 z-[2147483647] bg-[#0b0b0b] text-[#ddd] flex flex-col font-mono text-xs"
          style={{ direction: 'ltr' }}
        >
          <div className="flex flex-wrap gap-1.5 p-2.5 border-b border-[#333]">
            <button
              type="button"
              onClick={onCloseDiag}
              className="px-3 py-2 rounded-lg border border-[#666] bg-[#222] text-[#eee] font-bold cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleCopyDiag}
              className="px-3 py-2 rounded-lg border border-[#666] bg-[#222] text-[#eee] font-bold cursor-pointer"
            >
              {copiedDiag ? 'Copied' : 'Copy'}
            </button>
            <button
              type="button"
              onClick={handleTestServers}
              className="px-3 py-2 rounded-lg border border-[#666] bg-[#222] text-[#eee] font-bold cursor-pointer"
            >
              Test servers
            </button>
            <button
              type="button"
              onClick={() => {
                clearDiagLogs();
                setDiagLogs([]);
              }}
              className="px-3 py-2 rounded-lg border border-[#666] bg-[#222] text-[#eee] font-bold cursor-pointer"
            >
              Clear
            </button>
          </div>
          <div className="p-2.5 text-[#ffd180] whitespace-pre-wrap break-all border-b border-[#333]">
            {getDiagInfo()}
          </div>
          <div className="flex-1 overflow-auto p-2.5 space-y-1">
            {[...diagLogs].reverse().map((x, idx) => (
              <div
                key={idx}
                className="py-1 border-b border-[#222] break-all"
                style={{
                  color: x.k === 'err' ? '#ff8a80' : x.k === 'perf' ? '#ffd180' : '#a5d6a7',
                }}
              >
                {x.t} {x.k === 'err' ? 'X' : x.k === 'perf' ? 'P' : 'ok'} {x.m}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
