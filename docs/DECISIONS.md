# Decisions

Architectural decisions and the reasoning behind them. Format: ADR-lite. Append new entries at the bottom.

---

## ADR-001 — DTCG tokens via `_brand.json` as single source of truth

**Context.** AI-generated sites need predictable rebranding. Hardcoded hex values scattered across components defeat AI editing. Tailwind config alone isn't AI-discoverable because Tailwind files are large and structurally heterogeneous.

**Decision.** Adopt W3C Design Tokens Community Group format. Store everything in `_brand.json` at repo root. Resolve at boot via `src/brand.ts` into CSS custom properties. Tailwind reads those CSS vars.

**Consequences.**
- ✅ One file controls all brand identity. AI agents can rebrand by editing one JSON.
- ✅ Standards-compatible — output works with Figma Tokens, Style Dictionary, Penpot.
- ✅ OKLCH-first; perceptually uniform; future-proof for Display P3.
- ❌ Slightly heavier boot (resolver runs before React mounts) — measured at <5ms; acceptable.
- ❌ Some tokens use string aliases that look unusual to devs unfamiliar with DTCG.

---

## ADR-002 — Vite + React 18, not Next.js or Astro

**Context.** Marketing sites historically use Next.js. Astro is the modern static-first contender.

**Decision.** Vite + React 18 + React Router 6, client-only SPA.

**Consequences.**
- ✅ Simplest possible deploy — just static files. Runs on R2, Pages, S3, anywhere.
- ✅ Fast dev server. WebContainer-compatible (bolt.diy runs in WebContainers).
- ✅ Lower cognitive load for AI generators — no SSR / RSC / hydration mental model.
- ❌ No server rendering — SEO depends on crawlers JS-rendering. Modern bots (Googlebot, GPTBot, ClaudeBot) all do; older bots may not.
- ❌ No incremental static regeneration.

**Mitigation for SEO.** Speculation Rules + comprehensive JSON-LD + sitemap make this acceptable. For pure-SEO-driven sites with thousands of pages, switch to Astro.

---

## ADR-003 — Tailwind 3 (not v4) for theming

**Context.** Tailwind v4 has first-class OKLCH + `@theme` directive. v3 is stable and widely-tooled.

**Decision.** Use Tailwind v3 with CSS variables. Migrate to v4 when (a) it's been stable for ≥6 months and (b) the dev-tool ecosystem (oxlint, ESLint plugins) catches up.

**Consequences.**
- ✅ Battle-tested. Plugins work. AI generators trained on v3 produce correct code.
- ✅ CSS-var-based approach is forward-compatible with v4's `@theme` directive.
- ❌ Migration to v4 will require a small refactor when we do it.

---

## ADR-004 — OKLCH not HSL

**Context.** HSL is familiar but perceptually non-uniform (a "blue" at L=50 looks darker than a "yellow" at L=50). OKLCH solves this.

**Decision.** All brand colors in OKLCH. Hex fallbacks allowed for one-off overrides.

**Consequences.**
- ✅ Predictable lightness ramps. Hue rotation produces consistent results across the whole spectrum.
- ✅ Display P3 ready — captures the wider gamut on modern displays.
- ❌ ~85% browser support as of May 2026. Falls back to `oklch()` direct color on supporting browsers; older browsers see the previous declaration (none, in this template).
- ❌ Designers used to HSL need 5 minutes of adjustment.

---

## ADR-005 — PhotoSwipe v5 over yet-another-react-lightbox

**Context.** YARL had containing-block bugs with `backdrop-filter` ancestors. PhotoSwipe v5 is framework-agnostic and avoids those bugs.

**Decision.** PhotoSwipe v5 auto-mounted in `Layout.tsx`. Image detection scans `<main>` for eligible images.

**Consequences.**
- ✅ Works in any containing-block scenario.
- ✅ Native gestures (pinch, swipe, double-tap).
- ✅ Smaller bundle than YARL.
- ❌ No native React bindings — need useEffect mount.

---

## ADR-006 — Inline Cmd+K palette, no `cmdk` dep

**Context.** `cmdk` is the de facto React command palette library. Used by Linear, Raycast.

**Decision.** Implement Cmd+K in ~150 LOC inline. No new dep.

**Consequences.**
- ✅ Smaller bundle. No library version churn.
- ✅ Full control over styling and keyboard behavior.
- ✅ Easy to extend (just pass `extra` actions).
- ❌ Re-invents some logic (filtering, arrow nav). Manageable at this scale.

If we ever need virtualization for 1000+ commands, we'll migrate to `cmdk`. Not currently needed.

---

## ADR-007 — Section composition, not page templates

**Context.** Older website templates ship "pre-built page templates" — a SaaS Home, a Restaurant Home, etc. AI agents struggle to remix them because the templates encode too many decisions.

**Decision.** Ship 15 section components. Pages compose sections. Profiles (`docs/profiles/*.md`) document common compositions without locking them in.

**Consequences.**
- ✅ AI agents can mix and match. Composability over inheritance.
- ✅ Adding industries doesn't require new templates — just new docs.
- ✅ Sections are independently testable.
- ❌ A first-time human reader has more to learn. Mitigated by `docs/COMPONENTS.md` + `docs/RECIPES.md`.

---

## ADR-008 — Feature flags in `_brand.json` not env vars

**Context.** Toggling homepage sections could be done via env vars, conditional imports, or boolean flags.

**Decision.** Boolean flags in `_brand.json` `features.*`. Read via `featureOn(key)` helper.

**Consequences.**
- ✅ Co-located with brand identity. AI agents edit one file.
- ✅ Build-time — gets tree-shaken if a flag is `false` at boot.
- ✅ No env management overhead for static sites.
- ❌ Less flexibility than runtime flags (which we don't need for marketing sites).

---

## ADR-009 — Cascade layers in CSS

**Context.** CSS specificity wars get out of hand fast. Tailwind utilities + custom CSS often collide.

**Decision.** Use `@tailwind base / components / utilities` to define the implicit layer order; custom utilities sit in `utilities` automatically. Animations and surfaces use `@layer components` where appropriate.

**Consequences.**
- ✅ Predictable cascade. `bg-accent` always wins over `.glass` because utilities layer last.
- ✅ Easy to reason about.
- ❌ Cascade layers are Baseline Widely Available but not ancient — IE has been dead for years so this is fine.

---

## ADR-010 — Scroll-driven CSS animations with JS fallback

**Context.** `animation-timeline: scroll()` and `view()` are Chrome/Safari-only as of May 2026. Firefox unsupported.

**Decision.** Use scroll-driven animations as the default, gate inside `@supports (animation-timeline: scroll())`. Provide JS-based scroll reveal fallback via IntersectionObserver (`useInView`).

**Consequences.**
- ✅ Cinematic kinetic effects where supported.
- ✅ Functional everywhere (Firefox users just don't see the kinetic compress).
- ✅ Zero JS overhead for supporting browsers.
- ❌ Inconsistent experience across browsers — acceptable for progressive enhancement.

---

## ADR-011 — No React-based routing transitions library

**Context.** Framer Motion, React Spring, react-transition-group, etc. all handle page transitions.

**Decision.** Use the native View Transitions API via `@view-transition { navigation: auto; }`. JS overhead: zero.

**Consequences.**
- ✅ Native browser feature. No library churn.
- ✅ Works for both same-document (SPA) and cross-document (MPA) transitions.
- ✅ Reduced motion respected automatically.
- ❌ Limited to fade by default. Per-element named transitions require `view-transition-name` per element — added on demand.

---

## ADR-012 — `AGENTS.md` + IDE-specific files coexist

**Context.** The 2026 standard for AI editor instructions is `AGENTS.md` (stewarded by the Agentic AI Foundation). But Claude Code uses `CLAUDE.md`, Cursor uses `.cursor/rules/`, GitHub Copilot uses `.github/copilot-instructions.md`, etc.

**Decision.** `AGENTS.md` is authoritative. IDE-specific files point at it. `CLAUDE.md` stays as a richer Claude-specific architecture doc (different content, not a redirect).

**Consequences.**
- ✅ One source of truth for cross-IDE behavior.
- ✅ IDE-specific files for IDE-specific quirks.
- ❌ Minor duplication between `AGENTS.md` and `CLAUDE.md` — acceptable; they serve different audiences.

---

## ADR-013 — Lightbox image detection is opt-in via DOM markers

**Context.** Should the lightbox open on every image, or only marked ones?

**Decision.** Auto-mount the lightbox. Scan `<main>` for images. Images ≥80×80 px are eligible unless inside `[data-no-zoom]`, `<button>`, `<a>`, or `<header>` / `<footer>`. Galleries scope by `[data-gallery="name"]` ancestor.

**Consequences.**
- ✅ Zero config for the common case.
- ✅ Easy to opt out (`data-no-zoom` on the element).
- ✅ Easy to scope (`data-gallery="name"` on the parent).
- ❌ Behavior is implicit — first-time devs may not understand why images become zoomable.

---

## ADR-014 — Service worker is cache-first for static, network-first for HTML

**Context.** Aggressive caching makes the site feel fast but risks stale content. Network-first risks slow loads on poor connections.

**Decision.** `sw.js` uses **cache-first for static assets** (JS / CSS / fonts / images via the hashed filename) and **network-first for HTML** (with offline.html fallback).

**Consequences.**
- ✅ HTML always fresh; assets cached forever (hashed).
- ✅ Offline fallback for HTML.
- ❌ First-load isn't service-worker-optimized — acceptable; SW registers after `load` event.

---

## ADR-015 — Reuse `BlogPost` for `/case-studies/:slug`

**Context.** Case study detail pages have similar structure to blog posts (cover, headline, body paragraphs, author, date).

**Decision.** Reuse `BlogPost.tsx` for both routes. The data shape is the same.

**Consequences.**
- ✅ DRY. Less to maintain.
- ✅ Less to bundle.
- ❌ If case studies need a fundamentally different layout (e.g. metrics chart, before/after), split into `CaseStudyDetail.tsx`. Document the split when made.

---

## When to add a new ADR

Add an ADR-NNN entry when:

1. You're making a non-obvious tradeoff that future-you (or future-AI) might question
2. You're choosing between two reasonable approaches and the rationale isn't self-evident from the code
3. You're rejecting an obvious-looking improvement for a specific reason

Don't ADR every commit. ADRs are for decisions that **could be argued either way**.
