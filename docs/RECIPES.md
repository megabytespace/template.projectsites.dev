# Recipes

Copy-paste customizations for common scenarios. Each recipe is self-contained.

## Recipe 1 — Skin the whole site teal

```jsonc
// _brand.json
{
  "color": {
    "brandHue":    { "$value": "180" },
    "brandChroma": { "$value": "0.22" },
    "accent":      { "$value": "oklch(0.85 0.18 195)" }  // keeps the cyan accent
  }
}
```

Reload — every `bg-primary`, `bg-background`, `border-border`, `text-text-muted` shifts to teal.

## Recipe 2 — Switch to light mode permanently

```jsonc
{ "colorScheme": { "$value": "light" } }
```

If you also want to hide the dark/light toggle (single-mode site):

```tsx
// src/components/Header.tsx — remove the <ThemeToggle /> mount
```

## Recipe 3 — Hero with custom kinetic effect

Default `HeroCenter` already uses `KineticHeadline`. To customize the effect, edit `src/index.css`:

```css
@keyframes kinetic-compress {
  from { font-variation-settings: 'wght' 900, 'wdth' 130; letter-spacing: -0.06em; }
  to   { font-variation-settings: 'wght' 400, 'wdth' 75;  letter-spacing: 0.02em; }
}
```

Heavier-to-lighter as the user scrolls. Or reverse the values for "build the headline as you scroll."

## Recipe 4 — Add a 4th nav link

```tsx
// src/components/Header.tsx
const DEFAULT_LINKS: NavLink[] = [
  { to: '/',         label: 'Home' },
  { to: '/about',    label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/pricing',  label: 'Pricing' },
  { to: '/blog',     label: 'Blog' },        // ← added
  { to: '/contact',  label: 'Contact' },
];
```

Then add to the footer + sitemap + command palette (see `docs/PAGES.md` → Adding a new page).

## Recipe 5 — Single-product pricing (no tiers)

```tsx
<Pricing
  showToggle={false}
  tiers={[
    { id: 'unlimited',
      name: 'Unlimited',
      description: 'Everything in one plan. No upsells.',
      monthly: 49, yearly: 470,
      features: ['Unlimited projects', 'Unlimited users', 'Priority support', 'Custom domain', 'White-label'],
      cta: { label: 'Start free trial', href: '/contact?intent=trial' },
    },
  ]}
/>
```

## Recipe 6 — Restaurant menu page

Replace `src/pages/Services.tsx` content with a menu (or create a new `/menu` route):

```tsx
const menu = [
  { category: 'Breakfast', items: [
    { name: 'Sourdough toast',      price: '$8',  description: 'Wild yeast loaf, salted butter' },
    { name: 'Veggie scramble',      price: '$14', description: 'Three eggs, spinach, goat cheese' },
  ]},
  { category: 'Pastries', items: [
    { name: 'Almond croissant',     price: '$5',  description: 'Frangipane, demerara sugar' },
    { name: 'Morning bun',          price: '$4',  description: 'Cardamom-orange sugar' },
  ]},
];

<section className="py-24 max-w-container-normal mx-auto px-6">
  {menu.map(cat => (
    <div key={cat.category} className="mb-16">
      <h2 className="text-3xl font-heading font-bold mb-8 underline-hover inline-block">{cat.category}</h2>
      <ul className="divide-y divide-border">
        {cat.items.map(item => (
          <li key={item.name} className="flex justify-between py-4">
            <div>
              <span className="font-heading font-semibold text-text">{item.name}</span>
              <p className="text-text-muted text-sm">{item.description}</p>
            </div>
            <span className="font-mono text-accent ml-6">{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  ))}
</section>
```

Then add `MenuItem` JSON-LD (Schema.org) if the site is a `restaurant` businessClass.

## Recipe 7 — Real images + lightbox gallery

Drop images into `public/gallery/`. Then:

```tsx
<section data-gallery="our-work" className="grid md:grid-cols-3 gap-4 py-20 max-w-container-wide mx-auto px-6">
  <img src="/gallery/work-1.jpg" alt="Sourdough loaves cooling on a wire rack" className="rounded-md aspect-square object-cover" />
  <img src="/gallery/work-2.jpg" alt="Cardamom buns coming out of the oven" className="rounded-md aspect-square object-cover" />
  <img src="/gallery/work-3.jpg" alt="Maria piping ganache onto a tart" className="rounded-md aspect-square object-cover" />
</section>
```

The `data-gallery="our-work"` wrapper tells `src/components/Lightbox.tsx` to scope the slideshow to those three images. Clicking any opens PhotoSwipe with arrow nav between them.

## Recipe 8 — Stripe checkout link from the pricing page

```tsx
// src/pages/Pricing.tsx — replace the tier cta href
const tiers: PricingTier[] = [
  { id: 'starter', /* ... */ cta: { label: 'Start free', href: 'https://buy.stripe.com/yourLink' } },
];
```

For full Stripe Checkout integration with subscriptions, you'll need a backend endpoint. The template is client-only; wire to a Cloudflare Worker or Vercel function.

## Recipe 9 — Calendly / Cal.com booking embed

`src/components/local/BookingEmbed.tsx` already handles both. Use it in the contact page:

```tsx
import BookingEmbed from '@/components/local/BookingEmbed';

<BookingEmbed
  provider="cal"               // 'cal' | 'calendly'
  url="https://cal.com/your-handle/intro"
  prefill={{ name: '', email: '' }}
/>
```

## Recipe 10 — Add Sentry error tracking

```bash
# add deps
npm install @sentry/react @sentry/tracing
```

```tsx
// src/main.tsx — top of file
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://YOUR_DSN@sentry.io/PROJECT_ID',
  environment: import.meta.env.MODE,
  tracesSampleRate: 0.1,
  integrations: [Sentry.browserTracingIntegration()],
});
```

For projectsites.dev sites, the dashboard injects this automatically via the build pipeline; you don't need to add it manually.

## Recipe 11 — Add GA4 + GTM

```html
<!-- index.html — in <head> before </head> -->
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>

<!-- in <body> immediately after opening <body> -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

CSP allowlist for GA4/GTM:

```
script-src: 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com
connect-src: 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com
```

## Recipe 12 — Add a PostHog snippet

```html
<!-- index.html — before </head> -->
<script>
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  posthog.init('YOUR_PROJECT_API_KEY', { api_host: 'https://us.i.posthog.com', persistence: 'memory' });
</script>
```

## Recipe 13 — Industry-specific homepage swap

The fastest way to retarget the homepage is to swap the section composition entirely. See `docs/profiles/` for full industry-specific page recipes:

- `docs/profiles/saas.md`
- `docs/profiles/restaurant.md`
- `docs/profiles/portfolio.md`
- `docs/profiles/agency.md`
- `docs/profiles/medical.md`
- `docs/profiles/legal.md`
- `docs/profiles/nonprofit.md`
- `docs/profiles/retail.md`
- `docs/profiles/local-service.md`

## Recipe 14 — Add a sticky phone bar (mobile-only) for local businesses

```tsx
// src/components/Layout.tsx
import StickyPhoneCTA from '@/components/local/StickyPhoneCTA';
import { brand } from '@/brand';

<>
  {/* ... */}
  <StickyPhoneCTA phone={brand.business.phone} label="Call now" />
</>
```

`StickyPhoneCTA` is fixed-bottom on screens < 768px, never appears on desktop.

## Recipe 15 — Disable the kinetic scroll-driven headline

Some clients prefer static type. To turn off scroll-driven animation site-wide:

```css
/* src/index.css — remove or comment out this block */
@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    .kinetic-headline { /* ... */ }
  }
}
```

The headline still renders correctly — just static instead of scroll-animated.

## Recipe 16 — Custom palette via OKLCH ramp

Generate a full 50–950 ramp at a fixed hue/chroma. Use [Huetone](https://huetone.ardov.me/) or [OKLCH Picker](https://oklch.com/) to pick:

```jsonc
// _brand.json — add custom shades
{
  "color": {
    "brandHue":    { "$value": "265" },
    "brandChroma": { "$value": "0.20" },

    "brand50":  { "$value": "oklch(0.97 0.02 265)" },
    "brand100": { "$value": "oklch(0.93 0.04 265)" },
    "brand200": { "$value": "oklch(0.87 0.08 265)" },
    "brand300": { "$value": "oklch(0.79 0.12 265)" },
    "brand400": { "$value": "oklch(0.70 0.16 265)" },
    "brand500": { "$value": "oklch(0.62 0.20 265)" },
    "brand600": { "$value": "oklch(0.55 0.20 265)" },
    "brand700": { "$value": "oklch(0.46 0.18 265)" },
    "brand800": { "$value": "oklch(0.34 0.14 265)" },
    "brand900": { "$value": "oklch(0.22 0.08 265)" },
    "brand950": { "$value": "oklch(0.14 0.05 265)" }
  }
}
```

Wire to `tailwind.config.ts`:

```ts
colors: {
  brand: {
    50:  'var(--color-brand-50)',
    100: 'var(--color-brand-100)',
    // …
    950: 'var(--color-brand-950)',
  }
}
```

And add the new keys to `COLOR_KEYS` in `src/brand.ts`.

## Recipe 17 — Speed-up checklist

Before shipping:

1. **LCP image** has `loading="eager"` + `fetchpriority="high"` (only that one image)
2. **All other images** have `loading="lazy"`
3. **Image sources** are AVIF primary + WebP fallback, ≤200 KB each
4. **OG image** (`public/og-image.png`) is a **branded card** at 1200×630, ≤100 KB — not a raw photo
5. **Service worker** is enabled (`sw.js` is referenced in `index.html`)
6. **Critical CSS** is inlined (Vite handles this automatically)
7. **Fonts** are preloaded via `<link rel="preload" as="style">` in `index.html` (already done)
8. **No unused npm packages** — run `npx knip` to detect

## Recipe 18 — Configure custom hostname canonical

If the site uses a custom domain (not `*.projectsites.dev`), set the canonical in `index.html`:

```html
<link rel="canonical" href="https://yourdomain.com/" />
```

Per-page canonicals via `useSEO`:

```tsx
useSEO({
  title: '...',
  description: '...',
  canonical: 'https://yourdomain.com/about',
});
```

## Recipe 19 — Custom Cmd+K actions per site

```tsx
// src/components/Layout.tsx
import { CommandPalette } from '@/components/CommandPalette';

<CommandPalette extra={[
  { id: 'book-call',     label: 'Book a 15-min call',   group: 'Actions', href: '/contact?intent=call' },
  { id: 'download-deck', label: 'Download our deck',    group: 'Actions', href: '/deck.pdf' },
  { id: 'email-us',      label: 'Email founder',        group: 'Actions',
    onSelect: () => window.location.href = `mailto:${brand.business.email}` },
]} />
```

## Recipe 20 — Add a real OG image

The placeholder `og-image.png` reference in `index.html` points at `public/og-image.png` — replace with a real 1200×630 branded card.

Recommended: use the `_brand.json` brand color + headline + logo. Tools: Figma export, [og-image.vercel.app](https://og-image.vercel.app), or a Cloudflare Worker that renders OG dynamically.
