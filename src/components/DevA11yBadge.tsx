import { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

/**
 * Dev-only accessibility badge.
 *
 * In `import.meta.env.DEV`, a small floating chip in the bottom-left shows
 * a real-time count of axe-core violations on the current page. Click to
 * print full details to the console.
 *
 * Lazy-loads `axe-core` only in dev — zero production bundle impact.
 */
export function DevA11yBadge() {
  const [violations, setViolations] = useState<number | null>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!import.meta.env.DEV) return;

    let cancelled = false;

    async function check() {
      setRunning(true);
      try {
        const axe = await import('axe-core').catch(() => null);
        if (!axe || cancelled) return;
        const results = await axe.default.run(document, {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag22aa'] },
        });
        if (!cancelled) {
          setViolations(results.violations.length);
          (window as Window & { __axeResults?: unknown }).__axeResults = results;
        }
      } catch {
        /* axe not installed in this build */
      } finally {
        if (!cancelled) setRunning(false);
      }
    }

    // First check after content settles
    const t = window.setTimeout(check, 1500);

    // Recheck on route change
    const handler = () => {
      window.clearTimeout(t);
      window.setTimeout(check, 800);
    };
    window.addEventListener('popstate', handler);

    return () => {
      cancelled = true;
      window.clearTimeout(t);
      window.removeEventListener('popstate', handler);
    };
  }, []);

  if (!import.meta.env.DEV) return null;
  if (violations === null && !running) return null;

  const isClean = violations === 0;
  const Icon = isClean ? CheckCircle : AlertCircle;

  return (
    <button
      type="button"
      onClick={() => {
        const r = (window as Window & { __axeResults?: { violations: unknown[] } }).__axeResults;
        if (r) console.log('[a11y]', r.violations);
      }}
      className={`fixed bottom-4 left-4 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono shadow-lg ${
        running
          ? 'bg-info/20 text-info border border-info/30'
          : isClean
            ? 'bg-success/15 text-success border border-success/30'
            : 'bg-danger/15 text-danger border border-danger/30'
      }`}
      title={running ? 'Running axe…' : isClean ? '0 a11y violations' : 'Click to log violations'}
      aria-live="polite"
    >
      <Icon size={12} />
      <span>{running ? 'a11y…' : `${violations} a11y`}</span>
    </button>
  );
}

export default DevA11yBadge;
