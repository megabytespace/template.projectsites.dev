import { JsonLd } from './JsonLd';

type ArticleType = 'Article' | 'BlogPosting' | 'NewsArticle' | 'ScholarlyArticle';

interface Props {
  type?: ArticleType;
  headline: string;
  description?: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authors: { name: string; url?: string }[];
  publisher: { name: string; logo?: string };
  keywords?: string[];
  inLanguage?: string;
  citation?: { name: string; url?: string }[];
}

export function ArticleJsonLd({
  type = 'Article',
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authors,
  publisher,
  keywords,
  inLanguage = 'en',
  citation,
}: Props) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': type,
    headline,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished,
    dateModified: dateModified ?? datePublished,
    inLanguage,
    author: authors.map((a) => ({
      '@type': 'Person',
      name: a.name,
      ...(a.url ? { url: a.url } : {}),
    })),
    publisher: {
      '@type': 'Organization',
      name: publisher.name,
      ...(publisher.logo
        ? { logo: { '@type': 'ImageObject', url: publisher.logo } }
        : {}),
    },
  };
  if (description) data.description = description;
  if (image) data.image = image;
  if (keywords?.length) data.keywords = keywords.join(', ');
  if (citation?.length) {
    data.citation = citation.map((c) => ({
      '@type': 'CreativeWork',
      name: c.name,
      ...(c.url ? { url: c.url } : {}),
    }));
  }
  return <JsonLd data={data} />;
}
