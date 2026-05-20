# template.projectsites.dev

Production-ready cinematic website template for AI-generated sites on **projectsites.dev**. Built for **bolt.diy**, **bolt.new**, **Claude Code**, **Cursor**, and any other AI dev environment that can edit JSON + JSX.

> One JSON file controls the brand. One hue number reskins the site. Fifteen routes ship ready.

## Quick start

```bash
npm install
npm run dev      # localhost:5173
npm run build    # → dist/
```

## What's in here

- **React 18 + Vite 5 + TypeScript 5 + Tailwind 3 + React Router 6**
- **DTCG brand-token system** — edit `_brand.json` to rebrand
- **15 universal routes** — Home, About, Services, Pricing, FAQ, Blog, BlogPost, Team, CaseStudies, Contact, Privacy, Terms, Accessibility, NotFound, plus catch-all
- **15 section components** — HeroCenter / HeroSplit / KineticHeadline / BentoGrid / Stats / LogoCloud / Marquee / ProcessSteps / FeatureSplit / Pricing / Comparison / FAQ / CTASection / TeamGrid / BlogList / CaseStudyGrid
- **Cmd+K command palette** — universal, focus-trapped, theme-toggle built in
- **Light + dark + auto** themes with `localStorage` persistence
- **PhotoSwipe v5 lightbox** auto-mounted, gallery-aware
- **Full PWA kit** — manifest with screenshots / shortcuts / share_target, sw.js, offline.html, maskable icons
- **5+ JSON-LD blocks per page** — Organization, WebSite, WebPage, BreadcrumbList, FAQPage, BlogPosting, Person, Product
- **WCAG 2.2 AA** — focus rings, skip link, target sizes, reduced-motion fallbacks, accessibility statement page
- **Scroll-driven kinetic typography** — variable-font weight + letter-spacing map to scroll position (with `animation-timeline` + JS fallback)
- **Bento grid** — Apple-WWDC asymmetric layout with subgrid alignment
- **OKLCH color** — perceptually uniform brand ramps, hue-rotation friendly

## Rebrand in 5 steps

1. **Edit `_brand.json`.**
   - Set `business.name`, `business.description`, `business.url`, etc.
   - Rotate `color.brandHue` (`0`-`360`) to recolor the whole site.
   - Toggle `features.*` to show/hide homepage sections.
2. **Replace `{PLACEHOLDER}` strings** in `src/pages/*.tsx` with real copy.
3. **Update `public/site.webmanifest`** name + short_name.
4. **Update `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`** with the real domain.
5. **Drop real images** into `public/`.

That's it. The rest cascades automatically.

## Brand-token cheat sheet

```jsonc
{
  "color": {
    "brandHue":    { "$value": "240" },        // rotate this to reskin
    "brandChroma": { "$value": "0.18" },       // 0.05 = pastel, 0.30 = vivid
    "primary":     { "$value": "oklch(0.62 {color.brandChroma} {color.brandHue})" }
  },
  "font": {
    "heading": { "$value": "Space Grotesk" }, // any Google Font name
    "body":    { "$value": "Inter" }
  },
  "colorScheme": { "$value": "dark" },        // dark | light | auto
  "features": {
    "pricing": { "$value": false }            // toggle entire sections
  }
}
```

## File map

```
.bolt/                       bolt.diy meta files
├── prompt                   per-template prompt for the LLM
├── ignore                   files the LLM should not rewrite
└── config.json              template metadata

_brand.json                  single source of truth (DTCG)
CLAUDE.md                    architecture + customization guide
README.md                    you are here
index.html                   meta, OG, fonts, PWA, Speculation Rules

src/
├── brand.ts                 resolves _brand.json → CSS variables
├── main.tsx                 entry, calls applyBrand()
├── App.tsx                  router with 15 routes
├── index.css                @layer base + utilities (OKLCH)
├── App routes               Home, About, Services, Pricing, FAQ,
│                            Blog, BlogPost, Team, CaseStudies,
│                            Contact, Privacy, Terms, Accessibility, NotFound
├── components/
│   ├── Layout.tsx           Header + Footer + Lightbox + CommandPalette
│   ├── Header.tsx           sticky nav, ⌘K trigger, theme toggle
│   ├── Footer.tsx           4-col footer reading brand
│   ├── CommandPalette.tsx   universal ⌘K palette
│   ├── ThemeToggle.tsx      dark / light / auto cycle
│   ├── Lightbox.tsx         PhotoSwipe v5 auto-mount
│   ├── JsonLd.tsx           safe JSON-LD renderer
│   ├── sections/            HeroVariants, KineticHeadline, BentoGrid,
│   │                        Stats, LogoCloud, Marquee, ProcessSteps,
│   │                        FeatureSplit, Pricing, Comparison, FAQ,
│   │                        CTASection, TeamGrid, BlogList, CaseStudyGrid
│   ├── local/               local-business specific (NAP, BeforeAfterSlider,
│   │                        Map, SpeedDial, StickyPhoneCTA, EmergencyBanner,
│   │                        QuickActions, ReviewCTA, TestimonialCarousel)
│   └── ui/                  primitives (Button, Card)
├── lib/
│   ├── businessSchema.ts    Organization / LocalBusiness / WebSite / etc.
│   ├── altText.ts           dedupe + derive alt text
│   ├── cursor.ts            click-ripple cursor
│   └── utils.ts             cn(...) for tailwind merging
└── hooks/
    ├── useSEO.ts            <title> + meta description
    └── useInView.ts         IntersectionObserver wrapper

public/
├── site.webmanifest         PWA manifest with screenshots + shortcuts
├── robots.txt               GPTBot, ClaudeBot, PerplexityBot, etc.
├── sitemap.xml              all 15 routes with <lastmod>
├── llms.txt                 LLM-readable site index
├── sw.js                    service worker (cache + offline fallback)
├── offline.html             offline shell
├── browserconfig.xml        Windows tile
├── 404.html, 500.html       static error pages
└── .well-known/security.txt
```

## Hard rules for AI editors

- **One source of truth.** Edit `_brand.json` first, not `tailwind.config.ts` or CSS files.
- **No hardcoded colors.** Use Tailwind tokens (`bg-accent`, `text-text-muted`).
- **All images need alt text.** Decorative only: `alt=""` + `aria-hidden="true"`.
- **Every email / phone / address must be a real link** (`mailto:`, `tel:`, Google Maps).
- **Press ⌘K opens the palette.** Don't remove it.
- **Respect reduced motion.** Every animation MUST have a `prefers-reduced-motion` fallback.

## Quality bar (every site that ships from this template)

- LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1
- Lighthouse Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
- WCAG 2.2 AA axe-core 0 violations
- 5+ JSON-LD blocks per page (FAQ + Org + WebSite + WebPage + Breadcrumb minimum)
- Zero console errors
- Zero `{PLACEHOLDER}` strings in production

## License

Internal use for projectsites.dev. Built with care by Megabyte Labs.
