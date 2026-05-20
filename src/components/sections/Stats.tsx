import { AnimatedNumber } from '@/components/AnimatedNumber';
import { cn } from '@/lib/utils';

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
  caption?: string;
}

interface Props {
  stats: Stat[];
  eyebrow?: string;
  headline?: string;
  className?: string;
  /** Grid columns at md+. Default: derived from stats.length (max 4). */
  columns?: 2 | 3 | 4;
}

const COLS: Record<2 | 3 | 4, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
};

export function Stats({ stats, eyebrow, headline, columns, className }: Props) {
  const cols = columns ?? (Math.min(4, Math.max(2, stats.length)) as 2 | 3 | 4);
  return (
    <section className={cn('py-20 md:py-28 max-w-container-wide mx-auto px-6', className)}>
      {(eyebrow || headline) && (
        <div className="text-center mb-12 reveal-on-view">
          {eyebrow && <span className="text-accent text-sm font-mono tracking-widest uppercase">{eyebrow}</span>}
          {headline && (
            <h2 className="text-3xl md:text-5xl font-bold font-heading mt-4 text-text">{headline}</h2>
          )}
        </div>
      )}
      <dl className={cn('grid grid-cols-2 gap-6 md:gap-10', COLS[cols])}>
        {stats.map((s, i) => (
          <div
            key={`${s.label}-${i}`}
            className="text-center p-6 reveal-on-view card-tactile"
          >
            <dt className="sr-only">{s.label}</dt>
            <dd
              className="font-heading text-5xl md:text-6xl font-extrabold tracking-tight gradient-text"
              aria-label={`${s.value}${s.suffix ?? ''}`}
            >
              <AnimatedNumber value={s.value} suffix={s.suffix} />
            </dd>
            <p className="mt-2 text-text font-medium">{s.label}</p>
            {s.caption && <p className="mt-1 text-sm text-text-subtle">{s.caption}</p>}
          </div>
        ))}
      </dl>
    </section>
  );
}

export default Stats;
