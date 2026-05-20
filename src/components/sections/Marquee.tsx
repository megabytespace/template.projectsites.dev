import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  items: ReactNode[];
  className?: string;
  speed?: 'slow' | 'normal' | 'fast';
  reverse?: boolean;
  pauseOnHover?: boolean;
}

const SPEED: Record<NonNullable<Props['speed']>, string> = {
  slow:   '60s',
  normal: '28s',
  fast:   '14s',
};

/**
 * Infinite-loop marquee with `prefers-reduced-motion` kill-switch.
 * Duplicates the track once so the seam is invisible. Hover-pause optional.
 */
export function Marquee({ items, className, speed = 'normal', reverse, pauseOnHover }: Props) {
  const dur = SPEED[speed];
  const dir = reverse ? 'reverse' : 'normal';
  return (
    <div
      className={cn('marquee', pauseOnHover && 'hover:[&_.marquee__track]:[animation-play-state:paused]', className)}
      aria-hidden="true"
    >
      <div className="marquee__track" style={{ animationDuration: dur, animationDirection: dir }}>
        {items.map((it, i) => (
          <div key={`a-${i}`} className="flex items-center justify-center shrink-0">{it}</div>
        ))}
      </div>
      <div className="marquee__track" style={{ animationDuration: dur, animationDirection: dir }}>
        {items.map((it, i) => (
          <div key={`b-${i}`} className="flex items-center justify-center shrink-0">{it}</div>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
