# Profile — Medical / Dental / Clinic

## When to use this profile

- Healthcare practice (dentist, physician, urgent care, specialist)
- HIPAA-bound; trust + credibility critical
- Local SEO + appointment booking are primary conversion paths

## Recommended brand settings

```jsonc
{
  "business": { "businessClass": { "$value": "medical" } },
  "color": {
    "brandHue":    { "$value": "200" },     // calming blue
    "brandChroma": { "$value": "0.12" }     // low chroma = trustworthy
  },
  "colorScheme":   { "$value": "light" },
  "font": {
    "heading": { "$value": "Lora" },        // serif = competent + warm
    "body":    { "$value": "Inter" }
  },
  "features": {
    "hero":         { "$value": true },
    "logoCloud":    { "$value": false },
    "bento":        { "$value": true },     // services as bento
    "stats":        { "$value": true },     // "20yr practice, 5000 patients"
    "services":     { "$value": true },     // procedures / treatments
    "process":      { "$value": true },     // patient journey
    "testimonials": { "$value": true },
    "pricing":      { "$value": false },    // insurance-driven, not retail
    "faq":          { "$value": true },     // critical — insurance, hours, etc.
    "blog":         { "$value": true },     // health content
    "team":         { "$value": true },     // doctor credentials
    "caseStudies":  { "$value": false },
    "newsletter":   { "$value": false },
    "cta":          { "$value": true }
  }
}
```

See: [examples/_brand.medical.json](../../examples/_brand.medical.json)

## Mandatory features

- **Online booking** — link to scheduling tool (Zocdoc, NextGen, Kareo, custom)
- **Phone CTA** above the fold + `<StickyPhoneCTA>` on mobile
- **Insurance accepted** list visible on home + contact
- **Hours** in nav + footer + JSON-LD
- **HIPAA + Section 504** statement on `/accessibility` and `/privacy`
- **HHS Section 504 deadline**: May 2026 for federal-fund recipients (see `docs/ACCESSIBILITY.md`)
- **`MedicalBusiness` JSON-LD** with `geo`, `openingHoursSpecification`, `medicalSpecialty`

## Homepage composition

```tsx
<HeroSplit
  eyebrow="Family dentistry · Anchorage"
  headline="Gentle care for every smile in your family."
  subheadline="Accepting new patients. Most major insurance accepted. Open Tue–Sat with Saturday hours."
  primary={{ label: 'Book online', href: '/book' }}
  secondary={{ label: 'Call (907) 555-0100', href: 'tel:+19075550100' }}
  image={{ src: '/clinic-hero.jpg', alt: 'Dr. Chen greeting a child patient at the front desk' }}
/>

<BentoGrid headline="Services we provide" tiles={[
  { id: 'preventive', title: 'Preventive care',  description: 'Cleanings, x-rays, fluoride, sealants.', span: 'sm', icon: <Shield /> },
  { id: 'cosmetic',   title: 'Cosmetic dentistry', description: 'Whitening, veneers, Invisalign.',       span: 'sm', icon: <Sparkles /> },
  { id: 'restorative',title: 'Restorative',        description: 'Crowns, bridges, implants.',            span: 'md', icon: <Wrench /> },
  { id: 'pediatric',  title: 'Pediatric',          description: 'Specialized care for ages 1–17.',       span: 'lg', tall: true, accent: true, icon: <Heart /> },
]} />

<FeatureSplit
  eyebrow="About"
  headline="Dr. Maria Chen, DDS"
  description="20 years in practice. UCLA School of Dentistry. Member of the ADA, AAPD, and Anchorage Dental Society."
  bullets={['UCLA DDS, 2003', 'AAPD member since 2007', 'ADA member', '5,000+ patients served']}
  image={{ src: '/dr-chen.jpg', alt: 'Dr. Maria Chen in her office' }}
/>

<TestimonialCarousel testimonials={[...]} />

<FAQ items={[
  { question: 'What insurance do you accept?', answer: 'Aetna, BCBS, Cigna, Delta Dental, MetLife, United Healthcare. Call for others — we may be in-network.' },
  { question: 'Do you accept new patients?',   answer: 'Yes. Schedule online at our booking link or call (907) 555-0100. New-patient exams take 60–90 minutes.' },
  { question: 'What are your hours?',          answer: 'Tuesday–Friday 8am–5pm. Saturday 9am–2pm. Closed Sunday and Monday.' },
  { question: 'Do you treat children?',        answer: 'Yes. Dr. Chen has 18 years of pediatric experience and the office is family-friendly.' },
  { question: 'What if I have a dental emergency?', answer: 'Call (907) 555-0100 anytime — after-hours calls forward to our on-call dentist. For life-threatening emergencies, call 911.' },
  { question: 'Are payment plans available?',  answer: 'Yes. We work with CareCredit and offer in-office payment plans for treatments over $500.' },
]} />

<GoogleMapEmbed query="1234 4th Avenue Anchorage AK" />

<CTASection
  eyebrow="Ready?"
  headline="Schedule your visit"
  primary={{ label: 'Book online', href: '/book' }}
  secondary={{ label: 'Call (907) 555-0100', href: 'tel:+19075550100' }}
  tone="quiet"
/>
```

## JSON-LD specifics

```tsx
<JsonLd data={{
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: brand.business.name,
  url: brand.business.url,
  telephone: brand.business.phone,
  address: { /* PostalAddress */ },
  geo: { '@type': 'GeoCoordinates', latitude: 61.2181, longitude: -149.9003 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tu','We','Th','Fr'], opens: '08:00', closes: '17:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sa', opens: '09:00', closes: '14:00' },
  ],
  medicalSpecialty: ['Dentistry','PediatricDentistry'],
  acceptedInsurance: ['Aetna','BlueCrossBlueShield','Cigna','DeltaDental','MetLife','UnitedHealthcare'],
}} />
```

## Copy tone

- **Warm + clinical** — competent but human
- **Specific credentials** (school, year, society memberships)
- **Insurance front and center** — friction-reducer
- **Hours visible everywhere** — never hide
- **Avoid medical claims** without sources — FDA / FTC regulated

## Don't include

- "Cutting-edge technology" without specifics
- Smiling stock photos that look generic
- Long mission statements
- Self-promotional credentials lists beyond what's relevant
- Claims about outcomes without evidence
