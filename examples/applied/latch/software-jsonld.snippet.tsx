/**
 * Applied output — SoftwareApplication JSON-LD for Latch.
 *
 * Drop into src/pages/Home.tsx in addition to the default `buildSiteJsonLd()`.
 * Provides SoftwareApplication + Offer schemas that Google rich-results uses
 * for software cards in SERPs + AI Overviews.
 */
import { JsonLd } from '@/components/JsonLd';
import { brand } from '@/brand';

export function LatchSoftwareSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': `${brand.business.url}#app`,
        name: brand.business.name,
        applicationCategory: 'DeveloperApplication',
        applicationSubCategory: 'CodeReview',
        operatingSystem: 'Web',
        url: brand.business.url,
        description: brand.business.description,
        image: `${brand.business.url}/og-image.png`,
        screenshot: `${brand.business.url}/screenshot-pr.png`,
        softwareVersion: '2.4.0',
        datePublished: '2024-03-12',
        dateModified: '2026-05-20',
        author: {
          '@type': 'Organization',
          name: brand.business.name,
          url: brand.business.url,
        },
        publisher: { '@id': `${brand.business.url}#org` },
        offers: [
          {
            '@type': 'Offer',
            name: 'Free',
            price: '0',
            priceCurrency: 'USD',
            description: 'Solo developers + public repos. 5 PRs/month.',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            name: 'Team',
            price: '19',
            priceCurrency: 'USD',
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: '19',
              priceCurrency: 'USD',
              unitCode: 'MON',
              referenceQuantity: { '@type': 'QuantitativeValue', value: '1', unitCode: 'C62' },
            },
            description: 'Engineering teams 2-50. Unlimited PRs.',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            name: 'Enterprise',
            priceCurrency: 'USD',
            description: 'Self-hosted. SCIM. 7-year audit log. Dedicated CSM.',
            availability: 'https://schema.org/InStock',
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'USD',
              minPrice: '499',
            },
          },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '412',
          bestRating: '5',
          worstRating: '1',
        },
        featureList: [
          'AI code review',
          'Race-condition detection',
          'Regex DoS detection',
          'Unsafe-SQL detection',
          'Missing null-check detection',
          'Custom rules in YAML',
          'GitHub + GitLab + Bitbucket integration',
          'SAML SSO',
          'SCIM provisioning',
          'Self-hosted (Helm)',
          'SOC 2 Type II',
          'GDPR compliant',
        ],
        keywords: 'AI code review, pull request review, static analysis, code quality, GitHub App, SOC 2',
      }}
    />
  );
}
