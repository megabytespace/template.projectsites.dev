import { Check, X, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

type Cell = boolean | string | 'partial';

export interface ComparisonRow {
  feature: string;
  values: Cell[];
  description?: string;
}

interface Props {
  columns: string[];
  rows: ComparisonRow[];
  eyebrow?: string;
  headline?: string;
  /** Highlight a single column (0-indexed) as "the recommended one." */
  highlightColumn?: number;
  className?: string;
}

/**
 * Competitive / tier comparison table. First column = features. Subsequent
 * columns are options. Cell values: `true|false|"partial"` render icons;
 * strings render verbatim.
 */
export function Comparison({ columns, rows, eyebrow, headline, highlightColumn, className }: Props) {
  return (
    <section className={cn('py-24 md:py-32 max-w-container-wide mx-auto px-6', className)}>
      {(eyebrow || headline) && (
        <div className="text-center mb-12 reveal-on-view">
          {eyebrow && <span className="text-accent text-sm font-mono tracking-widest uppercase">{eyebrow}</span>}
          {headline && (
            <h2 className="text-3xl md:text-5xl font-bold font-heading mt-4 text-text">{headline}</h2>
          )}
        </div>
      )}
      <div className="overflow-x-auto card-tactile">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="text-left p-4 md:p-6 font-heading text-sm font-semibold text-text-muted uppercase tracking-wider">
                Feature
              </th>
              {columns.map((c, i) => (
                <th
                  key={c}
                  scope="col"
                  className={cn(
                    'p-4 md:p-6 font-heading text-base font-bold',
                    highlightColumn === i
                      ? 'bg-accent/10 text-accent'
                      : 'text-text'
                  )}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row) => (
              <tr key={row.feature} className="hover:bg-surface-elevated transition-colors">
                <th scope="row" className="text-left p-4 md:p-6 align-top">
                  <span className="block text-text font-medium">{row.feature}</span>
                  {row.description && <span className="block text-xs text-text-subtle mt-1">{row.description}</span>}
                </th>
                {row.values.map((v, i) => (
                  <td
                    key={i}
                    className={cn(
                      'p-4 md:p-6 text-center',
                      highlightColumn === i && 'bg-accent/5'
                    )}
                  >
                    {v === true && <Check className="inline text-success" size={20} aria-label="Yes" />}
                    {v === false && <X className="inline text-text-subtle" size={20} aria-label="No" />}
                    {v === 'partial' && <Minus className="inline text-warning" size={20} aria-label="Partial" />}
                    {typeof v === 'string' && <span className="text-text-muted text-sm">{v}</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Comparison;
