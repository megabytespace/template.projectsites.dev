# Verification — Field Threads

| Step | Decision | Rationale |
| --- | --- | --- |
| 1. Preset | `retail` | DTC clothing brand |
| 2. Hue / chroma | 340 / 0.18 | Editorial rose-pink — fashion-leaning without being baby pink |
| 3. Color scheme | light | Editorial DTC convention; lookbook photography reads best on light |
| 4. Fonts | Playfair Display + Inter | Editorial serif headlines + crisp sans body |
| 5. Features | bento (category showcase) + testimonials + faq + blog + newsletter + cta · No stats (no brag numbers) · No services / process / team / caseStudies / pricing |

## Schema checks

- `description`: 153 chars ✓
- `tagline`: 4 words ✓ ("Made well · Sold honestly")
- Schema valid · 0 warnings
- `OnlineStore` schema (more specific than generic Store) with `currenciesAccepted` + `paymentAccepted`

## Copy checks

- 0 banned slop
- 0 unresolved placeholders
- Hero subheadline: 18 words ✓
- Specific origin claims: GOTS-organic · Bantex Mill (Porto) · 40-person factory · batches of 200
- Honest framing: "no marketing budget, no influencer seeding" (anti-slop positioning)
- Real shipping window: 4-6 weeks made-to-order (vs typical 2-day Amazon expectation)

## JSON-LD

`OnlineStore` (more specific than `Store`) + Organization + WebSite + WebPage + Breadcrumb + FAQPage = 6 nodes.

## Assumptions

- "Bantex Mill (Porto, est. 1947)": plausible name but fictional — replace with real supplier if claiming sourcing transparency
- 14 retailer wholesale relationships, 4-6 week made-to-order timeline: must verify against real ops
- Factory size (40 people): must verify
- TikTok handle: assumed; verify

## Verdict

Ready to ship pending real supplier verification. The "sourcing transparency" angle is BUILD-BREAKING if the named mill/factory are fabricated — better to write "small Portuguese family factory" without naming until you have permission.
