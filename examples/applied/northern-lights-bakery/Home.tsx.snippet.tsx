/**
 * Applied output — src/pages/Home.tsx for Northern Lights Bakery.
 *
 * This is what the master prompt produced for this brief. Drop into
 * src/pages/Home.tsx replacing the placeholder version. All copy is final
 * (zero brace-wrapped placeholders, zero banned words).
 */
import { Star, Award, Shield, Heart, Coffee, Cake } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { useSEO } from '@/hooks/useSEO';
import { brand, featureOn } from '@/brand';
import { buildSiteJsonLd } from '@/lib/businessSchema';

import {
  HeroSplit,
  FeatureSplit,
  BentoGrid,
  FAQ,
  Newsletter,
  CTASection,
  type BentoTile,
  type FAQItem,
} from '@/components/sections';

const services: BentoTile[] = [
  { id: 'sourdough',   title: 'Wild-yeast sourdough',  description: 'Three loaves baked daily. Country, seeded, walnut-rye. Pulled from the oven by 7am.', icon: <Coffee size={24} />, span: 'lg', tall: true, accent: true },
  { id: 'croissants',  title: 'Almond croissants',     description: 'Frangipane filling, demerara crust. Sell-out by 11am most days.',                       icon: <Heart size={24} />,  span: 'sm' },
  { id: 'morning-bun', title: 'Morning buns',          description: 'Cardamom-orange sugar. Available Saturday + Sunday only.',                              icon: <Cake size={24} />,   span: 'sm' },
  { id: 'cakes',       title: 'Seasonal cakes',        description: 'Single-tier and tiered. Five days notice for standard cakes, ten for wedding.',         icon: <Cake size={24} />,   span: 'md' },
  { id: 'catering',    title: 'Catering + bulk',       description: 'Bread, pastries, or full breakfast spreads. 48-hour notice. $250 minimum.',             icon: <Heart size={24} />,  span: 'md' },
];

const faqs: FAQItem[] = [
  { question: 'Do you take reservations?',          answer: 'Walk-in only. We hold tables for 15 minutes during peak hours (8am–10am weekends).' },
  { question: 'Do you offer gluten-free options?',  answer: 'Yes — a rotating GF loaf (Wednesdays + Saturdays), GF scones, and seasonal GF cakes by special order. We are not a dedicated GF kitchen; cross-contamination is possible.' },
  { question: 'Can I order a custom cake?',         answer: 'Yes. Standard cakes need five business days notice, wedding cakes ten. Email cakes@northernlightsbakery.example with the date, size, and flavor preference.' },
  { question: 'Do you cater?',                      answer: 'Yes. Minimum $250 order, 48 hours notice. Coffee service available with bread + pastry orders. Email catering@northernlightsbakery.example.' },
  { question: 'Where do you source flour?',         answer: 'Single-origin from Alaska Flour Company in Delta Junction. We pick up monthly and stone-mill smaller batches on-site for seeded loaves.' },
  { question: 'Do you ship?',                       answer: 'In-state only (Alaska). Sourdough ships USPS Priority overnight. Order by Wednesday for Friday delivery. Email orders@northernlightsbakery.example.' },
];

export default function Home() {
  useSEO({
    title: `Northern Lights Bakery — Sourdough, croissants, cakes`,
    description: brand.business.description,
  });

  return (
    <>
      <JsonLd data={buildSiteJsonLd({
        name: brand.business.name,
        description: brand.business.description,
        url: brand.business.url,
        businessClass: 'restaurant',
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
        openingHours: ['Tu-Su 06:00-15:00'],
        priceRange: '$',
      })} />

      {featureOn('hero') && (
        <HeroSplit
          eyebrow="Anchorage · since 1987"
          headline="Sourdough, pastries, and seasonal cakes."
          subheadline="Family-owned bakery at 1234 4th Avenue. Walk in for breakfast or order ahead online. Open Tue–Sun, 6am–3pm."
          primary={{ label: 'Order online', href: '/order' }}
          secondary={{ label: 'See menu', href: '/menu' }}
          image={{ src: '/hero-bakery.jpg', alt: 'Sourdough loaves cooling on a wire rack at first light' }}
          trustBadges={[
            { icon: 'star',  label: '4.9 / 5 Google · 387 reviews' },
            { icon: 'award', label: '"Best of Anchorage" 2024' },
            { icon: 'shield',label: 'Family-owned since 1987' },
          ]}
        />
      )}

      <FeatureSplit
        eyebrow="Our story"
        headline="Three generations. Same sourdough starter."
        description="My grandfather started this bakery in 1987 with a sourdough culture he carried up from Petaluma. We named her Olga. She's still here, fed every dawn, leavening every loaf."
        bullets={[
          'Single-origin flour from Alaska Flour Co. (Delta Junction)',
          'Filtered water · sea salt · time',
          'No commercial yeast. No shortcuts.',
        ]}
        cta={{ label: 'Visit the bakery', href: '/contact' }}
        image={{ src: '/family.jpg', alt: 'Three generations of bakers at the counter' }}
        imagePosition="left"
      />

      {featureOn('services') && (
        <BentoGrid
          eyebrow="What we bake"
          headline="Daily breads. Special orders. Seasonal cakes."
          description="Five products we make every day. Custom cakes by appointment."
          tiles={services}
        />
      )}

      {featureOn('faq') && (
        <FAQ
          eyebrow="Questions"
          headline="Frequently asked"
          items={faqs}
        />
      )}

      {featureOn('newsletter') && (
        <Newsletter
          badge="Free · Monthly"
          headline="Know when seasonal cakes drop"
          description="One email a month. New flavors, holiday hours, occasional discount. No spam."
        />
      )}

      {featureOn('cta') && (
        <CTASection
          eyebrow="Visit"
          headline="See you tomorrow at six."
          description="Walk in for breakfast or order ahead for pickup. We open the door at 6am sharp."
          primary={{ label: 'Get directions', href: 'https://www.google.com/maps/dir/?api=1&destination=1234+4th+Ave+Anchorage+AK' }}
          secondary={{ label: 'Call (907) 555-0100', href: 'tel:+19075550100' }}
          tone="emphatic"
        />
      )}
    </>
  );
}
