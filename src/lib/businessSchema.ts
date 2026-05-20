export type BusinessClass =
  | 'storefront'
  | 'restaurant'
  | 'medical'
  | 'retail'
  | 'salon'
  | 'gym'
  | 'auto-repair'
  | 'saas'
  | 'portfolio'
  | 'nonprofit'
  | 'legal'
  | 'organization';

const LOCAL_BUSINESS_CLASSES: ReadonlySet<BusinessClass> = new Set([
  'storefront',
  'restaurant',
  'medical',
  'retail',
  'salon',
  'gym',
  'auto-repair',
]);

const TYPE_OVERRIDES: Partial<Record<BusinessClass, string>> = {
  restaurant:    'Restaurant',
  medical:       'MedicalBusiness',
  retail:        'Store',
  salon:         'BeautySalon',
  gym:           'ExerciseGym',
  'auto-repair': 'AutoRepair',
  legal:         'LegalService',
  nonprofit:     'NGO',
  saas:          'SoftwareApplication',
};

export interface BusinessProfile {
  name: string;
  description: string;
  url: string;
  businessClass: BusinessClass;
  logo?: string;
  email?: string;
  phone?: string;
  sameAs?: string[];
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: { latitude: number; longitude: number };
  openingHours?: string[];
  priceRange?: string;
  founder?: { name: string; jobTitle?: string; sameAs?: string[] };
  foundingDate?: string;
}

export function buildBusinessJsonLd(profile: BusinessProfile): Record<string, unknown> {
  const isLocal = LOCAL_BUSINESS_CLASSES.has(profile.businessClass);
  const type = TYPE_OVERRIDES[profile.businessClass] ?? (isLocal ? 'LocalBusiness' : 'Organization');

  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${profile.url}#org`,
    name: profile.name,
    description: profile.description,
    url: profile.url,
  };
  if (profile.logo) base.logo = profile.logo;
  if (profile.email) base.email = profile.email;
  if (profile.phone) base.telephone = profile.phone;
  if (profile.sameAs?.length) base.sameAs = profile.sameAs;
  if (profile.foundingDate) base.foundingDate = profile.foundingDate;
  if (profile.founder) {
    base.founder = {
      '@type': 'Person',
      name: profile.founder.name,
      ...(profile.founder.jobTitle ? { jobTitle: profile.founder.jobTitle } : {}),
      ...(profile.founder.sameAs?.length ? { sameAs: profile.founder.sameAs } : {}),
    };
  }
  if (profile.address) {
    base.address = {
      '@type': 'PostalAddress',
      streetAddress: profile.address.streetAddress,
      addressLocality: profile.address.addressLocality,
      addressRegion: profile.address.addressRegion,
      postalCode: profile.address.postalCode,
      addressCountry: profile.address.addressCountry,
    };
  }
  if (isLocal && profile.geo) {
    base.geo = {
      '@type': 'GeoCoordinates',
      latitude: profile.geo.latitude,
      longitude: profile.geo.longitude,
    };
  }
  if (isLocal && profile.openingHours?.length) base.openingHoursSpecification = profile.openingHours;
  if (isLocal && profile.priceRange) base.priceRange = profile.priceRange;
  return base;
}

/**
 * Build the full per-page JSON-LD graph (5+ nodes per always.md).
 * Returns an array so consumers can drop it straight into <JsonLd data={...} />.
 */
export function buildSiteJsonLd(profile: BusinessProfile): Record<string, unknown>[] {
  const organization = buildBusinessJsonLd(profile);

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${profile.url}#website`,
    name: profile.name,
    url: profile.url,
    description: profile.description,
    publisher: { '@id': `${profile.url}#org` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${profile.url}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const webpage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${profile.url}#webpage`,
    url: profile.url,
    name: profile.name,
    description: profile.description,
    isPartOf: { '@id': `${profile.url}#website` },
    about: { '@id': `${profile.url}#org` },
    inLanguage: 'en-US',
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: profile.url },
    ],
  };

  return [organization, website, webpage, breadcrumb];
}

export function isLocalBusinessClass(value: BusinessClass): boolean {
  return LOCAL_BUSINESS_CLASSES.has(value);
}
