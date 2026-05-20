# Profile — Local Service Business

> Plumber, electrician, HVAC, landscaper, roofer, painter, cleaning service, pest control, locksmith, auto repair, etc. Trades + home services.

## When to use this profile

- Service-area business (no walk-in retail)
- Phone-driven conversion
- Local SEO + Google Business Profile critical
- Often "near me" search queries

## Recommended brand settings

```jsonc
{
  "business": { "businessClass": { "$value": "storefront" } },
  "color": {
    "brandHue":    { "$value": "210" },     // dependable blue — or 30 (orange) for safety/energy
    "brandChroma": { "$value": "0.18" }
  },
  "colorScheme":   { "$value": "light" },
  "font": {
    "heading": { "$value": "Bebas Neue" },  // strong, blue-collar bold
    "body":    { "$value": "Inter" }
  },
  "features": {
    "hero":         { "$value": true },
    "logoCloud":    { "$value": true },     // certifications, BBB, license seals
    "bento":        { "$value": false },
    "stats":        { "$value": true },     // "20yr business, 5K homes serviced"
    "services":     { "$value": true },     // what you do
    "process":      { "$value": true },     // how the job goes
    "testimonials": { "$value": true },
    "pricing":      { "$value": false },    // quote-based usually
    "faq":          { "$value": true },     // critical
    "blog":         { "$value": false },
    "team":         { "$value": false },
    "caseStudies":  { "$value": true },     // before/after photos
    "newsletter":   { "$value": false },
    "cta":          { "$value": true }
  }
}
```

See: [examples/_brand.local-service.json](../../examples/_brand.local-service.json)

## Mandatory features

- **Phone CTA above the fold** + sticky on mobile (`<StickyPhoneCTA>`)
- **`tel:` link in nav** with phone number visible
- **Service area** explicit (cities / counties / zip codes)
- **Licensed + insured** badges with license numbers
- **Emergency contact** if 24/7 (use `<EmergencyBanner>` from `src/components/local/`)
- **Before/after gallery** (`<BeforeAfterSlider>`)
- **Review CTAs** (Google + Yelp links)
- **Map embed** + service area polygon on contact page

## Homepage composition

```tsx
<HeroSplit
  eyebrow="24/7 emergency · Anchorage"
  headline="Plumbing done right. The first time."
  subheadline="Family-owned since 2003. Licensed Alaska plumber #12345. Same-day service, weekends included."
  primary={{ label: 'Call (907) 555-0100', href: 'tel:+19075550100' }}
  secondary={{ label: 'Request a quote', href: '/contact' }}
  image={{ src: '/team-truck.jpg', alt: 'Our team of three plumbers standing in front of the company truck' }}
  trustBadges={[
    { icon: 'star', label: '4.9 / 5 Google · 412 reviews' },
    { icon: 'shield', label: 'Licensed AK #12345' },
    { icon: 'award', label: 'A+ BBB rating' },
  ]}
/>

<TrustBadges items={[
  { icon: 'shield', label: 'Licensed' },
  { icon: 'shield', label: 'Insured' },
  { icon: 'shield', label: 'Bonded' },
  { icon: 'award',  label: 'BBB A+' },
  { icon: 'award',  label: 'Angi Top Pro' },
]} />

<ServiceCards items={[
  { title: 'Drain cleaning',       icon: 'Wrench', description: 'Clogs, blockages, sewer lines. Same-day service.' },
  { title: 'Water heater repair',  icon: 'Zap',    description: 'Repair or replacement. 24-hour emergency service.' },
  { title: 'Pipe burst + leaks',   icon: 'Droplet',description: 'Emergency response. We close walls back up.' },
  { title: 'Bathroom remodel',     icon: 'Home',   description: 'Full bath renovations. Fixed quote upfront.' },
]} />

<ProcessSteps
  eyebrow="How it works"
  steps={[
    { title: 'Call',           description: 'Pick up the phone. We answer 24/7.' },
    { title: 'Free estimate',  description: 'We come to you. Inspect. Quote in writing.' },
    { title: 'Work begins',    description: 'Most jobs same-day. We protect your floors + clean up.' },
    { title: 'Warranty',       description: '2-year warranty on labor. Manufacturer warranty on parts.' },
  ]}
/>

<CaseStudyGrid
  eyebrow="Recent work"
  studies={[
    { slug: 'sewer-line-replacement', title: 'Sewer line replacement — Sand Lake', client: 'Homeowner', industry: 'Repair',
      summary: '90-year-old clay sewer line replaced with PEX in one day. No yard damage — used trenchless boring.',
      cover: '/work/sewer.jpg' },
  ]}
/>

<TestimonialCarousel testimonials={[
  { name: 'Sarah J.', role: 'Sand Lake homeowner', quote: 'Came out at 11pm on a Sunday. Fixed the leak. Charged a fair price. Will call them every time.', rating: 5 },
]} />

<FAQ items={[
  { question: 'What area do you serve?',          answer: 'All of Anchorage, Eagle River, Chugiak, Wasilla, and Palmer. Free estimates within 25 miles of downtown.' },
  { question: 'Do you offer 24/7 emergency service?', answer: 'Yes. After-hours call (907) 555-0100 — calls forward to our on-call plumber. Emergency dispatch within 60 minutes in Anchorage.' },
  { question: 'Are you licensed and insured?',    answer: 'Yes. Alaska plumbing license #12345 (active). $2M general liability + workers comp insurance.' },
  { question: 'Do you offer warranties?',         answer: '2-year warranty on labor. Manufacturer warranty on parts (typically 1–10 years).' },
  { question: 'How quickly can you come out?',    answer: 'Same-day for most non-emergency calls scheduled before noon. Emergency: 60 minutes in Anchorage.' },
  { question: 'Do you offer free estimates?',     answer: 'Yes — within 25 miles of downtown Anchorage. Estimates beyond that range have a $50 trip fee, credited back if you hire us.' },
]} />

<GoogleMapEmbed query="Anchorage Alaska" />

<CTASection
  eyebrow="Need a plumber?"
  headline="Call now — we answer 24/7."
  primary={{ label: 'Call (907) 555-0100', href: 'tel:+19075550100' }}
  secondary={{ label: 'Request a quote', href: '/contact' }}
  tone="emphatic"
/>

<StickyPhoneCTA phone="+19075550100" label="Call now" />
```

## JSON-LD specifics

```tsx
<JsonLd data={{
  '@context': 'https://schema.org',
  '@type': 'Plumber',                              // or 'Electrician', 'HVACBusiness', etc.
  name: brand.business.name,
  url: brand.business.url,
  telephone: brand.business.phone,
  address: { /* PostalAddress */ },
  areaServed: [
    { '@type': 'City', name: 'Anchorage' },
    { '@type': 'City', name: 'Eagle River' },
    { '@type': 'City', name: 'Wasilla' },
  ],
  hasOfferCatalog: { /* OfferCatalog with services */ },
  priceRange: '$$',
  openingHoursSpecification: [...],
}} />
```

## Copy tone

- **Direct + practical** — homeowner under stress
- **Visible phone above the fold** — and on every page
- **Specific service area** (counties, cities, zips)
- **License numbers visible** — trust signal
- **Real warranty terms** — not "satisfaction guaranteed" hand-wave

## Don't include

- Stock photos of "smiling technicians"
- Generic "we deliver quality service" copy
- Hidden phone numbers (must be visible without scrolling)
- "Up to 50% off" — undermines pricing integrity
- Auto-playing video with sound (homeowners on mobile mid-emergency)
