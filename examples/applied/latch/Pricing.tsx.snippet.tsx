/**
 * Applied output — src/pages/Pricing.tsx for Latch.
 *
 * Includes the 3-tier pricing table, side-by-side comparison, and pricing FAQ.
 * Drop into src/pages/Pricing.tsx.
 */
import { useSEO } from '@/hooks/useSEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { brand } from '@/brand';
import {
  Pricing as PricingSection,
  Comparison,
  FAQ,
  CTASection,
  type PricingTier,
  type FAQItem,
} from '@/components/sections';

const tiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Solo developers + public repos.',
    monthly: 0,
    yearly: 0,
    features: [
      'Up to 5 PRs / month',
      '1 user',
      'All AI checks',
      'Public repos only',
      'Community support (Discord)',
    ],
    cta: { label: 'Install on GitHub', href: 'https://github.com/apps/latch' },
  },
  {
    id: 'team',
    name: 'Team',
    description: 'Engineering teams 2-50.',
    monthly: 19,
    yearly: 182,
    featured: true,
    badge: 'Most popular',
    features: [
      'Unlimited PRs',
      'Up to 50 users',
      'Public + private repos',
      'Custom rules in `.latch.yml`',
      'SAML SSO',
      'SOC 2 attestation on request',
      'Email + Slack support',
      'Dashboards + audit log (90 days)',
    ],
    cta: { label: 'Start free trial', href: '/contact?intent=trial' },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Regulated industries + 50+ engineers.',
    monthly: 499,
    yearly: 4790,
    features: [
      'Unlimited PRs + users',
      'Self-hosted option (Helm chart)',
      'SCIM provisioning',
      'Custom data retention',
      'Audit log retention 7 years',
      'Dedicated CSM',
      'Custom SLA + uptime credits',
      'Security review with your team',
    ],
    cta: { label: 'Talk to sales', href: '/contact?intent=enterprise' },
  },
];

const compareRows = [
  { feature: 'PRs per month',         values: ['5',                'Unlimited',           'Unlimited'] },
  { feature: 'Users',                 values: ['1',                'Up to 50',            'Unlimited'] },
  { feature: 'Private repos',         values: [false,              true,                  true] },
  { feature: 'Custom rules',          values: [false,              true,                  true] },
  { feature: 'SAML SSO',              values: [false,              true,                  true] },
  { feature: 'SCIM provisioning',     values: [false,              false,                 true] },
  { feature: 'Self-hosted (Helm)',    values: [false,              false,                 true] },
  { feature: 'Data retention',        values: ['0 days',           '0 days default',      '0-7 years configurable'] },
  { feature: 'SOC 2 report',          values: [false,              'Attestation on request', 'Full report under NDA'] },
  { feature: 'Audit log',             values: [false,              '90 days',             '7 years'] },
  { feature: 'Support',               values: ['Community',        'Email + Slack',       'Dedicated CSM + Slack channel'] },
  { feature: 'SLA',                   values: [false,              '99.5%',               '99.99% + uptime credits'] },
] as const;

const faqs: FAQItem[] = [
  {
    question: 'Is there a free trial of the Team plan?',
    answer: '14-day free trial — full Team features, no card required at signup. Add a card at trial end or downgrade to Free. We email you 3 days before trial end with a one-click "skip to Free" link.',
  },
  {
    question: 'Do you charge per PR?',
    answer: 'No. Team and Enterprise are flat per-seat. You can review 5 PRs or 5,000 — same price. The Free plan caps at 5 PRs / month total (across all repos).',
  },
  {
    question: 'How is "user" counted?',
    answer: 'A user is anyone who opens a PR that Latch reviews in a given billing month. Bots (Dependabot, Renovate) don\'t count. Read-only viewers don\'t count. If your team is 50 engineers but only 30 open PRs in March, you pay for 30 in March.',
  },
  {
    question: 'Can I downgrade from Team to Free?',
    answer: 'Yes, anytime. Your team\'s repos stay connected; Latch just stops reviewing once you exceed Free\'s 5-PR cap for the month.',
  },
  {
    question: 'Do you offer student / nonprofit discounts?',
    answer: 'Yes. 50% off Team for verified students and 501(c)(3) nonprofits. Email hello@latch.example with your .edu address or EIN.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'Stripe — all major credit cards (Visa, Mastercard, Amex, Discover), Apple Pay, Google Pay. Annual Enterprise plans can pay by ACH or wire — invoice on request.',
  },
];

export default function Pricing() {
  useSEO({
    title: 'Pricing — Latch · Free, $19/seat Team, custom Enterprise',
    description: 'Simple pricing for Latch AI code review. Free for solo developers, $19/seat for teams, custom Enterprise with self-hosted + SOC 2.',
  });

  return (
    <>
      <Breadcrumbs baseUrl={brand.business.url} />

      <PricingSection
        eyebrow="Pricing"
        headline="Free for solo devs. $19 / seat for teams."
        description="No setup fees. No per-PR charges. Cancel anytime."
        tiers={tiers}
      />

      <Comparison
        eyebrow="Compare"
        headline="What's included by plan"
        columns={['Free', 'Team', 'Enterprise']}
        highlightColumn={1}
        rows={compareRows.map((r) => ({ ...r, values: [...r.values] }))}
      />

      <FAQ
        eyebrow="Pricing FAQ"
        headline="Common pricing questions"
        items={faqs}
      />

      <CTASection
        eyebrow="Still deciding?"
        headline="Talk to us — we'll help pick the right plan"
        description="15-minute call. We answer security, billing, migration, and self-hosted questions. No sales pressure."
        primary={{ label: 'Book a 15-min call', href: '/contact?intent=call' }}
        secondary={{ label: 'Start free', href: 'https://github.com/apps/latch' }}
        tone="quiet"
      />
    </>
  );
}
