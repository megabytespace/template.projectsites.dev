/**
 * Applied output — src/pages/Home.tsx for Field Threads (DTC clothing brand).
 */
import { Shirt, Leaf, Package, Heart } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { useSEO } from '@/hooks/useSEO';
import { brand, featureOn } from '@/brand';
import { buildSiteJsonLd } from '@/lib/businessSchema';

import {
  HeroSplit,
  BentoGrid,
  FeatureSplit,
  FAQ,
  Newsletter,
  CTASection,
  type BentoTile,
  type FAQItem,
} from '@/components/sections';

const categories: BentoTile[] = [
  { id: 'tops',     title: 'Tops',     description: 'Linen shirts, organic cotton tees, merino sweaters.', icon: <Shirt size={24} />, span: 'lg', tall: true, accent: true, href: 'https://shop.fieldthreads.example/tops',     image: '/cat/tops.jpg', imageAlt: 'A neutral-tone linen shirt photographed against a sunlit white wall' },
  { id: 'bottoms',  title: 'Bottoms',  description: 'Wide-leg trousers, chinos, casual shorts.',           icon: <Shirt size={24} />, span: 'sm',                  href: 'https://shop.fieldthreads.example/bottoms',  image: '/cat/bottoms.jpg', imageAlt: 'A pair of olive linen trousers folded on a wooden bench' },
  { id: 'outer',    title: 'Outerwear',description: 'Chore coats, light jackets, weatherproof shells.',    icon: <Shirt size={24} />, span: 'sm',                  href: 'https://shop.fieldthreads.example/outer',    image: '/cat/outer.jpg', imageAlt: 'A canvas chore coat hanging on a wooden hook' },
  { id: 'shoes',    title: 'Shoes',    description: 'Sneakers, sandals, weatherproof boots.',              icon: <Shirt size={24} />, span: 'md',                  href: 'https://shop.fieldthreads.example/shoes',    image: '/cat/shoes.jpg', imageAlt: 'White sneakers on a concrete floor next to a houseplant' },
  { id: 'accessories', title: 'Accessories', description: 'Belts, bags, socks, hats.',                     icon: <Shirt size={24} />, span: 'md',                  href: 'https://shop.fieldthreads.example/accessories', image: '/cat/accessories.jpg', imageAlt: 'A leather belt rolled on a wooden surface' },
];

const faqs: FAQItem[] = [
  { question: 'When will my order ship?',          answer: 'Within 2 business days of order confirmation. US ground delivery is 3–5 business days. Express options at checkout (1–2 days). Tracking emailed at ship time.' },
  { question: 'What is your return policy?',       answer: 'Free returns within 30 days. Items must be unworn with tags. Refund processed within 5 business days of receipt back at our warehouse. Email returns@fieldthreads.example for a prepaid label.' },
  { question: 'Do you ship internationally?',      answer: 'Yes — Canada, UK, EU, Australia, Japan. Duties + import taxes calculated at checkout, no surprise fees on delivery. Other countries: email hello@fieldthreads.example for quotes.' },
  { question: 'How do I find my size?',            answer: 'See our size guide at /size-guide. Most items run true to size. We list bust + waist + hip measurements per item. Email size@fieldthreads.example if you\'re between sizes — we respond within 4 hours, M-F.' },
  { question: 'Are your materials sustainable?',   answer: 'Cotton is GOTS-certified organic. Linen + wool come from named mills in Portugal + Scotland (listed per product). Recycled polyester for technical pieces. We publish a yearly sourcing report at /transparency.' },
  { question: 'Where are clothes made?',           answer: 'Designed in Brooklyn. Cut + sewn in Portugal at a 40-person family factory we\'ve worked with since 2018. We tour annually + post a sourcing report each January with photos and worker info.' },
  { question: 'Do you do made-to-order?',          answer: 'Yes — most items are made-to-order in batches of 200. Ship within 4–6 weeks. We don\'t hold inventory we can\'t sell. Smaller environmental footprint + lower prices.' },
  { question: 'Wholesale + corporate gifting?',    answer: 'Yes for orders over $2,500. Email wholesale@fieldthreads.example with the quantity + ship-by date. We work with 14 retailers nationally and ship corporate gifts to teams of 20–500.' },
];

export default function Home() {
  useSEO({
    title: 'Field Threads — Made well · Sold honestly · Brooklyn-designed',
    description: brand.business.description,
  });

  return (
    <>
      <JsonLd data={buildSiteJsonLd({
        name: brand.business.name,
        description: brand.business.description,
        url: brand.business.url,
        businessClass: 'retail',
        email: brand.business.email,
        sameAs: [
          'https://instagram.com/fieldthreads',
          'https://tiktok.com/@fieldthreads',
        ],
      })} />

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'OnlineStore',
        '@id': `${brand.business.url}#org`,
        name: brand.business.name,
        url: brand.business.url,
        description: brand.business.description,
        currenciesAccepted: 'USD',
        paymentAccepted: ['Credit Card', 'Apple Pay', 'Google Pay', 'Shop Pay'],
        sameAs: [
          'https://instagram.com/fieldthreads',
          'https://tiktok.com/@fieldthreads',
        ],
      }} />

      {featureOn('hero') && (
        <HeroSplit
          eyebrow="Spring '26 · out now"
          headline="Made well. Sold honestly."
          subheadline="Independent clothing label, designed in Brooklyn and manufactured in Portugal. GOTS-organic cotton across every piece. Free 30-day returns."
          primary={{ label: 'Shop Spring \'26', href: 'https://shop.fieldthreads.example/collections/spring-26' }}
          secondary={{ label: 'Lookbook', href: '/lookbook' }}
          image={{ src: '/hero-spring26.jpg', alt: 'Model wearing a linen jacket and wide-leg pants against a sunlit Brooklyn wall' }}
          trustBadges={[
            { icon: 'shield',label: 'GOTS-organic cotton' },
            { icon: 'award', label: 'Free 30-day returns' },
            { icon: 'star',  label: 'Made-to-order · no overstock' },
          ]}
        />
      )}

      {featureOn('bento') && (
        <BentoGrid
          eyebrow="Shop by category"
          headline="The Spring '26 lineup"
          description="Five categories. Limited runs. Made-to-order in batches of 200 in our Portugal factory."
          tiles={categories}
        />
      )}

      <FeatureSplit
        eyebrow="About"
        headline="Brooklyn-designed. Portugal-made. No middlemen."
        description="Started by two friends in 2021. We make clothes we wanted to buy ourselves — natural fibers, simple silhouettes, real prices. No marketing budget, no influencer seeding. We grew word-of-mouth, and we'd like to keep it that way."
        bullets={[
          'GOTS-certified organic cotton on every piece',
          'Linen from Bantex Mill (Porto, est. 1947)',
          'Cut + sewn in a 40-person Portugal factory',
          'Annual sourcing report at /transparency',
        ]}
        cta={{ label: 'Read our story', href: '/about' }}
        image={{ src: '/factory.jpg', alt: 'Three Portuguese sewers at machines on the factory floor at our partner Bantex Mill' }}
        imagePosition="left"
      />

      {featureOn('newsletter') && (
        <Newsletter
          badge="Free · Bi-weekly"
          headline="First to know."
          description="New drops every other Tuesday. Subscriber-only restocks. Behind-the-scenes from the Portugal factory. No spam, ever."
        />
      )}

      {featureOn('faq') && (
        <FAQ eyebrow="Questions" headline="Shipping · returns · sourcing · sizing" items={faqs} />
      )}

      {featureOn('cta') && (
        <CTASection
          eyebrow="Spring '26"
          headline="The new collection is live."
          description="Made-to-order batches ship within 4–6 weeks. Sizes restock weekly. Free returns within 30 days — we mean it."
          primary={{ label: 'Shop Spring \'26', href: 'https://shop.fieldthreads.example/collections/spring-26' }}
          secondary={{ label: 'See lookbook', href: '/lookbook' }}
          tone="emphatic"
        />
      )}
    </>
  );
}
