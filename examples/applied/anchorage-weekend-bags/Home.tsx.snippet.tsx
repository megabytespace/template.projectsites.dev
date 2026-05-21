/**
 * Applied output — src/pages/Home.tsx for Anchorage Weekend Bags (501(c)(3)).
 */
import { Heart, Users, Calendar, Package } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { useSEO } from '@/hooks/useSEO';
import { brand, featureOn } from '@/brand';
import { buildSiteJsonLd } from '@/lib/businessSchema';

import {
  HeroCenter,
  Stats,
  FeatureSplit,
  ProcessSteps,
  LogoCloud,
  FAQ,
  Newsletter,
  CTASection,
  type Stat,
  type FAQItem,
  type ProcessStep,
  type Logo,
} from '@/components/sections';

const stats: Stat[] = [
  { value: 1200,   suffix: '',   label: 'Kids served weekly',  caption: 'Every Friday during the school year' },
  { value: 62000,  suffix: '+',  label: 'Bags packed in 2025' },
  { value: 87,     suffix: '%',  label: 'Of every dollar goes to food', caption: '9% logistics · 4% admin · IRS 990 public' },
  { value: 14,     suffix: 'yr', label: 'Serving Anchorage' },
];

const process: ProcessStep[] = [
  { title: '$25 / month',   description: 'Feeds one child every weekend for a school year. The most efficient gift size we offer.', icon: <Heart size={20} /> },
  { title: '$100 / month',  description: 'Feeds one classroom\'s worth of kids every weekend. Sponsoring families often pick this tier.', icon: <Users size={20} /> },
  { title: '$500 / month',  description: 'Funds an entire elementary school of weekend bags. Local businesses + foundations use this level.', icon: <Calendar size={20} /> },
  { title: '$2,500 / month', description: 'Funds an entire middle school. Major-donor and Foundation Friday recipients. Recognition in annual report.', icon: <Package size={20} /> },
];

const funders: Logo[] = [
  { name: 'Alaska Community Foundation' }, { name: 'Rasmuson Foundation' },
  { name: 'GCI' }, { name: 'BP Heritage Fund' },
  { name: 'Atwood Foundation' }, { name: 'Carrs-Safeway' },
];

const faqs: FAQItem[] = [
  { question: 'Are donations tax-deductible?',        answer: 'Yes. We are a 501(c)(3) nonprofit (EIN 12-3456789). All donations are tax-deductible to the extent allowed by U.S. law. Receipts emailed within 24 hours of donation; year-end summary mailed by January 31.' },
  { question: 'How is my donation used?',             answer: '87 cents of every dollar goes directly to food. 9 cents to logistics (packing, distribution, refrigeration). 4 cents to administration (insurance, accounting, the part-time executive director). Our IRS Form 990 is published on the website each May.' },
  { question: 'Can I volunteer?',                     answer: 'Yes. We pack Fridays 1pm–5pm at our warehouse (1234 4th Avenue). Sign up at /volunteer or just show up — we never turn anyone away. Groups of 5+ should email volunteer@anchorageweekendbags.example to schedule.' },
  { question: 'Can I donate food instead of money?',  answer: 'Yes for sealed, non-perishable items in original packaging. See the current needs list at /donate-food. Cash donations stretch further (we buy in bulk at wholesale), but in-kind donations are welcome.' },
  { question: 'Are you hiring?',                      answer: 'We post open roles at /careers. Most positions go up in spring (March–April) for the next school year. Our staff is 2 full-time + 1 part-time + ~200 volunteers across the school year.' },
  { question: 'Can I set up monthly giving?',         answer: 'Yes. Monthly giving at /donate/monthly. $25/month is our most common gift — it covers one child for the full school year. You can pause or change the amount any time from the donor portal.' },
  { question: 'Do you partner with schools?',         answer: 'Yes — we partner with 14 Anchorage School District schools (the ones with ≥40% free-and-reduced-meal participation). Counselors identify students who would benefit; we deliver bags Friday afternoons. No paperwork for families.' },
];

export default function Home() {
  useSEO({
    title: 'Anchorage Weekend Bags — Feeding kids on weekends since 2012',
    description: brand.business.description,
  });

  return (
    <>
      <JsonLd data={buildSiteJsonLd({
        name: brand.business.name,
        description: brand.business.description,
        url: brand.business.url,
        businessClass: 'nonprofit',
        email: brand.business.email,
        phone: brand.business.phone,
        sameAs: [
          'https://facebook.com/anchorageweekendbags',
          'https://instagram.com/anchorageweekendbags',
        ],
      })} />

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'NGO',
        '@id': `${brand.business.url}#org`,
        name: brand.business.name,
        url: brand.business.url,
        description: brand.business.description,
        nonprofitStatus: '501(c)(3)',
        taxID: '12-3456789',
        foundingDate: '2012',
        areaServed: { '@type': 'City', name: 'Anchorage' },
      }} />

      {featureOn('hero') && (
        <HeroCenter
          eyebrow="Anchorage, Alaska · 501(c)(3)"
          headline="Every child fed. Every weekend. No questions asked."
          subheadline="We pack 1,200 weekend food bags every Friday for Anchorage students who depend on school meals during the week."
          primary={{ label: 'Donate $25 — feeds a child for a month', href: '/donate' }}
          secondary={{ label: 'Volunteer', href: '/volunteer' }}
          trustBadges={[
            { icon: 'award', label: '87¢ of every $1 goes to food' },
            { icon: 'shield',label: 'EIN 12-3456789 · IRS 990 public' },
            { icon: 'star',  label: '4-star Charity Navigator (2024)' },
          ]}
        />
      )}

      {featureOn('stats') && (
        <Stats eyebrow="By the numbers" headline="2025 impact" stats={stats} />
      )}

      <FeatureSplit
        eyebrow="Our mission"
        headline="No child should be hungry on the weekend."
        description="Anchorage School District provides breakfast and lunch Monday–Friday. For 1,200 of our students, those are the most reliable meals of the week. Friday afternoon to Monday morning is the gap. We pack the gap."
        bullets={[
          'Started 2012 with 40 students at one school',
          'Now 14 schools, 1,200 students, every Friday',
          '62,000+ bags packed in 2025',
          'Powered by 200 weekly volunteers',
        ]}
        cta={{ label: 'Read our 2025 impact report', href: '/impact-2025.pdf' }}
        image={{ src: '/packing-volunteers.jpg', alt: 'Volunteers packing brown paper bags with snacks and produce at the warehouse on a Friday afternoon' }}
      />

      {featureOn('process') && (
        <ProcessSteps
          eyebrow="How donations are used"
          headline="Pick the gift that fits your budget"
          description="Every donation goes to the same place: Friday food bags. The recurring tiers below help us plan and stretch dollars further through wholesale purchasing."
          steps={process}
        />
      )}

      {featureOn('logoCloud') && (
        <LogoCloud eyebrow="Funded in part by" logos={funders} variant="grid" />
      )}

      {featureOn('faq') && (
        <FAQ eyebrow="Questions" headline="What donors ask first" items={faqs} />
      )}

      {featureOn('newsletter') && (
        <Newsletter
          badge="Free · Quarterly"
          headline="Get the impact report"
          description="Quarterly update. New schools added, total bags packed, volunteer spotlights, financial summary. Four emails a year — no fundraising appeals between."
        />
      )}

      {featureOn('cta') && (
        <CTASection
          eyebrow="Help us pack Friday's bags"
          headline="$25 feeds a child for the school year."
          description="Or volunteer in person. Fridays 1pm–5pm at our warehouse. Groups welcome — just email ahead so we can plan tables."
          primary={{ label: 'Donate now', href: '/donate' }}
          secondary={{ label: 'Set up monthly giving', href: '/donate/monthly' }}
          tone="emphatic"
        />
      )}
    </>
  );
}
