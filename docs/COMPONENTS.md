# Component Catalog

Every section component in `src/components/sections/`, with props, examples, and decision guidance.

## At a glance

| Component | Use case | Width | JSON-LD emitted |
| --- | --- | --- | --- |
| [HeroCenter](#herocenter) | Default hero, brand-forward | container-wide | — |
| [HeroSplit](#herosplit) | Hero with feature image | container-wide | — |
| [KineticHeadline](#kinetichaedline) | Scroll-driven headline | inline | — |
| [BentoGrid](#bentogrid) | Asymmetric feature grid | container-wide | — |
| [Stats](#stats) | Animated number rollup | container-wide | — |
| [LogoCloud](#logocloud) | Partner / client logos | container-wide | — |
| [Marquee](#marquee) | Generic infinite scroller | full | — |
| [ProcessSteps](#processsteps) | Numbered "how it works" | container-wide | — |
| [FeatureSplit](#featuresplit) | Image-left or image-right | container-wide | — |
| [Pricing](#pricing) | Tier table with toggle | container-wide | Product per tier |
| [Comparison](#comparison) | Feature comparison table | container-wide | — |
| [FAQ](#faq) | Disclosure accordion | container-prose | FAQPage |
| [CTASection](#ctasection) | Closer block | container-normal | — |
| [TeamGrid](#teamgrid) | Member cards | container-wide | Person[] |
| [BlogList](#bloglist) | Featured + grid posts | container-wide | — |
| [CaseStudyGrid](#casestudygrid) | Work samples with metrics | container-wide | — |

All section components:
- Accept `eyebrow?: string`, `headline?: string`, `description?: string`, `className?: string`
- Read tokens through Tailwind utilities (never hardcode colors)
- Respect `prefers-reduced-motion`
- Reveal on scroll via `.reveal-on-view` class
- Live in `src/components/sections/`; re-export from `index.ts`

Import:

```tsx
import {
  HeroCenter, HeroSplit, KineticHeadline,
  BentoGrid, Stats, LogoCloud, Marquee,
  ProcessSteps, FeatureSplit,
  Pricing, Comparison, FAQ,
  CTASection, TeamGrid, BlogList, CaseStudyGrid,
} from '@/components/sections';
```

---

## HeroCenter

Centered cinematic hero with floating orb backdrops, grid overlay, and `KineticHeadline` for the H1.

```tsx
<HeroCenter
  eyebrow="Family-owned since 1987"
  headline="Fresh from the oven"
  subheadline="Sourdough, pastries, and seasonal cakes baked daily in Anchorage."
  primary={{ label: 'Order online', href: '/order' }}
  secondary={{ label: 'View menu', href: '/menu' }}
  trustBadges={[
    { icon: 'star', label: '4.9 / 5 on Google' },
    { icon: 'shield', label: 'Cottage-licensed' },
    { icon: 'award', label: '"Best of Anchorage" 2024' },
  ]}
/>
```

### Props

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| `eyebrow` | string | no | — |
| `headline` | string | **yes** | — |
| `subheadline` | string | no | — |
| `primary` | `{label, href}` | no | — |
| `secondary` | `{label, href}` | no | — |
| `trustBadges` | `{icon?, label}[]` | no | — |
| `className` | string | no | — |

`icon` enum: `'star' | 'shield' | 'award'`.

---

## HeroSplit

Two-column hero: copy left, image right. Reverses on `imagePosition: 'left'`.

```tsx
<HeroSplit
  eyebrow="Boutique salon"
  headline="Color that holds. Cuts that move."
  subheadline="Independent stylists. Clean-beauty products only."
  primary={{ label: 'Book now', href: '/book' }}
  secondary={{ label: 'See gallery', href: '/gallery' }}
  image={{ src: '/hero-salon.jpg', alt: 'Stylist coloring a client at the chair' }}
  trustBadges={[{ icon: 'star', label: '4.9 / 5 Yelp' }]}
/>
```

Same props as `HeroCenter` plus required `image: { src, alt }`.

---

## KineticHeadline

Scroll-driven display headline. Variable-font weight + letter-spacing animate as the user scrolls. Falls back to a JS staggered word-reveal on browsers without `animation-timeline`.

```tsx
<KineticHeadline
  text="Build it loud"
  eyebrow="Agency"
  as="h1"
/>
```

Used internally by `HeroCenter`. Use standalone for inline hero treatments.

| Prop | Type | Default |
| --- | --- | --- |
| `text` | string | — |
| `eyebrow` | string | — |
| `as` | `'h1' \| 'h2' \| 'h3'` | `'h1'` |
| `className` | string | — |

---

## BentoGrid

Apple-WWDC asymmetric 12-column grid with subgrid alignment. First tile auto-promotes to hero cell (`span: 'lg' + tall`).

```tsx
<BentoGrid
  eyebrow="Why choose us"
  headline="Engineered for trust"
  description="Every feature designed to remove a customer-side concern."
  tiles={[
    { id: 't1', title: 'Same-day delivery',  description: 'Order by 2pm, in your hands by 6pm.', span: 'lg', tall: true, accent: true, icon: <Shield /> },
    { id: 't2', title: 'Best price match',   description: 'Find it cheaper? We refund the difference.', span: 'sm', icon: <Zap /> },
    { id: 't3', title: 'Lifetime warranty',  description: 'Defect? We replace it, no questions.',       span: 'sm', icon: <Award /> },
    { id: 't4', title: 'Free returns',       description: '30 days, prepaid label included.',           span: 'md', icon: <Users /> },
    { id: 't5', title: 'Carbon-neutral',     description: 'All shipping offset since 2022.',            span: 'md', icon: <Star /> },
  ]}
/>
```

### `BentoTile` shape

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | React key |
| `title` | string | — |
| `description` | string | optional |
| `icon` | ReactNode | optional |
| `image` | string | optional bg image |
| `imageAlt` | string | required if `image` set |
| `href` | string | makes the tile a link |
| `span` | `'sm' \| 'md' \| 'lg' \| 'xl'` | desktop span: 4/6/8/12 cols |
| `tall` | boolean | double row span |
| `accent` | boolean | gradient-bg highlight |

Mobile: all tiles collapse to single-column.

---

## Stats

Animated count-up rollup. Counts trigger on scroll-into-view; respect reduced motion.

```tsx
<Stats
  eyebrow="By the numbers"
  headline="500+ projects shipped"
  stats={[
    { value: 500, suffix: '+',  label: 'Projects shipped',  caption: 'Across 14 industries' },
    { value: 98,  suffix: '%',  label: 'Customer retention' },
    { value: 24,  suffix: '/7', label: 'Support coverage' },
    { value: 10,  suffix: 'yr', label: 'In business' },
  ]}
/>
```

| Stat field | Type | Notes |
| --- | --- | --- |
| `value` | number | The count-up target |
| `suffix` | string | `+`, `%`, `/7`, `yr` etc. |
| `label` | string | Below the number |
| `caption` | string | Optional smaller tertiary line |

---

## LogoCloud

Logo strip. Two variants: `marquee` (infinite scroll) or `grid` (responsive grid).

```tsx
<LogoCloud
  eyebrow="Trusted by"
  variant="marquee"
  logos={[
    { name: 'Acme', src: '/logos/acme.svg', href: 'https://acme.com' },
    { name: 'Globex', src: '/logos/globex.svg' },
    { name: 'Initech' },                                       // wordmark fallback if no src
  ]}
/>
```

`src` missing → renders the company name as a styled wordmark — no broken images.

---

## Marquee

Generic infinite scroller. Pauses on hover. Respects reduced motion (animation disabled).

```tsx
<Marquee
  speed="slow"               // 'slow' | 'normal' | 'fast'
  pauseOnHover
  items={['Free shipping', '30-day returns', 'Carbon-neutral'].map(s =>
    <span className="text-text font-medium px-6">{s}</span>
  )}
/>
```

---

## ProcessSteps

Numbered "how it works" cards. First step gets a large `01`, second `02`, etc.

```tsx
<ProcessSteps
  eyebrow="How it works"
  headline="Three steps to launch"
  steps={[
    { title: 'Brief',   description: '30-min discovery call to scope the work.',   icon: <MessageSquare /> },
    { title: 'Design',  description: 'Wireframes Mon, hi-fi by Fri.',              icon: <Sparkles /> },
    { title: 'Launch',  description: 'Deploy + handoff in week 4.',                icon: <Rocket /> },
  ]}
/>
```

---

## FeatureSplit

Image-left or image-right copy block.

```tsx
<FeatureSplit
  eyebrow="About us"
  headline="Family bakery, third generation"
  description="Started by my grandfather in 1987. We've kept the sourdough starter alive ever since."
  bullets={[
    'Single-origin flours from local mills',
    'Filtered water, sea salt, time',
    'No commercial yeast, no shortcuts',
  ]}
  cta={{ label: 'Visit the bakery', href: '/visit' }}
  image={{ src: '/family.jpg', alt: 'Three generations of bakers at the counter' }}
  imagePosition="right"
/>
```

Replace `image` with `visual` (any ReactNode) for custom content — a chart, demo, code block, etc.

---

## Pricing

Three-tier pricing with monthly/yearly toggle. Emits a `Product` JSON-LD node per tier.

```tsx
<Pricing
  eyebrow="Pricing"
  headline="Pay for what you use"
  description="No seat tax. No surprise renewals."
  tiers={[
    { id: 'starter', name: 'Starter', description: 'Solo founders, weekend projects.',
      monthly: 19, yearly: 180,
      features: ['1 project', '1 user', 'Email support'] },
    { id: 'pro', name: 'Pro', description: 'Growing teams.',
      monthly: 99, yearly: 950, featured: true, badge: 'Most popular',
      features: ['Unlimited projects', '10 users', 'Priority support', 'Custom domain'] },
    { id: 'ent', name: 'Enterprise', description: 'SOC2-bound orgs.',
      monthly: 499, yearly: 4790,
      features: ['Unlimited users', 'SSO', 'Dedicated support', 'SLA', 'Onboarding'] },
  ]}
/>
```

`featured: true` adds the gradient highlight + glow shadow. `badge: '...'` adds the floating sparkle chip.

`showToggle: false` hides the monthly/yearly switch (use for one-price products).

---

## Comparison

Feature comparison table. Cell values: `true` → green check, `false` → grey X, `'partial'` → amber dash, string → renders verbatim.

```tsx
<Comparison
  eyebrow="Compare"
  headline="What's included"
  columns={['Starter', 'Pro', 'Enterprise']}
  highlightColumn={1}
  rows={[
    { feature: 'Projects',          values: [true, true, true] },
    { feature: 'Team members',      values: ['1', '10', 'Unlimited'] },
    { feature: 'API access',        values: [false, 'partial', true] },
    { feature: 'Custom domain',     values: [false, true, true] },
    { feature: 'SSO + audit log',   values: [false, false, true], description: 'SAML, SCIM, audit log retention 90d' },
  ]}
/>
```

---

## FAQ

Disclosure widget. Emits `FAQPage` JSON-LD — **the highest AI-citation rate of any schema** across ChatGPT / Perplexity / Google AI Overviews.

```tsx
<FAQ
  eyebrow="Questions"
  headline="Frequently asked"
  items={[
    { question: 'How long does setup take?',
      answer: 'Most teams are live within 48 hours of signup. Enterprise deployments take 5–7 business days with white-glove onboarding.' },
    { question: 'Can I cancel anytime?',
      answer: 'Yes. Cancel from your billing page; access continues through the end of the billing period.' },
    { question: 'Do you offer refunds?',
      answer: 'We refund unused months on annual plans. Monthly plans are non-refundable but cancel without penalty.' },
  ]}
  exclusive={false}              // true = accordion (single-open), false = disclosure (multi-open)
/>
```

**Always include FAQ on content pages.** The JSON-LD significantly increases visibility in AI search results.

---

## CTASection

Closing call-to-action block. Two tones: `emphatic` (gradient bg + grain) or `quiet` (tactile card).

```tsx
<CTASection
  eyebrow="Ready?"
  headline="Let's build something worth shipping"
  description="15-minute call. Free quote within 24 hours. No sales pressure."
  primary={{ label: 'Book a call', href: '/contact' }}
  secondary={{ label: 'See pricing', href: '/pricing' }}
  tone="emphatic"
/>
```

---

## TeamGrid

Member cards. Each card emits a `Person` JSON-LD node.

```tsx
<TeamGrid
  eyebrow="Team"
  headline="The humans behind the work"
  members={[
    {
      name: 'Maria Chen', role: 'Founder & CEO',
      bio: 'Previously product at Stripe. Stanford CS.',
      photo: '/team/maria.jpg',
      links: [{ label: 'LinkedIn', href: 'https://linkedin.com/in/mariachen' }],
    },
    {
      name: 'James Park', role: 'Head of Design',
      bio: 'Ex-Apple HI team. Bay Area.',
      photo: '/team/james.jpg',
    },
  ]}
/>
```

Photo missing → initials chip in accent color.

---

## BlogList

Featured-post hero + grid of recent posts.

```tsx
<BlogList
  eyebrow="Writing"
  headline="Notes from the field"
  basePath="/blog"
  posts={[
    {
      slug: 'shipping-velocity', title: 'How we 10x'd shipping velocity',
      excerpt: 'Six weeks. Three engineers. One bet on AI-assisted code review.',
      date: '2026-05-12', author: 'Maria Chen', category: 'Engineering',
      cover: '/blog/velocity.jpg', readMinutes: 6,
    },
    // …
  ]}
/>
```

First post auto-promotes to hero card (two-col layout, larger cover).

---

## CaseStudyGrid

Portfolio of work with up-to-3 metrics per study.

```tsx
<CaseStudyGrid
  eyebrow="Work"
  headline="Selected case studies"
  basePath="/case-studies"
  studies={[
    {
      slug: 'acme-redesign', title: 'Acme — Conversion rate +34%',
      client: 'Acme Inc.', industry: 'B2B SaaS',
      summary: 'Reworked onboarding flow. Cut activation steps from 8 to 3.',
      cover: '/case/acme.jpg',
      metrics: [
        { value: '+34%', label: 'CR uplift' },
        { value: '−62%', label: 'Onboarding time' },
        { value: '4.8★', label: 'CSAT' },
      ],
    },
  ]}
/>
```

---

## Adding a new section component

```tsx
// src/components/sections/MyThing.tsx
import { cn } from '@/lib/utils';

interface Props {
  eyebrow?: string;
  headline?: string;
  /* ...specific props... */
  className?: string;
}

export function MyThing({ eyebrow, headline, className }: Props) {
  return (
    <section className={cn('py-24 md:py-32 max-w-container-wide mx-auto px-6', className)}>
      {(eyebrow || headline) && (
        <div className="text-center mb-12 reveal-on-view">
          {eyebrow && <span className="text-accent text-sm font-mono tracking-widest uppercase">{eyebrow}</span>}
          {headline && <h2 className="text-3xl md:text-5xl font-bold font-heading mt-4 text-text">{headline}</h2>}
        </div>
      )}
      {/* ... */}
    </section>
  );
}

export default MyThing;
```

Then:

1. Export from `src/components/sections/index.ts`
2. Add an entry to the catalog table at the top of this file
3. Add a section in this file with props + example
4. Update `AGENTS.md` decision tree if the new component fills a gap

## Universal section conventions

Every section component follows these conventions for AI-predictable composition:

1. **Outer `<section>` element** with `py-24 md:py-32 max-w-container-wide mx-auto px-6`
2. **Optional eyebrow + headline + description** in a centered `text-center mb-12 reveal-on-view` block
3. **Main content area** below the header
4. **Reveal class** (`.reveal-on-view`) on items that should animate in on scroll
5. **All colors via Tailwind tokens** — never hex
6. **className passthrough** for caller customization
7. **Default exports + named exports** for both ESM and CJS interop

If a new component diverges from these, document why.
