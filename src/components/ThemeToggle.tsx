import { useEffect, useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';

type Mode = 'dark' | 'light' | 'auto';
const ORDER: Mode[] = ['dark', 'light', 'auto'];
const ICONS: Record<Mode, typeof Moon> = { dark: Moon, light: Sun, auto: Monitor };
const STORAGE_KEY = 'projectsites:theme';

export function ThemeToggle({ className }: { className?: string }) {
  const [mode, setMode] = useState<Mode>('dark');

  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as Mode | null) ?? (document.documentElement.dataset.theme as Mode) ?? 'dark';
    setMode(stored);
    document.documentElement.dataset.theme = stored;
  }, []);

  function cycle() {
    const next = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length];
    setMode(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* private mode */ }
  }

  const Icon = ICONS[mode];
  return (
    <button
      type="button"
      onClick={cycle}
      className={`h-10 w-10 rounded-full border border-border bg-surface hover:bg-surface-elevated transition-colors flex items-center justify-center text-text ${className ?? ''}`}
      aria-label={`Theme: ${mode}. Click to cycle.`}
    >
      <Icon size={18} />
    </button>
  );
}

export default ThemeToggle;
