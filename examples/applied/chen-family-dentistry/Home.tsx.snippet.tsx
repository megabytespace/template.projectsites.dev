/**
 * Applied output — src/pages/Home.tsx for Chen Family Dentistry.
 */
import { Shield, Heart, Smile, Award, Sparkles, Phone, Calendar, FileText } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { useSEO } from '@/hooks/useSEO';
import { brand, featureOn } from '@/brand';
import { buildSiteJsonLd } from '@/lib/businessSchema';

import {
  HeroSplit,
  BentoGrid,
  Stats,
  FeatureSplit,
  ProcessSteps,
  FAQ,
  TeamGrid,
  CTASection,
  type BentoTile,
  type Stat,
  type FAQItem,
  type ProcessStep,
  type TeamMember,
} from '@/components/sections';

const services: BentoTile[] = [
  { id: 'pediatric',  title: 'Pediatric',        description: 'Specialized care for ages 1–17. Family-friendly office. Dr. Chen is board-certified in pediatric dentistry.', icon: <Heart size={24} />,   span: 'lg', tall: true, accent: true },
  { id: 'preventive', title: 'Preventive',       description: 'Cleanings, x-rays, fluoride, sealants. The boring stuff that keeps you out of our chair.',                  icon: <Shield size={24} />,  span: 'sm' },
  { id: 'cosmetic',   title: 'Cosmetic',         description: 'Whitening, veneers, Invisalign. Straight teeth in 6–18 months.',                                              icon: <Smile size={24} />,   span: 'sm' },
  { id: 'restorative',title: 'Restorative',      description: 'Crowns, bridges, implants. Same-day same-shade for most cases.',                                              icon: <Sparkles size={24} />, span: 'md' },
  { id: 'emergency',  title: 'Emergency',        description: 'Same-day appointments for pain. After-hours call (907) 555-0100 forwards to Dr. Chen.',                       icon: <Phone size={24} />,   span: 'md' },
];

const stats: Stat[] = [
  { value: 5000, suffix: '+', label: 'Patients served', caption: 'Since 2003' },
  { value: 20,   suffix: 'yr',label: 'In practice' },
  { value: 4.9,  suffix: '/5',label: 'Google rating', caption: '412 reviews' },
  { value: 100,  suffix: '%', label: 'Insurance billing', caption: 'We file for you' },
];

const process: ProcessStep[] = [
  { title: 'Schedule',     description: 'Book online in 60 seconds or call (907) 555-0100. New-patient appointments take 60–90 minutes.', icon: <Calendar size={20} /> },
  { title: 'New-patient exam', description: 'Full exam + x-rays + cleaning. We review your history, current concerns, and family dental history.', icon: <FileText size={20} /> },
  { title: 'Treatment plan',   description: 'Written plan with cost estimate. Insurance pre-authorization handled by our office. No surprises.', icon: <Shield size={20} /> },
  { title: 'Ongoing care',     description: 'Cleanings every 6 months. Reminders by text or email — your choice. Records portable if you move.', icon: <Heart size={20} /> },
];

const team: TeamMember[] = [
  {
    name: 'Dr. Maria Chen, DDS',
    role: 'Founder · Pediatric & Family Dentistry',
    bio: 'UCLA School of Dentistry (2003). 18 years pediatric practice. AAPD member. Mother of two.',
    photo: '/team/maria.jpg',
    links: [{ label: 'Bio', href: '/about#dr-chen' }],
  },
  {
    name: 'Dr. Jacob Park, DDS',
    role: 'Associate · Cosmetic & Restorative',
    bio: 'University of Washington (2014). 10 years restorative experience. Invisalign Platinum Provider.',
    photo: '/team/jacob.jpg',
    links: [{ label: 'Bio', href: '/about#dr-park' }],
  },
  {
    name: 'Sara Begaye',
    role: 'Office Manager',
    bio: 'Insurance billing, scheduling, payment plans. Bilingual (English / Spanish). With us since 2009.',
    photo: '/team/sara.jpg',
  },
];

const faqs: FAQItem[] = [
  { question: 'What insurance do you accept?',          answer: 'Aetna, BCBS, Cigna, Delta Dental, MetLife, United Healthcare, Premera, and most major dental plans. Call (907) 555-0100 to verify your specific plan — we usually know within 5 minutes.' },
  { question: 'Are you accepting new patients?',        answer: 'Yes. Book online or call (907) 555-0100. New-patient exams take 60–90 minutes and include a full cleaning, x-rays, and treatment plan review. First visits typically schedule within 2 weeks.' },
  { question: 'Do you treat children?',                 answer: 'Yes — pediatric is half our practice. Dr. Chen is board-certified in pediatric dentistry with 18 years of experience. We see children from age 1 onward. The office is family-friendly with a kids\' corner.' },
  { question: 'What if I have a dental emergency?',     answer: 'Call (907) 555-0100 anytime. After-hours calls forward to Dr. Chen on-call. We hold same-day slots for pain emergencies — usually a chair within 4 hours during business hours. For life-threatening emergencies, call 911.' },
  { question: 'Are payment plans available?',           answer: 'Yes. We work with CareCredit (0% APR up to 18 months on qualifying purchases) and offer in-office payment plans for treatments over $500. Sara walks you through options before any work begins.' },
  { question: 'What are your hours?',                   answer: 'Tuesday–Friday 8am–5pm and Saturday 9am–2pm. Closed Sunday and Monday. Saturday appointments fill up fast — book 2–3 weeks ahead when possible.' },
  { question: 'Do you offer free new-patient exams?',   answer: 'Yes. New patients without insurance get a complimentary first exam (normally $185). New patients with insurance pay only their copay. Mention "new-patient promo" when booking.' },
];

export default function Home() {
  useSEO({
    title: 'Chen Family Dentistry — Anchorage AK · Pediatric + family care',
    description: brand.business.description,
  });

  return (
    <>
      <JsonLd data={buildSiteJsonLd({
        name: brand.business.name,
        description: brand.business.description,
        url: brand.business.url,
        businessClass: 'medical',
        email: brand.business.email,
        phone: brand.business.phone,
        address: {
          streetAddress: '1234 4th Avenue, Suite 200',
          addressLocality: 'Anchorage',
          addressRegion: 'AK',
          postalCode: '99501',
          addressCountry: 'US',
        },
        geo: { latitude: 61.2181, longitude: -149.9003 },
        openingHours: ['Tu-Fr 08:00-17:00', 'Sa 09:00-14:00'],
        priceRange: '$$',
      })} />

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Dentist',
        '@id': `${brand.business.url}#org`,
        name: brand.business.name,
        url: brand.business.url,
        telephone: brand.business.phone,
        medicalSpecialty: ['Dentistry', 'PediatricDentistry'],
        isAcceptingNewPatients: true,
        availableService: services.map((s) => ({ '@type': 'MedicalProcedure', name: s.title })),
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '412', bestRating: '5' },
      }} />

      {featureOn('hero') && (
        <HeroSplit
          eyebrow="Family dentistry · Anchorage"
          headline="Gentle care for every smile in your family."
          subheadline="Accepting new patients. Most major insurance accepted. Saturday hours. Free new-patient exam if you're paying out of pocket."
          primary={{ label: 'Book online', href: '/contact?intent=book' }}
          secondary={{ label: 'Call (907) 555-0100', href: 'tel:+19075550100' }}
          image={{ src: '/hero-clinic.jpg', alt: 'Dr. Chen greeting a child patient at the front desk' }}
          trustBadges={[
            { icon: 'star',  label: '4.9 / 5 on Google · 412 reviews' },
            { icon: 'shield',label: 'AAPD + ADA member' },
            { icon: 'award', label: '20 years in Anchorage' },
          ]}
        />
      )}

      {featureOn('bento') && (
        <BentoGrid
          eyebrow="Services we provide"
          headline="From baby teeth to crowns"
          description="Pediatric and family dentistry under one roof. Most services billed directly through your insurance."
          tiles={services}
        />
      )}

      {featureOn('stats') && (
        <Stats eyebrow="By the numbers" stats={stats} />
      )}

      {featureOn('process') && (
        <ProcessSteps
          eyebrow="What to expect"
          headline="From your first call to your six-month check-up"
          steps={process}
        />
      )}

      <FeatureSplit
        eyebrow="About"
        headline="Two dentists. Two decades. One block in downtown Anchorage."
        description="Dr. Chen opened the practice in 2003 after her residency at UCLA. Dr. Park joined in 2014. We've been at 4th + I Street ever since. We answer the phone ourselves, file your insurance ourselves, and call you back the same day."
        bullets={[
          'AAPD + ADA member',
          'Invisalign Platinum Provider',
          '5,000+ patients served',
          'Open Saturdays',
        ]}
        cta={{ label: 'Meet the team', href: '/team' }}
        image={{ src: '/team-photo.jpg', alt: 'The Chen Family Dentistry team in the waiting room' }}
        imagePosition="left"
      />

      {featureOn('team') && (
        <TeamGrid eyebrow="Team" headline="The humans behind the chair" members={team} />
      )}

      {featureOn('faq') && (
        <FAQ eyebrow="Questions" headline="What patients ask first" items={faqs} />
      )}

      {featureOn('cta') && (
        <CTASection
          eyebrow="Ready?"
          headline="Schedule your visit."
          description="Most new-patient appointments schedule within 2 weeks. Saturday slots book up fast — call ahead."
          primary={{ label: 'Book online', href: '/contact?intent=book' }}
          secondary={{ label: 'Call (907) 555-0100', href: 'tel:+19075550100' }}
          tone="quiet"
        />
      )}
    </>
  );
}
