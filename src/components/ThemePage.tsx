import React from 'react';
import {
  applyThemeWithReveal,
  getUserPrefs,
  setUserPref,
  syncAutoTheme,
  TM_THEMES,
} from '../utils/themes';

interface ThemePageProps {
  open: boolean;
  currentTheme: string;
  onThemeChange: (id: string) => void;
  onClose: () => void;
}

export const ThemePage: React.FC<ThemePageProps> = ({
  open,
  currentTheme,
  onThemeChange,
  onClose,
}) => {
  if (!open) return null;

  const currentObj = TM_THEMES.find((t) => t.id === currentTheme) || TM_THEMES[0];
  const isDark = Boolean(currentObj.d);
  const autoSync = Boolean(getUserPrefs().auto);

  const families: Array<{ fam: string; label: string; dark: typeof currentObj; light: typeof currentObj }> = [];
  const seen = new Set<string>();
  for (const t of TM_THEMES) {
    if (seen.has(t.fam)) continue;
    seen.add(t.fam);
    const pair = TM_THEMES.filter((x) => x.fam === t.fam);
    const dark = pair.find((x) => x.d === 1) || pair[0];
    const light = pair.find((x) => x.d === 0) || pair[0];
    families.push({ fam: t.fam, label: t.fl, dark, light });
  }

  const pick = (id: string, e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    applyThemeWithReveal(id, r.left + r.width / 2, r.top + r.height / 2, false, onThemeChange);
  };

  const toggleDayNight = (e: React.MouseEvent<HTMLButtonElement>) => {
    pick(currentObj.pair, e);
  };

  const toggleAuto = () => {
    const next = !autoSync;
    setUserPref('auto', next);
    if (next) {
      syncAutoTheme(onThemeChange);
    }
    onThemeChange(document.documentElement.getAttribute('data-theme') || currentTheme);
  };

  return (
    <div className="tm-tp" role="dialog" aria-modal="true" aria-label="انتخاب تم">
      <div className="tm-tp-top">
        <button type="button" className="tm-x" aria-label="بستن" onClick={onClose}>
          <span className="tm-ic tm-ic-back" />
        </button>
        <div>
          <b className="tm-sheet-title">ظاهر و تم‌ها</b>
        </div>
      </div>

      <button
        type="button"
        className={`tm-dn${isDark ? ' dark' : ''}`}
        onClick={toggleDayNight}
      >
        <span className="tm-dn-thumb" />
        <span className={`tm-dn-o${!isDark ? ' on' : ''}`}>
          <span className="tm-ic tm-ic-sun" />
          <span>روز</span>
        </span>
        <span className={`tm-dn-o${isDark ? ' on' : ''}`}>
          <span className="tm-ic tm-ic-moon" />
          <span>شب</span>
        </span>
      </button>

      <button
        type="button"
        className={`tm-sw${autoSync ? ' on' : ''}`}
        onClick={toggleAuto}
      >
        <span>هماهنگی خودکار با حالت تاریک سیستم</span>
        <span className="tm-sw-k">
          <i />
        </span>
      </button>

      <h3 className="tm-tp-h">
        <span className="tm-ic tm-ic-palette" />
        <span>مجموعه رنگ‌های سینمایی</span>
      </h3>

      {families.map((fam, idx) => (
        <div
          key={fam.fam}
          className="tm-fam"
          style={{ '--i': idx } as React.CSSProperties}
        >
          <h4 className="tm-fam-h">
            <span className="tm-fam-dots">
              <i style={{ backgroundColor: fam.dark.p }} />
              <i style={{ backgroundColor: fam.dark.a }} />
              <i style={{ backgroundColor: fam.light.bg }} />
            </span>
            <span>{fam.label}</span>
          </h4>
          <div className="tm-fam-g">
            {[fam.dark, fam.light].map((t) => {
              const active = currentTheme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  className={`tm-tc${active ? ' on' : ''}`}
                  onClick={(e) => pick(t.id, e)}
                >
                  <div
                    className="tm-tc-pv"
                    style={{
                      backgroundColor: t.bg,
                      borderColor: t.t,
                    }}
                  >
                    {active && (
                      <span className="tm-tc-ok">
                        <span className="tm-ic tm-ic-check" />
                      </span>
                    )}
                    <div
                      className="tm-tc-bar"
                      style={{
                        backgroundColor: t.s,
                        borderColor: t.t,
                      }}
                    >
                      <i style={{ backgroundColor: t.p }} />
                      <em style={{ backgroundColor: t.a }} />
                    </div>
                    <div className="tm-tc-row">
                      <i style={{ backgroundColor: t.p }} />
                      <i style={{ backgroundColor: t.s }} />
                    </div>
                    <div className="tm-tc-row">
                      <i style={{ backgroundColor: t.a }} />
                      <i style={{ backgroundColor: t.s }} />
                    </div>
                  </div>
                  <span className="tm-tc-l">
                    <span className={`tm-ic ${t.d ? 'tm-ic-moon' : 'tm-ic-sun'}`} />
                    <span>{t.d ? 'شب' : 'روز'}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
