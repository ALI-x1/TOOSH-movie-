import React, { useEffect, useId, useState } from 'react';
import { applyThemeWithReveal, THEME_DARK_MAP, THEME_PAIR_MAP } from '../utils/themes';

interface DayNightButtonProps {
  onThemeChange?: (id: string) => void;
}

export const DayNightButton: React.FC<DayNightButtonProps> = ({ onThemeChange }) => {
  const maskId = useId();
  const [themeId, setThemeId] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'dark'
  );

  useEffect(() => {
    const sync = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setThemeId(detail || document.documentElement.getAttribute('data-theme') || 'dark');
    };
    window.addEventListener('tm-theme', sync);
    window.addEventListener('tm-theme-done', sync);
    return () => {
      window.removeEventListener('tm-theme', sync);
      window.removeEventListener('tm-theme-done', sync);
    };
  }, []);

  const isDark = Boolean(THEME_DARK_MAP[themeId]);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const next = THEME_PAIR_MAP[themeId] || (isDark ? 'light' : 'dark');
    applyThemeWithReveal(next, x, y, false, onThemeChange);
  };

  return (
    <button
      type="button"
      className={`tm-dnb${isDark ? ' dark' : ''}`}
      onClick={handleToggle}
      aria-label={isDark ? 'حالت روز' : 'حالت شب'}
      title={isDark ? 'روشن کردن پوسته' : 'تاریک کردن پوسته'}
    >
      <svg viewBox="0 0 24 24">
        <defs>
          <mask id={maskId}>
            <rect width="24" height="24" fill="#fff" />
            <circle className="tm-moon-cut" cx="16.5" cy="8.5" r="6.5" fill="#000" />
          </mask>
        </defs>
        <circle
          className="tm-sun-core"
          cx="12"
          cy="12"
          r="5.2"
          fill="currentColor"
          mask={`url(#${maskId})`}
        />
        <g
          className="rays"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        >
          <line x1="12" y1="2" x2="12" y2="4.2" />
          <line x1="12" y1="19.8" x2="12" y2="22" />
          <line x1="2" y1="12" x2="4.2" y2="12" />
          <line x1="19.8" y1="12" x2="22" y2="12" />
          <line x1="4.9" y1="4.9" x2="6.5" y2="6.5" />
          <line x1="17.5" y1="17.5" x2="19.1" y2="19.1" />
          <line x1="19.1" y1="4.9" x2="17.5" y2="6.5" />
          <line x1="6.5" y1="17.5" x2="4.9" y2="19.1" />
        </g>
      </svg>
    </button>
  );
};
