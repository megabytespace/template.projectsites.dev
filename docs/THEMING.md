# Theming

Color, type, motion, light/dark — all controlled from `_brand.json`.

## The three-knob system

99% of theming needs are covered by three knobs in `_brand.json`:

```jsonc
{
  "color":       { "brandHue":  { "$value": "240" }, "brandChroma": { "$value": "0.18" } },
  "colorScheme": { "$value": "dark" }
}
```

| Knob | Effect |
| --- | --- |
| `brandHue` (0–360) | Master hue for primary / background / surface / text / border |
| `brandChroma` (0.05–0.30) | Saturation. Pastel ↔ vivid. |
| `colorScheme` (`dark`/`light`/`auto`) | Inverts the lightness ramp |

`accent` is intentionally independent — keep it as a complement to `brandHue` or make it track.

## Hue reference

| Hue | Color | Industries |
| --- | --- | --- |
| 0 | red | food, sports, urgency |
| 30 | orange | bakeries, energy, retail |
| 60 | yellow | premium, luxury, hospitality |
| 90 | yellow-green | wellness, fresh-foods |
| 120 | green | health, sustainability, finance |
| 150 | teal-green | spa, wellness, organic |
| 180 | cyan | tech, SaaS, healthcare |
| 210 | blue | corporate, SaaS, fintech |
| 240 | indigo | tech, consulting, premium |
| 270 | violet | creative, design, AI |
| 300 | magenta | beauty, fashion, lifestyle |
| 330 | pink | beauty, food, retail |
| 360 | red (wraps) | same as 0 |

## Light mode

When `colorScheme` is `light` or `auto` (and OS is light), the `[data-theme='light']` selector in `src/index.css` inverts the OKLCH ramp:

- Background: `oklch(0.99 0.005 hue)` — near-white with brand tint
- Surface: `oklch(0.97 0.01 hue)` — very pale brand
- Border: `oklch(0.88 0.02 hue)` — visible but soft
- Text: `oklch(0.18 0.02 hue)` — near-black with brand tint
- Text muted: `oklch(0.42 0.01 hue)`
- Text subtle: `oklch(0.58 0.01 hue)`

Primary and accent stay at the same OKLCH values; only the neutrals invert. This keeps brand colors recognizable across modes.

## Theme toggle

The `<ThemeToggle />` in the header cycles dark → light → auto. User choice persists in `localStorage` under `projectsites:theme`.

To hide the toggle (force single-mode site):

```tsx
// src/components/Header.tsx — remove this line
<ThemeToggle />
```

To change the default mode for new visitors: set `colorScheme` in `_brand.json`. Returning visitors inherit their last choice.

## Custom palettes

For brand-specific overrides that aren't just hue rotation:

### Option A — Override individual color tokens

```jsonc
// _brand.json
{
  "color": {
    "brandHue":    { "$value": "240" },
    "brandChroma": { "$value": "0.18" },
    "primary":     { "$value": "#FF6B35" },    // explicit hex
    "accent":      { "$value": "oklch(0.85 0.18 195)" }
  }
}
```

OKLCH still works alongside hex. The template uses OKLCH because of perceptual uniformity; hex is fine for one-off overrides.

### Option B — Add a custom shade ramp

See `docs/RECIPES.md` → Recipe 16.

## Fonts

```jsonc
{
  "font": {
    "heading": { "$value": "Playfair Display" },
    "body":    { "$value": "Source Sans 3" },
    "mono":    { "$value": "Fira Code" },
    "weights": { "$value": [400, 500, 600, 700, 800] }
  }
}
```

Then update `index.html` Google Fonts URL:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Source+Sans+3:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap" />
```

### Font pairings that work

| Heading | Body | Tone |
| --- | --- | --- |
| `Space Grotesk` | `Inter` | Modern tech (default) |
| `Playfair Display` | `Inter` | Editorial luxury |
| `Inter Tight` | `Inter` | Minimalist SaaS |
| `Space Grotesk` | `JetBrains Mono` | Developer / brutalist |
| `Cormorant Garamond` | `Lora` | Hospitality, food, legal |
| `Bebas Neue` | `Inter` | Sports, fitness, retail |
| `Archivo Black` | `Archivo` | Editorial, fashion |
| `Geist` | `Geist Mono` | Vercel-aesthetic |
| `Instrument Serif` | `Inter` | Premium, finance, consultancy |
| `Cabinet Grotesk` | `Satoshi` | Agency, design studios |

### Variable fonts for kinetic typography

`KineticHeadline` uses `font-variation-settings: 'wght' …, 'wdth' …`. For the animation to work, the heading font must support variable axes. Variable fonts on Google Fonts include:

- Inter (weight, italic, slant)
- Space Grotesk (weight)
- Manrope (weight)
- Lexend (weight)
- DM Sans (weight, optical-size, italic)
- Outfit (weight)
- Plus Jakarta Sans (weight, italic)

If using a non-variable font, the kinetic effect degrades to a JS staggered word reveal (see `KineticHeadline.tsx` fallback).

## Motion

```jsonc
{
  "motion": {
    "easing":   { "$value": "cubic-bezier(0.16, 1, 0.3, 1)" },
    "duration": {
      "fast":   { "$value": "150ms" },
      "base":   { "$value": "250ms" },
      "slow":   { "$value": "450ms" },
      "scroll": { "$value": "1200ms" }
    }
  }
}
```

Easing presets to swap into the `easing` value:

| Curve | bezier |
| --- | --- |
| Expo out (default) | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Material standard | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Snappy / Quick | `cubic-bezier(0.4, 0, 0, 1)` |
| Bouncy | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| Linear | `linear` |

`prefers-reduced-motion: reduce` always wins — all animations zero out regardless of these values.

## Spacing + radius

The 8-point spacing scale and radius scale are defined in `_brand.json` `spacing.*` and `radius.*`. Changing radii alone produces dramatic visual shifts:

- Sharp / brutalist: `radius.*` = `0px`
- Soft / friendly: `radius.md` = `1rem`, `radius.lg` = `1.5rem`
- Default / balanced: as shipped

## Shadows

```jsonc
{
  "shadow": {
    "sm":   { "$value": "0 1px 2px 0 oklch(0 0 0 / 0.05)" },
    "md":   { "$value": "0 8px 24px -8px oklch(0 0 0 / 0.40)" },
    "lg":   { "$value": "0 16px 48px -12px oklch(0 0 0 / 0.55)" },
    "glow": { "$value": "0 0 40px -8px {color.primary}" }
  }
}
```

`shadow-glow` references the brand primary — so a hue rotation also rotates the glow color. Used on the featured pricing tier and emphatic CTAs.

## Tailwind utilities reference

| Token | Utility | CSS var |
| --- | --- | --- |
| Colors | `bg-{name}`, `text-{name}`, `border-{name}` | `--color-{name}` |
| Fonts | `font-{heading\|body\|mono}` | `--font-{name}` |
| Radii | `rounded-{sm\|md\|lg\|xl\|2xl}` | `--radius-{name}` |
| Shadows | `shadow-{sm\|md\|lg\|glow}` | `--shadow-{name}` |
| Easing | `ease-brand` | `--ease` |
| Duration | `duration-{fast\|base\|slow}` | `--duration-{name}` |
| Container | `max-w-container-{wide\|normal\|prose}` | `--container-{name}` |
| Fluid type | `text-fluid-{xl\|2xl\|3xl\|4xl\|5xl}` | `--text-{name}` |

## Testing your theme

1. **Set hue** in `_brand.json`. Save. Browser hot-reloads.
2. **Toggle theme** via the header `ThemeToggle` or by editing `document.documentElement.dataset.theme` in DevTools.
3. **Check contrast** — open Chrome DevTools → Lighthouse → run an accessibility audit. Target: zero contrast violations.
4. **Test reduced motion** — `Cmd+Shift+P` → "Show Rendering" → check "Emulate CSS prefers-reduced-motion: reduce".
5. **Test print** — `Cmd+P`. The print stylesheet in `index.css` should render a clean, readable B/W version.
