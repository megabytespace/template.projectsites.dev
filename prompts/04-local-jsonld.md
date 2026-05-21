# Prompt — Local-business JSON-LD

Generate the full `LocalBusiness`-derived JSON-LD graph (with geo + hours + price range + accepted insurance / cuisine / area served) for the homepage.

## Use this when

- The business is local: storefront, restaurant, medical, retail, salon, gym, auto-repair, or local-service
- You have the address + hours + service area in the brief
- You want correct, rich-result-eligible structured data

## The prompt

--- PROMPT START ---

You generate Schema.org JSON-LD for local businesses on `projectsites-template@3.1.0`. Output a single JSON object (one node) ready to pass as `data` to the `<JsonLd>` component.

## Input

A business description with at minimum:
- Business name + URL
- Physical address (street, city, state, zip)
- Business type / industry
- Hours
- Optionally: latitude/longitude, price range, insurance accepted, cuisine, area served

## Output schema

Single JSON object. NO commentary. NO wrapping array unless multiple nodes needed.

```json
{
  "@context": "https://schema.org",
  "@type": "...",
  "@id": "{url}#org",
  "name": "...",
  "url": "...",
  "telephone": "+1...",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "...",
    "addressLocality": "...",
    "addressRegion": "...",
    "postalCode": "...",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": ...,
    "longitude": ...
  },
  "openingHoursSpecification": [...],
  "priceRange": "...",
  ...
}
```

## Picking `@type`

Use the **most specific** type Schema.org supports:

| Industry | Schema.org @type |
| --- | --- |
| Bakery | `Bakery` |
| Cafe | `CafeOrCoffeeShop` |
| Restaurant (general) | `Restaurant` |
| Bar / brewpub | `BarOrPub` |
| Fast food | `FastFoodRestaurant` |
| Dental | `Dentist` |
| Doctor (general medicine) | `Physician` |
| Pediatrician | `Physician` + `medicalSpecialty: 'Pediatric'` |
| Mental health | `Physician` + `medicalSpecialty: 'Psychiatric'` |
| Vet | `VeterinaryCare` |
| Lawyer | `LegalService` |
| Hair salon | `HairSalon` |
| Beauty salon | `BeautySalon` |
| Nail salon | `NailSalon` |
| Gym / fitness | `ExerciseGym` |
| Auto repair | `AutoRepair` |
| Auto dealer | `AutoDealer` |
| Plumber | `Plumber` |
| Electrician | `Electrician` |
| HVAC | `HVACBusiness` |
| Locksmith | `Locksmith` |
| Roofer | `RoofingContractor` |
| Painter | `HousePainter` |
| Landscaper | `Landscaping` |
| Moving | `MovingCompany` |
| Pest control | `PestControl` |
| Clothing store | `ClothingStore` |
| Electronics store | `ElectronicsStore` |
| Hardware store | `HardwareStore` |
| Furniture store | `FurnitureStore` |
| Grocery | `GroceryStore` |
| Generic retail | `Store` |
| Generic local business | `LocalBusiness` |

## `openingHoursSpecification` format

Use Schema.org's day codes: `Mo Tu We Th Fr Sa Su`.

```json
[
  { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Mo","Tu","We","Th","Fr"], "opens": "08:00", "closes": "17:00" },
  { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sa", "opens": "09:00", "closes": "14:00" }
]
```

For 24/7: `"opens": "00:00", "closes": "23:59"` repeated for all 7 days.

For "by appointment only": omit the field entirely.

## `priceRange`

`$` (under $20 avg) · `$$` ($20-50) · `$$$` ($50-100) · `$$$$` (over $100). For services without a single price, use the most-common range.

## Type-specific fields

### Restaurant
```json
{
  "servesCuisine": ["American", "Italian"],
  "acceptsReservations": false,
  "menu": "https://example.com/menu",
  "starRating": { "@type": "Rating", "ratingValue": "4.9" }
}
```

### Dentist / Physician
```json
{
  "medicalSpecialty": ["Dentistry", "PediatricDentistry"],
  "isAcceptingNewPatients": true,
  "availableService": [
    { "@type": "MedicalProcedure", "name": "Cleaning" },
    { "@type": "MedicalProcedure", "name": "Cavity filling" }
  ]
}
```

For insurance accepted, omit from JSON-LD (Schema.org has no `acceptedInsurance` field for Dentist — list visibly on the page instead).

### Plumber / Electrician / etc.
```json
{
  "areaServed": [
    { "@type": "City", "name": "Anchorage" },
    { "@type": "City", "name": "Eagle River" },
    { "@type": "City", "name": "Wasilla" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Plumbing services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Drain cleaning" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Water heater repair" } }
    ]
  }
}
```

### Retail Store
```json
{
  "paymentAccepted": ["Cash", "Credit Card"],
  "currenciesAccepted": "USD",
  "hasMap": "https://www.google.com/maps?q=..."
}
```

## Geo coordinates

If lat/lng given, use them. If only address given:

- **Best**: ask the user to provide lat/lng (most accurate)
- **Acceptable fallback**: emit `geo` with placeholder comment instructing user to fill in:
  ```json
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 0,
    "longitude": 0,
    "_comment": "REPLACE — get from https://www.latlong.net/ using the address"
  }
  ```

The `_comment` field is a hint to the user — Schema.org ignores extra properties.

## Worked example

Brief:
```
Chen Family Dentistry, Anchorage AK.
1234 4th Avenue, Suite 200, Anchorage AK 99501.
Hours: Tue–Fri 8am–5pm, Sat 9am–2pm.
Phone: (907) 555-0100.
URL: https://chendental.example
Pediatric + adult. Accepting new patients.
```

Output:

```json
{
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": "https://chendental.example#org",
  "name": "Chen Family Dentistry",
  "url": "https://chendental.example",
  "telephone": "+19075550100",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1234 4th Avenue, Suite 200",
    "addressLocality": "Anchorage",
    "addressRegion": "AK",
    "postalCode": "99501",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 61.2181,
    "longitude": -149.9003
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Tu","We","Th","Fr"], "opens": "08:00", "closes": "17:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sa", "opens": "09:00", "closes": "14:00" }
  ],
  "priceRange": "$$",
  "medicalSpecialty": ["Dentistry", "PediatricDentistry"],
  "isAcceptingNewPatients": true,
  "availableService": [
    { "@type": "MedicalProcedure", "name": "Cleanings and exams" },
    { "@type": "MedicalProcedure", "name": "Cavity fillings" },
    { "@type": "MedicalProcedure", "name": "Crowns and bridges" },
    { "@type": "MedicalProcedure", "name": "Pediatric dentistry" }
  ]
}
```

## Output strictly

Return ONLY the JSON object. No commentary. No markdown fences.

--- USER BRIEF BEGINS ---

[append the local business description here]

--- USER BRIEF ENDS ---

--- PROMPT END ---

## After running

Test the output:

```bash
# Validate via Google Rich Results Test
open "https://search.google.com/test/rich-results?utm_source=projectsites"
# Paste your URL after publishing, or use the Code option with the generated JSON-LD
```

Pass criteria: zero errors. Warnings are OK (e.g. missing `image` is a warning, not an error).
