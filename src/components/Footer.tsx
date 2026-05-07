import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

interface NavRoute {
  to: string;
  label: string;
}

interface Props {
  routes?: NavRoute[];
  socials?: { label: string; href: string }[];
}

const DEFAULT_ROUTES: NavRoute[] = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
];

export default function Footer({ routes = DEFAULT_ROUTES, socials = [] }: Props) {
  const address = '{BUSINESS_ADDRESS}';
  const phone = '{BUSINESS_PHONE}';
  const email = '{BUSINESS_EMAIL}';
  const mapHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  const phoneHref = `tel:${phone.replace(/[^+\d]/g, '')}`;
  const emailHref = `mailto:${email}`;

  return (
    <footer className="relative bg-[#060610] text-white/70 pt-20 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <h3 className="text-white font-bold text-xl mb-4 font-heading">
              {'{BUSINESS_NAME}'}
            </h3>
            <p className="text-sm leading-relaxed">{'{BUSINESS_DESCRIPTION}'}</p>
            {socials.length > 0 && (
              <ul className="flex flex-wrap gap-3 mt-6" aria-label="Social media">
                {socials.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/10 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                      aria-label={s.label}
                    >
                      <span className="text-xs font-mono">{s.label.slice(0, 2).toUpperCase()}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Footer navigation">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              {routes.map((r) => (
                <li key={r.to}>
                  <Link
                    to={r.to}
                    className="hover:text-[var(--color-accent)] transition-colors underline-offset-4 hover:underline"
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
              Contact
            </h4>
            <address className="not-italic space-y-3 text-sm">
              <a
                href={mapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-[var(--color-accent)] transition-colors underline-offset-4 hover:underline"
              >
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-white/40" aria-hidden="true" />
                <span>{address}</span>
              </a>
              <a
                href={phoneHref}
                className="flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors underline-offset-4 hover:underline"
              >
                <Phone size={16} className="flex-shrink-0 text-white/40" aria-hidden="true" />
                <span>{phone}</span>
              </a>
              <a
                href={emailHref}
                className="flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors underline-offset-4 hover:underline break-all"
              >
                <Mail size={16} className="flex-shrink-0 text-white/40" aria-hidden="true" />
                <span>{email}</span>
              </a>
            </address>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
              Legal
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-[var(--color-accent)] transition-colors underline-offset-4 hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-[var(--color-accent)] transition-colors underline-offset-4 hover:underline"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/accessibility"
                  className="hover:text-[var(--color-accent)] transition-colors underline-offset-4 hover:underline"
                >
                  Accessibility
                </Link>
              </li>
              <li>
                <Link
                  to="/sitemap"
                  className="hover:text-[var(--color-accent)] transition-colors underline-offset-4 hover:underline"
                >
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} {'{BUSINESS_NAME}'}. All rights reserved.</p>
          <p>
            Built with{' '}
            <a
              href="https://projectsites.dev"
              className="text-[var(--color-accent)]/70 hover:text-[var(--color-accent)] transition-colors underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              ProjectSites
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
