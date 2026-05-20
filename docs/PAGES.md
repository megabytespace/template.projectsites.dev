# Pages Reference

Every route in `src/App.tsx`, with what's on it and how to customize.

## Route table

| Path | File | Default sections | Required for | JSON-LD |
| --- | --- | --- | --- | --- |
| `/` | `Home.tsx` | Hero, LogoCloud, Bento, Stats, FeatureSplit, Process, Pricing, FAQ, CTA | All sites | Org + WebSite + WebPage + BreadcrumbList + FAQPage |
| `/about` | `About.tsx` | Hero copy, mission, stats | All sites | AboutPage |
| `/services` | `Services.tsx` | Services grid + CTA | Service-based businesses | Service |
| `/pricing` | `Pricing.tsx` | Pricing + Comparison + FAQ + CTA | SaaS, subscription | Product per tier + FAQPage |
| `/faq` | `FAQ.tsx` | Grouped FAQs (general, billing, support) | Recommended for all | FAQPage × 3 |
| `/blog` | `Blog.tsx` | Featured post + recent grid | Content marketing | — |
| `/blog/:slug` | `BlogPost.tsx` | Long-form article | Content marketing | BlogPosting |
| `/team` | `Team.tsx` | Member grid + careers CTA | Agency, SaaS, nonprofit | Person[] |
| `/case-studies` | `CaseStudies.tsx` | Portfolio grid + CTA | Agency, portfolio | — |
| `/contact` | `Contact.tsx` | Form + NAP block | All sites | ContactPage |
| `/privacy` | `Privacy.tsx` | Policy text | All sites | — |
| `/terms` | `Terms.tsx` | Terms text | All sites | — |
| `/accessibility` | `Accessibility.tsx` | WCAG statement | All sites | — |
| `*` | `NotFound.tsx` | 404 with ⌘K + back/home | All sites | — |

## How `useSEO` works

Each page calls `useSEO({ title, description })` to set the document title and meta description on mount. Pattern:

```tsx
useSEO({
  title: `Pricing — ${brand.business.name}`,
  description: 'Three plans. No seat tax. Cancel anytime.',
});
```

The hook lives in `src/hooks/useSEO.ts`. It writes `<title>` and `<meta name="description">` on mount and updates them on prop change.

For canonical URLs: pass `canonical: 'https://yourdomain.com/path'` as a third option.

## Per-page customization guide

### `/` (Home)

The most-edited page. Replace all `{PLACEHOLDER}` strings, then toggle `features.*` in `_brand.json` to hide unused sections.

```bash
grep -n "{[A-Z_0-9]*}" src/pages/Home.tsx | head -30
```

Section order (top to bottom):

1. `HeroCenter` — gated by `features.hero`
2. `LogoCloud` — gated by `features.logoCloud`
3. `BentoGrid` — gated by `features.bento`
4. `Stats` — gated by `features.stats`
5. `FeatureSplit` (About preview) — always renders
6. `ProcessSteps` — gated by `features.process`
7. `Pricing` — gated by `features.pricing`
8. `FAQ` — gated by `features.faq`
9. `CTASection` — gated by `features.cta`

### `/about`

A single-column narrative page. Customize:

- H1 + opening paragraph
- Mission statement
- 3 about-stats (years, projects, team, etc.)

For a richer About: add `<FeatureSplit>` blocks below the existing structure, then a `<Timeline>` (from `src/components/Timeline.tsx`) for company history.

### `/services`

Six-card grid by default. Replace `{SERVICE_N_TITLE}` and `{SERVICE_N_FULL_DESCRIPTION}`.

For service-heavy businesses (agencies, contractors), swap to a `<BentoGrid>` for editorial weight:

```tsx
<BentoGrid tiles={services.map(s => ({ id: s.title, ...s, span: 'sm' }))} />
```

### `/pricing`

3-tier table + comparison + FAQ + CTA.

For a single-product / one-price page:

```tsx
<Pricing
  tiers={[{ id: 'flat', name: 'Flat rate', description: '...', monthly: 99, yearly: 950, features: [...] }]}
  showToggle={false}
/>
```

### `/faq`

3 FAQ sections by default (general, billing, support). Each emits its own `FAQPage` JSON-LD node.

To consolidate: pass all questions to a single `<FAQ>` instance.

To split further: add additional `<FAQSection>` instances with their own `eyebrow`.

### `/blog`

Static array of posts in `src/pages/Blog.tsx`. For real CMS-backed content:

1. Move posts to `src/content/blog.json` (or a Markdown loader like `vite-plugin-md`)
2. Read at module load: `import posts from '@/content/blog.json'`
3. Keep the `BlogList` component as-is

### `/blog/:slug`

Reads `:slug` from the route. The current implementation has a single placeholder post — replace with a slug-keyed lookup:

```tsx
import { POSTS } from '@/content/posts';
const post = POSTS[slug ?? ''] ?? null;
if (!post) return <NotFound />;
```

### `/team`

3-member grid by default. For a wider grid, the component handles any count — it stays a 3-col `lg:grid-cols-3` responsive grid.

### `/case-studies`

3-study grid by default. The slugged child route (`/case-studies/:slug`) currently reuses `BlogPost.tsx` — clone to `CaseStudyDetail.tsx` if you need a different layout.

### `/contact`

Form posts to `/api/contact-form/{slug}` by default. For projectsites.dev sites, the form action resolves to the Cloudflare Worker that handles inbound contact requests.

Form fields: name, email, subject, message. To add a phone field:

```tsx
<input type="tel" name="phone" autoComplete="tel" inputMode="tel" placeholder="(555) 555-5555"
  className="..." />
```

For multi-step forms or scheduling: use `<BookingEmbed>` from `src/components/local/` (Cal.com / Calendly compatible).

### `/privacy`, `/terms`, `/accessibility`

Boilerplate legal pages. **Always have a lawyer review** before shipping to a real business — defaults are starting points, not legal advice.

For projectsites.dev sites, set the placeholders:

- `{PRIVACY_LAST_UPDATED}` — `2026-05-20`
- `{TERMS_LAST_UPDATED}` — `2026-05-20`
- `{PRIVACY_COLLECTION_TEXT}` — what data you collect
- `{PRIVACY_USAGE_TEXT}` — what you use it for
- `{PRIVACY_PROTECTION_TEXT}` — how you secure it
- `{TERMS_ACCEPTANCE_TEXT}` — acceptance terms
- `{TERMS_USAGE_TEXT}` — usage rules
- `{TERMS_LIABILITY_TEXT}` — limitation of liability

### `*` (NotFound)

Default 404 page. ⌘K + Back + Home buttons. No customization required — it inherits the brand automatically.

## Adding a new page

1. Create `src/pages/MyPage.tsx`:

   ```tsx
   import { useSEO } from '@/hooks/useSEO';
   import Breadcrumbs from '@/components/Breadcrumbs';
   import { brand } from '@/brand';
   import { CTASection } from '@/components/sections';

   export default function MyPage() {
     useSEO({
       title: `My Page — ${brand.business.name}`,
       description: 'Concise meta description, 120–156 chars.',
     });
     return (
       <>
         <Breadcrumbs baseUrl={brand.business.url} />
         <section className="pt-32 pb-20 max-w-container-wide mx-auto px-6">
           <h1 className="text-fluid-4xl font-bold font-heading">Page title</h1>
           {/* content */}
         </section>
         <CTASection eyebrow="Next step" headline="..." primary={{ label: '...', href: '/contact' }} />
       </>
     );
   }
   ```

2. Register in `src/App.tsx`:

   ```tsx
   <Route path="/my-page" element={<MyPage />} />
   ```

3. Add to `public/sitemap.xml`:

   ```xml
   <url><loc>{BUSINESS_URL}/my-page</loc><lastmod>{BUILD_DATE}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>
   ```

4. Add to `src/components/CommandPalette.tsx` `DEFAULT_ACTIONS`:

   ```ts
   { id: 'my-page', label: 'My Page', group: 'Pages', href: '/my-page' },
   ```

5. Add a link to it in `src/components/Footer.tsx` or `Header.tsx` if it's user-facing.

## Universal page conventions

- Every page starts with `useSEO({ title, description })`
- Every page (except `/` and `*`) starts with `<Breadcrumbs baseUrl={brand.business.url} />` immediately after `useSEO`
- Every page emits at least 1 JSON-LD node via `<JsonLd data={...} />`
- Every page closes with a `<CTASection>` (unless it's a legal / 404 page)
- Heading hierarchy: `<h1>` once per page, `<h2>` for section eyebrows, `<h3>` for subsection items
- All page padding: `pt-32` (compensate for fixed header) + `pb-20` minimum
