# AGENTS.md — examples/

> Scoped conventions for industry preset files. Inherits from root `AGENTS.md`.

## Purpose

`examples/_brand.{industry}.json` are drop-in W3C DTCG presets. Users (or AI agents) can `cp examples/_brand.{name}.json _brand.json` to retarget the entire template for a new industry.

## Hard rules

1. **Filename convention** — `_brand.{kebab-name}.json`. The kebab-name maps to `docs/profiles/{kebab-name}.md`.
2. **Must pass schema validation** — `node scripts/validate-brand.mjs examples/_brand.{name}.json` exit code 0.
3. **Must pass `npm test`** — `tests/unit/brandSchema.test.ts` iterates all presets and validates.
4. **Real-ish placeholder data** — use plausible business names, addresses, hours (e.g. "Northern Lights Bakery, Anchorage AK") so the preset works out-of-the-box for demos. Never use real businesses without permission.
5. **OKLCH color values** — primary / surface / text MUST be OKLCH. Hex allowed for the `accent` if a brand-specific override is needed.
6. **Light vs dark choice** — see profile doc for rationale per industry.
7. **Feature flags reflect the industry** — e.g. SaaS has `pricing: true`, restaurant has `pricing: false`, agency has `caseStudies: true`.

## File structure

Every preset MUST have these top-level keys (matching `_brand.json`):

```
business, color, colorScheme, font, radius, spacing, shadow, motion, layout, social, features
```

Missing any of these = schema validation fails.

## Adding a new preset

1. **Decide the industry name** — kebab-case, descriptive, singular (`saas`, not `software-as-a-service-companies`)
2. **Write `docs/profiles/{name}.md`** — explains when to use, brand settings, homepage composition, copy tone, mandatory features, don't-include list
3. **Copy the closest existing preset** — `cp _brand.saas.json _brand.{name}.json`
4. **Edit the new file** — change `business.*`, `color.brandHue`, `colorScheme`, `font.*`, `features.*` to match
5. **Validate** — `node scripts/validate-brand.mjs examples/_brand.{name}.json`
6. **Add to `examples/README.md`** — preset table + brief description
7. **Add to `docs/profiles/` registry** — `docs/README.md` profile list
8. **Add to `docs/AI_GUIDE.md`** — "Where to look for…" if it changes patterns
9. **Run `npm test`** — confirms the schema test loop picks up the new preset
10. **Submit PR**

## Don't ship presets that…

- ❌ Use a real business name without permission (legal risk)
- ❌ Reference URLs that don't resolve (`http://example.com` is OK; `https://real-business-i-do-not-own.com` is NOT)
- ❌ Hardcode hex colors instead of OKLCH (defeats hue-rotation)
- ❌ Set `colorScheme` to `auto` without testing both modes
- ❌ Skip the `font.weights` array — Google Fonts won't load weights you don't list

## Naming patterns

| Industry signals | Naming convention |
| --- | --- |
| Service-area trade (plumber, HVAC) | `local-service` |
| Food / drink | `restaurant` (covers cafés, bars, bakeries) |
| Care provider (dentist, doctor) | `medical` |
| Lawyer / paralegal | `legal` |
| Product brand | `retail` |
| Studio for client work | `agency` |
| Solo creative | `portfolio` |
| 501(c)(3) | `nonprofit` |
| B2B software | `saas` |

If your industry doesn't map, propose the new bucket via issue before adding the preset.
