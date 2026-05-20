# Profile — Agency / Studio

## When to use this profile

- Multi-person design / development / marketing studio
- Project-based work for clients
- Mid-to-high price point
- Reputation + portfolio drives sales

## Recommended brand settings

```jsonc
{
  "business": { "businessClass": { "$value": "organization" } },
  "color": {
    "brandHue":    { "$value": "0" },          // bold red — or pick to differentiate
    "brandChroma": { "$value": "0.22" }
  },
  "colorScheme":   { "$value": "dark" },
  "font": {
    "heading": { "$value": "Archivo Black" },
    "body":    { "$value": "Archivo" }
  },
  "features": {
    "hero":         { "$value": true },
    "logoCloud":    { "$value": true },        // critical — client logos
    "bento":        { "$value": false },
    "stats":        { "$value": true },        // "60+ projects, 7 awards"
    "services":     { "$value": true },
    "process":      { "$value": true },
    "testimonials": { "$value": true },
    "pricing":      { "$value": false },
    "faq":          { "$value": true },
    "blog":         { "$value": true },
    "team":         { "$value": true },        // critical
    "caseStudies":  { "$value": true },        // critical
    "newsletter":   { "$value": false },
    "cta":          { "$value": true }
  }
}
```

See: [examples/_brand.agency.json](../../examples/_brand.agency.json)

## Homepage composition

```tsx
<HeroCenter
  eyebrow="Brand · Web · Product"
  headline="We design brands worth defending."
  subheadline="Independent studio of 8. Brooklyn + Lisbon. Work with founders and CMOs who care."
  primary={{ label: 'See our work', href: '/case-studies' }}
  secondary={{ label: 'Start a project', href: '/contact' }}
/>

<LogoCloud eyebrow="Clients" logos={[...]} variant="grid" />

<CaseStudyGrid headline="Selected work" studies={[...]} />

<Stats stats={[
  { value: 60, suffix: '+', label: 'Projects shipped' },
  { value: 7,  suffix: '',  label: 'Awwwards' },
  { value: 8,  suffix: 'yr',label: 'In business' },
  { value: 100,suffix: '%', label: 'Client retention' },
]} />

<ProcessSteps
  eyebrow="How we work"
  steps={[
    { title: 'Brief',     description: '90-min workshop. We define success.' },
    { title: 'Discover',  description: '2 weeks of research, audits, interviews.' },
    { title: 'Design',    description: '4 weeks of design + iteration with weekly checkpoints.' },
    { title: 'Build + launch', description: '4–8 weeks. Code, QA, deploy, train.' },
  ]}
/>

<TeamGrid headline="The team" members={[...]} />

<FAQ items={[
  { question: 'How much does a project cost?', answer: 'Brand systems start at $40K. Marketing sites at $25K. Full products at $80K+. Quote per project.' },
  { question: 'How long does it take?', answer: '10–16 weeks for brand + marketing site. 16–24 weeks for full products.' },
  { question: 'Do you work on retainer?', answer: 'Limited retainers for clients we have an existing relationship with. Email hello@studio.com.' },
]} />

<CTASection primary={{ label: 'Start a project', href: '/contact' }} />
```

## Copy tone

- **First-person plural** ("We design…")
- **Confident but specific** — point to outcomes, not adjectives
- **Editorial / brutalist visual** — Archivo Black headings, dense layouts
- **Process transparency** — show the steps and the timeline

## Don't include

- Generic agency-speak ("we deliver exceptional digital experiences")
- Walls of services with no differentiation
- Client logos without case studies behind them
- Pricing pages — quote per project
