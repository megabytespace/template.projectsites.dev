/**
 * Applied output — src/pages/Home.tsx for Doe Law (estate planning).
 */
import { FileText, Shield, Users, Scale, BookOpen } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { useSEO } from '@/hooks/useSEO';
import { brand, featureOn } from '@/brand';
import { buildSiteJsonLd } from '@/lib/businessSchema';

import {
  HeroSplit,
  BentoGrid,
  ProcessSteps,
  FeatureSplit,
  FAQ,
  CTASection,
  type BentoTile,
  type FAQItem,
  type ProcessStep,
} from '@/components/sections';

const practiceAreas: BentoTile[] = [
  { id: 'wills',          title: 'Wills',                  description: 'Simple wills, contingent trusts, guardianship designations. Most plans complete within 2 weeks.', icon: <FileText size={24} />, span: 'lg', tall: true, accent: true },
  { id: 'trusts',         title: 'Trusts',                 description: 'Revocable living trusts, irrevocable trusts, charitable trusts, special needs.',                  icon: <Shield size={24} />,   span: 'sm' },
  { id: 'probate',        title: 'Probate',                description: 'Executor support, court filings, asset distribution. We handle the paperwork.',                   icon: <Scale size={24} />,    span: 'sm' },
  { id: 'business',       title: 'Business succession',    description: 'Continuity plans for owners. Buy-sell agreements. Stock transfer planning.',                       icon: <Users size={24} />,    span: 'md' },
  { id: 'medicaid',       title: 'Medicaid planning',      description: '5-year look-back compliant asset protection. Powers of attorney. Advance directives.',             icon: <BookOpen size={24} />, span: 'md' },
];

const process: ProcessStep[] = [
  { title: 'Free consultation',    description: '30-minute video or phone call. We discuss your goals, family structure, and what assets need protection. No fee, no obligation.', icon: <Scale size={20} /> },
  { title: 'Plan + draft',          description: 'Custom plan + draft documents within 5 business days. We send you a redline showing every section in plain English.',          icon: <FileText size={20} /> },
  { title: 'Review + sign',         description: 'We review the documents in person (or video). Sign with two witnesses + notary at our office. Same day.',                    icon: <Shield size={20} /> },
  { title: 'Free annual review',    description: 'Once a year, we email to confirm nothing has changed (births, deaths, moves). Update is free for the first 10 years.',         icon: <BookOpen size={20} /> },
];

const faqs: FAQItem[] = [
  { question: 'Do you offer free consultations?', answer: 'Yes — 30 minutes by phone or video. No charge for the initial conversation. Schedule via the contact form or call (907) 555-0100. Most appointments available within 2 business days.' },
  { question: 'What does a will cost?',           answer: 'Simple wills are $400 per individual or $700 per couple — flat fee, no hidden charges. Complex estates with trusts start at $1,800. We quote after the consultation. Half down, half on signing.' },
  { question: 'Do I need a trust or just a will?', answer: 'Most Alaska families with under $200K in assets do fine with a will. Trusts make sense for blended families, real estate in multiple states, business ownership, or estates over $1M. The consultation walks through which fits you.' },
  { question: 'How long does it take?',           answer: 'Simple wills: 1–2 weeks from consultation to signing. Trusts and complex plans: 4–6 weeks. Probate cases: 6–18 months depending on court calendar.' },
  { question: 'Where are you located?',           answer: '1234 4th Avenue, downtown Anchorage. Free street parking after 5pm. Video consultations available statewide for Alaskans outside Anchorage — we mail the original documents for signing.' },
  { question: 'Do you handle probate?',           answer: 'Yes. We represent executors and administrators through Alaska Superior Court. Typical probate cost is 3–5% of the estate value, billed at $275/hour against a $2,500 retainer.' },
  { question: 'Are you accepting new clients?',   answer: 'Yes. Schedule a free 30-minute consultation to get started. We don\'t take cases outside our practice areas (wills, trusts, probate, business succession) — we\'ll refer you to a colleague if your need is different.' },
];

export default function Home() {
  useSEO({
    title: 'Doe Law — Estate Planning Attorney · Anchorage AK',
    description: brand.business.description,
  });

  return (
    <>
      <JsonLd data={buildSiteJsonLd({
        name: brand.business.name,
        description: brand.business.description,
        url: brand.business.url,
        businessClass: 'legal',
        email: brand.business.email,
        phone: brand.business.phone,
        address: {
          streetAddress: '1234 4th Avenue',
          addressLocality: 'Anchorage',
          addressRegion: 'AK',
          postalCode: '99501',
          addressCountry: 'US',
        },
        geo: { latitude: 61.2181, longitude: -149.9003 },
        openingHours: ['Mo-Fr 09:00-17:00'],
        priceRange: '$$',
      })} />

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'LegalService',
        '@id': `${brand.business.url}#org`,
        name: brand.business.name,
        url: brand.business.url,
        telephone: brand.business.phone,
        areaServed: { '@type': 'State', name: 'Alaska' },
        serviceType: ['Estate planning', 'Wills', 'Trusts', 'Probate', 'Business succession'],
      }} />

      {featureOn('hero') && (
        <HeroSplit
          eyebrow="Estate planning · Anchorage"
          headline="Plans that protect what you've built."
          subheadline="20 years preparing wills, trusts, and estate plans for Alaska families. Free 30-minute consultation. Most plans complete within 2 weeks."
          primary={{ label: 'Schedule consultation', href: '/contact' }}
          secondary={{ label: 'Call (907) 555-0100', href: 'tel:+19075550100' }}
          image={{ src: '/office.jpg', alt: 'Jane Doe at her desk reviewing documents in front of a downtown Anchorage skyline' }}
          trustBadges={[
            { icon: 'shield',label: 'Alaska Bar #12345 · Active since 2003' },
            { icon: 'award', label: 'AV-rated · Martindale-Hubbell' },
            { icon: 'star',  label: 'Past President · Anchorage Estate Planning Council' },
          ]}
        />
      )}

      {featureOn('bento') && (
        <BentoGrid
          eyebrow="Practice areas"
          headline="What we do — and only what we do"
          description="Estate planning is our entire practice. We don't dabble in divorce, criminal defense, or personal injury. We refer those out so we can stay sharp on the work we do every day."
          tiles={practiceAreas}
        />
      )}

      {featureOn('process') && (
        <ProcessSteps
          eyebrow="How we work"
          headline="Four steps from first call to peace of mind"
          steps={process}
        />
      )}

      <FeatureSplit
        eyebrow="About"
        headline="Jane Doe, JD"
        description="University of Washington School of Law (2003). 20 years of Alaska estate planning. Past president of the Anchorage Estate Planning Council. AV-rated on Martindale-Hubbell. Born and raised in Wasilla — I understand Alaska families because I am one."
        bullets={[
          'JD, University of Washington (2003)',
          'Alaska Bar #12345 (active since 2003)',
          'Past president, AEPC (2018–2020)',
          'AV-rated, Martindale-Hubbell',
          'Member, Alaska Probate & Estate Section',
        ]}
        cta={{ label: 'Read full bio', href: '/about' }}
        image={{ src: '/jane.jpg', alt: 'Jane Doe in her office holding a coffee mug' }}
        imagePosition="left"
      />

      {featureOn('faq') && (
        <FAQ eyebrow="Questions" headline="What clients ask first" items={faqs} />
      )}

      {featureOn('cta') && (
        <CTASection
          eyebrow="Get started"
          headline="Schedule your free 30-minute consultation."
          description="Most appointments available within 2 business days. Available by phone, video, or in person at our downtown Anchorage office."
          primary={{ label: 'Schedule online', href: '/contact' }}
          secondary={{ label: 'Call (907) 555-0100', href: 'tel:+19075550100' }}
          tone="quiet"
        />
      )}
    </>
  );
}
