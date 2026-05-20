# Architecture

How the template fits together, from JSON to pixels.

## Data flow

```
                   ┌────────────────────────────────┐
                   │      _brand.json (DTCG)        │
                   │   color / font / spacing /     │
                   │   features / business data     │
                   └──────────────┬─────────────────┘
                                  │
                                  ▼ at boot (main.tsx → applyBrand)
                   ┌────────────────────────────────┐
                   │       src/brand.ts             │
                   │  • alias resolution            │
                   │  • OKLCH ramp expansion        │
                   │  • CSS custom properties on    │
                   │    document.documentElement    │
                   │  • document.documentElement    │
                   │    .dataset.theme = colorScheme│
                   └──────────────┬─────────────────┘
                                  │
                                  ▼
                   ┌────────────────────────────────┐
                   │            :root               │
                   │   --color-primary, --color-    │
                   │   accent, --font-heading, …    │
                   └──────────────┬─────────────────┘
                                  │
            ┌─────────────────────┼─────────────────────┐
            ▼                     ▼                     ▼
  src/index.css           tailwind.config.ts     components/* (.tsx)
  • @layer base           colors map to var(--…) read `bg-accent`,
  • @layer components     fontFamily, fontSize,    `text-text-muted`,
  • @layer utilities      radii, durations          `border-border` etc.
  • view transitions
  • kinetic animations
```

## File responsibilities

### `_brand.json` (root)

W3C Design Tokens Community Group format. Single source of truth.

- `business.*` — business identity (name, description, contact, etc.)
- `color.*` — OKLCH-based palette with master `brandHue` and `brandChroma`
- `colorScheme` — `dark` | `light` | `auto`
- `font.*` — Google Fonts names + weights
- `radius.*`, `spacing.*`, `shadow.*`, `motion.*` — scale knobs
- `layout.*` — container widths
- `social.*` — social profile URLs
- `features.*` — homepage-section toggles

Aliases supported via `{path.to.token}` syntax. Resolver in `src/brand.ts` does recursive substitution up to 8 levels deep.

### `src/brand.ts`

Pure module — no React. Exports:

| Export | Purpose |
| --- | --- |
| `brand: Brand` | Typed, alias-resolved view of `_brand.json` |
| `applyBrand()` | Writes CSS custom properties to `:root` |
| `featureOn(key)` | Boolean kill-switch reader |
| `googleFontsHref()` | Builds Google Fonts URL from `font.*` block |

Called once from `main.tsx` before React renders.

### `src/index.css`

Layered CSS:

- `@tailwind base/components/utilities` — Tailwind reset + utilities
- `:root` — initial token values (fallback before `applyBrand()` runs)
- `[data-theme='light']` / `[data-theme='auto']` — light-mode overrides
- `body` / `html` — base typography + bg
- `@view-transition` — cross-document MPA cross-fade (auto)
- `@layer` — surfaces (glass, card-tactile, grain), type utilities (gradient-text, underline-hover), kinetic animations, marquee, bento, photoswipe, cmd+k, click-ripple, print, reduced-motion

### `tailwind.config.ts`

All colors map to `var(--color-…)`. Font families map to `var(--font-…)`. Radii, durations, easing — all CSS vars.

The implication: **changing a number in `_brand.json` cascades through every Tailwind utility class on the page** with zero rebuild required. Hot-reload-friendly.

### `src/components/Layout.tsx`

The page chrome wrapper. Renders:

```
<SkipLink />
<Header />
  <main id="main" tabIndex={-1}>
    {children}                  ← route content
  </main>
<Footer />
<BackToTop />                   ← floating button, appears after 600px scroll
<Lightbox />                    ← PhotoSwipe auto-mount, scans <main> images
<CommandPalette />              ← global ⌘K palette
```

Every route in `src/App.tsx` is wrapped in this layout via the top-level `<Layout>` JSX.

### `src/App.tsx`

Route table. 15 routes:

```
/                  Home
/about             About
/services          Services
/pricing           Pricing
/faq               FAQ
/blog              Blog
/blog/:slug        BlogPost
/team              Team
/case-studies      CaseStudies
/case-studies/:slug BlogPost (reuses)
/contact           Contact
/privacy           Privacy
/terms             Terms
/accessibility     Accessibility
*                  NotFound
```

`<ScrollToTop />` and `<PageTransition />` wrap `<Routes>` so navigation resets scroll + keeps the page background dark during the cross-fade.

### `src/components/sections/`

15 composable section components. See `docs/COMPONENTS.md` for full catalog. Each section is independently usable, accepts an `eyebrow` + `headline` + data-shape prop, and reads brand tokens via Tailwind utilities.

### `src/lib/`

| File | Purpose |
| --- | --- |
| `businessSchema.ts` | Builds JSON-LD graph (Organization / LocalBusiness / WebSite / WebPage / BreadcrumbList) |
| `altText.ts` | Dedupe + derive alt text utility |
| `cursor.ts` | Click-ripple cursor effect (desktop fine-pointer only) |
| `utils.ts` | `cn(...)` — tailwind-merge wrapper |

### `src/hooks/`

| Hook | Purpose |
| --- | --- |
| `useSEO({ title, description, canonical? })` | Writes `<title>` + `<meta name="description">` on mount |
| `useInView()` | IntersectionObserver wrapper for scroll reveal fallback |

## Boot sequence

1. `index.html` loads — initial dark bg painted from inline `<style>` (no FOUC)
2. `src/main.tsx` runs:
   1. `applyBrand()` — writes CSS vars to `:root`
   2. `document.documentElement.classList.add('js-reveal-active')` — enables scroll-reveal fallback
   3. `initCursorRipple()` — attaches pointerdown listener for click ripples
3. React renders `<App />` inside `<BrowserRouter>`
4. `Layout` mounts Header + Footer + Lightbox + CommandPalette
5. Active route renders inside `<main>`
6. PhotoSwipe scans `<main>` for images and tags them `data-zoomable`
7. Service worker (`/sw.js`) registers — cache-first for static, network-first for HTML
8. Speculation Rules `<script>` prerenders same-origin `<a>` links (Chrome 121+)

## Build pipeline

```
npm run build
├── tsc -b                 → typecheck (zero errors required)
└── vite build             → bundle to dist/
                              • dist/index.html (with hashed JS + CSS)
                              • dist/assets/index-*.js (≤250KB gzip)
                              • dist/assets/index-*.css (≤50KB gzip)
                              • dist/public/* (copied verbatim)
```

Vite tree-shakes unused exports. The 15 section components are each ~3–8KB minified; only what `src/pages/*` actually imports lands in the bundle.

## Deploy targets

This is a static SPA. It runs anywhere that serves static files:

- Cloudflare Pages / Workers Assets
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Any nginx / Caddy / Apache server

For projectsites.dev, the canonical target is Cloudflare R2 + Workers. The build output in `dist/` uploads as-is.

## Why not React 19 / Next.js / Astro?

Decision documented in `docs/DECISIONS.md`. TL;DR:

- **React 18** for maximum WebContainer compatibility (bolt.diy runs in WebContainers)
- **Vite** over Next.js because SSR isn't needed for marketing sites; SPA is simpler + faster to deploy
- **Astro** considered but rejected because of the migration cost vs benefit for an already-fast SPA
- **TanStack Router** considered but React Router 6 is more familiar to bolt.diy / Claude generation paths

## Where things deliberately diverge from defaults

| Decision | Why |
| --- | --- |
| OKLCH not HSL | Perceptually uniform; future-proof for Display P3 |
| CSS variables not theme-provider | No React provider re-render on theme change; faster boot |
| Section composition over page templates | Avoids page-template lock-in; encourages reuse |
| `_brand.json` at root not in `src/` | Top-level discoverability — AI agents always look at root first |
| Feature flags in `_brand.json` not env vars | Configuration colocated with brand; no env management overhead |
| PhotoSwipe over YARL | YARL hit containing-block bugs with backdrop-filter ancestors; PhotoSwipe doesn't |
| `cmdk`-style palette implemented inline | Avoids dep on `cmdk` package; ~80 lines does the job |
| Cascade layers in CSS | Predictable specificity; future-proof |

## Performance budgets

| Asset | Budget (gzip) |
| --- | --- |
| Total JS per route | ≤250 KB |
| Total CSS | ≤50 KB |
| Single image (LCP) | ≤200 KB |
| All images combined per page | ≤500 KB |
| Font files | ≤100 KB (preload + unicode-range subset) |
| OG image | ≤100 KB (branded card, not raw photo) |

Current state at v3.0:

- JS: 360 KB (106 KB gzip) — under budget
- CSS: 127 KB (17 KB gzip) — under budget
- No images in template (added per-site)

## Extension points

If you need to extend without breaking the architecture:

| You want to… | Do this |
| --- | --- |
| Add a new color token | Add to `_brand.json` `color` block, add to `COLOR_KEYS` in `src/brand.ts`, add to `tailwind.config.ts` `colors` |
| Add a new font | Add to `font.*` in `_brand.json`, update Google Fonts URL in `index.html`, add CSS var in `applyBrand` |
| Add a new section component | Create in `src/components/sections/MyThing.tsx`, export from `index.ts`, document |
| Add a new page | Create `src/pages/MyPage.tsx`, register in `src/App.tsx`, add to sitemap + palette + footer routes |
| Add a new feature flag | Add to `features.*` in `_brand.json`, gate the section render in `src/pages/Home.tsx` with `featureOn('myFlag')` |
| Hook up analytics | Add GTM snippet in `index.html` + `src/global.d.ts` already declares `gtag` and `posthog` for TypeScript |
| Add a backend | Set `BUSINESS_URL` to your worker, point form actions at `${BUSINESS_URL}/api/...`, implement separately |
