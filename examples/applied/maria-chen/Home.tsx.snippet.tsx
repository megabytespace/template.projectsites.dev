/**
 * Applied output — src/pages/Home.tsx for Maria Chen (designer-developer portfolio).
 */
import { Code2, Palette, Compass, Rocket } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { useSEO } from '@/hooks/useSEO';
import { brand, featureOn } from '@/brand';
import { buildSiteJsonLd } from '@/lib/businessSchema';

import {
  HeroCenter,
  CaseStudyGrid,
  LogoCloud,
  FeatureSplit,
  ProcessSteps,
  FAQ,
  CTASection,
  type FAQItem,
  type ProcessStep,
  type CaseStudy,
  type Logo,
} from '@/components/sections';

const studies: CaseStudy[] = [
  {
    slug: 'acme-redesign',
    title: 'Acme — Conversion lift of 34% on the marketing site',
    client: 'Acme Inc. (B2B SaaS · $40M ARR)',
    industry: 'B2B SaaS',
    summary: 'Reworked the marketing site over 6 weeks. Cut hero LCP from 4.1s to 1.2s. Shipped a new pricing page with comparison table that surfaced enterprise leads.',
    cover: '/case/acme.jpg',
    metrics: [
      { value: '+34%', label: 'Conversion rate' },
      { value: '−71%', label: 'LCP time' },
      { value: '6wk',  label: 'Total project' },
    ],
  },
  {
    slug: 'globex-design-system',
    title: 'Globex — Design system + 14 product surfaces',
    client: 'Globex Corp. (Series C)',
    industry: 'Enterprise',
    summary: 'Built a Figma + code design system in 8 weeks. Rolled out across 14 product surfaces, 3 marketing sites, and the docs portal in another 6 weeks.',
    cover: '/case/globex.jpg',
    metrics: [
      { value: '14',   label: 'Surfaces unified' },
      { value: '8wk',  label: 'System design' },
      { value: '+22%', label: 'Brand recall' },
    ],
  },
  {
    slug: 'lumen-launch',
    title: 'Lumen — Pre-launch site that landed #1 on Product Hunt',
    client: 'Lumen (Y Combinator)',
    industry: 'AI consumer app',
    summary: 'Pre-launch landing in 9 days. Custom WebGL hero. 4,200 day-1 signups. #1 of the day on Product Hunt. Then designed onboarding for the launched app.',
    cover: '/case/lumen.jpg',
    metrics: [
      { value: '#1',    label: 'PH rank' },
      { value: '4,200', label: 'Day-1 signups' },
      { value: '9d',    label: 'From kickoff to live' },
    ],
  },
];

const logos: Logo[] = [
  { name: 'Stripe' }, { name: 'Shopify' }, { name: 'Linear' },
  { name: 'Vercel' }, { name: 'Notion' }, { name: 'Figma' },
];

const process: ProcessStep[] = [
  { title: 'Discovery call',  description: '30-minute video. We scope the problem, define what success looks like in numbers, and decide if we\'re a fit.', icon: <Compass size={20} /> },
  { title: 'Design',          description: 'Wireframes by Monday, hi-fi by Friday of week 1. You see daily progress in Figma — not just polished final files.', icon: <Palette size={20} /> },
  { title: 'Build',           description: 'I write the code myself. No handoff to a separate dev team. TypeScript + React, deployed on Cloudflare.',           icon: <Code2 size={20} /> },
  { title: 'Launch + 30 days', description: 'Deploy, hand over docs, 30 days of free post-launch support. Bug fixes + small tweaks included.',                     icon: <Rocket size={20} /> },
];

const faqs: FAQItem[] = [
  { question: 'How long does a project take?',         answer: 'Most projects are 4 weeks end-to-end (discovery + design + build + launch). Larger scopes — design systems, multi-page rebuilds — are 6–10 weeks. I take one project at a time, so timing depends on my queue.' },
  { question: 'What do you charge?',                   answer: 'Projects start at $12K (marketing site refresh). Design systems start at $24K. I quote per project after our discovery call, never per hour. Half upfront, half on launch.' },
  { question: 'Do you work with agencies?',            answer: 'Yes — white-label is fine. NDAs no problem. I\'ve subcontracted under 3 agencies in 2025. Email hi@maria.example with your scope and timeline.' },
  { question: 'Where are you based?',                  answer: 'Toronto, Canada. I work async with US East + EU coverage. Quarterly in-person check-ins available within driving distance (Toronto, Montreal, NYC, Boston).' },
  { question: 'Do you handle development too?',        answer: 'Yes. I design and code the final site. No handoff to a separate dev team. TypeScript + React on Vite or Astro, deployed on Cloudflare. WCAG 2.2 AA standard.' },
  { question: 'What about ongoing maintenance?',       answer: '30 days of free post-launch support included. After that: $250/hr ad-hoc, or a $1,500/mo retainer for 6 hours of monthly work. Retainers fill up fast — ask in the discovery call.' },
  { question: 'Are you available?',                    answer: 'Q3 2026 booked. Q4 has limited capacity (1 project remaining). Q1 2027 is open. Submit a brief at /contact — I respond within 2 business days.' },
];

export default function Home() {
  useSEO({
    title: 'Maria Chen — Designer · Developer · Toronto',
    description: brand.business.description,
  });

  return (
    <>
      <JsonLd data={buildSiteJsonLd({
        name: brand.business.name,
        description: brand.business.description,
        url: brand.business.url,
        businessClass: 'portfolio',
        email: brand.business.email,
        sameAs: [
          'https://linkedin.com/in/mariachen',
          'https://github.com/mariachen',
          'https://twitter.com/mariachen',
        ],
      })} />

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': `${brand.business.url}#person`,
        name: brand.business.name,
        jobTitle: 'Product Designer',
        url: brand.business.url,
        email: brand.business.email,
        sameAs: [
          'https://linkedin.com/in/mariachen',
          'https://github.com/mariachen',
          'https://twitter.com/mariachen',
        ],
        knowsAbout: ['Product design', 'Marketing site design', 'Design systems', 'React', 'TypeScript', 'Conversion optimization'],
        homeLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: 'Toronto', addressRegion: 'ON', addressCountry: 'CA' } },
      }} />

      {featureOn('hero') && (
        <HeroCenter
          eyebrow="Designer · Developer · Toronto"
          headline="I build sites that actually convert."
          subheadline="Independent product designer for 8 years. Conversion-driven marketing sites for SaaS + B2B. Q3 booked. Submit a brief for Q1 2027."
          primary={{ label: 'See selected work', href: '/case-studies' }}
          secondary={{ label: 'Email me', href: 'mailto:hi@maria.example' }}
          trustBadges={[
            { icon: 'star',  label: 'Awwwards SOTD × 3' },
            { icon: 'award', label: '"Best portfolio of 2025" — Sidebar' },
            { icon: 'shield',label: '8 years independent' },
          ]}
        />
      )}

      {featureOn('caseStudies') && (
        <CaseStudyGrid eyebrow="Work" headline="Selected case studies" studies={studies} />
      )}

      {featureOn('logoCloud') && (
        <LogoCloud eyebrow="Worked with teams at" logos={logos} variant="marquee" />
      )}

      <FeatureSplit
        eyebrow="About"
        headline="I'm Maria. I design things that ship."
        description="Eight years independent. Before that: design lead at Shopify (3 years) and Stripe (2 years). Both teaching me that the best design is the one that gets built. Now I design AND build — fewer handoffs, fewer regressions, faster ship."
        bullets={[
          '8+ years product design',
          '50+ marketing sites shipped',
          'Ex-Stripe (2018-2020), Ex-Shopify (2020-2023)',
          'Awwwards SOTD × 3',
          'Toronto-based, remote-friendly',
        ]}
        cta={{ label: 'Read more about me', href: '/about' }}
        image={{ src: '/maria.jpg', alt: 'Maria at her desk in Toronto with two monitors and a coffee' }}
        imagePosition="left"
      />

      {featureOn('process') && (
        <ProcessSteps
          eyebrow="How I work"
          headline="One project at a time"
          description="I run one project per quarter — no agencies-juggling-15-clients. You get my full attention, daily updates, and direct communication. No account managers."
          steps={process}
        />
      )}

      {featureOn('faq') && (
        <FAQ eyebrow="Questions" headline="Things prospects ask first" items={faqs} />
      )}

      {featureOn('cta') && (
        <CTASection
          eyebrow="Open for Q1 2027"
          headline="Let's build something worth shipping."
          description="2-business-day response. Free 30-minute discovery call. No sales pressure — if we're not a fit, I tell you and refer someone better."
          primary={{ label: 'Email me', href: 'mailto:hi@maria.example' }}
          secondary={{ label: 'Schedule a call', href: 'https://cal.com/maria/intro' }}
          tone="emphatic"
        />
      )}
    </>
  );
}
