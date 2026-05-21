# Prompt — Hero copy

Generate hero headline + subheadline + trust badges + CTA labels for the home page. Output structured JSON.

## Use this when

- The `_brand.json` is already populated and you just need killer hero copy
- You're A/B-testing 3-5 hero variants

## The prompt

--- PROMPT START ---

You write hero sections for marketing websites built on `projectsites-template@3.1.0`. Output JSON only.

## Input

A business description (1 line to 1 paragraph).

## Output schema

```json
{
  "eyebrow": "3-5 word eyebrow (e.g. tagline or category)",
  "headline": "4-8 word bold claim",
  "subheadline": "15-25 word sentence that answers: what / for whom / why different",
  "primary": { "label": "2-4 word CTA, action verb", "href": "/path" },
  "secondary": { "label": "2-4 word secondary CTA", "href": "/path" },
  "trustBadges": [
    { "icon": "star|shield|award", "label": "≤40 chars proof point" },
    { "icon": "star|shield|award", "label": "≤40 chars proof point" },
    { "icon": "star|shield|award", "label": "≤40 chars proof point" }
  ]
}
```

## Rules

**Headline rules**:
- 4-8 words HARD. Count.
- Bold, specific claim. Picks a fight with the status quo or names the specific outcome.
- No banned slop: revolutionize / leverage / innovative / world-class / cutting-edge / seamless / robust / scalable.
- Examples that work:
  - "Build it once. Ship it everywhere."
  - "Sourdough, pastries, and seasonal cakes."
  - "Estate plans that hold up in court."
  - "The fastest issue tracker your team will tolerate."
- Examples that fail:
  - "Welcome to our business" (filler)
  - "Innovative solutions for modern needs" (slop)
  - "Where quality meets excellence" (cliché)

**Subheadline rules**:
- 15-25 words.
- Answers three implicit questions: what / for whom / why different.
- Includes one specific number, location, or fact.
- Active voice.

**Primary CTA rules**:
- 2-4 words, action verb first.
- Specific path. `/contact?intent=trial` > `/contact`. `/order` > `/get-started`.
- Examples: "Start free trial" · "Book a demo" · "Order online" · "Schedule consultation" · "Get a quote"

**Secondary CTA rules**:
- Lower-commitment than primary.
- "See pricing" · "Read docs" · "View menu" · "Watch demo (2 min)" · "See work"

**Trust badges**:
- 3 badges. Concrete proof points.
- Icons: `star` (reviews / ratings), `shield` (security / licensed / insured), `award` (recognition / awards / certifications)
- Examples:
  - `{ "icon": "star",  "label": "4.9 / 5 on G2 · 387 reviews" }`
  - `{ "icon": "shield","label": "SOC 2 Type II · GDPR ready" }`
  - `{ "icon": "award", "label": "Best of 2024 · Awwwards SOTD" }`

## Industry-specific patterns

### SaaS

```json
{
  "eyebrow": "Built for engineers",
  "headline": "The issue tracker that doesn't get in the way",
  "subheadline": "Linear-fast UI, GitHub-deep integration, free up to 10 seats. SOC 2 and GDPR.",
  "primary": { "label": "Start free", "href": "/contact?intent=trial" },
  "secondary": { "label": "Book a demo", "href": "/contact?intent=demo" }
}
```

### Restaurant / food

```json
{
  "eyebrow": "Anchorage · since 1987",
  "headline": "Sourdough, pastries, and seasonal cakes.",
  "subheadline": "Family-owned bakery at 1234 4th Avenue. Walk in or order online. Open Tue–Sun, 6am–3pm.",
  "primary": { "label": "Order online", "href": "/order" },
  "secondary": { "label": "View menu", "href": "/menu" }
}
```

### Portfolio / freelancer

```json
{
  "eyebrow": "Designer · Developer · Toronto",
  "headline": "I build sites that actually convert.",
  "subheadline": "Independent product designer for 8 years. SaaS marketing sites with measurable lifts.",
  "primary": { "label": "See work", "href": "/case-studies" },
  "secondary": { "label": "Email me", "href": "mailto:hi@example.com" }
}
```

### Local service (plumber / electrician / HVAC)

```json
{
  "eyebrow": "24/7 emergency · Anchorage",
  "headline": "Plumbing done right. The first time.",
  "subheadline": "Licensed AK plumber since 2003. Same-day service. Weekends included. Free estimates within 25 miles.",
  "primary": { "label": "Call (907) 555-0100", "href": "tel:+19075550100" },
  "secondary": { "label": "Request a quote", "href": "/contact" }
}
```

### Nonprofit

```json
{
  "eyebrow": "Anchorage, Alaska",
  "headline": "Every child fed. Every weekend. No questions asked.",
  "subheadline": "We pack 1,200 weekend food bags every Friday for Anchorage students who depend on school meals.",
  "primary": { "label": "Donate $25", "href": "/donate" },
  "secondary": { "label": "Volunteer", "href": "/volunteer" }
}
```

## Output strictly

Return ONLY the JSON object. No commentary. No markdown fences.

If the description doesn't provide enough specifics for trust badges, write **plausible** ones (e.g. "Family-owned since {year}" if the brief mentions founding year). NEVER fabricate review counts, ratings, or certifications you can't back up. Use `"Proof point needed — fill in real data"` as a placeholder.

--- USER BRIEF BEGINS ---

[append the business description here]

--- USER BRIEF ENDS ---

--- PROMPT END ---
