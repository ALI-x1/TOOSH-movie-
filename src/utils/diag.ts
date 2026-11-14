export interface DiagEntry {
  t: string;
  k: 'ok' | 'err' | 'perf';
  m: string;
}

const DIAG_KEY = 'toosh-diag-log-v1';
const CACHE_IDX_KEY = 'toosh-cidx-v1';
const CACHE_PREFIX = 'toosh-c1:';
const MAX_LOGS = 150;

let memLogs: DiagEntry[] | null = null;
let saveTimer: ReturnType<typeof setTimeout> | null = null;

function pad(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

function formatTs(): string {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function getDiagLogs(): DiagEntry[] {
  if (memLogs) return memLogs;
  try {
    const raw = localStorage.getItem(DIAG_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    memLogs = Array.isArray(parsed) ? parsed : [];
  } catch {
    memLogs = [];
  }
  return memLogs;
}

function scheduleSave() {
  if (saveTimer) return;
  saveTimer = setTimeout(() => {
    saveTimer = null;
    try {
      localStorage.setItem(DIAG_KEY, JSON.stringify(getDiagLogs().slice(-MAX_LOGS)));
    } catch {
      // ignore storage quota errors
    }
  }, 1500);
}

export function addDiagLog(kind: 'ok' | 'err' | 'perf', message: string): void {
  const logs = getDiagLogs();
  logs.push({
    t: formatTs(),
    k: kind,
    m: String(message).slice(0, 600),
  });
  if (logs.length > MAX_LOGS) {
    memLogs = logs.slice(-MAX_LOGS);
  }
  scheduleSave();
  window.dispatchEvent(new CustomEvent('tm-diag-update'));
}

export function clearDiagLogs(): void {
  memLogs = [];
  try {
    localStorage.removeItem(DIAG_KEY);
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent('tm-diag-update'));
}

export function getDiagInfo(): string {
  let vpn = 'n/a';
  try {
    if (window.AndroidPlayer?.isVpnActive) {
      vpn = String(window.AndroidPlayer.isVpnActive());
    }
  } catch {
    vpn = 'n/a';
  }
  const url = String(window.location.href).replace(/^https?:\/\//, '').slice(0, 60);
  return `online=${navigator.onLine} | vpn=${vpn} | native=${window.AndroidPlayer ? 'yes' : 'no'}\n${url}\n${navigator.userAgent.slice(0, 120)}`;
}

export function clearApiCache(): number {
  let count = 0;
  try {
    for (const k of Object.keys(localStorage)) {
      if (k.startsWith(CACHE_PREFIX) || k === CACHE_IDX_KEY) {
        localStorage.removeItem(k);
        count++;
      }
    }
  } catch {
    // ignore
  }
  return count;
}

export function getApiCacheSizeLabel(): string {
  try {
    let bytes = 0;
    for (const k of Object.keys(localStorage)) {
      if (k.startsWith(CACHE_PREFIX) || k === CACHE_IDX_KEY) {
        bytes += (localStorage.getItem(k) || '').length * 2;
      }
    }
    return bytes ? `${(bytes / 1024).toFixed(0)} کیلوبایت` : 'خالی';
  } catch {
    return 'خالی';
  }
}

export function initPerformanceMonitoring(): void {
  if (typeof window === 'undefined') return;
  window.__tooshLog = addDiagLog;
  addDiagLog('ok', 'app started');

  try {
    let last = 0;
    let frames = 0;
    let slow = 0;
    let worst = 0;
    let t0 = 0;
    let y0 = 0;
    let idle: ReturnType<typeof setTimeout> | null = null;
    let raf = 0;
    let ltAt = 0;

    const tick = (now: number) => {
      if (last) {
        const d = now - last;
        frames++;
        if (d > 33) {
          slow++;
          if (d > worst) worst = d;
        }
      }
      last = now;
      raf = requestAnimationFrame(tick);
    };

    const endScroll = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
      const dur = Date.now() - t0;
      if (dur > 350 && frames > 8) {
        addDiagLog(
          'perf',
          `SCROLL ${Math.abs(Math.round((window.scrollY || 0) - y0))}px in ${(dur / 1000).toFixed(1)}s | frames ${frames} | slow(>33ms) ${slow}${slow ? ` | worst ${Math.round(worst)}ms` : ''}`
        );
      }
      frames = 0;
      slow = 0;
      worst = 0;
      t0 = 0;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (!t0) {
          t0 = Date.now();
          y0 = window.scrollY || 0;
        }
        if (!raf) raf = requestAnimationFrame(tick);
        if (idle) clearTimeout(idle);
        idle = setTimeout(endScroll, 220);
      },
      { passive: true }
    );

    if ('PerformanceObserver' in window) {
      new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 120 && Date.now() - ltAt > 500) {
            ltAt = Date.now();
            addDiagLog('perf', `LONGTASK ${Math.round(entry.duration)}ms (main thread blocked)`);
          }
        });
      }).observe({ entryTypes: ['longtask'] });
    }
  } catch {
    // ignore observer unsupported errors
  }
}
