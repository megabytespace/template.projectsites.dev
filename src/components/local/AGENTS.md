# AGENTS.md — src/components/local/

> Scoped conventions for local-business specific components. Inherits from root `AGENTS.md`.

## Purpose

`local/` holds components tailored to **physical-location businesses** — restaurants, clinics, salons, contractors, retail storefronts, auto shops, gyms.

These components assume:
- A single physical location (or a small number)
- Phone-driven conversion (calls > forms)
- Local SEO + Google Business Profile drive traffic
- Walk-in / appointment / service-area discovery

SaaS, portfolio, and pure-online businesses should **NOT** use these components — they signal local-business intent to Google's algorithms and can hurt rankings for online-only brands.

## Components

| Component | Purpose | Mobile-only? |
| --- | --- | --- |
| `HeroWithPhoto` | Hero with photo + phone CTA above the fold | no |
| `StickyPhoneCTA` | Fixed-bottom phone bar | yes |
| `TrustBadges` | License + insurance + BBB / awards row | no |
| `ServiceCards` | Service grid with icon + description | no |
| `TestimonialCarousel` | Auto-rotating testimonials with controls | no |
| `MapEmbed` | Google Maps embed scoped to the business address | no |
| `GalleryGrid` | Lightbox-wired photo grid | no |
| `NAPFooter` | Name + Address + Phone block — repeat on every page | no |
| `ReviewCTA` | "Leave us a review on Google / Yelp" block | no |
| `BeforeAfterSlider` | Draggable before/after comparison | no |
| `QuickActions` | Speed-dial of common actions (call, directions, book) | yes |
| `EmergencyBanner` | "24/7 emergency? Call now" bar | no |
| `SpeedDial` | Floating FAB with phone / SMS / directions | yes |
| `BookingEmbed` | Cal.com / Calendly / NextGen scheduler iframe | no |

## Conventions

1. **`tel:` links use E.164** — `+12025550100`, strip formatting
2. **Address links use Google Maps directions URL** — `https://www.google.com/maps/dir/?api=1&destination={url-encoded}`
3. **Phone display format** — `(202) 555-0100` for US, locale-appropriate elsewhere
4. **NAP consistency** — Name / Address / Phone identical across the site. The footer's address MUST exactly match Google Business Profile, including suite numbers and formatting.
5. **Hours visible** — never hide behind a click. Hours go in nav (collapsed on mobile is OK) + footer + JSON-LD.
6. **License numbers visible** — for licensed trades (electrician, plumber, contractor, dentist, doctor, lawyer), display the license # in the hero trust-badge row and footer.

## JSON-LD specifics

Pass `LocalBusiness`-subtype JSON-LD on the homepage. Pull the subtype from `businessClass` in `_brand.json`:

| `businessClass` | Schema.org `@type` |
| --- | --- |
| `restaurant` | `Restaurant` |
| `medical` | `Dentist` / `MedicalBusiness` / `Physician` (more specific = better) |
| `retail` | `Store` |
| `salon` | `BeautySalon` / `HairSalon` |
| `gym` | `ExerciseGym` |
| `auto-repair` | `AutoRepair` |
| `storefront` | `Plumber` / `Electrician` / `HVACBusiness` / etc. — pick the closest |

Required fields for LocalBusiness JSON-LD:

```ts
{
  '@context': 'https://schema.org',
  '@type': 'Restaurant',                // or whichever
  name, url, telephone,
  address: {
    '@type': 'PostalAddress',
    streetAddress, addressLocality, addressRegion, postalCode, addressCountry: 'US',
  },
  geo: { '@type': 'GeoCoordinates', latitude, longitude },
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: [...], opens: '08:00', closes: '17:00' }],
  priceRange: '$' | '$$' | '$$$' | '$$$$',
  // type-specific (Restaurant): menu, servesCuisine, acceptsReservations
  // type-specific (Dentist):    medicalSpecialty, acceptedInsurance
  // type-specific (Plumber):    areaServed
}
```

## Mobile patterns

- **`<StickyPhoneCTA>`** mounted in `Layout.tsx` for any local-business site:
  ```tsx
  <StickyPhoneCTA phone={brand.business.phone} label="Call now" />
  ```
- **`<SpeedDial>`** for sites with 3+ primary actions (call, SMS, directions, book)
- **Top nav phone link** — visible on all screen sizes, even mobile, with `tel:` href

## Anti-patterns

- ❌ Using local components on a SaaS / portfolio site — signals wrong intent to Google
- ❌ Inconsistent NAP across pages — kills local SEO
- ❌ Hidden phone numbers behind "Contact" pages — local visitors won't dig
- ❌ Generic "We are committed to quality" trust signals — show real license numbers, BBB ratings, review counts
- ❌ Stock photos of "smiling technicians" — real photos always win
- ❌ Reviews without sources — link to the actual Google / Yelp / Angi listing

## Adding a new local component

Same checklist as `src/components/sections/AGENTS.md` PLUS:

- [ ] Test on mobile breakpoints (375 + 390) — local-business traffic is overwhelmingly mobile
- [ ] Verify `tel:` and `mailto:` and Maps URLs work on tap
- [ ] Confirm reduced-motion fallback (carousels, sliders especially)
- [ ] Pair with appropriate `LocalSchemaGenerator` output if it surfaces structured data
