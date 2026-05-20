import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  eyebrow?: string;
  headline: string;
  description: string;
  bullets?: string[];
  image?: { src: string; alt: string };
  visual?: ReactNode;
  cta?: { label: string; href: string };
  imagePosition?: 'left' | 'right';
  className?: string;
}

/**
 * Image-left / image-right feature split. Pass either `image` for an `<img>`,
 * or pass `visual` for fully custom content (chart, demo, code block).
 */
export function FeatureSplit({
  eyebrow,
  headline,
  description,
  bullets = [],
  image,
  visual,
  cta,
  imagePosition = 'right',
  className,
}: Props) {
  const flip = imagePosition === 'left';
  return (
    <section className={cn('py-24 md:py-32 max-w-container-wide mx-auto px-6', className)}>
      <div className={cn('grid lg:grid-cols-2 gap-12 items-center', flip && 'lg:[&>*:first-child]:order-2')}>
        <div className="reveal-on-view">
          {eyebrow && (
            <span className="text-accent text-sm font-mono tracking-widest uppercase">{eyebrow}</span>
          )}
          <h2 className="text-3xl md:text-5xl font-bold font-heading mt-4 mb-6 text-text">
            {headline}
          </h2>
          <p className="text-text-muted text-lg leading-relaxed mb-6">{description}</p>
          {bullets.length > 0 && (
            <ul className="space-y-3 mb-8">
              {bullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-text-muted">
                  <span className="text-accent" aria-hidden="true">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
          {cta && (
            <Button asChild variant="outline">
              <Link to={cta.href}>
                {cta.label} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>

        <div className="reveal-on-view">
          {visual ? (
            visual
          ) : image ? (
            <div className="card-tactile overflow-hidden rounded-2xl aspect-[4/3]">
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default FeatureSplit;
