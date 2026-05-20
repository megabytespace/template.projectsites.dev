/**
 * Tests the JSON-LD graph builder in `src/lib/businessSchema.ts`.
 */
import { describe, it, expect } from 'vitest';
import { buildBusinessJsonLd, buildSiteJsonLd, isLocalBusinessClass } from '@/lib/businessSchema';

const baseProfile = {
  name: 'Acme Inc.',
  description: 'We make widgets.',
  url: 'https://acme.example',
  businessClass: 'saas' as const,
  email: 'hello@acme.example',
};

describe('buildBusinessJsonLd', () => {
  it('emits SoftwareApplication for saas businessClass', () => {
    const json = buildBusinessJsonLd(baseProfile);
    expect(json['@type']).toBe('SoftwareApplication');
    expect(json['@context']).toBe('https://schema.org');
    expect(json.name).toBe('Acme Inc.');
  });

  it('emits Restaurant for restaurant businessClass with full local fields', () => {
    const json = buildBusinessJsonLd({
      ...baseProfile,
      businessClass: 'restaurant',
      address: { streetAddress: '123 Main', addressLocality: 'Anchorage', addressRegion: 'AK', postalCode: '99501', addressCountry: 'US' },
      geo: { latitude: 61.2, longitude: -149.9 },
      openingHours: ['Tu-Su 06:00-15:00'],
      priceRange: '$',
    });
    expect(json['@type']).toBe('Restaurant');
    expect(json.geo).toEqual(expect.objectContaining({ '@type': 'GeoCoordinates' }));
    expect(json.openingHoursSpecification).toBeDefined();
    expect(json.priceRange).toBe('$');
  });

  it('omits geo + openingHours for non-local businesses', () => {
    const json = buildBusinessJsonLd({
      ...baseProfile,
      businessClass: 'saas',
      geo: { latitude: 0, longitude: 0 },
      openingHours: ['Mo-Fr 09:00-17:00'],
      priceRange: '$$',
    });
    expect(json.geo).toBeUndefined();
    expect(json.openingHoursSpecification).toBeUndefined();
    expect(json.priceRange).toBeUndefined();
  });

  it('includes founder Person sub-object when provided', () => {
    const json = buildBusinessJsonLd({
      ...baseProfile,
      founder: { name: 'Jane Doe', jobTitle: 'CEO', sameAs: ['https://x.com/jane'] },
    });
    expect((json.founder as Record<string, unknown>)['@type']).toBe('Person');
    expect((json.founder as Record<string, unknown>).name).toBe('Jane Doe');
    expect((json.founder as Record<string, unknown>).jobTitle).toBe('CEO');
  });
});

describe('buildSiteJsonLd', () => {
  it('returns at least 4 JSON-LD nodes', () => {
    const graph = buildSiteJsonLd(baseProfile);
    expect(graph.length).toBeGreaterThanOrEqual(4);
  });

  it('includes Organization + WebSite + WebPage + BreadcrumbList types', () => {
    const graph = buildSiteJsonLd(baseProfile);
    const types = graph.map((n) => n['@type']);
    expect(types).toContain('WebSite');
    expect(types).toContain('WebPage');
    expect(types).toContain('BreadcrumbList');
  });

  it('WebSite has SearchAction potentialAction', () => {
    const graph = buildSiteJsonLd(baseProfile);
    const website = graph.find((n) => n['@type'] === 'WebSite');
    expect(website?.potentialAction).toBeDefined();
  });
});

describe('isLocalBusinessClass', () => {
  it.each([
    ['storefront',  true],
    ['restaurant',  true],
    ['medical',     true],
    ['retail',      true],
    ['salon',       true],
    ['gym',         true],
    ['auto-repair', true],
    ['saas',        false],
    ['portfolio',   false],
    ['nonprofit',   false],
    ['legal',       false],
    ['organization',false],
  ] as const)('%s → %s', (cls, expected) => {
    expect(isLocalBusinessClass(cls)).toBe(expected);
  });
});
