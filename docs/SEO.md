# SEO + GEO + AI Search

How the template earns visibility in classic SERPs **and** AI Overviews / ChatGPT / Perplexity.

## The five-layer SEO stack

1. **HTML shell** — `<title>`, `<meta name="description">`, `<link rel="canonical">`, viewport, color-scheme
2. **Open Graph + Twitter Cards** — social link previews
3. **JSON-LD structured data** — 5+ blocks per page minimum
4. **Sitemap + robots + manifest** — crawler discovery
5. **GEO files** — `llms.txt`, optional `llms-full.txt`

## Per-page meta

Each page uses the `useSEO` hook:

```tsx
useSEO({
  title:       'Pricing — Northern Lights Bakery',           // 50-60 chars HARD
  description: 'Three plans for cottage, retail, and wholesale. No setup fees. Cancel anytime.',  // 120-156 chars HARD
  canonical:   'https://northernlightsbakery.com/pricing',  // optional
});
```

Validate:
- Title: 50–60 chars, includes keyphrase first
- Description: 120–156 chars, active voice, includes CTA
- One `<h1>` per page (multiple `<h2>` OK)
- Canonical: full https URL, no trailing slash on non-root

## JSON-LD graph (5+ blocks per page)

Every page emits at least 5 JSON-LD nodes via `<JsonLd data={...} />`. For the homepage, use `buildSiteJsonLd()`:

```tsx
import { buildSiteJsonLd } from '@/lib/businessSchema';
import { JsonLd } from '@/components/JsonLd';
import { brand } from '@/brand';

<JsonLd data={buildSiteJsonLd({
  name: brand.business.name,
  description: brand.business.description,
  url: brand.business.url,
  businessClass: brand.business.businessClass,
  email: brand.business.email,
  phone: brand.business.phone,
})} />
```

Emits:

1. `Organization` (or `LocalBusiness`-derived) — about the business
2. `WebSite` — sitelinks searchbox
3. `WebPage` — the current URL
4. `BreadcrumbList` — navigation hierarchy
5. `FAQPage` (when FAQ component renders) — highest AI-citation rate

Plus per-page specific:
- `Product` × tier on `/pricing`
- `BlogPosting` on `/blog/:slug`
- `Person[]` on `/team`
- `Service` on `/services`
- `AboutPage` on `/about`
- `ContactPage` on `/contact`

## FAQPage — why it matters

FAQPage JSON-LD has the **highest AI-citation rate** across ChatGPT, Perplexity, and Google AI Overviews. Every content-rich page should have FAQ content with JSON-LD, even if just 3 questions.

**Critical:** the FAQPage JSON-LD facts MUST also appear as **visible HTML body text**. ChatGPT and Claude on direct URL reads do not parse JSON-LD — they read the rendered text. Hidden-only JSON-LD is wasted.

The template's `<FAQ>` component handles this correctly: the disclosure widget renders the questions + answers visibly in the DOM, AND emits the JSON-LD. Don't strip either.

## Lead paragraph pattern (for AI quoting)

LLMs preferentially quote 40–60 word answer blocks early in the page. Structure your hero subheadline + first paragraph to be self-contained answers to the page's primary search query.

**Bad:** "Welcome to our website. We're a bakery."

**Good:** "Northern Lights Bakery has baked sourdough, croissants, and seasonal cakes in downtown Anchorage since 1987. Open Tuesday through Sunday, 6am–3pm. Order online for pickup or walk in to 1234 4th Avenue."

The good version answers: what, where, when, how. ChatGPT will quote it verbatim.

## Open Graph + Twitter Cards

Already wired in `index.html`:

```html
<meta property="og:type"        content="website" />
<meta property="og:title"       content="..." />
<meta property="og:description" content="..." />
<meta property="og:url"         content="..." />
<meta property="og:image"       content="..." />
<meta property="og:image:width"  content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name"   content="..." />

<meta name="twitter:card"        content="summary_large_image" />
<meta name="twitter:title"       content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image"       content="..." />
```

**OG image rules:**

- Size: 1200×630 pixels
- Weight: ≤100 KB
- Format: PNG or JPG (avoid WebP — some social platforms reject)
- Content: **branded card** with logo + headline + accent color stripe — **not** a raw photo
- Path: `/og-image.png` referenced from `index.html`

Create per-page OG cards for the most-shared pages (`/`, `/pricing`, `/blog/*`).

## Sitemap

`public/sitemap.xml` lists all 12 public routes with `<lastmod>` and priority. The `{BUILD_DATE}` placeholder gets replaced at deploy time:

```bash
sed -i '' "s/{BUILD_DATE}/$(date -u +%Y-%m-%d)/g" dist/sitemap.xml
```

For projectsites.dev, the deploy worker handles this automatically.

## robots.txt

`public/robots.txt` explicitly lists each major AI / LLM crawler:

| Crawler | Status | Note |
| --- | --- | --- |
| GPTBot | Allow | OpenAI training |
| ChatGPT-User | Allow | ChatGPT browse |
| OAI-SearchBot | Allow | OpenAI search index |
| ClaudeBot | Allow | Anthropic training |
| Claude-User | Allow | Claude browse |
| Claude-SearchBot | Allow | Anthropic search |
| anthropic-ai | Allow | Anthropic legacy |
| PerplexityBot | Allow | Perplexity training |
| Perplexity-User | Allow | Perplexity browse |
| Google-Extended | Allow | Gemini training |
| Applebot-Extended | Allow | Apple AI training |
| CCBot | Allow | Common Crawl |
| FacebookBot | Allow | Meta Llama training |
| Bytespider | **Block** | TikTok / ByteDance — aggressive |
| ImagesiftBot | **Block** | scraper without provenance |

Adjust based on the business's policy on AI training.

## llms.txt

`public/llms.txt` is a markdown index optimized for LLM crawlers. Spec from [llmstxt.org](https://llmstxt.org).

Already populated with route placeholders. After site customization, replace `{BUSINESS_*}` with real values.

**Note:** As of Q1 2026, no major AI company has confirmed acting on `llms.txt` in production. GPTBot occasionally fetches it. It's a DX win for AI editors (Cursor, Claude Code can use it for context) more than a SEO gain. Adoption is rising — keep it as a low-cost forward bet.

## llms-full.txt (optional)

For sites with extensive docs/content, add `public/llms-full.txt` with the full content of core pages concatenated. Example template:

```markdown
# Business Name — Full content index

> One-paragraph summary of the business.

## Home

[full text of homepage]

## About

[full text of about page]

## Services

[full text of services page]

…
```

This is a separate file from `llms.txt`. Don't replace; complement.

## Speculation Rules

`index.html` includes:

```html
<script type="speculationrules">
  {
    "prerender": [
      { "where": { "and": [{ "href_matches": "/*" }, { "not": { "selector_matches": "[data-no-prerender]" } }] },
        "eagerness": "moderate" }
    ]
  }
</script>
```

Chrome 121+ prerenders internal links matched by this rule when the user hovers (eagerness: moderate). Internal navigations feel instant.

Add `data-no-prerender` to any link you don't want prerendered (e.g. logout, cart, checkout).

## Internal + outbound links

Per always.md: every page has **≥2 internal links** and **≥1 outbound link**.

- Internal: nav + footer cover this for the homepage. Body content should also link to related pages.
- Outbound: footer "Built with ProjectSites" handles this by default. Cite sources / partners in body where natural.

## Quality gates

Before shipping, run through:

| Check | Tool |
| --- | --- |
| Title length | `grep -E 'document\.title|<title>' src/` then count |
| Meta description length | Same |
| One `<h1>` per page | Lighthouse SEO audit |
| Canonical URL | Lighthouse SEO |
| JSON-LD validates | https://search.google.com/test/rich-results |
| OG image renders | https://opengraph.xyz/ |
| robots.txt parses | https://www.google.com/webmasters/tools/robots-testing-tool |
| Sitemap parses | https://www.xml-sitemaps.com/validate-xml-sitemap.html |
| Lighthouse SEO ≥95 | `npx lighthouse https://yoursite.com` |

For projectsites.dev sites, the deploy verifier runs these automatically post-deploy.

## Local-business specifics

For `businessClass: storefront | restaurant | medical | retail | salon | gym | auto-repair`:

- `LocalBusiness` JSON-LD with `geo` (latitude / longitude), `openingHoursSpecification`, `priceRange`
- `tel:` link in nav for mobile
- Google Maps embed on contact page (`<GoogleMapEmbed>`)
- NAP block (Name / Address / Phone) consistent on every page — handled by Footer
- Review CTA after first interaction (`<ReviewCTA>` in `src/components/local/`)

For projectsites.dev sites, supply geo coords via a homepage-level `<JsonLd>` call:

```tsx
<JsonLd data={buildBusinessJsonLd({
  // ...
  geo: { latitude: 61.2181, longitude: -149.9003 },
  openingHours: ['Tu-Su 06:00-15:00'],
})} />
```

## GEO checklist (AI search optimization)

1. ✅ FAQPage JSON-LD on every page with FAQ content
2. ✅ Lead paragraph answers the primary query in <40 words
3. ✅ Quotable answer blocks (40–60 words) at section starts
4. ✅ Visible HTML text mirrors all JSON-LD facts
5. ✅ Author bio + Person schema with `sameAs` on blog posts
6. ✅ Dated revision (`<time dateTime="...">`) on content pages
7. ✅ Real, concrete numbers (with citations for non-trivial claims)
8. ✅ One outbound link per page to a high-authority source
9. ✅ `llms.txt` lists key pages with one-line descriptions
10. ✅ `Cmd+K` palette — improves dwell time + signals quality
