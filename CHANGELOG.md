# Changelog

All notable changes to `projectsites-template` are documented here. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org).

## [Unreleased]

Documentation pass.

### Added
- `AGENTS.md` at repo root — cross-IDE agent contract per Linux Foundation spec
- `.cursorrules`, `.windsurfrules`, `.github/copilot-instructions.md` — IDE-specific config files pointing at `AGENTS.md`
- `docs/` library — 12 markdown files (README, AI_GUIDE, ARCHITECTURE, BRAND, COMPONENTS, PAGES, RECIPES, THEMING, SEO, ACCESSIBILITY, DECISIONS, GLOSSARY)
- `docs/profiles/` — 9 industry-specific configuration guides (SaaS, restaurant, portfolio, agency, medical, legal, nonprofit, retail, local-service)
- `examples/` — 9 drop-in `_brand.json` preset variants, one per profile
- `public/llms-full.txt` — full content manifest for AI agents (~600 lines)
- `CHANGELOG.md`, `CONTRIBUTING.md`

### Changed
- `public/llms.txt` references the new `llms-full.txt`

## [3.0.0] — 2026-05-20

Ground-up overhaul focused on AI customizability and 2026 design patterns.

### Added

#### Brand-token system
- `_brand.json` at repo root — W3C DTCG single source of truth
- `src/brand.ts` — alias resolver that writes CSS custom properties to `:root`
- OKLCH-first color palette with master `brandHue` + `brandChroma`
- Light / dark / auto color schemes with `[data-theme]` selectors
- Feature flags (`features.*`) — toggle entire homepage sections

#### Composable section library (`src/components/sections/`)
- `HeroCenter` + `HeroSplit` — two hero variants
- `KineticHeadline` — scroll-driven variable-font weight + letter-spacing animation
- `BentoGrid` — Apple-WWDC asymmetric 12-col with subgrid alignment
- `Stats` — animated count-up rollup
- `LogoCloud` — marquee or grid logo strip
- `Marquee` — reduced-motion-safe infinite scroller
- `ProcessSteps` — numbered "how it works" cards
- `FeatureSplit` — image-left/right copy block
- `Pricing` — 3-tier table with monthly/yearly toggle (emits Product JSON-LD)
- `Comparison` — feature comparison table
- `FAQ` — disclosure widget (emits FAQPage JSON-LD)
- `CTASection` — closer block (emphatic / quiet)
- `TeamGrid` — member cards (emits Person JSON-LD)
- `BlogList` — featured + grid posts
- `CaseStudyGrid` — portfolio grid with metrics

#### Universal pages
- `/pricing` — tier table + comparison + FAQ + CTA
- `/faq` — grouped FAQs (general / billing / support)
- `/blog` — featured + grid
- `/blog/:slug` — long-form article (emits BlogPosting JSON-LD)
- `/team` — member grid
- `/case-studies` — portfolio
- `*` (NotFound) — 404 with ⌘K + back / home

#### Interactive features
- `CommandPalette` — universal ⌘K palette with focus trap + return-focus on Esc
- `ThemeToggle` — dark / light / auto cycle with localStorage persistence
- Light-mode CSS — `[data-theme='light']` inverts OKLCH ramp

#### SEO + GEO
- `buildSiteJsonLd()` — emits 5+ JSON-LD blocks per page (Org + WebSite + WebPage + Breadcrumb + FAQPage)
- `llms.txt` — markdown index for LLM crawlers
- `robots.txt` — explicit per-AI-crawler allowlist
- `sitemap.xml` — all 12 public routes with `<lastmod>`
- Speculation Rules `<script>` in `index.html` for prerendering (Chrome 121+)
- View Transitions API cross-fade via `@view-transition`

#### PWA
- Full `site.webmanifest` with `screenshots[]`, `shortcuts[]`, `share_target`, `display_override`
- Maskable + any-purpose icons at 16/32/180/192/512
- `theme-color` per `prefers-color-scheme`
- `sw.js` cache-first for static, network-first for HTML with `offline.html` fallback

#### Design system
- Cascade layers in `src/index.css` (`@layer base / components / utilities`)
- OKLCH color tokens
- Fluid clamp() typography (`text-fluid-{xl,2xl,3xl,4xl,5xl}`)
- Glass + tactile-brutalism + grain surfaces
- Underline-hover + interactive-4 utilities

#### Bolt.diy support
- `.bolt/prompt` — per-template LLM brief
- `.bolt/ignore` — read-only path list
- `.bolt/config.json` — template manifest

### Changed
- `package.json` version bump to 3.0.0
- `tailwind.config.ts` — all colors now CSS-var-backed (no hex)
- `src/index.css` — full rewrite around OKLCH + cascade layers
- `index.html` — added OG meta, Twitter Cards, Speculation Rules, no-FOUC style
- `src/components/Header.tsx` — ⌘K button + ThemeToggle integration
- `src/components/Footer.tsx` — reads brand data via `src/brand.ts`
- `src/components/Layout.tsx` — mounts CommandPalette
- `src/pages/Home.tsx` — fully composed from new section library

### Build
- Verified: 0 TS errors
- Verified: 360 KB JS (106 KB gzip), 127 KB CSS (17 KB gzip)
- Verified: dev server HTTP 200, all meta intact

## [2.0.0] — pre-v3 baseline

Initial public template state — Vite + React 18 + Tailwind + React Router with PhotoSwipe lightbox.
