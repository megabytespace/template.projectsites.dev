import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavLink {
  to: string;
  label: string;
}

interface Props {
  links?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
}

const DEFAULT_LINKS: NavLink[] = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
];

export default function Header({
  links = DEFAULT_LINKS,
  ctaLabel = 'Get in Touch',
  ctaHref = '/contact',
}: Props) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 glass-strong">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center" aria-label="Primary">
        <Link
          to="/"
          className="text-white font-bold text-xl font-heading tracking-tight hover:text-[var(--color-accent)] transition-colors"
        >
          {'{BUSINESS_NAME}'}
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {links.map((l) => {
            const isActive = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                aria-current={isActive ? 'page' : undefined}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-[var(--color-accent)]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            to={ctaHref}
            className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-[#0a0a1a] font-bold text-sm px-5 py-2.5 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--color-accent)]/20"
          >
            {ctaLabel}
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden text-white/80 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="md:hidden glass border-t border-white/5 px-6 py-4 space-y-1">
          {links.map((l) => {
            const isActive = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                aria-current={isActive ? 'page' : undefined}
                className={`block py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[var(--color-accent)] bg-white/5'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            to={ctaHref}
            className="block mt-4 text-center bg-[var(--color-accent)] text-[#0a0a1a] font-bold text-sm px-5 py-3 rounded-lg"
            onClick={() => setOpen(false)}
          >
            {ctaLabel}
          </Link>
        </div>
      )}
    </header>
  );
}
