import { useState, type FormEvent } from 'react';
import { Mail, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  endpoint?: string;
  headline?: string;
  description?: string;
  /** Lead-magnet badge ("Free PDF · 28 pages") above the headline. */
  badge?: string;
  className?: string;
  /** Display variant. `inline` is the default boxed section; `bar` is a thin full-width strip. */
  variant?: 'inline' | 'bar';
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Newsletter / lead-magnet signup section.
 *
 * POSTs to `endpoint` (default `/api/newsletter`). Implement the backend
 * separately — projectsites.dev wires this to a Cloudflare Worker that
 * relays to Resend / Listmonk / similar.
 *
 * For double-opt-in flows: backend should return 202 + send the confirm email.
 * The component shows a "Check your inbox" success message regardless.
 */
export function Newsletter({
  endpoint = '/api/newsletter',
  headline = 'Stay in the loop',
  description = 'Monthly insights. No spam. Unsubscribe anytime.',
  badge,
  variant = 'inline',
  className,
}: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || status === 'submitting') return;
    setStatus('submitting');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Subscription failed');
      setStatus('success');
      setMessage('Subscribed. Check your inbox to confirm.');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  return (
    <section className={cn(variant === 'bar' ? 'py-8' : 'py-20 md:py-24 max-w-container-normal mx-auto px-6', className)}>
      <div className={cn('glass rounded-2xl p-8 md:p-12 reveal-on-view', variant === 'bar' && 'rounded-none p-6')}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="md:max-w-md">
            {badge && (
              <span className="inline-block text-accent text-xs font-mono tracking-widest uppercase mb-3 px-3 py-1 rounded-full border border-accent/20 bg-accent/5">
                {badge}
              </span>
            )}
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-text mb-2">{headline}</h2>
            <p className="text-text-muted text-sm md:text-base">{description}</p>
          </div>
          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 md:flex-1 md:max-w-md" noValidate>
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <div className="relative flex-1">
              <Mail size={18} aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-text-subtle" />
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={status === 'submitting'}
                aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                className="w-full pl-11 pr-4 py-3 rounded-lg bg-surface border border-border text-text placeholder:text-text-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors min-h-[44px]"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'submitting' || !email}
              className="bg-accent hover:bg-accent-hover text-background font-bold px-6 py-3 rounded-lg transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 min-h-[44px]"
            >
              {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
        </div>
        {status === 'success' && (
          <p className="mt-4 flex items-center gap-2 text-sm text-success" role="status">
            <Check size={16} aria-hidden="true" /> {message}
          </p>
        )}
        {status === 'error' && (
          <p id="newsletter-error" className="mt-4 flex items-center gap-2 text-sm text-danger" role="alert">
            <AlertCircle size={16} aria-hidden="true" /> {message}
          </p>
        )}
      </div>
    </section>
  );
}

export default Newsletter;
