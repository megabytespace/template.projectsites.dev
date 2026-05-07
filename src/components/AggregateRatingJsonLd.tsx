import { JsonLd } from './JsonLd';

interface Review {
  author: string;
  reviewBody: string;
  reviewRating: number;
  datePublished?: string;
}

interface Props {
  itemName: string;
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
  reviews?: Review[];
}

export function AggregateRatingJsonLd({
  itemName,
  ratingValue,
  reviewCount,
  bestRating = 5,
  worstRating = 1,
  reviews = [],
}: Props) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: itemName,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      reviewCount,
      bestRating,
      worstRating,
    },
  };
  if (reviews.length) {
    data.review = reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewBody: r.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.reviewRating,
        bestRating,
        worstRating,
      },
      ...(r.datePublished ? { datePublished: r.datePublished } : {}),
    }));
  }
  return <JsonLd data={data} />;
}
