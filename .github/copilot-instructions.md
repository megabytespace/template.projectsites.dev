# GitHub Copilot Instructions

> Canonical instructions live in `AGENTS.md` at the repo root. Copilot reads both — that file is authoritative.

## Quick summary

This is `projectsites-template@3.0.0` — a production-ready cinematic website template built for AI-customized site generation.

**Stack:** Vite 5 + React 18 + TypeScript 5 + Tailwind 3 + React Router 6 + PhotoSwipe v5

**Architecture:**
- `_brand.json` (W3C DTCG tokens) = single source of truth for visual identity
- `src/brand.ts` resolves alias references and writes CSS custom properties to `:root` at boot
- Tailwind config + CSS files consume those vars — never hardcode hex colors anywhere
- 15 universal pages registered in `src/App.tsx`
- 15 composable section components in `src/components/sections/`

## Conventions

- TypeScript strict mode, no `any`
- `@/` alias maps to `src/`
- Tailwind utilities for colors: `bg-accent`, `text-text-muted`, `border-border`
- All images need alt text
- All emails / phones / addresses must be real links

## Programmatic checks

```bash
npm install
npm run typecheck   # 0 errors
npm run build       # 0 errors
```

Read `AGENTS.md` for the full contract before making non-trivial edits.
