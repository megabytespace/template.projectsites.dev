import { useParams, Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { CTASection } from '@/components/sections';
import { brand } from '@/brand';

/**
 * BlogPost detail page. Reads `:slug` from the route. In the generated site,
 * Claude swaps the `POST` map below with the real content (or loads from a
 * Markdown index). The placeholder structure stays so consumers don't refactor.
 */

interface PostContent {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  cover: string;
  body: string[];
}

const POST: PostContent = {
  title: '{POST_TITLE}',
  excerpt: '{POST_EXCERPT}',
  date: '{POST_DATE}',
  author: '{POST_AUTHOR}',
  category: '{POST_CATEGORY}',
  cover: '{POST_COVER}',
  body: ['{POST_PARAGRAPH_1}', '{POST_PARAGRAPH_2}', '{POST_PARAGRAPH_3}', '{POST_PARAGRAPH_4}'],
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  useSEO({
    title: `${POST.title} — ${brand.business.name}`,
    description: POST.excerpt,
  });

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: POST.title,
          description: POST.excerpt,
          image: POST.cover,
          datePublished: POST.date,
          author: { '@type': 'Person', name: POST.author },
          publisher: {
            '@type': 'Organization',
            name: brand.business.name,
            url: brand.business.url,
          },
          mainEntityOfPage: `${brand.business.url}/blog/${slug ?? ''}`,
        }}
      />

      <Breadcrumbs
        baseUrl={brand.business.url}
        trail={[{ label: 'Home', to: '/' }, { label: 'Blog', to: '/blog' }, { label: POST.title }]}
      />

      <article className="max-w-container-prose mx-auto px-6 pt-8 pb-24">
        <header className="mb-12 reveal-on-view">
          <Link to="/blog" className="text-accent font-mono text-sm uppercase tracking-widest hover:underline">
            ← {POST.category}
          </Link>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold font-heading tracking-tight leading-tight gradient-text">
            {POST.title}
          </h1>
          <p className="mt-4 text-text-muted text-lg leading-relaxed">{POST.excerpt}</p>
          <p className="mt-6 text-sm text-text-subtle">
            By {POST.author} ·{' '}
            <time dateTime={POST.date}>
              {new Date(POST.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          </p>
        </header>

        {POST.cover && (
          <div className="mb-12 card-tactile overflow-hidden rounded-2xl aspect-[16/9]">
            <img
              src={POST.cover}
              alt={`Cover image for ${POST.title}`}
              loading="eager"
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="prose prose-invert max-w-none space-y-6 text-text-muted text-lg leading-[1.75]">
          {POST.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>

      <CTASection
        eyebrow="Liked this?"
        headline="Read more from us"
        primary={{ label: 'All posts', href: '/blog' }}
        secondary={{ label: 'Subscribe', href: '/contact?intent=newsletter' }}
        tone="quiet"
      />
    </>
  );
}
