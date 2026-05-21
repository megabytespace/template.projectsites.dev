# Applied — Latch (SaaS)

A second worked example showing the master prompt ([`PROMPT.md`](../../../PROMPT.md)) applied to a **SaaS code-review tool** brief — opposite end of the industry spectrum from the [Northern Lights Bakery](../northern-lights-bakery/README.md) example.

## The brief

```
Latch — AI code review for engineering teams.
B2B SaaS. Self-serve trial. 3-tier pricing.
Trained on 50M open-source PRs.
Catches race conditions, off-by-ones, regex DoS, unsafe SQL, missing null checks —
bugs human review misses.
SOC 2 Type II, GDPR-compliant. Hosted on Cloudflare, US + EU regions.
Free / Team ($19/seat/mo) / Enterprise (custom).
Founded 2024 in Brooklyn, NY. Distributed team of 7.
12,000 teams across 47 countries.
```

## What the prompt produced (in one pass)

| File | What changed |
| --- | --- |
| [`_brand.json`](./_brand.json) | Indigo (hue 245) · dark mode · Inter Tight + Inter · SaaS preset · 14 feature flags tuned |
| [`Home.tsx.snippet.tsx`](./Home.tsx.snippet.tsx) | Hero + LogoCloud + BentoGrid (5 features) + Stats (4 numbers) + FeatureSplit + CaseStudyGrid (2) + Pricing (3 tiers) + FAQ (8) + Newsletter + CTA |
| [`Pricing.tsx.snippet.tsx`](./Pricing.tsx.snippet.tsx) | 3 tiers + 12-row Comparison + 6 pricing FAQs + CTA |
| [`FAQ.tsx.snippet.tsx`](./FAQ.tsx.snippet.tsx) | 14 FAQs across 3 categories (general / security / billing) — emits 3 FAQPage JSON-LD nodes |
| [`software-jsonld.snippet.tsx`](./software-jsonld.snippet.tsx) | Full `SoftwareApplication` schema with `Offer[]`, `aggregateRating`, `featureList` |
| [`VERIFICATION.md`](./VERIFICATION.md) | Self-check report — brand decisions, copy audit, JSON-LD coverage, 12 documented assumptions |

## How to use this example

```bash
# Option 1: Copy just the brand
cp examples/applied/latch/_brand.json _brand.json
npm run validate:brand   # passes with zero warnings
npm run dev              # opens with dark indigo theme

# Option 2: Reference for your own SaaS build
# Read VERIFICATION.md to see how the prompt's 7-step protocol mapped
# to specific decisions for a SaaS context.
```

## What this demonstrates

1. **Range across industries.** Same prompt → bakery (amber, light, restaurant preset, no pricing) → SaaS (indigo, dark, SaaS preset, full pricing). The protocol adapts.
2. **Production-grade copy.** "Every PR. Reviewed twice." (4-word hero claim). "Latch reads every PR against 50M open-source repos. Flags race conditions, regex DoS, unsafe SQL — bugs review misses." (20-word subheadline). Zero banned words. Specific numbers throughout.
3. **JSON-LD richness.** Home emits ~10 nodes (Org + WebSite + WebPage + Breadcrumb + SoftwareApplication + Product × 3 tiers + FAQPage). All eligible for Google rich-results AND AI-search citation.
4. **Verification discipline.** Every numerical claim is flagged in `VERIFICATION.md` with "must verify against real data" — the prompt knows when it's guessing.

## Side-by-side comparison

| Dimension | Northern Lights Bakery | Latch (this example) |
| --- | --- | --- |
| Preset | restaurant | saas |
| `brandHue` | 30 (amber) | 245 (indigo) |
| `brandChroma` | 0.22 | 0.20 |
| `colorScheme` | light | dark |
| `font.heading` | Playfair Display | Inter Tight |
| `font.body` | Inter | Inter |
| `features.pricing` | false | true |
| `features.bento` | false | true |
| `features.stats` | false | true |
| `features.team` | false | false |
| `features.caseStudies` | false | true |
| `features.services` | true (as menu) | false |
| Primary CTA | "Order online" | "Install on GitHub" |
| Schema.org @type | `Bakery` | `SoftwareApplication` |
| Trust badges | "4.9 Google · 387 reviews" | "12,000 teams · 47 countries" |
| Verification verdict | Ready (geo coords assumed) | Ready (numbers need ground-truthing) |

Same prompt. Same template. Two complete sites. **One LLM invocation each.**
