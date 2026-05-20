# Profile — SaaS

## When to use this profile

- B2B software (CRM, analytics, dev tools, vertical SaaS)
- Subscription-based revenue
- Trial-driven funnel
- 2–4 pricing tiers
- Self-serve sign-up

## Recommended brand settings

```jsonc
// _brand.json
{
  "business": {
    "businessClass": { "$value": "saas" }
  },
  "color": {
    "brandHue":    { "$value": "260" },     // indigo / violet — tech-leaning
    "brandChroma": { "$value": "0.20" }
  },
  "colorScheme":   { "$value": "dark" },     // dark default; ThemeToggle gives users light
  "font": {
    "heading": { "$value": "Inter Tight" },  // tighter than default for SaaS density
    "body":    { "$value": "Inter" }
  },
  "features": {
    "hero":         { "$value": true },
    "logoCloud":    { "$value": true },      // "Trusted by Acme, Globex…"
    "bento":        { "$value": true },      // feature grid — bento is SaaS-native
    "stats":        { "$value": true },
    "services":     { "$value": false },     // SaaS isn't service-based
    "process":      { "$value": false },
    "testimonials": { "$value": true },
    "pricing":      { "$value": true },      // critical
    "faq":          { "$value": true },
    "blog":         { "$value": true },      // content marketing
    "team":         { "$value": false },     // optional; on if founder-led brand
    "caseStudies":  { "$value": true },      // optional; on if enterprise-leaning
    "newsletter":   { "$value": true },
    "cta":          { "$value": true }
  }
}
```

See full preset: [examples/_brand.saas.json](../../examples/_brand.saas.json)

## Homepage composition

```tsx
<HeroCenter
  eyebrow="The fastest way to X"
  headline="Bold claim that beats the status quo"
  subheadline="One sentence that answers: what you do, who it's for, why it's different. 25 words max."
  primary={{ label: 'Start free trial', href: '/contact?intent=trial' }}
  secondary={{ label: 'See pricing', href: '/pricing' }}
  trustBadges={[
    { icon: 'star',   label: '4.9 / 5 G2' },
    { icon: 'shield', label: 'SOC 2 Type II' },
    { icon: 'award',  label: 'Built on Cloudflare' },
  ]}
/>

<LogoCloud
  eyebrow="Trusted by teams at"
  logos={[
    { name: 'Acme' }, { name: 'Globex' }, { name: 'Initech' },
    { name: 'Wonka' }, { name: 'Sterling Cooper' }, { name: 'Dunder Mifflin' },
  ]}
/>

<BentoGrid
  eyebrow="Built for engineers"
  headline="The X that doesn't suck"
  description="No setup wizard. No mandatory onboarding call. Free until you outgrow it."
  tiles={[
    { id: 'speed', title: 'Sub-100ms queries', description: 'Edge cache + Postgres replicas. Median p99 = 47ms.', span: 'lg', tall: true, accent: true, icon: <Zap /> },
    { id: 'security', title: 'SOC 2 + HIPAA', description: 'Encryption at rest + in transit. Audit log retention 90d.', span: 'sm', icon: <Shield /> },
    { id: 'integrations', title: '120+ integrations', description: 'Slack, Notion, Linear, GitHub, Stripe, more.', span: 'sm', icon: <Users /> },
    { id: 'api', title: 'OpenAPI 3.1', description: 'RPC + REST + webhooks. Client SDKs for TS, Python, Go.', span: 'md', icon: <Target /> },
    { id: 'price', title: 'Free until $10K MRR', description: 'No credit card. Upgrade when you outgrow it.', span: 'md', icon: <Award /> },
  ]}
/>

<FeatureSplit
  eyebrow="How it works"
  headline="Install in 60 seconds"
  description="Drop our snippet, point at your endpoint, ship. Zero infrastructure to manage."
  bullets={[
    'TypeScript + Python SDKs',
    'Same-day rollback on any deploy',
    'CLI for local dev + CI/CD',
  ]}
  cta={{ label: 'Read the docs', href: '/docs' }}
  visual={<CodeBlock language="ts">{`import { Client } from '@yourapp/sdk';\nconst client = new Client(process.env.API_KEY);\nawait client.track('signup', { user: 'maria@example.com' });`}</CodeBlock>}
/>

<Stats
  eyebrow="By the numbers"
  stats={[
    { value: 50_000_000, suffix: '+', label: 'API calls / month' },
    { value: 99,          suffix: '.99%', label: 'Uptime SLA' },
    { value: 47,          suffix: 'ms', label: 'p99 latency' },
    { value: 124,         suffix: '+', label: 'Integrations' },
  ]}
/>

<Pricing
  eyebrow="Pricing"
  headline="Pay for what you use"
  description="No seat tax. No surprise renewals."
  tiers={[
    { id: 'free',    name: 'Free',       description: 'Solo + side projects.',  monthly: 0,  yearly: 0,
      features: ['10K events/mo', '1 user', 'Community support'] },
    { id: 'pro',     name: 'Pro',        description: 'Growing teams.',          monthly: 49, yearly: 470, featured: true, badge: 'Most popular',
      features: ['1M events/mo', '10 users', 'Email support', 'Custom domain', 'SOC 2 attestation'] },
    { id: 'scale',   name: 'Scale',      description: 'Real volume.',            monthly: 199,yearly: 1900,
      features: ['10M events/mo', '50 users', 'Priority support', 'SSO', 'SLA 99.99%'] },
  ]}
/>

<FAQ
  eyebrow="Questions"
  items={[
    { question: 'Can I cancel anytime?', answer: 'Yes. Cancel from your billing page; access continues through end of period.' },
    { question: 'Is there a free trial?', answer: 'The Free plan is free forever for up to 10K events/month. No card required.' },
    { question: 'Do you offer refunds?', answer: 'We refund unused months on annual plans. Monthly plans are non-refundable but cancel without penalty.' },
    { question: 'Where is data stored?', answer: 'Primary region is us-east-1 with replicas in eu-west-1 and ap-southeast-1. Enterprise can pin to a single region.' },
    { question: 'How do you handle GDPR?', answer: 'EU traffic stays in eu-west-1. DPA signed by default. Data Processor agreement on request.' },
  ]}
/>

<CTASection
  eyebrow="Ready?"
  headline="Build with us. Ship by Friday."
  primary={{ label: 'Start free', href: '/contact?intent=trial' }}
  secondary={{ label: 'Book a demo', href: '/contact?intent=demo' }}
/>
```

## Copy tone

- **Hero:** specific, technical, bold. Pick a fight with the status quo.
- **Subheadline:** answers "what / for whom / why different" in <25 words
- **Trust badges:** real proof. SOC2, customer count, uptime, integrations
- **Features:** outcomes, not nouns ("Cut latency in half" > "Fast")
- **Stats:** specific numbers with units, not vague ranges
- **FAQ:** include cancellation, refund, security, data residency, GDPR — every question a procurement team asks

## CTAs

| Position | Label | Intent |
| --- | --- | --- |
| Hero primary | "Start free trial" | Self-serve sign-up |
| Hero secondary | "See pricing" / "Book demo" | Sales-assist |
| Pricing CTA | "Start free" / "Talk to sales" | Tier-gated |
| Closing CTA | "Start free" + "Book demo" | Two paths |

## Don't include

- Generic "Welcome to our website"
- Banned slop words ("revolutionize", "leverage", "innovative") — see `~/.claude/rules/copy-writing.md`
- Stock photos of "diverse teams in a glass conference room"
- Long-form mission statements on the homepage
- Pricing tiers with feature lists that contradict the comparison table
- Testimonials without names + roles + companies

## Required pages

- `/` Home
- `/pricing` ← critical
- `/contact` (with intent query params)
- `/faq` ← AI-search win
- `/blog` ← content marketing
- `/docs` ← link out to dedicated docs (not built into template — use Mintlify / Fern / GitBook)
- `/changelog` ← optional but high-trust signal
- `/legal/privacy`, `/legal/terms`, `/legal/dpa`

## Performance specifics

- LCP image: hero logo / dashboard screenshot, ≤200 KB
- Bundle: ≤250 KB gzip JS (template default lands at 106 KB — room for libraries)
- Animations: kinetic headline, scroll reveals — all `prefers-reduced-motion`-safe

## Conversion patterns

- **Top-of-page sticky bar** for "New: Feature X just shipped" announcements
- **Slide-in newsletter** on /blog after 30s engagement
- **Exit-intent** for free trial offer (use Cmd+K palette → "Start free" action)
- **In-app referral** post-sign-up — not in template, add downstream
