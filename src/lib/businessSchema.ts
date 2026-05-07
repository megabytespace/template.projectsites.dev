export type BusinessClass =
  | 'storefront'
  | 'restaurant'
  | 'medical'
  | 'retail'
  | 'salon'
  | 'gym'
  | 'auto-repair'
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
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': isLocal ? 'LocalBusiness' : 'Organization',
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

export function isLocalBusinessClass(value: BusinessClass): boolean {
  return LOCAL_BUSINESS_CLASSES.has(value);
}
