# Contributing

This template ships generated sites on [projectsites.dev](https://projectsites.dev). Internal team primarily; community PRs welcome with guardrails.

## What to contribute

✅ **Bug fixes** — broken builds, accessibility issues, browser compatibility
✅ **New section components** — propose first via issue; must follow conventions in `docs/COMPONENTS.md`
✅ **New industry profiles** — add a `docs/profiles/*.md` + `examples/_brand.*.json` pair
✅ **Docs improvements** — clearer wording, missing context, fixed typos
✅ **Performance wins** — bundle size, LCP, INP improvements

❌ **Backwards-incompatible refactors** — discuss first
❌ **New top-level deps** — every dep must justify its bundle cost
❌ **Removing existing components** — generated sites depend on them
❌ **Changing the brand token schema** — `_brand.json` is a public API
❌ **Adding SSR / hydration libraries** — see ADR-002

## Setup

```bash
git clone https://github.com/heymegabyte/template.projectsites.dev
cd template.projectsites.dev
npm install
npm run dev      # localhost:5173
```

## Before opening a PR

```bash
npm run typecheck   # must pass with 0 errors
npm run build       # must pass with 0 errors
```

Visual smoke test:

1. Pick a preset: `cp examples/_brand.saas.json _brand.json`
2. Run dev: `npm run dev`
3. Visit every route in `src/App.tsx` — verify no console errors
4. Open ⌘K palette — verify it autofocuses + navigates
5. Toggle theme via header button — verify dark/light/auto cycle works
6. Resize to 375px wide — verify mobile layout
7. Throw away your local `_brand.json` before committing (it's gitignored only on real sites; the repo ships its default)

## Component conventions

When adding a new section component:

1. **File** — `src/components/sections/MyThing.tsx`. Default + named export.
2. **Props** — accept `eyebrow?`, `headline?`, `description?`, `className?` plus your specific data
3. **Container** — outer `<section>` with `py-24 md:py-32 max-w-container-wide mx-auto px-6`
4. **Reveal** — items animate via `.reveal-on-view` class
5. **Colors** — Tailwind tokens only (`bg-accent`, `text-text-muted`, never hex)
6. **Reduced motion** — verify the section degrades gracefully under `prefers-reduced-motion: reduce`
7. **Export** — add to `src/components/sections/index.ts`
8. **Docs** — add an entry to `docs/COMPONENTS.md` with props + example
9. **Decision** — if non-obvious, add an ADR in `docs/DECISIONS.md`

Example skeleton:

```tsx
// src/components/sections/MyThing.tsx
import { cn } from '@/lib/utils';

interface Props {
  /* ...specific props... */
  eyebrow?: string;
  headline?: string;
  description?: string;
  className?: string;
}

export function MyThing({ eyebrow, headline, description, className }: Props) {
  return (
    <section className={cn('py-24 md:py-32 max-w-container-wide mx-auto px-6', className)}>
      {(eyebrow || headline) && (
        <div className="text-center mb-12 reveal-on-view">
          {eyebrow && <span className="text-accent text-sm font-mono tracking-widest uppercase">{eyebrow}</span>}
          {headline && <h2 className="text-3xl md:text-5xl font-bold font-heading mt-4 text-text">{headline}</h2>}
          {description && <p className="text-text-muted max-w-2xl mx-auto mt-4">{description}</p>}
        </div>
      )}
      {/* main content */}
    </section>
  );
}

export default MyThing;
```

## Brand-token additions

If you add a new color / font / radius / etc. token:

1. Add to `_brand.json` with `$value` + `$type` + `$description`
2. If it's a color, add the key to `COLOR_KEYS` array in `src/brand.ts`
3. Add the CSS-var-backed Tailwind token in `tailwind.config.ts`
4. Document the new token in `docs/BRAND.md`
5. Update every preset in `examples/_brand.*.json` so it doesn't break

## Industry profile additions

To add a new industry preset:

1. Create `docs/profiles/{name}.md` following the existing structure (when-to-use → brand settings → homepage composition → tone → don't include)
2. Create `examples/_brand.{name}.json` with all token blocks (use an existing preset as the starting point)
3. Add a row to the table in `examples/README.md` and `docs/README.md`
4. Test the preset by copying it to `_brand.json` and running `npm run dev`
5. Submit PR with screenshots

## Commit message format

Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

```
feat(sections): add ComparisonCarousel component
fix(theme): correct OKLCH lightness in light-mode text-muted
docs(profiles): add educational institutions profile
chore(deps): bump react-router to 6.27.0
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.

Scopes: `sections`, `pages`, `theme`, `brand`, `pwa`, `seo`, `a11y`, `lightbox`, `palette`, `docs`, `deps`.

## Code style

- TypeScript strict; no `any`
- Components: PascalCase file + named export
- Hooks: camelCase, `use*` prefix
- Tailwind utilities preferred over custom CSS
- CSS variables only in `:root` or named theme blocks
- JSDoc on non-trivial functions — comment the WHY, not the WHAT

## What gets reviewed

PRs are reviewed for:

1. **Build correctness** — `npm run typecheck` + `npm run build` pass
2. **Brand-token compliance** — no hardcoded colors / hex in components
3. **Accessibility** — focus rings, ARIA, reduced motion respected
4. **Bundle impact** — every kilobyte justified
5. **Docs alignment** — new code paired with doc updates
6. **Backwards compatibility** — existing generated sites still build

## Contact

- Issues: https://github.com/heymegabyte/template.projectsites.dev/issues
- Email: hey@megabyte.space
- Maintainer: Brian Zalewski
