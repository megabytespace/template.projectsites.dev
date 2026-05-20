import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  headline: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  eyebrow?: string;
  /** Tone: emphatic uses gradient bg; quiet uses card-tactile. */
  tone?: 'emphatic' | 'quiet';
  className?: string;
}

export function CTASection({
  headline,
  description,
  primary,
  secondary,
  eyebrow,
  tone = 'emphatic',
  className,
}: Props) {
  return (
    <section className={cn('py-20 md:py-28 max-w-container-normal mx-auto px-6', className)}>
      <div
        className={cn(
          'relative overflow-hidden text-center p-12 md:p-20 rounded-3xl reveal-on-view',
          tone === 'emphatic'
            ? 'bg-gradient-to-br from-primary/20 via-accent/10 to-background border border-accent/20 shadow-glow'
            : 'card-tactile'
        )}
      >
        {tone === 'emphatic' && (
          <div aria-hidden="true" className="absolute inset-0 grain pointer-events-none" />
        )}
        {eyebrow && (
          <span className="text-accent text-sm font-mono tracking-widest uppercase">{eyebrow}</span>
        )}
        <h2 className="mt-4 text-3xl md:text-5xl font-bold font-heading text-text">
          <span className={tone === 'emphatic' ? 'gradient-text' : ''}>{headline}</span>
        </h2>
        {description && (
          <p className="mt-6 text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">{description}</p>
        )}
        {(primary || secondary) && (
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            {primary && (
              <Button asChild size="xl">
                <Link to={primary.href}>
                  {primary.label} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            )}
            {secondary && (
              <Button asChild size="xl" variant="outline">
                <Link to={secondary.href}>{secondary.label}</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default CTASection;
