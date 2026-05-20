# template.projectsites.dev — Cinematic Website Template

A production-ready React + Vite + Tailwind template built for AI customization. Drop a brand into `_brand.json`, fill in copy placeholders, ship. Works with bolt.diy, bolt.new, Claude Code, Cursor — anything that can edit JSON + JSX.

## Architecture in one screen

```
_brand.json              ← single source of truth (W3C DTCG tokens)
   ↓ resolved by
src/brand.ts             ← applies CSS custom properties at boot
   ↓ consumed by
src/index.css            ← @layer base / utilities (OKLCH-first)
tailwind.config.ts       ← Tailwind utilities point at CSS vars
   ↓ used by
src/components/*         ← all components read tokens via `bg-accent`, `text-text-muted` etc.
```

**Rotate one number (`color.brandHue`), reskin the entire site.** Color, surfaces, text, gradients, glows — every OKLCH color references the brand hue.

## Stack

- **Vite 5** + **React 18** + **TypeScript 5**
- **Tailwind 3** with cascade layers, CSS variables, OKLCH
- **React Router 6** — 15 universal pages registered
- **PhotoSwipe v5** lightbox (auto-mounted)
- **animate.css** + custom keyframes
- **lucide-react** for icons
- **Radix primitives** for headless slots
- Zero state-management library (component-local state is enough for a marketing site)

## Universal pages (registered in `src/App.tsx`)

| Route | File | Purpose |
| --- | --- | --- |
| `/` | `Home.tsx` | Hero + bento + stats + features + process + pricing + FAQ + CTA |
| `/about` | `About.tsx` | Company story, mission, stats |
| `/services` | `Services.tsx` | Service grid |
| `/pricing` | `Pricing.tsx` | 3-tier pricing + comparison + FAQ |
| `/faq` | `FAQ.tsx` | Grouped FAQ with FAQPage JSON-LD |
| `/blog` | `Blog.tsx` | Featured post + recent grid |
| `/blog/:slug` | `BlogPost.tsx` | Long-form article with BlogPosting JSON-LD |
| `/team` | `Team.tsx` | Person grid with Person JSON-LD |
| `/case-studies` | `CaseStudies.tsx` | Portfolio of work with metrics |
| `/contact` | `Contact.tsx` | Form + NAP block |
| `/privacy`, `/terms`, `/accessibility` | legal | WCAG 2.2 AA statement included |
| `*` | `NotFound.tsx` | 404 with search + back/home |

## Composable section library (`src/components/sections/`)

| Component | Use case |
| --- | --- |
| `HeroCenter`, `HeroSplit` | Two hero layouts |
| `KineticHeadline` | Scroll-driven variable-font headline |
| `BentoGrid` | Apple-WWDC-style asymmetric grid (Fluid Bento with subgrid) |
| `Stats` | Animated number rollup |
| `LogoCloud` | Marquee or grid of partner logos |
| `Marquee` | Generic infinite scroller (pauses on hover, respects reduced motion) |
| `ProcessSteps` | Numbered "how it works" |
| `FeatureSplit` | Image-left / image-right block |
| `Pricing` | 3-tier with monthly/yearly toggle + Product JSON-LD |
| `Comparison` | Competitive / tier comparison table |
| `FAQ` | Disclosure widget + FAQPage JSON-LD (highest AI citation rate) |
| `CTASection` | Closer block (emphatic or quiet tone) |
| `TeamGrid` | Person cards with Person JSON-LD |
| `BlogList` | Featured + grid posts |
| `CaseStudyGrid` | Portfolio grid with metrics |

All sections accept the same shape: `eyebrow`, `headline`, `description`, and a typed data prop. Read tokens through Tailwind utilities — never hardcode colors.

## Theme system

### `_brand.json` (W3C DTCG)

```json
{
  "color": {
    "brandHue":    { "$value": "240" },
    "brandChroma": { "$value": "0.18" },
    "primary":     { "$value": "oklch(0.62 {color.brandChroma} {color.brandHue})" }
  }
}
```

`src/brand.ts` resolves the alias references (`{color.brandHue}` → `240`) and writes the result to CSS variables. Tailwind utilities (`bg-primary`, `text-text-muted`) point at those vars. **One edit cascades everywhere.**

### Light / dark / auto

Set `colorScheme` in `_brand.json` to `dark`, `light`, or `auto`. The user can also cycle modes via the **ThemeToggle** in the header. Choice persists in `localStorage`.

### Feature flags

`features.*` in `_brand.json` toggles entire homepage sections on/off:

```json
"features": {
  "hero":        true,
  "bento":       true,
  "stats":       true,
  "process":     false,
  "pricing":     false,
  "faq":         true,
  "logoCloud":   false,
  "team":        false,
  "caseStudies": false
}
```

`featureOn('pricing')` in `Home.tsx` reads these — no need to delete code, just flip the boolean.

## Cmd+K palette

Press `⌘K` (Mac) or `Ctrl+K` (Win/Linux) anywhere to open the universal command palette. Lists all routes + the theme toggle. Esc closes and returns focus to the trigger.

Add custom actions:

```tsx
import { CommandPalette } from '@/components/CommandPalette';

<CommandPalette extra={[
  { id: 'book', label: 'Book a demo', group: 'Actions', href: '/contact?intent=demo' },
]} />
```

## PWA kit (full)

- `site.webmanifest` with `screenshots[]`, `shortcuts[]`, `share_target`, maskable icons
- `sw.js` cache-first + network-first split with `offline.html` fallback
- `apple-touch-icon` 180×180, favicon 32/16, android-chrome 192/512, maskable 512
- `browserconfig.xml` Windows tile
- `theme-color` per `prefers-color-scheme`

## SEO + GEO

- 5+ JSON-LD blocks per page (Organization / WebSite / WebPage / BreadcrumbList / FAQPage)
- Per-page `useSEO({ title, description })` hook writes `<title>` + meta dynamically
- Speculation Rules `<script type="speculationrules">` in `index.html` prerenders internal links
- `llms.txt` for LLM crawlers
- `robots.txt` explicitly lists GPTBot / ClaudeBot / PerplexityBot / Google-Extended
- `sitemap.xml` with `<lastmod>` per URL

## Accessibility (WCAG 2.2 AA)

- Skip-to-main link
- Focus rings everywhere (`:focus-visible` 3px accent)
- Target size ≥24px (44px for primary CTAs)
- `prefers-reduced-motion` cuts all animation
- `aria-current`, `aria-expanded`, `aria-controls` on nav + accordions
- Form labels visible + linked
- Color contrast tested against OKLCH lightness ramps

## Build

```bash
npm install
npm run build      # → dist/
npm run dev        # → http://localhost:5173
```

## Quality bar

- Every page: ≥500 words of real content
- LCP ≤2.5s, INP ≤200ms, CLS ≤0.1
- Lighthouse: Perf ≥90, A11y ≥95, SEO ≥95
- Zero console errors
- Zero placeholder strings in production (every `{PLACEHOLDER}` replaced)

## What NOT to touch

| File | Why |
| --- | --- |
| `_brand.json` | Edit it — but **only** edit it. Don't move or rename. |
| `src/brand.ts` | The resolver. Edit only if extending DTCG support. |
| `src/index.css` token block | Initial fallbacks. Don't hardcode brand colors here. |
| `tailwind.config.ts` color block | All colors point at CSS vars. Don't replace with hex. |
| `.bolt/` | bolt.diy meta. Hands off. |
