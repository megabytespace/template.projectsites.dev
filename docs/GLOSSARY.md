# Glossary

Terminology used across the docs. AI-parseable, alphabetized.

| Term | Definition |
| --- | --- |
| **ADR** | Architectural Decision Record. Documented design choice with rationale. See `docs/DECISIONS.md`. |
| **AGENTS.md** | Cross-IDE contract file at repo root. Read by Cursor, Windsurf, Codex CLI, Copilot, and others. |
| **Alias (DTCG)** | A token reference like `{color.brandHue}` that resolves to another token's value at boot. |
| **Bento grid** | Asymmetric 12-column dense-pack grid with subgrid alignment. Popularized by Apple WWDC. |
| **bolt.diy** | StackBlitz Labs open-source full-stack AI builder. Uses WebContainers. |
| **brand.json** | Repo-root file holding all brand tokens in W3C DTCG format. Single source of truth. |
| **brandHue** | Master OKLCH hue (0–360) in `_brand.json`. Drives primary, background, surface, text, border. |
| **Breakpoint** | Tailwind responsive breakpoint. 375 / 390 / 768 / 1024 / 1280 / 1920. |
| **businessClass** | Schema.org type selector in `_brand.json`. Drives JSON-LD `@type` choice. |
| **Cmd+K** | Keyboard shortcut to open the command palette. Universal across the template. |
| **CMP** | Consent Management Platform. Not in template; add per-site if needed (GDPR / CCPA). |
| **CSS variable** | Custom property like `--color-primary` set on `:root`. Consumed by Tailwind utilities. |
| **DTCG** | Design Tokens Community Group. W3C spec for design tokens. `_brand.json` follows this. |
| **EEAT** | Experience, Expertise, Authoritativeness, Trustworthiness. Google quality signals. |
| **Feature flag** | Boolean in `_brand.json` `features.*`. Toggles homepage sections without code changes. |
| **FAQPage JSON-LD** | Schema.org type with highest AI citation rate across ChatGPT / Perplexity / Google AI Overviews. |
| **Fluid type** | Type sized via `clamp()` so it scales smoothly between min and max viewports. |
| **FOUC** | Flash of Unstyled Content. Prevented by inline `<style>` in `index.html`. |
| **GEO** | Generative Engine Optimization. The AI-search equivalent of SEO. |
| **Grain overlay** | Subtle film-grain SVG noise layer for texture. `.grain` utility in `src/index.css`. |
| **JSON-LD** | JSON-formatted structured data for search engines. `<JsonLd>` component renders it safely. |
| **Kinetic typography** | Text that moves / scales / changes weight based on user interaction. See `KineticHeadline`. |
| **LCP** | Largest Contentful Paint. Target ≤ 2.5s. |
| **llms.txt** | Optional markdown index file at site root for LLM crawlers. Spec: llmstxt.org. |
| **llms-full.txt** | Optional fuller version of `llms.txt` containing full content of core pages. |
| **Local business** | businessClass that triggers `LocalBusiness`-derived schema with geo + hours. |
| **MPA** | Multi-Page Application. The template is technically an SPA but uses MPA-style View Transitions. |
| **OKLCH** | CSS color space (lightness, chroma, hue). Perceptually uniform; Display P3 ready. |
| **OG image** | Open Graph image, 1200×630 branded card shown when the page is shared on social. |
| **PhotoSwipe** | The lightbox library used. v5 in this template. |
| **PWA** | Progressive Web App. Manifest, service worker, install banner — all built in. |
| **Reveal-on-view** | CSS class that animates an element in as it scrolls into the viewport. |
| **Schema.org** | Vocabulary for structured data. Most JSON-LD types come from here. |
| **Service worker** | `public/sw.js`. Handles offline fallback + asset caching. |
| **Speculation Rules** | Chrome 121+ API for prerendering internal links. Inline `<script>` in `index.html`. |
| **Subgrid** | CSS feature where nested grids inherit parent grid lines. Used for bento alignment. |
| **Tactile brutalism** | 2026 design aesthetic: sharp geometry, 1px borders, no soft shadows, grain texture. |
| **Token (DTCG)** | A typed leaf in `_brand.json` with `$value`, `$type`, `$description`. |
| **View Transitions** | Native browser API for cross-fading page changes. Enabled via `@view-transition`. |
| **WCAG 2.2 AA** | Web Content Accessibility Guidelines. Target conformance level. |
| **WebContainer** | StackBlitz tech that runs Node in the browser. bolt.diy runs on this. |
| **{PLACEHOLDER}** | A literal string in template content that must be replaced before shipping. |
