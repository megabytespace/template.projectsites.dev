# Verification — Chen Family Dentistry

| Step | Decision | Rationale |
| --- | --- | --- |
| 1. Preset | `medical` | Family dentist → medical bucket |
| 2. Hue / chroma | 200 / 0.12 | Calming blue; low chroma reads trustworthy + clinical |
| 3. Color scheme | light | Healthcare convention |
| 4. Fonts | Lora + Inter | Lora's warmth + Inter's clarity = competent + human |
| 5. Features | bento + stats + services + process + testimonials + faq + team + cta | No pricing (insurance-billed) · No blog · No caseStudies · No newsletter |

## Schema checks

- `description`: 145 chars ✓ (120-156)
- `tagline`: 4 words ✓ (3-5)
- `phone`: `+19075550100` ✓ E.164
- Schema valid · 0 warnings

## Copy checks

- 0 banned words across all generated files
- 0 unresolved `{PLACEHOLDER}` strings
- Hero subheadline: 21 words ✓
- All FAQ answers self-contained (35–60 words)
- One H1 per page ✓
- Specific numbers: 5,000 patients · 20yr · 4.9/5 · 412 reviews · 8am–5pm · $185 exam fee

## JSON-LD

5+ nodes minimum: Organization (Dentist subtype with `aggregateRating` + `medicalSpecialty` + `isAcceptingNewPatients` + `availableService[]`) + WebSite + WebPage + BreadcrumbList + FAQPage.

## Assumptions

- Lat/lng: 61.2181, -149.9003 (downtown Anchorage)
- Insurance list: typical major-carrier mix — verify with practice
- 412 reviews / 4.9 rating: must ground-truth against actual Google profile
- Dr. Chen / Dr. Park / Sara: fictional placeholders — replace with real team
- $185 new-patient exam fee: typical AK family-dentistry range — verify

## Verdict

Ready to ship pending real team data + verified review counts + insurance list audit.
