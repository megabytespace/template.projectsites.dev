# Applied — Anchor Plumbing

Master prompt executed against a **local-service** brief (24/7 plumber).

Brief: `"Anchor Plumbing, 24/7 emergency, Anchorage AK. Family-owned since 2003. Serves Anchorage, Eagle River, Wasilla. License #12345. $2M insured. Same-day service."`

| File | Contents |
| --- | --- |
| [`_brand.json`](./_brand.json) | Dependable blue (hue 210) · light · Bebas Neue + Inter · storefront preset |
| [`Home.tsx.snippet.tsx`](./Home.tsx.snippet.tsx) | Hero (phone CTA above fold) · TrustBadges row · 4-service ServiceCards · Stats · 4-step Process · About FeatureSplit · 2 CaseStudies (real cost data) · Cert LogoCloud · FAQ (8) · CTA · StickyPhoneCTA · `Plumber` JSON-LD with `areaServed[]` + `hasOfferCatalog` |
| [`VERIFICATION.md`](./VERIFICATION.md) | License + review-count caveats + local-business mandates checklist |

Distinguishing choices: primary CTA is `tel:` not a form. `<StickyPhoneCTA>` mounted always-visible on mobile. License # visible in 3 places (hero trust badge, About bullets, JSON-LD identifier). Case studies include real cost data ($8,400 sewer line · $1,250 burst pipe) — transparency builds trust faster than "competitive pricing."
