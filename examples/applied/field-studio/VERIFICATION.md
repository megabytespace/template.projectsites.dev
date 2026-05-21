# Verification — Field Studio

| Step | Decision | Rationale |
| --- | --- | --- |
| 1. Preset | `organization` | Multi-person agency, not a "local business" or SaaS |
| 2. Hue / chroma | 0 / 0.22 | Bold red — differentiates from sea of muted-blue studios |
| 3. Color scheme | dark | Studio convention; portfolio sites work great dark |
| 4. Fonts | Archivo Black + Archivo | Editorial-brutalist — heavy display + clean sans body |
| 5. Radius | 0 across all sizes | Tactile brutalism — sharp geometry, not soft + friendly |
| 5. Motion | 100-350ms with 0.4/0/0/1 ease | Snappier than default — confident, decisive |
| 6. Features | caseStudies + team + logoCloud + process + stats + faq + blog + cta | No pricing (quote per project) · No testimonials grid (let case studies + logos do that work) · No newsletter |

## Schema checks

- `description`: 134 chars ✓
- `tagline`: 3 words ✓ ("Brand · Web · Product")
- `phone`: empty ✓ (agencies don't typically display phone)
- Schema valid · 0 warnings

## Copy checks

- 0 banned slop
- 0 unresolved placeholders
- Hero subheadline: 21 words ✓
- 3 case studies, each with 3 metrics with units (%, weeks, count)
- Specific numbers throughout: 60 projects · 7 Awwwards · 8 years · 92% retention · 42% trial lift · 11 weeks

## JSON-LD

5+ nodes: Organization + WebSite + WebPage + Breadcrumb + FAQPage. CaseStudyGrid doesn't auto-emit JSON-LD per study (the schema for that is `CreativeWork` per case — TODO note).

## Assumptions

- Maya Field / Tomas Nunes / Aisha Patel: plausible team names (fictional). Replace with real bios.
- Awwwards mentions, client retention, project count: must verify against real metrics
- Booking "through Q4 2026": availability signal — update quarterly

## Verdict

Ready to ship pending real team + verified metrics + replace fictional case-study clients with anonymized real ones (or named real ones with permission).
