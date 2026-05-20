# Profile — Nonprofit / NGO

## When to use this profile

- Registered nonprofit (501(c)(3) US, charity number UK, etc.)
- Donation-driven funding
- Volunteer engagement
- Impact reporting + transparency

## Recommended brand settings

```jsonc
{
  "business": { "businessClass": { "$value": "nonprofit" } },
  "color": {
    "brandHue":    { "$value": "130" },     // hopeful green
    "brandChroma": { "$value": "0.18" }
  },
  "colorScheme":   { "$value": "light" },
  "font": {
    "heading": { "$value": "Crimson Pro" },
    "body":    { "$value": "Inter" }
  },
  "features": {
    "hero":         { "$value": true },
    "logoCloud":    { "$value": true },     // funders / partners
    "bento":        { "$value": true },     // programs
    "stats":        { "$value": true },     // impact metrics — critical
    "services":     { "$value": true },     // programs
    "process":      { "$value": true },     // how donations are used
    "testimonials": { "$value": true },     // beneficiary stories
    "pricing":      { "$value": false },
    "faq":          { "$value": true },
    "blog":         { "$value": true },     // impact updates
    "team":         { "$value": true },
    "caseStudies":  { "$value": true },     // success stories
    "newsletter":   { "$value": true },
    "cta":          { "$value": true }
  }
}
```

See: [examples/_brand.nonprofit.json](../../examples/_brand.nonprofit.json)

## Mandatory features

- **Donate CTA** in the header (primary action above all others)
- **Stripe / GoFundMe / Donorbox / Givebutter integration** — link from CTAs
- **Impact stats** — concrete numbers ("X people served, $Y raised, Z programs")
- **Annual report link** in footer
- **501(c)(3) registration** in footer + Privacy
- **`NGO` JSON-LD** with `nonprofitStatus`

## Homepage composition

```tsx
<HeroCenter
  eyebrow="Anchorage, Alaska"
  headline="Every child fed. Every weekend. No questions asked."
  subheadline="We pack 1,200 weekend food bags every Friday for Anchorage School District kids who depend on school meals during the week."
  primary={{ label: 'Donate $25 — feeds a child for a month', href: '/donate' }}
  secondary={{ label: 'Volunteer', href: '/volunteer' }}
/>

<Stats stats={[
  { value: 1_200,   suffix: '',  label: 'Kids served weekly', caption: 'Every Friday during the school year' },
  { value: 62_000,  suffix: '+', label: 'Bags packed in 2025' },
  { value: 87,      suffix: '%', label: 'Of every dollar goes to food' },
  { value: 14,      suffix: 'yr',label: 'Serving Anchorage' },
]} />

<FeatureSplit
  eyebrow="Our mission"
  headline="No child should be hungry on the weekend."
  description="Anchorage School District provides breakfast and lunch Monday–Friday. For 1,200 of our students, those are the most reliable meals of the week. We pack weekend bags so the gap doesn't go unfilled."
  cta={{ label: 'Read our 2025 impact report', href: '/impact-2025.pdf' }}
/>

<ProcessSteps
  eyebrow="How donations are used"
  steps={[
    { title: '$25',  description: 'Feeds one child every weekend for a month.' },
    { title: '$100', description: 'Feeds one child every weekend for a school year.' },
    { title: '$500', description: 'Funds an entire classroom for a month.' },
    { title: '$2,500', description: 'Funds an entire school for a month.' },
  ]}
/>

<LogoCloud eyebrow="Funded in part by" logos={[...]} />

<TestimonialCarousel testimonials={[
  { name: 'Sara M.', role: 'Elementary teacher · AnchorageSD', quote: 'Monday mornings before this program, half my class couldn\'t focus. Now they come in ready to learn.', rating: 5 },
]} />

<TeamGrid eyebrow="Team" members={[...]} />

<FAQ items={[
  { question: 'Are donations tax-deductible?', answer: 'Yes. We are a 501(c)(3) nonprofit (EIN 12-3456789). All donations are tax-deductible to the extent allowed by law.' },
  { question: 'How is my donation used?',      answer: '87% goes directly to food. 9% to logistics (packing, distribution). 4% to administration. See our IRS Form 990 for details.' },
  { question: 'Can I volunteer?',              answer: 'Yes. We pack Friday afternoons, 1–5pm at our warehouse. Sign up at /volunteer or just show up.' },
  { question: 'Can I donate food instead of money?', answer: 'Yes for sealed, non-perishable items in original packaging. See /donate-food for the current needs list.' },
  { question: 'Are you hiring?',               answer: 'Open roles at /careers. We typically post in spring.' },
]} />

<CTASection
  eyebrow="Help us pack Friday's bags"
  headline="$25 feeds a child for a month."
  primary={{ label: 'Donate now', href: '/donate' }}
  secondary={{ label: 'Set up monthly giving', href: '/donate/monthly' }}
  tone="emphatic"
/>
```

## Copy tone

- **Specific outcomes** ("1,200 kids weekly" not "we help kids")
- **Concrete giving ladders** ("$25 = a month of food")
- **Transparent overhead** (% to program, % to admin)
- **Beneficiary stories** front-and-center (with consent)
- **Avoid manipulation** — no urgency-by-default, no fake countdown timers

## Don't include

- Vague impact claims without numbers
- Stock photos of "sad children" — use real photos with consent or none at all
- Pressure tactics
- "Donate now or else" framing
- Excessive admin / staff focus (mission > org)
