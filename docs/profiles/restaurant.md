# Profile — Restaurant / Café / Bar

## When to use this profile

- Single-location food / beverage business
- Walk-in + reservations + takeout
- Menu-driven discovery
- Local SEO priority

## Recommended brand settings

```jsonc
{
  "business": { "businessClass": { "$value": "restaurant" } },
  "color": {
    "brandHue":    { "$value": "20" },        // warm amber / orange
    "brandChroma": { "$value": "0.22" }
  },
  "colorScheme":   { "$value": "light" },     // food sites usually feel best light
  "font": {
    "heading": { "$value": "Playfair Display" },  // editorial elegance
    "body":    { "$value": "Inter" }
  },
  "features": {
    "hero":         { "$value": true },
    "logoCloud":    { "$value": false },
    "bento":        { "$value": false },      // menu is the bento equivalent
    "stats":        { "$value": false },
    "services":     { "$value": true },       // re-purpose as menu/offerings
    "process":      { "$value": false },
    "testimonials": { "$value": true },
    "pricing":      { "$value": false },
    "faq":          { "$value": true },
    "blog":         { "$value": false },
    "team":         { "$value": false },
    "caseStudies":  { "$value": false },
    "newsletter":   { "$value": true },
    "cta":          { "$value": true }
  }
}
```

See: [examples/_brand.restaurant.json](../../examples/_brand.restaurant.json)

## Homepage composition

```tsx
<HeroSplit
  eyebrow="Anchorage · since 1987"
  headline="Sourdough, pastries, and seasonal cakes."
  subheadline="Baked daily at 1234 4th Avenue. Open Tue–Sun, 6am–3pm."
  primary={{ label: 'Order online', href: '/order' }}
  secondary={{ label: 'See menu', href: '/menu' }}
  image={{ src: '/hero-bakery.jpg', alt: 'Sourdough loaves cooling on a wire rack at first light' }}
  trustBadges={[
    { icon: 'star', label: '4.9 / 5 on Google · 387 reviews' },
    { icon: 'award', label: '"Best of Anchorage" 2024' },
  ]}
/>

<FeatureSplit
  eyebrow="Our story"
  headline="Three generations. Same sourdough starter."
  description="Started by my grandfather in 1987. Same recipes, same starter (named Olga), same dawn shifts."
  bullets={[
    'Single-origin flours from Alaska Flour Co.',
    'Filtered water, sea salt, time',
    'No commercial yeast. No shortcuts.',
  ]}
  image={{ src: '/family.jpg', alt: 'Three generations of bakers at the wooden counter' }}
  imagePosition="left"
/>

{/* Menu — use Services as a menu surrogate or build a custom /menu page */}
<section id="menu" data-gallery="menu" className="py-20 max-w-container-normal mx-auto px-6">
  <h2 className="text-4xl font-heading mb-8">Menu</h2>
  {menu.map(cat => (
    <div key={cat.category} className="mb-12">
      <h3 className="text-2xl font-heading underline-hover inline-block mb-6">{cat.category}</h3>
      <ul className="divide-y divide-border">
        {cat.items.map(item => (
          <li key={item.name} className="flex justify-between py-4">
            <div>
              <span className="font-heading font-semibold">{item.name}</span>
              <p className="text-text-muted text-sm">{item.description}</p>
            </div>
            <span className="font-mono text-accent">{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  ))}
</section>

<TestimonialCarousel testimonials={[
  { name: 'Jordan T.',  role: 'Regular since 2019', quote: 'Their morning bun is the reason I moved to this block.', rating: 5 },
  { name: 'Priya M.',   role: 'Local food writer',  quote: 'The best croissant in Anchorage. Not close.', rating: 5, citationUrl: 'https://example.com/review' },
]} />

<GoogleMapEmbed query="1234 4th Avenue Anchorage AK" />

<FAQ items={[
  { question: 'Do you take reservations?',     answer: 'Walk-in only. We hold tables for 15 minutes during peak hours.' },
  { question: 'Do you have gluten-free options?', answer: 'Yes — a rotating GF loaf, scones, and cakes. Cross-contamination is possible; we are not a dedicated GF kitchen.' },
  { question: 'Can I order a custom cake?',    answer: 'Yes. 5 business days notice for standard cakes, 10 for wedding cakes. Email cakes@northernlightsbakery.com.' },
  { question: 'Do you cater?',                 answer: 'Yes. Minimum $250 order, 48 hours notice. Email catering@northernlightsbakery.com.' },
  { question: 'Where do you source flour?',    answer: 'Single-origin from Alaska Flour Company in Delta Junction. We pick up monthly.' },
]} />

<CTASection
  eyebrow="Visit"
  headline="See you tomorrow at six."
  primary={{ label: 'Get directions', href: 'https://www.google.com/maps/dir/?api=1&destination=1234+4th+Ave+Anchorage+AK' }}
  secondary={{ label: 'Call (907) 555-0100', href: 'tel:+19075550100' }}
/>
```

## Mandatory additions

- **`<StickyPhoneCTA>`** from `src/components/local/` mounted in `Layout.tsx` for mobile
- **`tel:` link in nav** — already conditional via `business.phone`
- **Google Maps embed** on contact page + footer
- **NAP block** (Name / Address / Phone) consistent on every page — Footer handles this
- **LocalBusiness JSON-LD** with `geo`, `openingHoursSpecification`, `priceRange`, `menu` (Restaurant subtype)

Pass geo + hours via homepage JSON-LD:

```tsx
<JsonLd data={{
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': `${brand.business.url}#org`,
  name: brand.business.name,
  url: brand.business.url,
  address: { /* PostalAddress */ },
  geo: { '@type': 'GeoCoordinates', latitude: 61.2181, longitude: -149.9003 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tu','We','Th','Fr','Sa','Su'], opens: '06:00', closes: '15:00' },
  ],
  servesCuisine: ['Bakery','American','Pastry'],
  priceRange: '$',
  acceptsReservations: false,
  menu: `${brand.business.url}/menu`,
}} />
```

## Copy tone

- **First-person plural** ("We bake…"). Family-owned warmth.
- **Specific origin claims** ("Single-origin flour from Alaska Flour Co.") — concrete, citable
- **Hours always visible** — never hide behind "Hours" link
- **Phone number visible above the fold** — local-business conversion driver

## Don't include

- Stock photos of "perfect" food — use real, slightly imperfect shots
- Generic "Welcome" / "About us" copy
- Bullet lists of bland adjectives ("fresh, delicious, hand-crafted")
- Pricing tier tables
- Newsletter-spam tactics
