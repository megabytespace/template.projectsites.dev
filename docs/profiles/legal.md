# Profile — Legal / Law Firm

## When to use this profile

- Solo attorney or small firm
- Practice areas: family, immigration, estate, criminal, business, IP, employment
- Consultation-driven funnel
- Trust + credentials are the conversion driver

## Recommended brand settings

```jsonc
{
  "business": { "businessClass": { "$value": "legal" } },
  "color": {
    "brandHue":    { "$value": "220" },     // navy — traditional + trustworthy
    "brandChroma": { "$value": "0.10" }
  },
  "colorScheme":   { "$value": "light" },
  "font": {
    "heading": { "$value": "Cormorant Garamond" },
    "body":    { "$value": "Lora" }
  },
  "features": {
    "hero":         { "$value": true },
    "logoCloud":    { "$value": false },
    "bento":        { "$value": true },     // practice areas
    "stats":        { "$value": true },     // case wins, years in practice
    "services":     { "$value": true },     // practice areas
    "process":      { "$value": true },     // case journey
    "testimonials": { "$value": true },     // careful — see ethics rules
    "pricing":      { "$value": false },    // generally not done
    "faq":          { "$value": true },
    "blog":         { "$value": true },     // thought leadership / legal updates
    "team":         { "$value": true },     // attorneys + credentials
    "caseStudies":  { "$value": false },    // careful — see ethics rules
    "newsletter":   { "$value": false },
    "cta":          { "$value": true }
  }
}
```

See: [examples/_brand.legal.json](../../examples/_brand.legal.json)

## Ethics warning

State bar rules limit attorney advertising. Before publishing:

- **Testimonials** — many states require a disclaimer ("Results not typical")
- **Case results** — outcome claims may be restricted or banned
- **Specialization claims** — "specialist" usually requires board certification
- **Comparative advertising** — often restricted
- **Solicitation** — direct CTAs are fine; targeted email after consultation is restricted

**Have a state-bar-compliant attorney review the site before launch.**

## Homepage composition

```tsx
<HeroSplit
  eyebrow="Estate planning · Anchorage AK"
  headline="Plans that protect what you've built."
  subheadline="20 years preparing wills, trusts, and estate plans for Alaska families. Free initial consultation."
  primary={{ label: 'Schedule consultation', href: '/contact' }}
  secondary={{ label: 'Call (907) 555-0100', href: 'tel:+19075550100' }}
  image={{ src: '/office.jpg', alt: 'Jane Doe at her desk reviewing documents' }}
/>

<BentoGrid headline="Practice areas" tiles={[
  { id: 'wills',  title: 'Wills',      description: 'Simple to complex estates.', span: 'sm', icon: <FileText /> },
  { id: 'trusts', title: 'Trusts',     description: 'Living, irrevocable, charitable.', span: 'sm', icon: <Shield /> },
  { id: 'probate',title: 'Probate',    description: 'Court navigation + executor support.', span: 'md', icon: <Scale /> },
  { id: 'business',title:'Business succession', description: 'Continuity plans for owners.', span: 'lg', tall: true, accent: true, icon: <Users /> },
]} />

<FeatureSplit
  eyebrow="About"
  headline="Jane Doe, JD"
  description="20 years estate planning in Alaska. UW School of Law. Past president, Anchorage Estate Planning Council."
  bullets={['JD, University of Washington, 2003', 'Alaska Bar, 2003 (active)', 'Past president, AEPC (2018–2020)', 'AV-rated, Martindale-Hubbell']}
  image={{ src: '/jane.jpg', alt: 'Jane Doe at her desk' }}
/>

<ProcessSteps
  eyebrow="How we work"
  steps={[
    { title: 'Consultation',  description: 'Free 30-min call to understand your situation.' },
    { title: 'Plan',          description: 'We draft your documents. You review and revise.' },
    { title: 'Sign + file',   description: 'Documents executed in-office. Filings handled.' },
    { title: 'Review',        description: 'Free annual review to keep your plan current.' },
  ]}
/>

<FAQ items={[
  { question: 'Do you offer free consultations?', answer: 'Yes — 30 minutes by phone or video. No charge for the initial conversation.' },
  { question: 'What does a will cost?', answer: 'Simple wills are $400 per individual or $700 per couple. Complex estates are quoted after consultation.' },
  { question: 'How long does it take?', answer: 'Most simple wills are signed within 2 weeks of the consultation. Trusts and complex plans take 4–6 weeks.' },
  { question: 'Where are you located?', answer: '1234 4th Avenue, Anchorage AK. Free parking. Video appointments available statewide.' },
  { question: 'Are you accepting new clients?', answer: 'Yes. Schedule a free consultation to get started.' },
]} />

<CTASection
  eyebrow="Get started"
  headline="Schedule your free consultation"
  primary={{ label: 'Schedule online', href: '/contact' }}
  secondary={{ label: 'Call (907) 555-0100', href: 'tel:+19075550100' }}
  tone="quiet"
/>
```

## Copy tone

- **Calm + competent** — clients are often stressed
- **Specific credentials** — bar admissions, dates, board cert if applicable
- **Plain English** — avoid legalese on the homepage
- **Transparent pricing where ethical** — flat fees for predictable services
- **No fear-mongering**

## Don't include

- Outcome claims without disclaimers
- Testimonials without compliance review
- Generic "experienced attorney" language
- Comparison claims against competitors
- "We will win your case" language
