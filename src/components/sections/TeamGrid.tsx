import { JsonLd } from '@/components/JsonLd';
import { cn } from '@/lib/utils';

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  photo?: string;
  links?: { label: string; href: string }[];
}

interface Props {
  members: TeamMember[];
  eyebrow?: string;
  headline?: string;
  description?: string;
  className?: string;
}

export function TeamGrid({
  members,
  eyebrow = 'Our team',
  headline = 'The humans behind the work',
  description,
  className,
}: Props) {
  return (
    <section className={cn('py-24 md:py-32 max-w-container-wide mx-auto px-6', className)}>
      <JsonLd
        data={members.map((m) => ({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: m.name,
          jobTitle: m.role,
          image: m.photo,
          sameAs: m.links?.map((l) => l.href),
        }))}
      />
      <div className="text-center mb-16 reveal-on-view">
        <span className="text-accent text-sm font-mono tracking-widest uppercase">{eyebrow}</span>
        <h2 className="text-3xl md:text-5xl font-bold font-heading mt-4 mb-4 text-text">{headline}</h2>
        {description && <p className="text-text-muted max-w-2xl mx-auto text-lg">{description}</p>}
      </div>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map((m, i) => (
          <li key={`${m.name}-${i}`} className="card-tactile overflow-hidden reveal-on-view">
            <div className="aspect-square bg-surface-elevated overflow-hidden">
              {m.photo ? (
                <img
                  src={m.photo}
                  alt={`Portrait of ${m.name}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-6xl font-heading font-extrabold text-accent/30">
                  {m.name
                    .split(/\s+/)
                    .slice(0, 2)
                    .map((s) => s[0])
                    .join('')}
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="font-heading text-xl font-bold text-text">{m.name}</h3>
              <p className="text-accent text-sm font-mono">{m.role}</p>
              {m.bio && <p className="mt-3 text-text-muted text-sm leading-relaxed">{m.bio}</p>}
              {m.links && m.links.length > 0 && (
                <ul className="mt-4 flex gap-3 flex-wrap">
                  {m.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target={l.href.startsWith('http') ? '_blank' : undefined}
                        rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-text-muted hover:text-accent text-sm underline-hover"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TeamGrid;
