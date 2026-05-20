import { useSEO } from '@/hooks/useSEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { BlogList, CTASection, type BlogPostSummary } from '@/components/sections';
import { brand } from '@/brand';

/**
 * Demo posts. The site generator overwrites this array, or swaps it to read
 * from `src/content/blog.json` (created at generation time). Keep this file
 * shape so consumers don't refactor.
 */
const posts: BlogPostSummary[] = [
  {
    slug: '{BLOG_1_SLUG}',
    title: '{BLOG_1_TITLE}',
    excerpt: '{BLOG_1_EXCERPT}',
    date: '{BLOG_1_DATE}',
    author: '{BLOG_1_AUTHOR}',
    category: '{BLOG_1_CATEGORY}',
    cover: '{BLOG_1_COVER}',
    readMinutes: 6,
  },
  {
    slug: '{BLOG_2_SLUG}',
    title: '{BLOG_2_TITLE}',
    excerpt: '{BLOG_2_EXCERPT}',
    date: '{BLOG_2_DATE}',
    author: '{BLOG_2_AUTHOR}',
    category: '{BLOG_2_CATEGORY}',
    cover: '{BLOG_2_COVER}',
    readMinutes: 4,
  },
  {
    slug: '{BLOG_3_SLUG}',
    title: '{BLOG_3_TITLE}',
    excerpt: '{BLOG_3_EXCERPT}',
    date: '{BLOG_3_DATE}',
    author: '{BLOG_3_AUTHOR}',
    category: '{BLOG_3_CATEGORY}',
    cover: '{BLOG_3_COVER}',
    readMinutes: 7,
  },
];

export default function Blog() {
  useSEO({
    title: `Blog — ${brand.business.name}`,
    description: `Articles, guides, and stories from ${brand.business.name}.`,
  });

  return (
    <>
      <Breadcrumbs baseUrl={brand.business.url} />
      <BlogList
        posts={posts}
        eyebrow="Writing"
        headline="Notes from the field"
      />
      <CTASection
        eyebrow="Newsletter"
        headline="Get monthly insights — no spam"
        primary={{ label: 'Subscribe', href: '/contact?intent=newsletter' }}
        tone="quiet"
      />
    </>
  );
}
