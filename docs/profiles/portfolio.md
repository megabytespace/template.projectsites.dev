# Profile — Portfolio / Personal Site

## When to use this profile

- Designer, developer, photographer, writer, or other creative
- Solo practitioner; showcases work + about + contact
- Lead-gen for freelance / contract work
- Personal brand site

## Recommended brand settings

```jsonc
{
  "business": { "businessClass": { "$value": "portfolio" } },
  "color": {
    "brandHue":    { "$value": "270" },     // violet — creative
    "brandChroma": { "$value": "0.16" }
  },
  "colorScheme":   { "$value": "dark" },
  "font": {
    "heading": { "$value": "Cabinet Grotesk" },
    "body":    { "$value": "Satoshi" }
  },
  "features": {
    "hero":         { "$value": true },
    "logoCloud":    { "$value": true },     // "Worked with…"
    "bento":        { "$value": false },
    "stats":        { "$value": false },
    "services":     { "$value": true },     // skills / offerings
    "process":      { "$value": true },     // how you work
    "testimonials": { "$value": true },
    "pricing":      { "$value": false },    // project-based, quote on request
    "faq":          { "$value": true },
    "blog":         { "$value": true },     // optional
    "team":         { "$value": true },     // single-member, just you
    "caseStudies":  { "$value": true },     // critical — replaces services
    "newsletter":   { "$value": false },
    "cta":          { "$value": true }
  }
}
```

See: [examples/_brand.portfolio.json](../../examples/_brand.portfolio.json)

## Homepage composition

```tsx
<HeroCenter
  eyebrow="Designer · Developer · Toronto"
  headline="I build websites that actually convert."
  subheadline="Independent product designer for 8 years. I focus on conversion-driven marketing sites for SaaS and B2B."
  primary={{ label: 'See selected work', href: '/case-studies' }}
  secondary={{ label: 'Email me', href: 'mailto:hi@maria.design' }}
  trustBadges={[
    { icon: 'star', label: '"Best portfolio I've seen this year" — Awwwards' },
    { icon: 'award', label: 'Site of the Day · Awwwards' },
    { icon: 'shield', label: 'Open for projects · Q3 2026' },
  ]}
/>

<CaseStudyGrid
  eyebrow="Work"
  headline="Selected case studies"
  studies={[
    { slug: 'acme-cr',   title: 'Acme — 34% lift in conversion',     client: 'Acme Inc.', industry: 'B2B SaaS',
      summary: 'Reworked the onboarding flow. Cut activation from 8 steps to 3.',
      cover: '/work/acme.jpg',
      metrics: [{ value: '+34%', label: 'Conversion' }, { value: '−62%', label: 'Time to value' }, { value: '4.8★', label: 'CSAT' }] },
    { slug: 'globex-rb', title: 'Globex — Brand refresh + new identity', client: 'Globex Corp.', industry: 'Enterprise',
      summary: 'New visual system. Rolled out across 14 products in 8 weeks.',
      cover: '/work/globex.jpg',
      metrics: [{ value: '14', label: 'Products' }, { value: '8wk', label: 'Rollout' }, { value: '+22%', label: 'Brand recall' }] },
  ]}
/>

<FeatureSplit
  eyebrow="About"
  headline="I'm Maria. I design things that ship."
  description="Designer for 8 years. Previously at Stripe, then Shopify. Now independent. Based in Toronto, working with teams globally."
  bullets={[
    '8+ years product design',
    'Shipped 50+ marketing sites',
    'Awwwards SOTD × 3',
    'Toronto-based, available remote',
  ]}
  cta={{ label: 'More about me', href: '/about' }}
  image={{ src: '/maria.jpg', alt: 'Maria at her desk in Toronto' }}
  imagePosition="left"
/>

<LogoCloud
  eyebrow="Worked with"
  logos={[
    { name: 'Stripe' }, { name: 'Shopify' }, { name: 'Linear' },
    { name: 'Vercel' }, { name: 'Notion' }, { name: 'Figma' },
  ]}
/>

<ProcessSteps
  eyebrow="How I work"
  steps={[
    { title: 'Discovery',   description: '30-min call. We scope the problem and goals.',     icon: <MessageSquare /> },
    { title: 'Design',      description: 'Wireframes Mon, hi-fi by Fri. You see daily progress.', icon: <Sparkles /> },
    { title: 'Build',       description: 'I code the final site. No handoff to a dev team.', icon: <Rocket /> },
    { title: 'Launch',      description: 'Deploy + handoff in week 4. 30 days of support included.', icon: <Award /> },
  ]}
/>

<TestimonialCarousel testimonials={[
  { name: 'Jordan K.', role: 'CEO', company: 'Acme', quote: 'Maria reworked our home page in 3 weeks. Conversion went from 1.8% to 2.4%. Best ROI we've had on a contractor.', rating: 5 },
  { name: 'Priya S.',  role: 'Head of Marketing', company: 'Globex', quote: 'She gets product, not just visuals. We trust her with strategy now too.', rating: 5 },
]} />

<FAQ items={[
  { question: 'How long does a project take?',         answer: 'Most projects are 4 weeks end-to-end. Larger scopes are 6–8 weeks. I take one project at a time, so timing depends on my booking.' },
  { question: 'What do you charge?',                  answer: 'Projects start at $12K. I quote per project, not per hour. You get a fixed price after our 30-min discovery call.' },
  { question: 'Do you work with agencies?',           answer: 'Yes — white-label is fine. NDAs no problem.' },
  { question: 'Where are you based?',                 answer: 'Toronto, Canada. I work with teams globally — async-friendly.' },
  { question: 'Do you handle development too?',       answer: 'Yes. I design and code the final site. No handoff to a dev team.' },
]} />

<CTASection
  eyebrow="Open for Q3 2026"
  headline="Let's build something worth shipping."
  primary={{ label: 'Email me', href: 'mailto:hi@maria.design' }}
  secondary={{ label: 'Schedule a 30-min call', href: 'https://cal.com/maria/intro' }}
/>
```

## Pages

- `/` Home (above)
- `/about` — long-form bio + photos + history
- `/case-studies` — full grid (already built)
- `/case-studies/:slug` — deep-dive per project
- `/services` — what you offer (design, dev, consulting)
- `/contact` — form + Cal.com embed
- `/blog` — optional writing

## Copy tone

- **First-person singular** ("I design…")
- **Specific** about industry / discipline / location
- **Show outcomes, not adjectives** ("Conversion +34%" not "great results")
- **Transparent about availability** ("Open for Q3 2026" or "Booked through end of year")
- **Concrete pricing range** even if quote-based ("Projects start at $12K")

## Don't include

- Generic "Hire me" CTAs without specifics
- Endless skill clouds (React / Figma / Adobe / etc.) — show outcomes instead
- Stock photos of "creative workspace"
- Walls of text — let the work speak
- Pricing tiers (project-based, not tiered)
