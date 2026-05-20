import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface ProcessStep {
  title: string;
  description: string;
  icon?: ReactNode;
}

interface Props {
  steps: ProcessStep[];
  eyebrow?: string;
  headline?: string;
  description?: string;
  className?: string;
}

/**
 * Numbered process steps with connector line. Three-or-more steps form a
 * horizontal flow on md+, a vertical timeline below. Each step is a tactile
 * card to anchor the editorial brutalism aesthetic.
 */
export function ProcessSteps({ steps, eyebrow = 'How it works', headline, description, className }: Props) {
  return (
    <section className={cn('py-24 md:py-32 max-w-container-wide mx-auto px-6', className)}>
      <div className="text-center mb-16 reveal-on-view">
        <span className="text-accent text-sm font-mono tracking-widest uppercase">{eyebrow}</span>
        {headline && (
          <h2 className="text-3xl md:text-5xl font-bold font-heading mt-4 mb-4 text-text">
            {headline}
          </h2>
        )}
        {description && <p className="text-text-muted max-w-2xl mx-auto text-lg">{description}</p>}
      </div>

      <ol className="relative grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="relative card-tactile p-6 md:p-8 reveal-on-view"
          >
            <span
              aria-hidden="true"
              className="absolute -top-4 -left-2 font-heading text-7xl font-extrabold text-accent/15 leading-none"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="relative">
              {step.icon && (
                <div className="h-12 w-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                  {step.icon}
                </div>
              )}
              <h3 className="font-heading text-xl font-bold text-text mb-2">{step.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default ProcessSteps;
