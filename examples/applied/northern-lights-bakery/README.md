# Applied — Northern Lights Bakery

A worked example showing the **master prompt** ([`PROMPT.md`](../../../PROMPT.md)) applied to a real-feeling business brief. This folder contains the complete output: customized `_brand.json`, page replacements, JSON-LD overrides, and a verification report.

## The brief

```
Business name: Northern Lights Bakery
Type: Family-owned bakery
Location: 1234 4th Avenue, Anchorage, AK 99501
Phone: (907) 555-0100
Established: 1987 (three generations)
Hours: Tue–Sun 6am–3pm, closed Mon
Specialties: Wild-yeast sourdough, almond croissants, seasonal cakes
Reviews: 4.9/5 on Google, 387 reviews
Recognition: "Best of Anchorage" 2024
Differentiators: Single-origin flour from Alaska Flour Co., filtered water, sea salt, no commercial yeast
```

## What the prompt produced (in one pass)

| File | What changed |
| --- | --- |
| [`_brand.json`](./_brand.json) | Brand identity + amber/orange hue + Playfair Display + light mode + restaurant feature flags |
| [`Home.tsx.snippet.tsx`](./Home.tsx.snippet.tsx) | Hero, About preview, Services, Testimonials, FAQ, CTA — all with real copy |
| [`Contact.tsx.snippet.tsx`](./Contact.tsx.snippet.tsx) | Form + NAP block with real address + phone + hours |
| [`Privacy.tsx.snippet.tsx`](./Privacy.tsx.snippet.tsx) | Substantive policy paragraphs (not boilerplate) |
| [`local-jsonld.snippet.tsx`](./local-jsonld.snippet.tsx) | Full Restaurant JSON-LD with geo + hours + menu link |
| [`VERIFICATION.md`](./VERIFICATION.md) | Self-check report (placeholder count, banned words, hue/chroma decisions) |

## How to use this example

```bash
# Option 1: Copy the brand only
cp examples/applied/northern-lights-bakery/_brand.json _brand.json
npm run validate:brand
npm run dev

# Option 2: Use as reference for your own bakery / restaurant build
# Read VERIFICATION.md to see how the prompt's protocol mapped to specific decisions
```

## What this demonstrates

1. **The prompt is deterministic.** Given the same brief, the protocol picks the same hue (30), chroma (0.22), preset (restaurant), feature flags, and font pairing.
2. **The output is real-feeling.** No `{PLACEHOLDER}` strings. No banned words. No `lorem ipsum`. Plausible testimonials, real-feeling menu items.
3. **The output is build-ready.** `npm run validate:brand` passes with zero warnings (placeholders all substituted). TypeScript checks pass. Build succeeds.
4. **The verification report tells you what was assumed.** Latitude / longitude for Anchorage were inferred (61.2181, -149.9003). Document so the user can correct.

## Where to verify

- [`VERIFICATION.md`](./VERIFICATION.md) — the prompt's self-check output
- Run `npm run validate:brand examples/applied/northern-lights-bakery/_brand.json` to verify the schema
- Run `npm run brand:swap` and pick a custom path to test the swap CLI against this directory
