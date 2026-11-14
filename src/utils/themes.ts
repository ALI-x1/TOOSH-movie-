import { ThemeConfig, UserPrefs } from '../types/movie';

export const TM_THEMES: ThemeConfig[] = [
  { id: 'dark', fam: 'cinema', fl: 'نوار سینمایی', d: 1, bg: '#100e0c', s: '#1b1814', p: '#ee3b17', a: '#ffd60a', t: '#f6efdc', pair: 'light' },
  { id: 'light', fam: 'cinema', fl: 'نوار سینمایی', d: 0, bg: '#f2e9d3', s: '#fbf5e6', p: '#e03616', a: '#ffc800', t: '#17130e', pair: 'dark' },
  { id: 'ocean', fam: 'ocean', fl: 'اقیانوس', d: 1, bg: '#06141a', s: '#0c222b', p: '#0ea5c6', a: '#ffd60a', t: '#e6fbff', pair: 'ocean-l' },
  { id: 'ocean-l', fam: 'ocean', fl: 'اقیانوس', d: 0, bg: '#dff0f5', s: '#f3fafc', p: '#0891b2', a: '#ffc800', t: '#0a1d24', pair: 'ocean' },
  { id: 'emerald', fam: 'emerald', fl: 'زمرد', d: 1, bg: '#07130e', s: '#0f2018', p: '#0f9d63', a: '#ffd60a', t: '#e9fbf1', pair: 'emerald-l' },
  { id: 'emerald-l', fam: 'emerald', fl: 'زمرد', d: 0, bg: '#e2f3e8', s: '#f4fbf6', p: '#0f9d63', a: '#ffc800', t: '#0e1f16', pair: 'emerald' },
  { id: 'violet', fam: 'violet', fl: 'ارغوانی', d: 1, bg: '#0f0b1a', s: '#191229', p: '#8b5cf6', a: '#ffd60a', t: '#f1ebff', pair: 'violet-l' },
  { id: 'violet-l', fam: 'violet', fl: 'ارغوانی', d: 0, bg: '#ece6fa', s: '#faf7ff', p: '#7c3aed', a: '#ffc800', t: '#1a1030', pair: 'violet' },
  { id: 'gold', fam: 'gold', fl: 'پرده‌ی طلایی', d: 1, bg: '#14100a', s: '#201a10', p: '#e08a00', a: '#ffd60a', t: '#fbf1dc', pair: 'gold-l' },
  { id: 'gold-l', fam: 'gold', fl: 'پرده‌ی طلایی', d: 0, bg: '#fbefd2', s: '#fff9ea', p: '#d97706', a: '#ffc800', t: '#2a1a05', pair: 'gold' },
];

export const THEME_IDS = TM_THEMES.map((x) => x.id);
export const THEME_DARK_MAP: Record<string, boolean> = Object.fromEntries(TM_THEMES.map((x) => [x.id, Boolean(x.d)]));
export const THEME_PAIR_MAP: Record<string, string> = Object.fromEntries(TM_THEMES.map((x) => [x.id, x.pair]));

const THEME_KEY = 'toosh-theme-v2';
const PREF_KEY = 'toosh-pref-v2';

let themeBusy = false;

export function getStoredTheme(): string {
  try {
    const t = localStorage.getItem(THEME_KEY) || localStorage.getItem('kral-theme-v2') || 'dark';
    return THEME_IDS.includes(t) ? t : 'dark';
  } catch {
    return 'dark';
  }
}

export function setStoredTheme(id: string): void {
  try {
    localStorage.setItem(THEME_KEY, id);
  } catch {
    // ignore
  }
}

export function getUserPrefs(): UserPrefs {
  try {
    return JSON.parse(localStorage.getItem(PREF_KEY) || '{}') as UserPrefs;
  } catch {
    return {};
  }
}

export function setUserPref<K extends keyof UserPrefs>(key: K, val: UserPrefs[K]): void {
  const p = getUserPrefs();
  p[key] = val;
  try {
    localStorage.setItem(PREF_KEY, JSON.stringify(p));
  } catch {
    // ignore
  }
  applyUserPrefs();
}

export function applyUserPrefs(): void {
  const p = getUserPrefs();
  const d = document.documentElement;
  d.style.fontSize = p.fs === 's' ? '90%' : p.fs === 'l' ? '112%' : '';
  if (p.lite) d.setAttribute('data-lite', '1');
  else d.removeAttribute('data-lite');
}

export function syncNativeBars(): void {
  try {
    const d = document.documentElement;
    const cur = d.getAttribute('data-theme') || 'dark';
    const cs = getComputedStyle(d);
    const s = cs.getPropertyValue('--header-bg').trim();
    const n = cs.getPropertyValue('--surface-solid').trim();
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme && s.startsWith('#')) {
      metaTheme.setAttribute('content', s);
    }
    if (s.startsWith('#') && n.startsWith('#')) {
      window.AndroidPlayer?.setBars?.(s, n, !THEME_DARK_MAP[cur]);
    }
  } catch {
    // ignore
  }
}

export function applyThemeWithReveal(
  id: string,
  x?: number,
  y?: number,
  auto = false,
  onSync?: (newId: string) => void
): void {
  const d = document.documentElement;
  const old = d.getAttribute('data-theme') || 'dark';
  const nt = TM_THEMES.find((t) => t.id === id);
  const ot = TM_THEMES.find((t) => t.id === old);
  if (old === id || !nt || themeBusy) return;

  if (!auto) {
    setUserPref('auto', false);
  }
  window.dispatchEvent(new CustomEvent('tm-theme', { detail: id }));

  const run = () => {
    d.setAttribute('data-theme', id);
    setStoredTheme(id);
    onSync?.(id);
    syncNativeBars();
    window.dispatchEvent(new CustomEvent('tm-theme-done', { detail: id }));
  };

  const prefs = getUserPrefs();
  let still = Boolean(prefs.lite) || x == null || y == null || !document.body;
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      still = true;
    }
  } catch {
    // ignore
  }

  if (still) {
    run();
    return;
  }

  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => {
      ready: Promise<void>;
      finished: Promise<void>;
    };
  };

  const W = window.innerWidth;
  const H = window.innerHeight;
  const endRadius = Math.ceil(Math.hypot(Math.max(x!, W - x!), Math.max(y!, H - y!))) + 8;

  if (typeof doc.startViewTransition === 'function') {
    themeBusy = true;
    try {
      const vt = doc.startViewTransition(() => {
        run();
      });

      vt.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 420,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              pseudoElement: '::view-transition-new(root)',
            }
          );
        })
        .catch(() => {
          // ignore if view transition aborted
        });

      vt.finished
        .catch(() => {})
        .finally(() => {
          themeBusy = false;
        });

      setTimeout(() => {
        themeBusy = false;
      }, 900);
      return;
    } catch {
      themeBusy = false;
    }
  }

  // Lightweight fallback for WebViews without View Transitions
  themeBusy = true;
  const overlay = document.createElement('div');
  overlay.className = 'tm-rv';
  overlay.style.backgroundColor = ot?.bg || '#100e0c';
  document.body.appendChild(overlay);
  run();
  requestAnimationFrame(() => {
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.remove();
      themeBusy = false;
    }, 300);
  });
}

export function syncAutoTheme(onSync?: (newId: string) => void): void {
  const prefs = getUserPrefs();
  if (!prefs.auto) return;
  let isNight = false;
  try {
    isNight = window.AndroidPlayer?.isNightMode
      ? window.AndroidPlayer.isNightMode()
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    isNight = false;
  }
  const cur = document.documentElement.getAttribute('data-theme') || 'dark';
  if (Boolean(THEME_DARK_MAP[cur]) === Boolean(isNight)) return;
  const pair = THEME_PAIR_MAP[cur] || (isNight ? 'dark' : 'light');
  applyThemeWithReveal(pair, window.innerWidth / 2, 0, true, onSync);
}

export function showDomToast(message: string): void {
  const show = () => {
    const d = document.createElement('div');
    d.textContent = message;
    d.style.cssText =
      'position:fixed;left:50%;bottom:96px;transform:translateX(-50%);z-index:2147483000;max-width:86vw;padding:10px 16px;background:#1b1814;color:#f6efdc;border:2px solid #f6efdc;box-shadow:3px 3px 0 #f6efdc;border-radius:10px;font:700 13px Vazirmatn,sans-serif;text-align:center;direction:rtl;pointer-events:none;transition:opacity .4s';
    document.body.appendChild(d);
    setTimeout(() => {
      d.style.opacity = '0';
    }, 2800);
    setTimeout(() => {
      d.remove();
    }, 3400);
  };
  if (document.body) show();
  else document.addEventListener('DOMContentLoaded', show);
}

export function initHapticClicks(): () => void {
  const handler = (e: MouseEvent) => {
    if (getUserPrefs().novib) return;
    const target = e.target as HTMLElement | null;
    const btn = target?.closest?.('button,[role=button],a');
    if (!btn) return;
    try {
      navigator.vibrate?.(btn.closest('.tm-dock') ? 14 : 8);
    } catch {
      // ignore
    }
  };
  document.addEventListener('click', handler, true);
  return () => document.removeEventListener('click', handler, true);
}

export async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
      return true;
    } catch {
      return false;
    }
  }
}

export function openTelegramChannel(): void {
  try {
    if (window.AndroidPlayer?.openTelegram) {
      window.AndroidPlayer.openTelegram();
      return;
    }
  } catch {
    // fallback below
  }
  const a = document.createElement('a');
  a.href = 'https://t.me/TOOSH_MOVIE';
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function openExternalVideoPlayer(
  url: string,
  pkg: 'com.mxtech.videoplayer.ad' | 'org.videolan.vlc',
  onToast?: (msg: string, type?: 'success' | 'error') => void
): void {
  try {
    if (window.AndroidPlayer?.openExternal) {
      window.AndroidPlayer.openExternal(url, pkg);
      return;
    }
  } catch {
    // ignore
  }
  const intentUrl =
    'intent:' +
    url +
    '#Intent;action=android.intent.action.VIEW;type=video/*;package=' +
    pkg +
    ';end';
  const a = document.createElement('a');
  a.href = intentUrl;
  document.body.appendChild(a);
  a.click();
  a.remove();
  if (!/Android/i.test(navigator.userAgent)) {
    onToast?.('پخش با پلیر خارجی در مرورگر دسکتاپ/وب پشتیبانی نمی‌شود؛ از پخش درون‌برنامه یا دانلود استفاده کنید', 'error');
  }
}
