# Prompt System

The template ships with **9 production-tested prompts** — one master + eight specialized — that turn business briefs into customized sites.

## Why bother

LLMs are general-purpose. Asking "build me a website" produces generic output. Asking with the master prompt — which embeds the template's architecture, copy rules, schema constraints, and verification protocol — produces sites that pass the build, the typecheck, the schema validation, and the slop audit in one pass.

Every prompt:

- Is **versioned alongside the template** (currently pinned to v3.1.0)
- Has a **deterministic output format** (JSON or file blocks)
- Includes **self-verification** that the model runs before reporting done
- Has **worked examples** so the format is unambiguous
- **Refuses to ship slop** — banned-word lists are embedded

## The 9 prompts

### Master (one-shot full site)

| File | Use case |
| --- | --- |
| [`PROMPT.md`](../PROMPT.md) | One-shot: business brief → customized `_brand.json` + all pages + verification report |

### Specialized

| File | Output |
| --- | --- |
| [`prompts/01-brand-from-description.md`](../prompts/01-brand-from-description.md) | Just `_brand.json` |
| [`prompts/02-hero-copy.md`](../prompts/02-hero-copy.md) | Just hero headline + sub + CTAs + trust badges (JSON) |
| [`prompts/03-faqs-from-description.md`](../prompts/03-faqs-from-description.md) | 6-10 FAQ items ready for `<FAQ>` component |
| [`prompts/04-local-jsonld.md`](../prompts/04-local-jsonld.md) | Full `LocalBusiness`-derived JSON-LD with geo + hours |
| [`prompts/05-audit-slop.md`](../prompts/05-audit-slop.md) | Banned-word + vague-claim audit with concrete replacements |
| [`prompts/06-migrate-from-url.md`](../prompts/06-migrate-from-url.md) | Analyze a URL → `_brand.json` + section composition |
| [`prompts/07-add-section.md`](../prompts/07-add-section.md) | Propose / implement a new section component |
| [`prompts/08-audit-seo.md`](../prompts/08-audit-seo.md) | SEO + GEO + JSON-LD coverage report |

## How to invoke

### Method 1 — paste into Claude / GPT / Gemini

1. Open the chat with this repo loaded as context (or paste the prompt with no repo context — the prompt is self-contained).
2. Paste the full prompt body from the `--- PROMPT START ---` to `--- PROMPT END ---` markers.
3. Append your input (business brief / URL / copy / etc.) where indicated.
4. Run. Apply the output. Verify with `npm run typecheck && npm run build && npm test`.

### Method 2 — via bolt.diy

bolt.diy reads `.bolt/prompt` automatically. That file references `PROMPT.md`, so any session in bolt.diy can invoke the protocol by saying:

> "Use the master prompt to build a site for X."

bolt.diy will load `PROMPT.md`, append your brief, and execute.

### Method 3 — via Cursor / Claude Code / Aider

These tools read `AGENTS.md` and the closest `.md` files. To invoke a prompt:

> "Use prompts/02-hero-copy.md for our new homepage hero."

The agent picks up the prompt's protocol and follows it.

## Authoring rules

If you add a new prompt:

1. **Numbered file** in `prompts/` — pick the next number
2. **Self-contained** — doesn't require loading other repo files at runtime
3. **Use the `--- PROMPT START ---` / `--- PROMPT END ---` delimiters** so users can copy cleanly
4. **Define input + output schema** explicitly
5. **Embed a worked example**
6. **End with a verification block** the model fills in
7. **Add a row** to the table above and to `prompts/README.md`
8. **Document in this file**
9. **Version-pin** at the top of the prompt to the template version

## Anti-patterns

- ❌ "Help me build a website" (vibes-based, will produce slop)
- ❌ Prompts that ask the model to "be creative" (creativity ≠ specificity)
- ❌ Prompts with no output schema (model guesses, format varies)
- ❌ Prompts without worked examples (model misinterprets edge cases)
- ❌ Prompts without verification (no way to catch bad output)
- ❌ Auto-generated prompts (per the Augment Code study cited in AGENTS.md spec — auto-generated context files perform WORSE than no file)

## Versioning

When the template architecture changes:

1. The master `PROMPT.md` version pin at the top updates
2. Each specialized prompt's version pin updates
3. Worked examples get refreshed against new components / pages / tokens
4. The `CHANGELOG.md` notes the prompt-system bump

Current pin: **`projectsites-template@3.1.0`**

## Roadmap

Future prompts (proposed but not yet written):

- `09-generate-test-suite.md` — given a page, generate Playwright tests for every interactive element
- `10-i18n-translate.md` — given a page, translate to N languages with locale-aware date / number / currency formatting
- `11-accessibility-fix.md` — given axe-core violation output, fix each violation with a code patch
- `12-content-calendar.md` — generate 12 weeks of blog post titles + outlines from a brand + audience

Open an issue if you've validated one of these in production and want to contribute it.
