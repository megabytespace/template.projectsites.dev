# Verification — Maria Chen

| Step | Decision | Rationale |
| --- | --- | --- |
| 1. Preset | `portfolio` | Solo designer-developer |
| 2. Hue / chroma | 275 / 0.17 | Violet — creative-leaning, distinguishes from indigo SaaS |
| 3. Color scheme | dark | Designer-portfolio convention |
| 4. Fonts | Cabinet Grotesk + Satoshi | Modern, neutral, creative-friendly |
| 5. Features | caseStudies + logoCloud + process + faq + blog + cta · No team (solo) · No pricing (per-project) · No stats (case studies have metrics) |

## Schema checks

- `description`: 144 chars ✓
- `tagline`: 4 words ✓
- `phone`: empty ✓ (solo designer)
- Schema valid · 0 warnings

## Copy checks

- 0 banned slop
- 0 unresolved placeholders
- Hero subheadline: 25 words ✓ (at the limit)
- 3 case studies, each with 3 metrics
- Specific numbers: 8 years · 50+ sites · 3 SOTDs · 34% / 71% / 22% lifts · $12K starting · $250/hr · $1,500/mo retainer

## JSON-LD

5+ nodes including Person (with `knowsAbout` + `homeLocation` + `sameAs` for LinkedIn / GitHub / Twitter) — important for EEAT signaling per `~/.claude/rules/copy-writing.md`.

## Assumptions

- Q3 2026 booked / Q1 2027 open: time-sensitive availability signal — update quarterly
- $12K starting / $24K design systems: typical North American senior designer rates
- Stripe + Shopify employment history: fictional placeholder; replace with real history

## Verdict

Ready to ship pending real employment history + availability dates.
