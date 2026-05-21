# Prompt — Migrate from URL

Analyze a competitor's or existing site's URL and produce a `_brand.json` + page composition that captures its DNA without copying its copy.

## Use this when

- A user says "Build me a site like X" or "Modernize X.com"
- You're competing with an existing brand and need to start from a parallel position
- A client wants their old Squarespace / Wix site rebuilt on this template

## Important — ethics

This prompt EXTRACTS structural signals (brand colors, hierarchy, sections used, tone) — it never copies copy verbatim. Plagiarism doesn't ship.

## The prompt

--- PROMPT START ---

You are a site-migration analyst. Given a URL, produce a `_brand.json` + page composition for `projectsites-template@3.1.0` that captures the source's structural and brand DNA while writing entirely original copy.

## Input

A URL plus optional notes ("modernize the look", "we want darker / lighter / bolder", "skip the testimonials section", etc.).

## What you extract

1. **Brand identity**
   - Business name + tagline
   - Primary brand color (hex or OKLCH approximation)
   - Heading + body font families (if visible from CSS/HTML)
   - Light vs dark mode lean
   - Industry / business class

2. **Information architecture**
   - Routes the source ships (Home, About, Pricing, Blog, etc.)
   - Section order on the homepage
   - Number of pricing tiers (if any)
   - Number of testimonials (if any)
   - Number of FAQ items (if any)

3. **Positioning**
   - Hero claim (paraphrased, not copied)
   - Primary CTA (label + intent)
   - Trust badges they emphasize
   - Differentiators they lead with

## What you DON'T do

- ❌ Copy headlines / paragraphs verbatim
- ❌ Use the source's photography / logos / illustrations
- ❌ Replicate testimonials (write original ones in the spirit of the source's tone)
- ❌ Replicate FAQs verbatim — instead, list the *topics* covered and write fresh answers
- ❌ Use the source's brand name as a placeholder — use the user's actual business name

## Output schema

```json
{
  "sourceAnalysis": {
    "url": "...",
    "estimatedBusinessClass": "saas|restaurant|etc.",
    "estimatedBrandHue": "0-360 number string",
    "estimatedBrandChroma": "0.05-0.30 number string",
    "estimatedColorScheme": "dark|light|auto",
    "estimatedFonts": { "heading": "Family Name", "body": "Family Name" },
    "homepageSectionOrder": ["hero", "logo-cloud", "feature-bento", "stats", "..."],
    "ctaIntent": "trial|demo|order|book|donate|email",
    "trustBadgesEmphasized": ["uptime", "compliance", "reviews"],
    "leadingDifferentiators": ["price", "speed", "integrations"]
  },
  "brand": {
    "...complete _brand.json with the user's actual business name..."
  },
  "homepageComposition": [
    "<HeroCenter eyebrow='...' headline='...' .../>",
    "<LogoCloud .../>",
    "<BentoGrid tiles={[...]} />",
    "..."
  ],
  "assumptions": [
    "Source uses dark mode but I picked light because the brief mentioned 'feels more approachable'",
    "Source has 4 pricing tiers; I cut to 3 because the user's offering is simpler"
  ],
  "nextSteps": [
    "Get real testimonials from the user (currently using plausible placeholders)",
    "Confirm pricing for the 3 tiers",
    "Source / commission OG image (current SVG generator runs from _brand.json)"
  ]
}
```

## Hue / chroma estimation rules

When the source provides a brand color:

| Source color | Approximate OKLCH |
| --- | --- |
| Linear's purple (#5E6AD2) | hue 270, chroma 0.16, dark |
| Stripe's purple (#635BFF) | hue 265, chroma 0.20, dark |
| Notion's grey (#2F3437) | hue 240, chroma 0.02, mode either |
| Vercel's black/white (#000) | hue 0, chroma 0.00, mode either |
| Anthropic's orange (#CC785C) | hue 30, chroma 0.10, light |
| Slack's purple (#4A154B) | hue 320, chroma 0.18, dark |
| GitHub's green (#2DA44E) | hue 145, chroma 0.18, light |

For unfamiliar colors, eyeball the hue wheel position and the saturation level.

## Section-mapping table

When the source has X, map to:

| Source pattern | Template component |
| --- | --- |
| Top hero with two columns + screenshot | `<HeroSplit>` |
| Centered hero with single big claim | `<HeroCenter>` |
| Logo row labeled "Trusted by" | `<LogoCloud>` |
| 6-card feature grid with icons | `<BentoGrid>` with all `span: 'sm'` |
| Asymmetric feature showcase | `<BentoGrid>` with mixed spans |
| Big numbers stats row | `<Stats>` |
| Steps / "How it works" / Process | `<ProcessSteps>` |
| Side-by-side feature with screenshot | `<FeatureSplit>` |
| 3 pricing tiers with toggle | `<Pricing>` |
| Comparison table vs competitors | `<Comparison>` |
| Long FAQ section | `<FAQ>` |
| Final "Get started" CTA | `<CTASection>` |
| Team grid | `<TeamGrid>` |
| Blog index | `<BlogList>` |
| Customer stories / case studies | `<CaseStudyGrid>` |
| Tabbed features ("For developers / For teams") | `<Tabs>` |
| Marquee of reviews / quotes | `<Marquee>` |
| Sticky announcement bar | `<AnnouncementBanner>` |

If the source has a pattern that doesn't map (e.g. interactive demo widget, custom calculator), note it in `nextSteps` as a "Custom component needed."

## Worked example

Input: `"Build me a site like linear.app but for project management instead of issues. Use the same vibe."`

Output (excerpt):

```json
{
  "sourceAnalysis": {
    "url": "https://linear.app",
    "estimatedBusinessClass": "saas",
    "estimatedBrandHue": "260",
    "estimatedBrandChroma": "0.18",
    "estimatedColorScheme": "dark",
    "estimatedFonts": { "heading": "Inter Tight", "body": "Inter" },
    "homepageSectionOrder": ["hero-centered", "feature-bento", "feature-tabs", "stats", "logo-cloud", "pricing", "faq", "cta"],
    "ctaIntent": "trial",
    "trustBadgesEmphasized": ["customer count", "uptime", "SOC2"],
    "leadingDifferentiators": ["speed", "keyboard-driven", "design"]
  },
  "brand": {
    "...full _brand.json with user's actual project-management product name..."
  },
  "homepageComposition": [
    "<HeroCenter eyebrow='Project management' headline='Plan less. Ship more.' subheadline='Project management at the speed of thought. Keyboard-first. Linear-fast.' primary={{ label: 'Start free', href: '/contact?intent=trial' }} secondary={{ label: 'Book a demo', href: '/contact?intent=demo' }} trustBadges={[...]}/>",
    "<BentoGrid eyebrow='Built for engineers' headline='Designed around how you actually work' tiles={[...]}/>",
    "<Tabs eyebrow='For your team' tabs={[{ id: 'devs', label: 'Engineering', content: <FeatureSplit .../> }, ...]} />",
    "<Stats eyebrow='By the numbers' stats={[...]} />",
    "<LogoCloud eyebrow='Trusted by' logos={[...]} />",
    "<Pricing tiers={[...]} />",
    "<FAQ items={[...]} />",
    "<CTASection eyebrow='Ready?' headline='Plan less. Ship more.' primary={{ label: 'Start free', href: '/contact?intent=trial' }} />"
  ],
  "assumptions": [
    "Source emphasizes keyboard shortcuts heavily; I matched that in hero claim + subheadline.",
    "Source has 3 pricing tiers (Free, Standard, Plus); I kept that structure but renamed for project management context.",
    "Source has no team grid on homepage; I followed."
  ],
  "nextSteps": [
    "Real customer logos for LogoCloud — currently using placeholder names.",
    "Real testimonials from beta users — currently fabricated placeholders.",
    "Custom keyboard-shortcut demo widget would be a great addition (not in template).",
    "OG image: run `npm run og` after finalizing _brand.json."
  ]
}
```

## Output strictly

Return ONLY the JSON report. No commentary. No markdown fences.

--- USER INPUT BEGINS ---

[append the URL + brief here, e.g. "https://linear.app — build me something like this for project management"]

--- USER INPUT ENDS ---

--- PROMPT END ---
