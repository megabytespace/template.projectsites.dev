import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X, Command as CommandIcon } from 'lucide-react';
import { brand } from '@/brand';
import { ThemeToggle } from './ThemeToggle';

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
  { to: '/',         label: 'Home' },
  { to: '/about',    label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/pricing',  label: 'Pricing' },
  { to: '/contact',  label: 'Contact' },
];

export default function Header({
  links = DEFAULT_LINKS,
  ctaLabel = 'Get in Touch',
  ctaHref = '/contact',
}: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const business = brand.business.name || 'ProjectSites';
  const isMac = typeof navigator !== 'undefined' && /mac/i.test(navigator.platform);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-base ${
        scrolled ? 'glass-strong shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-container-wide mx-auto px-6 py-4 flex justify-between items-center" aria-label="Primary">
        <Link
          to="/"
          className="text-text font-bold text-xl font-heading tracking-tight hover:text-accent transition-colors"
        >
          {business}
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          {links.map((l) => {
            const isActive = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                aria-current={isActive ? 'page' : undefined}
                className={`text-sm font-medium transition-colors underline-hover ${
                  isActive ? 'text-accent' : 'text-text-muted hover:text-text'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => {
              const ev = new KeyboardEvent('keydown', { key: 'k', metaKey: !!isMac, ctrlKey: !isMac, bubbles: true });
              window.dispatchEvent(ev);
            }}
            className="hidden lg:flex items-center gap-2 px-3 h-10 rounded-md border border-border bg-surface text-text-muted hover:text-text transition-colors text-sm"
            aria-label="Open command palette"
          >
            <CommandIcon size={14} />
            <span>Search</span>
            <span className="cmdk-kbd ml-2">{isMac ? '⌘' : 'Ctrl'} K</span>
          </button>
          <ThemeToggle />
          <Link
            to={ctaHref}
            className="bg-accent hover:bg-accent-hover text-background font-bold text-sm px-5 py-2.5 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-glow"
          >
            {ctaLabel}
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden text-text/80 hover:text-text transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="md:hidden glass border-t border-border px-6 py-4 space-y-1">
          {links.map((l) => {
            const isActive = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                aria-current={isActive ? 'page' : undefined}
                className={`block py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-accent bg-surface'
                    : 'text-text-muted hover:text-text hover:bg-surface'
                }`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            );
          })}
          <div className="flex items-center justify-between pt-3">
            <ThemeToggle />
            <Link
              to={ctaHref}
              className="bg-accent text-background font-bold text-sm px-5 py-3 rounded-lg"
              onClick={() => setOpen(false)}
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
