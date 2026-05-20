# AGENTS.md — tests/

> Scoped conventions for the test suite. Inherits from root `AGENTS.md`.

## Layout

```
tests/
├── setup.ts            Vitest setup — polyfills jsdom for matchMedia + IntersectionObserver
├── unit/               Vitest unit tests (run via `npm test`)
│   ├── brand.test.ts
│   ├── brandSchema.test.ts
│   └── businessSchema.test.ts
└── e2e/                Playwright tests (run via `npm run e2e`)
    ├── homepage.spec.ts
    ├── cmdk.spec.ts
    └── theme.spec.ts
```

## Vitest unit tests

- Run: `npm test`
- Watch: `npm run test:watch`
- UI: `npm run test:ui`
- Coverage: `npm run test:coverage`

### Conventions

- One test file per source module — name mirrors `src/path/Foo.ts` → `tests/unit/Foo.test.ts`
- Use `describe` for grouping, `it` for assertions
- Prefer pure-function tests over component-render tests where possible
- Mock the DOM only when absolutely necessary; jsdom polyfills cover most cases
- `expect.assertions(N)` for async tests to catch silent failures

## Playwright E2E tests

- Run against dev server: `npm run e2e`
- Run against production URL: `PROD_URL=https://yoursite.com npm run e2e:prod`
- Use Playwright Test Agents (v1.59+): `npx playwright init-agents --loop=claude`

### Conventions

- **Homepage-first** — every spec starts at `/`, navigates via clicks/keyboard
- **No `page.goto()` after the first navigation** — emulate real-user flow
- **6 breakpoints**: 375 (mobile), 390 (mobile), 768 (tablet), 1024 (laptop), 1280 (desktop), 1920 (wide)
- **Test account**: `test@example.com` / via env var — never personal data
- **No sleeps** — use `waitFor` / `toBeVisible()`
- **Selectors**: `data-testid`, ARIA role, or visible text — in that order
- **Reset state**: spec files are independent; don't rely on order

### Required gates per spec

- ✅ Console errors: 0
- ✅ Network 4xx/5xx: 0
- ✅ axe-core violations: 0 (via `@axe-core/playwright`)
- ✅ Screenshot at each major step → `tests/e2e/screenshots/{spec}/{step}.png`

## Adding a new test file

1. Pick the right tier — unit if pure logic, E2E if it touches DOM / routing / fetch
2. Mirror the source path in the filename
3. Add a JSDoc block at top describing what's covered
4. Run `npm test` (or `npm run e2e`) — must pass before merge
5. If the new test reveals a bug, fix the bug in the same PR

## What NOT to test

- Tailwind utility classes (Tailwind tests itself)
- Third-party library internals (React, react-router, photoswipe — out of scope)
- Visual exact pixel positions (use Percy / Chromatic for that — not currently wired)
- Environment-specific behavior (CI vs local — flag with `describe.skipIf(process.env.CI)`)
