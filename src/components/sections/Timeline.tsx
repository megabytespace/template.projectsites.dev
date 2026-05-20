import { cn } from '@/lib/utils';

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  link?: { href: string; label: string };
  image?: string;
  imageAlt?: string;
}

interface Props {
  events: TimelineEvent[];
  eyebrow?: string;
  headline?: string;
  description?: string;
  className?: string;
  /** Direction the timeline grows. Default `vertical`. */
  orientation?: 'vertical' | 'horizontal';
}

/**
 * Historical timeline section.
 *
 * For real historical content with dated events, use `image` carefully —
 * see `~/.claude/rules/always.md` rule "Every historical timeline" — only
 * primary-source photos (Wikimedia Commons, Library of Congress, NPGallery,
 * archive material). Never AI-generated or "evocative" stock next to a
 * dated event. Blank entry > faked entry.
 */
export function Timeline({
  events,
  eyebrow,
  headline,
  description,
  orientation = 'vertical',
  className,
}: Props) {
  if (events.length === 0) return null;
  return (
    <section className={cn('py-24 md:py-32 max-w-container-normal mx-auto px-6', className)}>
      {(eyebrow || headline) && (
        <div className="text-center mb-16 reveal-on-view">
          {eyebrow && <span className="text-accent text-sm font-mono tracking-widest uppercase">{eyebrow}</span>}
          {headline && <h2 className="text-3xl md:text-5xl font-bold font-heading mt-4 mb-4 text-text">{headline}</h2>}
          {description && <p className="text-text-muted max-w-2xl mx-auto">{description}</p>}
        </div>
      )}

      {orientation === 'vertical' ? (
        <ol className="relative border-l-2 border-border pl-8 space-y-10">
          {events.map((e, i) => (
            <li key={`${e.year}-${i}`} className="relative reveal-on-view">
              <span
                aria-hidden="true"
                className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full bg-accent ring-4 ring-background"
              />
              <time className="text-accent font-mono text-sm tracking-widest" dateTime={e.year}>
                {e.year}
              </time>
              <h3 className="text-xl font-bold text-text mt-1 mb-2 font-heading">{e.title}</h3>
              {e.image && (
                <figure className="my-4 max-w-md">
                  <img
                    src={e.image}
                    alt={e.imageAlt ?? ''}
                    loading="lazy"
                    className="rounded-md border border-border"
                  />
                </figure>
              )}
              <p className="text-text-muted leading-relaxed">{e.description}</p>
              {e.link && (
                <a
                  href={e.link.href}
                  className="inline-block mt-3 text-sm text-accent underline-hover"
                  {...(e.link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {e.link.label} →
                </a>
              )}
            </li>
          ))}
        </ol>
      ) : (
        <ol className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory">
          {events.map((e, i) => (
            <li
              key={`${e.year}-${i}`}
              className="card-tactile p-6 min-w-[280px] snap-start reveal-on-view"
            >
              <time className="text-accent font-mono text-sm tracking-widest" dateTime={e.year}>
                {e.year}
              </time>
              <h3 className="text-lg font-bold text-text mt-2 mb-2 font-heading">{e.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{e.description}</p>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default Timeline;
