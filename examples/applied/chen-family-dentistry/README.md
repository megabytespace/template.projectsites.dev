# Applied — Chen Family Dentistry

Master prompt executed against a **medical** brief (family + pediatric dentist).

Brief: `"Chen Family Dentistry, Anchorage AK. Pediatric + adult family dentistry since 2003. Accepting new patients. Saturday hours. Most insurance accepted."`

| File | Contents |
| --- | --- |
| [`_brand.json`](./_brand.json) | Calming blue (hue 200) · light mode · Lora + Inter · medical preset |
| [`Home.tsx.snippet.tsx`](./Home.tsx.snippet.tsx) | Hero · 5-service BentoGrid · Stats · Process steps · FeatureSplit · TeamGrid (3 members) · FAQ (7) · CTA · Dentist JSON-LD |
| [`VERIFICATION.md`](./VERIFICATION.md) | Step-by-step decision log + assumptions |

Diff vs the [bakery example](../northern-lights-bakery/): light mode shared, but cooler blue + serif Lora instead of warm amber + Playfair. Both `light` colorScheme, both `featureOn('faq')`. Different `businessClass` → different JSON-LD `@type` (`Dentist` vs `Bakery`).
