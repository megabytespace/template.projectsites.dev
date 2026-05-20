# Documentation Index

This folder is the structured reference for the `projectsites-template`. It's organized for AI agents (and humans) to navigate without reading everything.

## Read order (recommended)

1. **[AGENTS.md](../AGENTS.md)** — start here. Cross-IDE agent contract.
2. **[AI_GUIDE.md](./AI_GUIDE.md)** — LLM-specific patterns + decision trees.
3. **[ARCHITECTURE.md](./ARCHITECTURE.md)** — how the pieces fit together.
4. **[BRAND.md](./BRAND.md)** — `_brand.json` complete reference.
5. **[COMPONENTS.md](./COMPONENTS.md)** — catalog of section components.
6. **[PAGES.md](./PAGES.md)** — what's on each route.
7. **[RECIPES.md](./RECIPES.md)** — copy-paste customizations.
8. **[THEMING.md](./THEMING.md)** — light/dark, hue rotation, custom palettes.
9. **[SEO.md](./SEO.md)** — JSON-LD, meta, OG, sitemap, robots.
10. **[ACCESSIBILITY.md](./ACCESSIBILITY.md)** — WCAG 2.2 AA checklist.
11. **[DECISIONS.md](./DECISIONS.md)** — architectural decisions + rationale.
12. **[GLOSSARY.md](./GLOSSARY.md)** — terminology used across the docs.

## Industry profiles

Drop-in `_brand.json` presets for common business types. Each profile includes the feature flags, page composition, and copy tone to start from.

- [profiles/saas.md](./profiles/saas.md)
- [profiles/restaurant.md](./profiles/restaurant.md)
- [profiles/portfolio.md](./profiles/portfolio.md)
- [profiles/agency.md](./profiles/agency.md)
- [profiles/medical.md](./profiles/medical.md)
- [profiles/legal.md](./profiles/legal.md)
- [profiles/nonprofit.md](./profiles/nonprofit.md)
- [profiles/retail.md](./profiles/retail.md)
- [profiles/local-service.md](./profiles/local-service.md)

## Conventions used across all docs

- **`{PLACEHOLDER}`** marks copy you must replace before shipping.
- **File paths** are repo-relative unless prefixed with `~/`.
- **Code blocks** are runnable as-is.
- **Decision trees** start with "If X → do Y" to make AI parsing easy.
- **Section headings** never go deeper than `###`. Shallow trees are easier to scan.

## How to extend the docs

If you add a new section component, page, or feature flag, document it in the relevant file here AND update `AGENTS.md` if it affects the contract. Stale docs are worse than no docs.
