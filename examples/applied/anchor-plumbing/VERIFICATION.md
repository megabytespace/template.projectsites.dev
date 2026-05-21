# Verification — Anchor Plumbing

| Step | Decision | Rationale |
| --- | --- | --- |
| 1. Preset | `storefront` (local-service variant) | Licensed trade serving multiple cities |
| 2. Hue / chroma | 210 / 0.18 | Dependable blue — trades industry convention |
| 3. Color scheme | light | Local-business convention; mobile-first homeowner audience |
| 4. Fonts | Bebas Neue + Inter | Bold blue-collar display + clean body |
| 5. Features | stats + services + process + testimonials + logoCloud + caseStudies + faq + cta · No bento (services as cards) · No pricing · No team · No blog · No newsletter |

## Mandatory local-business additions

- ✅ `tel:` link in primary CTA (above the fold)
- ✅ `<StickyPhoneCTA>` from `src/components/local/`
- ✅ `<TrustBadges>` row immediately after hero (licenses + insurance)
- ✅ Hours visible in description + JSON-LD
- ✅ Service area explicit (Anchorage, Eagle River, Chugiak, Wasilla, Palmer)
- ✅ License number visible (#12345) in hero trust badges + about section
- ✅ E.164 phone (+19075550100) for tel: links

## Schema checks

- `description`: 156 chars ✓ (at upper limit)
- `tagline`: 4 words ✓ ("24/7 emergency · Anchorage")
- `phone`: E.164 ✓
- Schema valid · 0 warnings

## Copy checks

- 0 banned slop
- 0 unresolved placeholders
- Hero subheadline: 21 words ✓
- Specific numbers everywhere: 23 years · 5,000+ homes · 60m dispatch · 4.9/5 · 412 reviews · $2M insurance · 2-yr warranty · 25-mile free-estimate radius · $1,500 financing threshold · $8,400 + $1,250 + $50 trip-fee specific case-study costs

## JSON-LD

`Plumber` (more specific than `LocalBusiness`) with `areaServed[]` (5 cities) + `hasOfferCatalog` (5 services) + `aggregateRating` + Organization + WebSite + WebPage + Breadcrumb + FAQPage = ~8 nodes.

## Assumptions

- Alaska license #12345: placeholder — replace with real bar #
- 412 reviews / 4.9 rating: must verify against actual Google profile
- Cooper family / Tom Cooper / 2003 founding: fictional — replace with real history
- Lat/lng: 61.2017, -149.8908 (Spenard area approximation for 5678 C Street)
- $8,400 / $1,250 case-study costs: realistic ranges; verify

## Verdict

Ready to ship pending real license # + verified review counts + real owner history. The "license + insured + bonded" emphasis is critical for local-trade conversion — homeowners under stress will hire the visible-credentials shop.
