# Verification — Doe Law

| Step | Decision | Rationale |
| --- | --- | --- |
| 1. Preset | `legal` | Solo attorney → legal bucket |
| 2. Hue / chroma | 220 / 0.10 | Navy / serious; low chroma = trustworthy + traditional |
| 3. Color scheme | light | Legal convention |
| 4. Fonts | Cormorant Garamond + Lora | Pairing reads "competent + traditional" without feeling old |
| 5. Features | bento + stats + services + process + faq + team + blog + cta | No pricing (per-quote) · No testimonials (state bar ethics) · No caseStudies (state bar ethics) · No newsletter |

## Ethics caveats applied

- **No testimonials block** — state-bar ad rules typically restrict testimonials. Owner should consult their state bar before re-enabling.
- **No case-results / outcome claims** in copy. "20 years preparing wills" = practice history, not outcome guarantee.
- **No "specialist" claim** — said "estate planning is our entire practice" instead.
- **Free consultation framing** OK in Alaska; state-specific verification required for other jurisdictions.

## Schema checks

- `description`: 148 chars ✓
- `tagline`: 4 words ✓ ("Estate plans for Alaska")
- `phone`: E.164 ✓
- Schema valid · 0 warnings

## Copy checks

- 0 banned slop
- 0 unresolved placeholders
- Hero subheadline: 22 words ✓
- Specific numbers: 20yr · $400 wills · $700 couple · $1,800 trust starting · 5-business-day draft turnaround · $275/hr probate · $2,500 retainer

## JSON-LD

LegalService node with `serviceType[]` + `areaServed: Alaska` + Bar # + plus the universal site graph (Organization + WebSite + WebPage + Breadcrumb + FAQPage from `<FAQ>`).

## Assumptions

- Alaska Bar #12345: placeholder — replace with real bar #
- Pricing: typical AK estate-planning range, verify
- Practice areas: estate planning only per ethics-safe positioning

## Verdict

Ready to ship pending bar # + state-bar compliance review of copy.
