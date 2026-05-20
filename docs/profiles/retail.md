# Profile — Retail / E-Commerce Marketing Site

> This template is for the **marketing surface** of a retail brand. The actual shop runs on Shopify / WooCommerce / Stripe Catalog elsewhere. Links from this site go to the storefront.

## When to use this profile

- Brand awareness + acquisition site
- Catalog spotlight + new launches
- Editorial content + lookbooks
- Drives traffic to Shopify / similar

## Recommended brand settings

```jsonc
{
  "business": { "businessClass": { "$value": "retail" } },
  "color": {
    "brandHue":    { "$value": "340" },     // editorial pink/rose
    "brandChroma": { "$value": "0.22" }
  },
  "colorScheme":   { "$value": "light" },
  "font": {
    "heading": { "$value": "Playfair Display" },
    "body":    { "$value": "Inter" }
  },
  "features": {
    "hero":         { "$value": true },
    "logoCloud":    { "$value": false },
    "bento":        { "$value": true },     // product category bento
    "stats":        { "$value": false },
    "services":     { "$value": false },
    "process":      { "$value": false },
    "testimonials": { "$value": true },     // reviews
    "pricing":      { "$value": false },    // pricing lives on the shop
    "faq":          { "$value": true },     // shipping, returns, sizing
    "blog":         { "$value": true },     // editorial / lookbook
    "team":         { "$value": false },
    "caseStudies":  { "$value": false },
    "newsletter":   { "$value": true },     // critical for retention
    "cta":          { "$value": true }
  }
}
```

See: [examples/_brand.retail.json](../../examples/_brand.retail.json)

## Homepage composition

```tsx
<HeroSplit
  eyebrow="New collection"
  headline="Spring '26. Out now."
  primary={{ label: 'Shop the collection', href: 'https://shop.brand.com/collections/spring-26' }}
  secondary={{ label: 'Lookbook', href: '/lookbook' }}
  image={{ src: '/hero-spring.jpg', alt: 'Model in a linen jacket against a sunlit wall' }}
/>

<BentoGrid headline="Shop by category" tiles={[
  { id: 'tops',     title: 'Tops',     description: 'Tees, blouses, sweaters.', href: 'https://shop.brand.com/tops',     image: '/cat/tops.jpg' },
  { id: 'bottoms',  title: 'Bottoms',  description: 'Pants, skirts, shorts.',   href: 'https://shop.brand.com/bottoms',  image: '/cat/bottoms.jpg' },
  { id: 'outer',    title: 'Outerwear',description: 'Jackets, coats, vests.',   href: 'https://shop.brand.com/outer',    image: '/cat/outer.jpg', span: 'md' },
  { id: 'shoes',    title: 'Shoes',    description: 'Sneakers, sandals, boots.',href: 'https://shop.brand.com/shoes',    image: '/cat/shoes.jpg', span: 'md' },
]} />

<FeatureSplit
  eyebrow="About"
  headline="Made well. Sold honestly."
  description="Independent label. Designed in Brooklyn, manufactured in Portugal. Materials we'd wear ourselves. Prices we don't apologize for."
  bullets={['Made in Portugal — same factory since 2018', 'GOTS-certified organic cotton on every piece', 'Free returns within 30 days']}
  cta={{ label: 'Our story', href: '/about' }}
/>

<Newsletter
  headline="First to know."
  description="New drops every other Tuesday. Subscriber-only previews. No spam, ever."
/>

<TestimonialCarousel testimonials={[
  { name: 'Priya S.', role: 'Verified buyer', quote: 'The linen shirt is everything I wanted. Better in person.', rating: 5 },
  { name: 'Jordan K.', role: 'Verified buyer', quote: 'Sized as expected. Shipped in 2 days. Will buy more.', rating: 5 },
]} />

<FAQ items={[
  { question: 'When will my order ship?',  answer: 'Within 2 business days. US ground delivery is 3–5 business days. Express options at checkout.' },
  { question: 'What is your return policy?', answer: 'Free returns within 30 days. Items must be unworn with tags. Refund processed within 5 business days of receipt.' },
  { question: 'Do you ship internationally?', answer: 'Yes — Canada, UK, EU, AU. Duties calculated at checkout.' },
  { question: 'How do I find my size?',      answer: 'See our size guide at /size-guide. Items run true to size. Email size@brand.com if you\'re between sizes.' },
  { question: 'Are your materials sustainable?', answer: 'Cotton is GOTS-certified organic. Linen and wool come from named mills (see product pages). We publish a yearly sourcing report at /transparency.' },
]} />

<CTASection
  eyebrow="Shop"
  headline="The Spring '26 collection is live."
  primary={{ label: 'Shop now', href: 'https://shop.brand.com/collections/spring-26' }}
  secondary={{ label: 'See lookbook', href: '/lookbook' }}
  tone="emphatic"
/>
```

## Mandatory pages

- `/` Home (above)
- `/about` — brand story + transparency
- `/lookbook` — editorial photography
- `/blog` — editorial content (lookbooks, interviews, behind-the-scenes)
- `/contact` — support form
- `/size-guide` — measurement table
- `/shipping` — full policy
- `/returns` — full policy
- `/transparency` — sourcing, factory, materials

## Copy tone

- **Concise + confident** — let product photography do the heavy lifting
- **Specific materials + origin** ("GOTS-certified organic cotton" not "premium fabric")
- **Honest pricing posture** — don't apologize for the price
- **First-person plural** ("We make…")

## Don't include

- "Up to 70% off" banners (cheapens the brand)
- Generic stock model photography
- Fake urgency ("Only 3 left!")
- Auto-playing video with sound
- Pop-ups that block scrolling
