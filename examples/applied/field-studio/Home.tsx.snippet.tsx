/**
 * Applied output — src/pages/Home.tsx for Field Studio (design agency).
 */
import { Briefcase, Sparkles, Rocket, Award } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { useSEO } from '@/hooks/useSEO';
import { brand, featureOn } from '@/brand';
import { buildSiteJsonLd } from '@/lib/businessSchema';

import {
  HeroCenter,
  LogoCloud,
  CaseStudyGrid,
  Stats,
  ProcessSteps,
  TeamGrid,
  FAQ,
  CTASection,
  type Stat,
  type FAQItem,
  type ProcessStep,
  type CaseStudy,
  type TeamMember,
  type Logo,
} from '@/components/sections';

const studies: CaseStudy[] = [
  {
    slug: 'orbital-brand',
    title: 'Orbital — Brand system + marketing site',
    client: 'Orbital (Series A SaaS, $24M raised)',
    industry: 'Developer infrastructure',
    summary: 'Took Orbital from "looks like every other dev tool" to a recognizable brand. New visual system across product, marketing, and docs in 11 weeks.',
    cover: '/case/orbital.jpg',
    metrics: [
      { value: '+42%',  label: 'Trial signups' },
      { value: '11wk',  label: 'Total project' },
      { value: '4',     label: 'Awwwards mentions' },
    ],
  },
  {
    slug: 'nordsea-rebrand',
    title: 'NordSea — Full rebrand for the shipping era',
    client: 'NordSea (40yr maritime logistics)',
    industry: 'B2B logistics',
    summary: 'Legacy brand rebuilt to attract modern enterprise customers. New identity, site, sales collateral, and tradeshow booth. Aged 40 years gracefully.',
    cover: '/case/nordsea.jpg',
    metrics: [
      { value: '+58%',  label: 'Enterprise leads' },
      { value: '14wk',  label: 'Rebrand timeline' },
      { value: '12',    label: 'Touchpoints redesigned' },
    ],
  },
  {
    slug: 'lumen-product-launch',
    title: 'Lumen — Product launch site + 48hr sprint',
    client: 'Lumen (Y Combinator W25)',
    industry: 'AI consumer app',
    summary: 'Designed, built, and shipped Lumen\'s launch site in 48 hours for a Product Hunt drop. #1 of the day. Drafted post-launch growth playbook.',
    cover: '/case/lumen.jpg',
    metrics: [
      { value: '#1',    label: 'Product Hunt rank' },
      { value: '48hr',  label: 'Build time' },
      { value: '4,200', label: 'Day-1 signups' },
    ],
  },
];

const logos: Logo[] = [
  { name: 'Orbital' }, { name: 'NordSea' }, { name: 'Lumen' },
  { name: 'Halcyon' }, { name: 'Wayfind' }, { name: 'Caldera' },
];

const stats: Stat[] = [
  { value: 60,  suffix: '+', label: 'Projects shipped' },
  { value: 7,   suffix: '',  label: 'Awwwards mentions' },
  { value: 8,   suffix: 'yr',label: 'In business' },
  { value: 92,  suffix: '%', label: 'Client retention' },
];

const process: ProcessStep[] = [
  { title: 'Brief',        description: '90-minute workshop. We define what "success" means in numbers, not adjectives. You leave with a one-page scope.',                      icon: <Briefcase size={20} /> },
  { title: 'Discover',     description: 'Two weeks of research, customer interviews, competitor audits, brand archaeology. We propose a strategic position.',                  icon: <Sparkles size={20} /> },
  { title: 'Design',       description: 'Four weeks of design + iteration. Weekly Tuesday check-ins. You see every version, not just the polished final.',                    icon: <Award size={20} /> },
  { title: 'Build + launch', description: 'Four to eight weeks of code, copy, QA, deploy. We hand over a living system, not a frozen PDF.',                                    icon: <Rocket size={20} /> },
];

const team: TeamMember[] = [
  { name: 'Maya Field',  role: 'Founder · Creative Director', bio: 'Previously design lead at Stripe + Webflow. Built Field in 2017.', photo: '/team/maya.jpg', links: [{ label: 'LinkedIn', href: 'https://linkedin.com/in/mayafield' }] },
  { name: 'Tomas Nunes', role: 'Strategy + Brand',            bio: 'Joined 2019 from R/GA. Lisbon office lead. Speaks Portuguese, Spanish, French.', photo: '/team/tomas.jpg' },
  { name: 'Aisha Patel', role: 'Engineering Lead',            bio: 'Builds all the websites we ship. Ex-Vercel. Opinionated about HTML.',           photo: '/team/aisha.jpg' },
];

const faqs: FAQItem[] = [
  { question: 'How much does a project cost?', answer: 'Brand systems start at $40K. Marketing sites at $25K. Full product design + dev at $80K+. We quote per project after the brief workshop — never per hour.' },
  { question: 'How long does it take?',        answer: '10–16 weeks for a brand + marketing site. 16–24 weeks for product design + dev. 48-hour sprints available for launches if we have capacity (rare).' },
  { question: 'Do you work on retainer?',      answer: 'Limited retainers for clients we have existing relationships with. We have two retainer slots open per quarter. Email hello@field.example to discuss.' },
  { question: 'What do you NOT do?',           answer: 'Logo-only projects (we work in systems, not one-offs). Pitch decks. Performance marketing. Print-only campaigns. We refer those to specialists we trust.' },
  { question: 'Where are you based?',          answer: 'Brooklyn (4 people) + Lisbon (4 people). We work async with US East + EU coverage. Clients meet us in person quarterly if they want.' },
  { question: 'Are you accepting new projects?', answer: 'Currently booked through Q4 2026. We take on 8–10 projects per year. Submit a brief at /contact — we respond within 3 business days.' },
];

export default function Home() {
  useSEO({
    title: 'Field Studio — Brand, Web, Product · Brooklyn + Lisbon',
    description: brand.business.description,
  });

  return (
    <>
      <JsonLd data={buildSiteJsonLd({
        name: brand.business.name,
        description: brand.business.description,
        url: brand.business.url,
        businessClass: 'organization',
        email: brand.business.email,
        sameAs: [
          'https://instagram.com/fieldstudio',
          'https://linkedin.com/company/fieldstudio',
          'https://twitter.com/fieldstudio',
        ],
      })} />

      {featureOn('hero') && (
        <HeroCenter
          eyebrow="Brand · Web · Product"
          headline="We design brands worth defending."
          subheadline="Independent studio of 8. Brooklyn + Lisbon. We work with founders and CMOs who care about the third decimal place."
          primary={{ label: 'See our work', href: '/case-studies' }}
          secondary={{ label: 'Start a project', href: '/contact' }}
          trustBadges={[
            { icon: 'star',  label: 'Awwwards SOTD × 7' },
            { icon: 'award', label: '92% client retention · 8 years' },
            { icon: 'shield',label: 'Booked through Q4 2026' },
          ]}
        />
      )}

      {featureOn('logoCloud') && (
        <LogoCloud eyebrow="Selected clients" logos={logos} variant="grid" />
      )}

      {featureOn('caseStudies') && (
        <CaseStudyGrid eyebrow="Work" headline="Selected case studies" studies={studies} />
      )}

      {featureOn('stats') && (
        <Stats eyebrow="By the numbers" headline="Eight years. Sixty projects. Two cities." stats={stats} />
      )}

      {featureOn('process') && (
        <ProcessSteps
          eyebrow="How we work"
          headline="Four phases. One project at a time."
          description="We take one large project per studio at a time. Sequential, not parallel. That's how we maintain the quality we're known for."
          steps={process}
        />
      )}

      {featureOn('team') && (
        <TeamGrid eyebrow="Team" headline="The eight humans" members={team} />
      )}

      {featureOn('faq') && (
        <FAQ eyebrow="Questions" headline="Things every prospect asks" items={faqs} />
      )}

      {featureOn('cta') && (
        <CTASection
          eyebrow="Q1 2027"
          headline="Submit a brief. We'll reply within three days."
          description="Tell us what you're trying to make. We'll tell you honestly whether we're the right studio + when we could start."
          primary={{ label: 'Start a project', href: '/contact' }}
          tone="emphatic"
        />
      )}
    </>
  );
}
