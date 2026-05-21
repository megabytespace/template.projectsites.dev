/**
 * Applied output — Restaurant JSON-LD for Northern Lights Bakery.
 *
 * Drop into src/pages/Home.tsx in addition to (or replacing) the
 * default `buildSiteJsonLd()` call. Provides type-specific schema
 * fields that Google rich-results uses for Restaurant cards.
 */
import { JsonLd } from '@/components/JsonLd';
import { brand } from '@/brand';

export function NorthernLightsBakerySchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Bakery',
        '@id': `${brand.business.url}#org`,
        name: brand.business.name,
        url: brand.business.url,
        telephone: brand.business.phone,
        email: brand.business.email,
        description: brand.business.description,
        image: `${brand.business.url}/og-image.png`,
        logo: `${brand.business.url}/logo.png`,
        foundingDate: '1987',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '1234 4th Avenue',
          addressLocality: 'Anchorage',
          addressRegion: 'AK',
          postalCode: '99501',
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 61.2181,
          longitude: -149.9003,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            opens: '06:00',
            closes: '15:00',
          },
        ],
        priceRange: '$',
        servesCuisine: ['Bakery', 'American', 'Pastry'],
        acceptsReservations: false,
        menu: `${brand.business.url}/menu`,
        paymentAccepted: ['Cash', 'Credit Card', 'Apple Pay', 'Google Pay'],
        currenciesAccepted: 'USD',
        hasMap: 'https://www.google.com/maps?q=1234+4th+Ave+Anchorage+AK',
        sameAs: [
          'https://facebook.com/northernlightsbakery',
          'https://instagram.com/northernlightsbakery',
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '387',
          bestRating: '5',
        },
        award: '"Best of Anchorage" 2024',
      }}
    />
  );
}
