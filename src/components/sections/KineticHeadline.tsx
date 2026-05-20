import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  text: string;
  eyebrow?: string;
  className?: string;
  /** Wrapper element. Defaults to h1. */
  as?: 'h1' | 'h2' | 'h3';
}

/**
 * Scroll-driven kinetic display headline.
 *
 * On browsers that support `animation-timeline: scroll()` (Chrome 115+, Safari 26+),
 * the headline compresses its variable-font weight + letter-spacing as the user
 * scrolls past the hero. Elsewhere, JS falls back to a one-shot blur-in on mount.
 *
 * Per-letter splitting enables staggered reveal. We split client-side to avoid
 * shipping pre-split markup that screen readers re-read letter by letter — the
 * pre-split spans are added with `aria-hidden` while the original text remains
 * available via `aria-label` on the root.
 */
export function KineticHeadline({ text, eyebrow, className, as: Tag = 'h1' }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    if (CSS.supports?.('animation-timeline: scroll()')) return;

    const words = text.split(/(\s+)/);
    el.innerHTML = '';
    words.forEach((w, i) => {
      if (/\s+/.test(w)) {
        el.appendChild(document.createTextNode(w));
        return;
      }
      const span = document.createElement('span');
      span.textContent = w;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(0.6em)';
      span.style.transition = 'opacity 700ms var(--ease), transform 700ms var(--ease)';
      span.style.transitionDelay = `${i * 60}ms`;
      span.setAttribute('aria-hidden', 'true');
      el.appendChild(span);
      requestAnimationFrame(() => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      });
    });
  }, [text]);

  return (
    <div className={cn('text-center', className)}>
      {eyebrow && (
        <span className="inline-block text-accent text-xs md:text-sm font-mono tracking-[0.3em] uppercase mb-6 px-4 py-2 rounded-full border border-accent/20 bg-accent/5">
          {eyebrow}
        </span>
      )}
      <Tag
        ref={ref}
        aria-label={text}
        className={cn(
          'kinetic-headline gradient-text',
          'font-heading font-extrabold tracking-[-0.04em]',
          'text-[clamp(2.5rem,8vw,7.5rem)] leading-[0.92]'
        )}
      >
        {text}
      </Tag>
    </div>
  );
}

export default KineticHeadline;
