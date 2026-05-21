# Applied — Doe Law

Master prompt executed against a **legal** brief (solo estate-planning attorney).

Brief: `"Doe Law — solo estate-planning attorney in Anchorage. 20 years in practice. Free consultations. Wills, trusts, probate, business succession."`

| File | Contents |
| --- | --- |
| [`_brand.json`](./_brand.json) | Navy (hue 220, chroma 0.10) · light mode · Cormorant Garamond + Lora · legal preset |
| [`Home.tsx.snippet.tsx`](./Home.tsx.snippet.tsx) | Hero · 5-area BentoGrid · 4-step ProcessSteps · FeatureSplit (attorney bio with credentials) · FAQ (7) · CTA · LegalService JSON-LD |
| [`VERIFICATION.md`](./VERIFICATION.md) | Ethics caveats: no testimonials, no outcome claims, no specialist language |

Distinguishing decisions:
- `testimonials: false` — state-bar ad rules generally restrict them; owner consults bar before enabling
- `pricing: false` — quoted per-engagement, not tiered
- Serif heading + serif body (Cormorant + Lora) instead of typical sans — signals "established, careful, conservative"
