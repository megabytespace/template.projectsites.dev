# AGENTS.md — docs/

> Scoped conventions for the documentation library. Inherits from root `AGENTS.md`.

## Purpose

`docs/` holds structured reference for AI agents and human contributors. The files here are the source of truth for component conventions, page patterns, brand schemas, and architectural decisions. `AGENTS.md`, `CLAUDE.md`, `README.md` at the repo root link in here.

## Hard rules

1. **Markdown only** — no MDX, no embedded JSX, no Astro components in docs/. Keep parseable by any LLM.
2. **One topic per file** — when a file exceeds 600 lines, split it.
3. **Heading depth ≤ `###`** — shallow trees parse better.
4. **Lead with a one-line summary** in a blockquote or single sentence directly under the H1.
5. **Decision trees** start with "If X → do Y" — AI agents pattern-match the leading "If" / "When".
6. **File paths repo-relative** unless prefixed with `~/`.
7. **Code blocks are runnable as-is** — don't truncate with `// ...`.
8. **Update `docs/README.md`** when adding a new file.

## File catalog

```
README.md              Doc index + read order
AI_GUIDE.md            LLM-specific patterns + decision trees
ARCHITECTURE.md        Data flow + file responsibilities + ADR refs
BRAND.md               _brand.json complete schema + recipes
COMPONENTS.md          Section component catalog with props + examples
PAGES.md               Route catalog + how to add a new page
RECIPES.md             20 copy-paste customization recipes
THEMING.md             Light/dark/auto + hue rotation + font pairings
SEO.md                 5-layer SEO stack + JSON-LD + GEO checklist
ACCESSIBILITY.md       WCAG 2.2 AA checklist + ADA deadlines
DECISIONS.md           ADR-lite entries with rationale
GLOSSARY.md            Alphabetized terminology
profiles/              Industry-specific guides (saas, restaurant, etc.)
AGENTS.md              ← this file
```

## When to add a new doc file

| You added… | Then update… |
| --- | --- |
| New section component | `docs/COMPONENTS.md` (props + example) |
| New page route | `docs/PAGES.md` (route table + customization) |
| New brand token | `docs/BRAND.md` (token table + recipe) |
| New industry preset | `docs/profiles/{name}.md` + `examples/AGENTS.md` table |
| New feature flag | `docs/BRAND.md` `features.*` table + `docs/AI_GUIDE.md` flag reference |
| Non-obvious architectural choice | `docs/DECISIONS.md` ADR-NNN |
| New terminology | `docs/GLOSSARY.md` |
| New recipe / pattern | `docs/RECIPES.md` |

## Style guide

- **Headings sentence case** — "Adding a new section" not "Adding A New Section"
- **Active voice** — "Edit `_brand.json`" not "`_brand.json` should be edited"
- **Specific over generic** — "120-156 chars" not "appropriate length"
- **Tables for cataloging**, prose for explanation
- **One concrete example per pattern** — not "for example, you could do X" without showing X
- **No screenshots in docs/** — they go stale fast and confuse AI agents

## Decision-tree pattern (AI-parseable)

When documenting a choice:

```markdown
### "Should I use BentoGrid or a plain grid?"

If features have clear hierarchy → BentoGrid with mixed spans
If features equally-weighted   → BentoGrid with all span:'sm'
If comparing side-by-side      → Comparison table
If process steps               → ProcessSteps
```

LLMs pattern-match the leading "If" clauses and produce correct code without re-reading the whole doc.

## What NOT to put in docs/

- ❌ Auto-generated content (AGENTS.md spec: "Auto-generated files perform worse than no file")
- ❌ Marketing copy / "Why we built this" essays — those go in CHANGELOG / blog posts
- ❌ Stale screenshots from older versions
- ❌ Internal-team-only context (use commit messages / PR descriptions)
- ❌ Vendor benchmarks ("X is 10× faster than Y") without dated citations
- ❌ Information already in `AGENTS.md` — link, don't duplicate

## Pull request checklist for doc-only changes

- [ ] Spell-check passes (`aspell`, `cspell`, or editor built-in)
- [ ] All internal links resolve (`docs/README.md` test)
- [ ] No new H4+ headings (depth limit)
- [ ] No images
- [ ] If you added a file, you updated `docs/README.md` index

## Cross-IDE sync

The root `AGENTS.md` is mirrored by `.cursorrules`, `.windsurfrules`, and `.github/copilot-instructions.md` as redirects. When you edit `AGENTS.md`, those files don't need updating — they just point in here. The actual content lives in `AGENTS.md` only.

If the AGENTS.md spec at [agents.md](https://agents.md) updates and the file format / conventions change, update `AGENTS.md` first and propagate to the IDE-specific files only if their format demands it.
