# Prompt Library

> Specialized prompts for narrow sub-tasks. For the full one-shot site-generation flow, use the master prompt at the repo root: [`PROMPT.md`](../PROMPT.md).

## When to use what

```
You have…                              → Use this prompt
──────────────────────────────────────────────────────────────────────────
A full business brief                    PROMPT.md (master)
Just need brand colors + tokens          01-brand-from-description.md
Just need hero copy                      02-hero-copy.md
Just need FAQs                           03-faqs-from-description.md
Local business, need geo JSON-LD         04-local-jsonld.md
Existing copy with AI slop               05-audit-slop.md
Competitor URL to migrate                06-migrate-from-url.md
Need a new section component             07-add-section.md
SEO audit of an existing site            08-audit-seo.md
```

Each prompt:

- Is **self-contained** (paste-and-run; doesn't require loading other repo files)
- Defines its own input contract
- Produces a deterministic output format
- Ends with a self-verification block

## Versioning

All prompts pinned to `projectsites-template@3.1.0`. When the architecture changes, the prompts here get reviewed.

## Adding a new prompt

1. Pick the next sequential number (`09-...`, `10-...`)
2. Copy the structure of an existing prompt
3. Add a row to the table above
4. Document in `docs/PROMPTS.md`
5. Test by running it against a real input — does the model produce the expected output?

If you find yourself wanting a 9th, 10th, 11th prompt — first check whether one of the existing eight covers it with a small parameter tweak.
