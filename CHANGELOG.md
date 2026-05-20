# Changelog

All notable changes to `projectsites-template` are documented here. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org).

## [3.1.0] — 2026-05-20

Validation, testing, CI, six new section components, scoped agent contracts.

### Added

#### Safety + validation
- `src/brandSchema.ts` — Zod-based schema for `_brand.json` + soft-warning linter
- `scripts/validate-brand.mjs` — CLI: `npm run validate:brand`. Validates schema + surfaces placeholder/range/format warnings.
- `scripts/swap-brand.mjs` — CLI: `npm run brand:swap [name]`. Backs up + swaps `_brand.json` with any `examples/` preset.

#### Testing
- `vitest.config.ts` + `tests/setup.ts` — jsdom + Testing Library setup
- `tests/unit/brand.test.ts` — 13 tests covering alias resolution, `applyBrand` side effects, `featureOn`
- `tests/unit/brandSchema.test.ts` — 10 tests covering all 9 presets pass schema + soft warnings
- `tests/unit/businessSchema.test.ts` — 19 tests for JSON-LD graph builder
- `playwright.config.ts` + 3 E2E specs — homepage, Cmd+K palette, theme toggle (Chromium + mobile Chrome)

#### CI
- `.github/workflows/ci.yml` — 5 parallel jobs: validate (brand + all 9 presets), typecheck, vitest, build, Playwright E2E. Bundle-size artifact uploaded.

#### Components
- `src/components/Image.tsx` — universal `<Image>` with AVIF/WebP/JPEG fallback, `priority` prop for LCP, aspect-ratio CLS prevention, srcset support
- `src/components/ErrorBoundary.tsx` — graceful render-error fallback with retry + dev stack trace, prod analytics breadcrumb (gtag + posthog)
- `src/components/DevA11yBadge.tsx` — dev-only floating chip showing real-time axe-core violation count (zero prod bundle impact)

#### Section components (6 new in `src/components/sections/`)
- `Newsletter.tsx` — promoted from `/components/`. Inline + bar variants, lead-magnet badge, double-opt-in friendly
- `Timeline.tsx` — promoted from `/components/`. Vertical + horizontal orientations; image support flagged for primary-source compliance per always.md
- `Tabs.tsx` — accessible WAI-ARIA tab pattern with arrow/Home/End keyboard nav. Inline state (no Radix dep)
- `CodeBlock.tsx` — code snippet with copy button, filename header, line-number gutter, line-highlight. No syntax-highlighting lib by design (lean bundle)
- `VideoEmbed.tsx` — privacy-first lazy embed for YouTube/Vimeo/Loom/MP4. Poster-first; iframe loads on click. youtube-nocookie.com default.
- `AnnouncementBanner.tsx` — dismissible top-of-page bar with `localStorage` persistence per `id`. Five tones (accent/success/warning/danger/info).

#### Scoped AGENTS.md files
- `src/components/sections/AGENTS.md` — component conventions + section-vs-section decision tree
- `src/pages/AGENTS.md` — page skeleton + 5-step new-page checklist
- `src/components/local/AGENTS.md` — local-business component rules + LocalBusiness JSON-LD requirements
- `scripts/AGENTS.md` — script-author conventions (exit codes, ANSI, idempotency)
- `tests/AGENTS.md` — Vitest + Playwright conventions
- `examples/AGENTS.md` — preset-author conventions
- `docs/AGENTS.md` — doc style guide + decision-tree pattern

#### Tooling
- `scripts/og-image.mjs` — generate `public/og-image.svg` from `_brand.json` (branded 1200×630 with brand color + headline + grid + accent border). Optional PNG via `--png` (requires sharp).
- `src/vite-env.d.ts` — Vite env type augmentation for `import.meta.env.DEV`

### Changed
- `package.json` → v3.1.0. Adds zod, vitest, @vitest/ui, @vitest/coverage-v8, @playwright/test, @axe-core/playwright, @testing-library/react, @testing-library/jest-dom, jsdom. New npm scripts: `test`, `test:watch`, `test:ui`, `test:coverage`, `e2e`, `e2e:prod`, `e2e:ui`, `e2e:install`, `validate:brand`, `brand:swap`, `og`.
- `src/main.tsx` — wraps app in `<ErrorBoundary>`
- `src/components/Layout.tsx` — mounts `<DevA11yBadge>` (dev-only)
- `public/og-image.svg` — generated from default `_brand.json`

### Build verification
- npm run typecheck: 0 errors
- npm run build: 363KB JS (107KB gzip), 129KB CSS (17KB gzip), 1587 modules
- npm test: 42 tests pass across 3 files
- npm run validate:brand: schema valid (10 placeholder warnings — expected on template default)
- npm run dev: HTTP 200 + all meta intact

## [3.0.1] — 2026-05-20

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
