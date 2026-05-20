# Brand presets

Drop-in `_brand.json` variants for common industries. Copy the one closest to your business, rename to `_brand.json` at the repo root, customize the `business.*` block.

| Preset | Industry | Hue | Mode | Features |
| --- | --- | --- | --- | --- |
| `_brand.saas.json` | SaaS / B2B software | 260 (indigo) | dark | pricing + bento + logoCloud + blog |
| `_brand.restaurant.json` | Restaurant / café | 20 (amber) | light | services + testimonials + FAQ |
| `_brand.portfolio.json` | Designer / dev | 270 (violet) | dark | caseStudies + team + process |
| `_brand.agency.json` | Studio / agency | 0 (red) | dark | caseStudies + team + logoCloud |
| `_brand.medical.json` | Clinic / dentist | 200 (blue) | light | services + FAQ + team |
| `_brand.legal.json` | Law firm | 220 (navy) | light | services + team + FAQ |
| `_brand.nonprofit.json` | 501(c)(3) | 130 (green) | light | stats + caseStudies + newsletter |
| `_brand.retail.json` | E-commerce brand | 340 (rose) | light | bento + newsletter + FAQ |
| `_brand.local-service.json` | Plumber / electrician / etc. | 210 (blue) | light | services + stickyPhone + FAQ |

## Using a preset

```bash
cp examples/_brand.saas.json _brand.json
# then edit _brand.json — update business.name, business.url, etc.
```

The template's tools (`src/brand.ts`, `applyBrand()`) work the same with any preset.

## Customizing further

After picking a preset, the most-edited fields:

1. **`business.name`** — your business name
2. **`business.description`** — meta description (120–156 chars)
3. **`business.url`** — canonical URL
4. **`business.email`** + **`business.phone`** + **`business.address`** — contact info
5. **`color.brandHue`** — rotate to differentiate
6. **`color.brandChroma`** — pastel vs vivid

Everything else inherits from the preset.

## What if my business doesn't fit?

Use the closest preset and adjust feature flags. The 15 sections compose enough variations to cover most industries.

If your business needs a section that doesn't exist (e.g. property listings, course catalog, event schedule), build a custom component in `src/components/sections/` and document it in `docs/COMPONENTS.md`.

## Build-time verification

After swapping presets:

```bash
npm install   # idempotent
npm run build # must pass
npm run dev   # visual smoke test
```
