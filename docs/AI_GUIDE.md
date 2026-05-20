# AI Guide

This file is optimized for LLM agents customizing this template. Read it in full before non-trivial edits.

## Mental model

Treat this template as **three layers** that flow downstream:

```
Layer 1 — Data            _brand.json (DTCG tokens)
                          ▼
Layer 2 — Resolution      src/brand.ts → CSS custom properties on :root
                          ▼
Layer 3 — Consumption     src/index.css + tailwind.config.ts + components
```

**You almost always edit Layer 1.** Layers 2 and 3 are infrastructure; they don't need to change for normal customization.

## The 5-step customization protocol

Run these in order. Don't skip steps.

### Step 1 — Set business identity in `_brand.json`

Edit the `business` block:

```jsonc
{
  "business": {
    "name":          { "$value": "Northern Lights Bakery" },
    "shortName":     { "$value": "NL Bakery" },
    "tagline":       { "$value": "Fresh pastries since 1987" },
    "description":   { "$value": "Family-owned bakery in Anchorage AK. Sourdough, croissants, cakes, and seasonal specials. Open 6am-3pm Tue-Sun." },
    "url":           { "$value": "https://northernlightsbakery.com" },
    "businessClass": { "$value": "restaurant" },
    "email":         { "$value": "hello@northernlightsbakery.com" },
    "phone":         { "$value": "+19075550100" },
    "address":       { "$value": "1234 4th Avenue, Anchorage, AK 99501" },
    "hours":         { "$value": "Tue–Sun 6am–3pm · Closed Mon" }
  }
}
```

**businessClass valid values:**
`storefront` | `restaurant` | `medical` | `retail` | `salon` | `gym` | `auto-repair` | `saas` | `portfolio` | `nonprofit` | `legal` | `organization`

The class drives JSON-LD `@type` selection in `src/lib/businessSchema.ts`. Local-business classes (storefront/restaurant/medical/retail/salon/gym/auto-repair) get richer schema with geo + opening hours.

### Step 2 — Pick a brand hue + chroma

```jsonc
{
  "color": {
    "brandHue":    { "$value": "30" },     // 0=red, 60=orange, 120=green, 180=cyan, 240=blue, 270=violet, 330=pink
    "brandChroma": { "$value": "0.20" }    // 0.05=pastel, 0.18=balanced, 0.28=vivid
  }
}
```

**Hue selection guide:**

| Hue | Industries that look natural |
| --- | --- |
| 0–20 (red) | Restaurants, sports, urgency-driven brands |
| 20–50 (orange/amber) | Bakeries, energy, friendly retail |
| 50–80 (yellow/gold) | Premium, luxury, hospitality |
| 80–150 (green) | Health, sustainability, finance, nonprofit |
| 150–200 (cyan/teal) | Tech, SaaS, telecom |
| 200–260 (blue) | Corporate, legal, medical, insurance |
| 260–300 (violet) | Creative, design agencies, beauty |
| 300–340 (magenta/pink) | Beauty, fashion, lifestyle |
| 340–360 (red-pink) | Food, romance, retail |

### Step 3 — Toggle feature flags

```jsonc
{
  "features": {
    "hero":         { "$value": true  },
    "logoCloud":    { "$value": true  },   // turn on if there are partner logos
    "bento":        { "$value": true  },
    "stats":        { "$value": true  },
    "services":     { "$value": true  },
    "process":      { "$value": false },   // turn on if the offering has clear steps
    "pricing":      { "$value": false },   // turn on for SaaS / subscription
    "testimonials": { "$value": true  },
    "faq":          { "$value": true  },   // ALWAYS on — best for AI search
    "blog":         { "$value": false },
    "team":         { "$value": false },
    "caseStudies":  { "$value": false },
    "newsletter":   { "$value": true  },
    "cta":          { "$value": true  }
  }
}
```

`src/pages/Home.tsx` reads these flags via `featureOn('pricing')` and skips rendering the section if `false`. You don't need to delete code — flip the boolean.

### Step 4 — Replace `{PLACEHOLDER}` strings

Grep for `{` across `src/pages/` to find every placeholder:

```bash
grep -rn "{" src/pages/ | grep -E "\{[A-Z_0-9]+\}" | head -50
```

Replace placeholders with real copy. Follow `docs/RECIPES.md` for industry-specific tone.

**Copy rules (from `~/.claude/rules/copy-writing.md`):**
- Hero headline: 4–8 words
- Tagline: 3–5 words
- Meta description: 120–156 characters HARD
- Sentences: ≤25 words
- Paragraphs: ≤150 words
- Active voice, action-verb CTAs
- Flesch readability ≥60

### Step 5 — Verify

```bash
npm install
npm run typecheck
npm run build
npm run dev          # smoke-test http://localhost:5173
```

If all four pass with zero errors and the homepage renders correctly, you're done.

## Decision trees

### "What hero variant should I use?"

```
Has a single dominant photo?         → HeroSplit
No single dominant photo?            → HeroCenter (default)
Want scroll-driven kinetic effect?   → HeroCenter (built-in KineticHeadline)
Local business with phone CTA?       → HeroSplit + StickyPhoneCTA from src/components/local/
```

### "Should I use BentoGrid or a plain grid?"

```
3+ features with clear hierarchy?    → BentoGrid (first tile = hero cell, span:'lg' + tall)
Equally-weighted features?           → BentoGrid with all span:'sm'
Side-by-side comparison?             → Comparison (table)
Stepped process?                     → ProcessSteps (numbered)
Single feature spotlight?            → FeatureSplit (image left/right)
```

### "Where do I put a testimonial?"

```
1 testimonial?                       → quote block in a FeatureSplit `visual` slot
3 testimonials, static?              → src/components/Testimonials.tsx
6+ testimonials, scrolling?          → src/components/local/TestimonialCarousel.tsx
Aggregated rating + reviews?         → src/components/AggregateRatingJsonLd.tsx for schema
```

### "Where do I put pricing?"

```
SaaS with 2-3 tiers?                 → Pricing section on /pricing page
Local service with menu?             → Custom table inside /services
Project-based / quote-only?          → CTA "Get a quote" — skip Pricing entirely
```

### "Do I need a blog?"

```
Will publish ≥4 posts/year?          → features.blog = true, build out src/pages/Blog.tsx
Just a "press" page?                 → Skip blog, add to footer link list
SaaS / agency / portfolio?           → Usually yes (GEO + AI search benefit)
Local business with no content?      → No
```

### "Light, dark, or auto theme?"

```
Tech / SaaS / creative?              → dark (default)
Local business / healthcare / legal? → light or auto
Hospitality / food / fashion?        → light
Want it to follow OS preference?     → auto
```

## Component composition patterns

### Pattern: SaaS landing page

```tsx
<HeroCenter eyebrow="Tagline" headline="Bold claim" subheadline="..." primary={...} secondary={...} trustBadges={[...]} />
<LogoCloud logos={[...]} eyebrow="Trusted by" />
<BentoGrid tiles={features} eyebrow="Why us" headline="..." />
<FeatureSplit image={{...}} headline="..." bullets={[...]} cta={{...}} />
<Stats stats={[...]} eyebrow="By the numbers" />
<Pricing tiers={[...]} headline="..." />
<FAQ items={[...]} headline="..." />
<CTASection eyebrow="Ready?" headline="..." primary={{...}} />
```

### Pattern: Local-business / restaurant

```tsx
<HeroSplit image={{...}} headline="..." primary={{label:'Order online', href:'/menu'}} secondary={{label:'Reserve', href:'/reservations'}} />
<TrustBadges items={[{icon:'star', label:'4.9 on Google'}]} />
<FeatureSplit headline="Our story" description="..." image={{...}} />
<ServiceCards items={[...]} />  {/* from local/ */}
<TestimonialCarousel testimonials={[...]} />
<MapEmbed query="address here" />
<StickyPhoneCTA phone="+1..." />  {/* from local/ */}
<CTASection eyebrow="Visit" headline="..." primary={{label:'Get directions', href:mapUrl}} />
```

### Pattern: Portfolio / personal site

```tsx
<HeroCenter eyebrow="Designer / Developer" headline="Your name" subheadline="What you do" primary={{label:'See work', href:'/case-studies'}} />
<CaseStudyGrid studies={[...]} eyebrow="Selected work" />
<FeatureSplit headline="About" description="..." />
<TeamGrid members={[{name:'You', role:'Founder', photo:'...'}]} />
<BlogList posts={[...]} eyebrow="Writing" />
<CTASection eyebrow="Open for work" primary={{label:'Email me', href:'mailto:...'}} />
```

### Pattern: Nonprofit

```tsx
<HeroCenter eyebrow="Mission tagline" headline="What you fight for" primary={{label:'Donate', href:'/donate'}} secondary={{label:'Volunteer', href:'/volunteer'}} />
<Stats stats={[{value:50000,suffix:'+',label:'People helped'},...]} />
<FeatureSplit headline="Our work" description="..." />
<ProcessSteps steps={[{title:'Outreach',...},{title:'Action',...},{title:'Impact',...}]} />
<TeamGrid members={[...]} eyebrow="Our team" />
<CTASection eyebrow="Join us" headline="..." primary={{label:'Donate now', href:'/donate'}} tone="emphatic" />
```

## Common mistakes (don't do these)

1. **Hardcoding hex colors.** `bg-[#0a0a1a]` defeats the brand-token system. Use `bg-background` instead.
2. **Editing `tailwind.config.ts` colors.** Colors point at CSS vars by design. Change `_brand.json` instead.
3. **Skipping `featureOn()` and deleting sections.** Toggle the flag instead — keep code intact for future re-enable.
4. **Inventing new sections that duplicate existing ones.** Read `docs/COMPONENTS.md` first.
5. **Adding heavy deps (motion libraries, UI kits) without need.** Tailwind + CSS animations handle 95% of motion.
6. **Removing the CommandPalette mount.** ⌘K is part of the universal contract.
7. **Skipping alt text on images.** Build fails accessibility audits.
8. **Forgetting `<lastmod>` updates in sitemap.xml.** Schedule a `find/replace` for `{BUILD_DATE}` at deploy time.

## Token reference (one-liners)

| Token | CSS var | Tailwind utility |
| --- | --- | --- |
| Brand hue (master) | `--brand-hue` | n/a — used in `oklch(L C var(--brand-hue))` |
| Primary | `--color-primary` | `bg-primary` `text-primary` |
| Accent | `--color-accent` | `bg-accent` `text-accent` `border-accent` |
| Background | `--color-background` | `bg-background` |
| Surface | `--color-surface` | `bg-surface` |
| Surface elevated | `--color-surface-elevated` | `bg-surface-elevated` |
| Border | `--color-border` | `border-border` |
| Text | `--color-text` | `text-text` |
| Text muted | `--color-text-muted` | `text-text-muted` |
| Text subtle | `--color-text-subtle` | `text-text-subtle` |
| Heading font | `--font-heading` | `font-heading` |
| Body font | `--font-body` | `font-body` |
| Mono font | `--font-mono` | `font-mono` |
| Easing | `--ease` | `ease-brand` |
| Fast duration | `--duration-fast` | `duration-fast` |
| Container wide | `--container-wide` | `max-w-container-wide` |

## Where to look for…

| You want to… | Look in… |
| --- | --- |
| Change brand colors | `_brand.json` `color` block |
| Change fonts | `_brand.json` `font` block + `index.html` Google Fonts URL |
| Add a new route | `src/App.tsx` + `src/pages/MyPage.tsx` + `public/sitemap.xml` + `CommandPalette` actions |
| Add a new section component | `src/components/sections/MyThing.tsx` + export in `index.ts` + document in `docs/COMPONENTS.md` |
| Configure PWA install | `public/site.webmanifest` |
| Configure social cards | `index.html` OG meta + create `public/og-image.png` (1200×630) |
| Configure AI crawlers | `public/robots.txt` |
| Configure LLM index | `public/llms.txt` + (optional) `public/llms-full.txt` |
| Add JSON-LD for a page | `src/components/JsonLd.tsx` — pass `data` prop |
| Add a form | Use the Contact page form pattern; POST to `{BUSINESS_URL}/api/...` |
| Change service worker behavior | `public/sw.js` |
| Customize lightbox | `src/components/Lightbox.tsx` — PhotoSwipe v5 |
| Add cmd+K actions | `src/components/CommandPalette.tsx` `DEFAULT_ACTIONS` array or pass `extra` prop |

## Anti-pattern: AI slop checklist

Before shipping, audit copy for these banned phrases (from `~/.claude/rules/copy-writing.md`):

> "limitless, revolutionize, game-changing, cutting-edge, next-generation, world-class, best-in-class, turnkey, synergy, disrupt, empower, seamless, robust, scalable, leverage, utilize, facilitate, innovative, state-of-the-art, paradigm, holistic, harness, foster, bolster, spearhead, delve, tapestry, landscape, ecosystem, elevate, streamline, cornerstone, pivotal, myriad, plethora, supercharge, unleash, unlock, transform, empower, reimagine, redefine, transcend, boundless"

Replace each with specific, concrete language. "Our innovative platform" → "Ship SaaS in 4 weeks."

## When to ask the human

- "What's the business description?" — if the user gave you only a name.
- "What's the brand color?" — if they didn't specify and you can't infer from the industry.
- "Do you want a blog?" — if it's ambiguous. Default to `no` for local businesses.
- "Is there a phone number we should display?" — for local businesses, this is conversion-critical.

Otherwise, just do it.
