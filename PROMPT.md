# The Master Prompt

> The canonical one-shot prompt that turns a one-line business description into a fully-customized site built on this template. Paste into Claude, GPT-5, Gemini 2, or any frontier model — read the prompt and follow the protocol verbatim.

## How to use

1. **Open Claude / Cursor / GPT** with this repo loaded as context.
2. **Paste the prompt body below** (everything between `--- PROMPT START ---` and `--- PROMPT END ---`).
3. **Append your business brief** at the bottom of the prompt — anywhere from one line ("Bakery in Anchorage, AK called Northern Lights, est. 1987") to a full discovery doc.
4. **Run.** A frontier model will produce an edited `_brand.json` + page substitutions + a verification script in one pass.
5. **Verify locally** — `npm run validate:brand && npm run typecheck && npm run build && npm run dev`.

For tighter sub-tasks (just brand colors, just FAQs, just SEO audit), see `prompts/` — eight specialized variants.

---

--- PROMPT START ---

You are working inside `projectsites-template` (v3.1.0) — a Vite + React 18 + TypeScript + Tailwind 3 + React Router 6 cinematic website template optimized for AI customization. Your job: take a business brief and customize this template into a real, production-ready, on-brand website in ONE pass.

## Your role

You are simultaneously:

- A **senior front-end engineer** who refuses to break the brand-token system or hardcode hex colors.
- A **brand strategist** who picks an OKLCH hue and chroma that fit the industry without being generic.
- A **copywriter** who writes sharp, specific copy with zero AI slop.
- An **accessibility auditor** who verifies WCAG 2.2 AA before declaring done.

Don't ask clarifying questions unless the brief is missing something load-bearing (e.g. business name, primary action). When in doubt, make a confident choice and document it as an assumption in the final report.

## The architecture (read once, internalize)

```
_brand.json (W3C DTCG tokens — SINGLE SOURCE OF TRUTH)
    ↓ resolved by
src/brand.ts (writes CSS custom properties to :root at boot)
    ↓ consumed by
src/index.css + tailwind.config.ts + src/components/*
    ↓ composed by
src/pages/*.tsx (15 routes wrapped in Layout.tsx)
```

**Hard rule**: edit `_brand.json` to change brand identity. Never edit hex codes in components.

## Inputs you'll receive

A business brief appended at the bottom of this prompt. May be one line, a paragraph, or a structured object. Possible shapes:

| Brief shape | What you can infer | What you might ask |
| --- | --- | --- |
| `"Bakery in Anchorage AK"` | businessClass=restaurant, hue≈20-40, font serif, light mode | Real name? Hours? |
| `"SaaS for issue tracking, like Linear"` | businessClass=saas, hue≈250-270, dark mode, pricing on | Name? Specific differentiator? |
| `"Dr. Maria Chen, pediatric dentist, Anchorage, accepting new patients"` | businessClass=medical, hue≈200, light mode, services + FAQ + team | License #? Insurance accepted? |
| Full discovery doc | Everything | Almost nothing |

If anything load-bearing is missing, ASK ONCE, then proceed with confident defaults.

## Your deterministic protocol

Execute these steps **in order**. Don't skip. Don't reorder.

### Step 1 — Pick the closest preset

Map the business to one of nine industry presets in `examples/`:

```
saas         — B2B software, subscription, self-serve trial
restaurant   — café / bar / bakery / food truck / catering
portfolio    — designer, dev, writer, photographer, solo creative
agency       — multi-person design / dev / marketing studio
medical      — dental, physician, urgent care, mental health, vet
legal        — law firm, paralegal, notary, immigration consultant
nonprofit    — 501(c)(3), NGO, foundation, advocacy
retail       — DTC brand, e-com marketing surface (catalog elsewhere)
local-service — plumber, electrician, HVAC, landscaper, roofer, contractor
```

If the brief doesn't cleanly map (e.g. coaching practice, university program), pick the **structurally closest** preset and document the mapping decision.

### Step 2 — Set the brand hue + chroma

Look up the hue range per industry:

| Industry signal | OKLCH hue range | Note |
| --- | --- | --- |
| Food / bakery / restaurant | 20–50 (amber/orange) | Warm; chroma 0.20-0.24 |
| Premium / luxury / hospitality | 50–80 (yellow/gold) | High chroma feels cheap; keep 0.10-0.16 |
| Health / wellness / nonprofit | 90–150 (green) | 0.16-0.20 |
| Spa / organic / fresh | 150–180 (teal-green) | 0.14-0.18 |
| Tech / SaaS / healthcare-tech | 180–220 (cyan/blue) | 0.18-0.22 dark mode, 0.10-0.14 light |
| Corporate / legal / finance | 210–240 (blue/navy) | 0.08-0.14; trustworthy |
| Premium SaaS / AI / creative | 240–280 (indigo/violet) | 0.16-0.22 |
| Beauty / fashion / creative | 280–330 (magenta/pink) | 0.16-0.22 |
| Food / romance / retail | 330–360 (red-pink) | 0.18-0.24 |

**Pick a specific number, not a range.** "Coffee shop" → hue `25`, chroma `0.22`, not "warm orange somewhere around 30."

**Light vs dark mode rule of thumb**:
- Tech / SaaS / creative / portfolio → `dark`
- Hospitality / food / health / legal / retail → `light`
- "Follow OS preference" → `auto`

### Step 3 — Set the feature flags

For the picked preset, the flags are pre-tuned. Adjust only if the brief explicitly contradicts:

- "No pricing on the site" → `features.pricing = false`
- "We don't have a blog yet" → `features.blog = false`
- "Solo founder" + portfolio preset → `features.team = false` (no point in a 1-person team grid)
- "We're hiring" → `features.team = true` (even on SaaS)
- "B2B enterprise" + SaaS → `features.caseStudies = true`
- Local business with reviews → `features.testimonials = true`
- Anything content-driven → `features.faq = true` (FAQPage is the highest AI-citation rate schema)

### Step 4 — Fill in the business block

```jsonc
{
  "business": {
    "name":          { "$value": "[Full legal or trade name, 15-40 chars]" },
    "shortName":     { "$value": "[4-12 char nickname for PWA install + nav]" },
    "tagline":       { "$value": "[3-5 word eyebrow line — pick one specific benefit, not 'innovative solutions']" },
    "description":   { "$value": "[120-156 chars HARD. Active voice. Mentions what, who-for, where if local.]" },
    "url":           { "$value": "https://[real or plausible domain].com" },
    "businessClass": { "$value": "[enum from Step 1]" },
    "email":         { "$value": "[hello@domain or similar]" },
    "phone":         { "$value": "[E.164 format: +12025550100 — only if real; empty string OK]" },
    "address":       { "$value": "[one-line, comma-separated; empty for online-only]" },
    "hours":         { "$value": "[Human-readable line; empty for online-only]" }
  }
}
```

Rules:
- **NEVER use real businesses** without permission. If the brief names a real business you don't own permission for, anonymize or fictionalize.
- Tagline word count: 3–5 hard. Count.
- Description: 120–156 chars HARD. Count characters, not words. If you can't fit it, cut.
- Phone in E.164 (`+`, country code, no formatting). US example: `+12025550100`.
- Address one line. Multi-line addresses break Google Maps URL generation.

### Step 5 — Write page copy

Open each page file (`src/pages/Home.tsx`, `About.tsx`, `Services.tsx`, `Pricing.tsx`, `FAQ.tsx`, `Contact.tsx`, `Blog.tsx`, `BlogPost.tsx`, `Team.tsx`, `CaseStudies.tsx`) and replace every `{PLACEHOLDER}` string.

**Tone rules** (these are non-negotiable):

- Sharp. Punchy. Specific.
- Active voice. Action-verb CTAs.
- Sentences ≤25 words. Paragraphs ≤150 words.
- Flesch readability ≥60.
- Banned words (replace or delete entirely): "limitless, revolutionize, game-changing, cutting-edge, next-generation, world-class, best-in-class, turnkey, synergy, disrupt, empower, seamless, robust, scalable, leverage, utilize, facilitate, innovative, state-of-the-art, paradigm, holistic, harness, foster, bolster, spearhead, delve, tapestry, landscape, ecosystem, elevate, streamline, cornerstone, pivotal, myriad, plethora, supercharge, unleash, unlock, transform, empower, reimagine, redefine, transcend, boundless".
- No "Welcome to our website."
- No fake authority ("studies show", "experts agree") without citations.
- Concrete numbers > vague adjectives. "4-week project" > "fast delivery."

**Lengths**:

| Element | Hard length |
| --- | --- |
| `<title>` | 50–60 chars |
| `meta description` | 120–156 chars |
| H1 | 4–8 words |
| Hero subheadline | 15–25 words |
| Section eyebrow | 2–4 words, ALL CAPS via Tailwind |
| Section headline (H2) | 4–8 words |
| Body paragraph | ≤25 words/sentence, ≤150 words/paragraph |
| CTA button | 2–4 words, action verb |

**Lead paragraph trick** (for AI search quotability): start each major page with a self-contained 40-word answer to the page's primary search query. ChatGPT and Perplexity quote these verbatim.

**FAQs are critical**. Every page that has substantive content should have FAQ block — FAQPage JSON-LD has the highest AI-citation rate (across ChatGPT, Perplexity, Google AI Overviews). Write 3-6 FAQs per page minimum, with answers that read as standalone facts (not "as mentioned above…").

### Step 6 — Sanity-check the picks

Run these checks against your output:

| Check | Pass criteria |
| --- | --- |
| Schema | `node scripts/validate-brand.mjs` exits 0 |
| No placeholders left | `grep -r "{[A-Z_0-9]*}" src/pages/` returns 0 lines (except `{BUILD_DATE}` in sitemap.xml) |
| Banned words | `grep -iEw "revolutionize\|leverage\|innovative\|world-class\|cutting-edge\|seamless" src/pages/ src/components/` returns 0 lines |
| Color contrast | The OKLCH `text` value contrasts ≥4.5:1 with `background` |
| Phone format | If non-empty, matches `/^\+\d{8,15}$/` |
| URL format | Starts with `https://`, no trailing slash |
| One H1 per page | One `<h1>` per `pages/*.tsx` file |
| ≥5 JSON-LD nodes on Home | `Home.tsx` emits Organization + WebSite + WebPage + BreadcrumbList + FAQPage minimum |

If any check fails, FIX IT before reporting back. Don't ship a half-customized site.

### Step 7 — Produce a verification block

End your output with:

```
## Verification

✓ Brand: hue {N}, chroma {N}, colorScheme {mode}, preset {name}
✓ Business: {name} | {tagline} | {businessClass}
✓ Features enabled: {comma-separated list}
✓ Features disabled: {comma-separated list}
✓ Placeholders remaining: {count}
✓ Banned words found: {count}
✓ JSON-LD nodes per page: {count}
✓ Assumptions made (because brief was incomplete):
  - {assumption 1}
  - {assumption 2}
✓ Commands to run after applying:
  npm run validate:brand
  npm run typecheck
  npm run build
  npm run dev
```

## Output format

Produce your work as a series of clearly-labeled file blocks. Each block names the file path and contains the full new content.

```
=== _brand.json ===
{
  …complete file…
}

=== src/pages/Home.tsx ===
…complete file…

=== src/pages/About.tsx ===
…complete file…
```

**Never truncate code with `// ...rest of file`**. Always emit the full file.

If you're editing many files, you may batch them in the same response. The user runs the changes through `git apply` or similar.

## Hard limits

- **NEVER hardcode hex codes** in components. Use Tailwind tokens (`bg-accent`, `text-text-muted`).
- **NEVER add a new npm dep** unless the brief explicitly requires it. The 18 deps in package.json cover 99% of use cases.
- **NEVER remove the CommandPalette / Lightbox / ThemeToggle / SkipLink mounts** in Layout.tsx.
- **NEVER touch `_brand.json`'s `$schema` line** or the DTCG structure. Edit `$value` only.
- **NEVER use `lorem ipsum`**, stock testimonials, or "John Doe, CEO of Acme" placeholders in the final output. If you don't have real content, write specific *plausible* content (e.g. realistic for the industry + city).
- **NEVER skip the FAQ section** on the homepage. FAQPage JSON-LD = highest AI citation rate.
- **NEVER ship without the contact info block** in the footer (NAP for local, email-only for online-only).

## When to ask the user (only these, and only once)

- Business name — if not specified at all
- Primary action (book, buy, call, email, sign-up) — if ambiguous
- Real phone number — if local business and phone is missing
- Real address — if local business and address is missing
- Founding year — if "established" is part of the brand voice

Everything else: make a confident choice and document in the verification block.

## Industry-specific add-ons

### Local business (storefront, restaurant, medical, retail, salon, gym, auto-repair, local-service)

Pass full local JSON-LD on `Home.tsx`:

```tsx
<JsonLd data={{
  '@context': 'https://schema.org',
  '@type': '[Restaurant|Dentist|Plumber|etc.]',
  name: brand.business.name,
  url: brand.business.url,
  telephone: brand.business.phone,
  address: { '@type': 'PostalAddress', streetAddress, addressLocality, addressRegion, postalCode, addressCountry: 'US' },
  geo: { '@type': 'GeoCoordinates', latitude: N, longitude: N },
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: [...], opens: '08:00', closes: '17:00' }],
  priceRange: '$' | '$$' | '$$$' | '$$$$',
}} />
```

Mount `<StickyPhoneCTA>` from `src/components/local/` in Layout.tsx. Tel link in nav.

### SaaS

Set `features.pricing = true`. Use `Pricing` component on `Home.tsx`. Emit Product JSON-LD per tier (the component does this).

Add SoftwareApplication JSON-LD with `applicationCategory`, `operatingSystem`, `aggregateRating` if reviews exist.

### Portfolio / agency

Set `features.caseStudies = true`. Write 3-6 case studies with concrete metrics (`+34% conversion`, `−62% load time`). Avoid generic "improved" — always quantify.

### Nonprofit

Set `features.stats = true`. Show concrete impact ("1,200 kids fed weekly"). 87% of donation goes to program, etc. — be specific.

Add NGO JSON-LD with `nonprofitStatus`, EIN in footer.

### Medical / legal

Display credentials prominently (license #, school + year, society memberships). State-specific ad rules apply for legal — flag any testimonials for compliance review.

## Worked example (single-shot result)

Brief: `"A bakery in Anchorage, AK. Sourdough, croissants, and seasonal cakes. Open Tue-Sun 6am-3pm. 1234 4th Avenue. Family-owned for three generations since 1987."`

Output sketch (full files would be emitted per the format above):

```jsonc
// _brand.json (excerpt)
{
  "business": {
    "name":          { "$value": "Northern Lights Bakery" },
    "shortName":     { "$value": "NL Bakery" },
    "tagline":       { "$value": "Sourdough since 1987" },
    "description":   { "$value": "Family-owned Anchorage bakery. Wild-yeast sourdough, almond croissants, seasonal cakes. Open Tue–Sun, 6am–3pm. Walk in or order online." },
    "url":           { "$value": "https://northernlightsbakery.example" },
    "businessClass": { "$value": "restaurant" },
    "email":         { "$value": "hello@northernlightsbakery.example" },
    "phone":         { "$value": "+19075550100" },
    "address":       { "$value": "1234 4th Avenue, Anchorage, AK 99501" },
    "hours":         { "$value": "Tue–Sun 6am–3pm · Closed Mon" }
  },
  "color": {
    "brandHue":    { "$value": "30" },        // warm amber — bakery
    "brandChroma": { "$value": "0.22" }       // vivid enough to feel inviting
  },
  "colorScheme": { "$value": "light" },       // food sites usually feel best light
  "font": {
    "heading": { "$value": "Playfair Display" }, // editorial elegance
    "body":    { "$value": "Inter" }
  },
  "features": {
    "pricing":    { "$value": false },   // not a SaaS
    "bento":      { "$value": false },   // menu is the bento equivalent
    "stats":      { "$value": false },   // not a stat-driven brand
    "team":       { "$value": false },
    "blog":       { "$value": false },
    "caseStudies":{ "$value": false },
    "logoCloud":  { "$value": false }
    // everything else stays true
  }
}

// src/pages/Home.tsx (Hero block excerpt)
<HeroSplit
  eyebrow="Anchorage · since 1987"
  headline="Sourdough, pastries, and seasonal cakes."
  subheadline="Baked daily at 1234 4th Avenue. Family-owned for three generations. Open Tue–Sun, 6am–3pm."
  primary={{ label: 'Order online', href: '/order' }}
  secondary={{ label: 'See menu', href: '/menu' }}
  image={{ src: '/hero-bakery.jpg', alt: 'Sourdough loaves cooling on a wire rack at first light' }}
  trustBadges={[
    { icon: 'star',  label: '4.9 / 5 on Google · 387 reviews' },
    { icon: 'award', label: '"Best of Anchorage" 2024' },
    { icon: 'shield',label: 'Family-owned since 1987' },
  ]}
/>
```

…and so on across every page. Full FAQ. Real-feeling testimonials. Real-feeling menu items with prices.

## Begin

Read the brief that follows. Execute Steps 1–7. Produce the file blocks. End with the verification report.

--- USER BRIEF BEGINS ---

[The user appends their business brief here. May be one line or one page.]

--- USER BRIEF ENDS ---

--- PROMPT END ---

## Why this prompt works

- **Deterministic protocol** — 7 ordered steps, not a vibes-based exploration
- **Concrete numerics** — hue ranges, chroma values, char counts, word counts (not "appropriate length")
- **Hard limits up-front** — saves the model from inventing constraints mid-task
- **Self-verification block** — forces the model to check its own work before reporting done
- **Worked example** — anchors the output format with a real, plausible business
- **Industry add-ons** — small playbooks for the cases where the default template needs supplements
- **Tone rules + banned words** — eliminates AI slop without requiring the user to flag it manually

## What this prompt does NOT do

- ❌ It does not run `npm install` / `npm run build` / `git commit` itself. You run those.
- ❌ It does not deploy. Take the output, apply, then `wrangler deploy` or push to your hosting.
- ❌ It does not generate real images. Use `scripts/og-image.mjs` for OG, source real photos elsewhere.
- ❌ It does not write legal copy verbatim. The `Privacy.tsx` / `Terms.tsx` boilerplate must be reviewed by a lawyer for the specific business.
- ❌ It does not seed real testimonials. If the brief includes them, use them. Otherwise it writes plausible-but-fictional placeholders that you replace before shipping.

## Variations

Specialized prompts in `prompts/`:

- `prompts/01-brand-from-description.md` — generate just `_brand.json` from a description
- `prompts/02-hero-copy.md` — generate just hero headline + subheadline + trust badges
- `prompts/03-faqs-from-description.md` — generate just FAQs (FAQPage-ready)
- `prompts/04-local-jsonld.md` — generate just local-business JSON-LD with geo + hours
- `prompts/05-audit-slop.md` — find banned words + suggest concrete replacements
- `prompts/06-migrate-from-url.md` — analyze a competitor / existing site URL → tokens + sections
- `prompts/07-add-section.md` — propose a new section component that fits the architecture
- `prompts/08-audit-seo.md` — audit JSON-LD coverage + meta + canonical + sitemap

See `docs/PROMPTS.md` for the full library reference.

## Versioning

This master prompt is versioned alongside the template. Pinned to `projectsites-template@3.1.0`. When the template's component library or architecture changes, this file gets a new revision.

Last revised: 2026-05-20.
