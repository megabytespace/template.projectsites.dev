import { useSEO } from '@/hooks/useSEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { FAQ as FAQSection, CTASection, type FAQItem } from '@/components/sections';
import { brand } from '@/brand';

const general: FAQItem[] = [
  { question: '{FAQ_GEN_1_Q}', answer: '{FAQ_GEN_1_A}' },
  { question: '{FAQ_GEN_2_Q}', answer: '{FAQ_GEN_2_A}' },
  { question: '{FAQ_GEN_3_Q}', answer: '{FAQ_GEN_3_A}' },
];

const billing: FAQItem[] = [
  { question: '{FAQ_BILL_1_Q}', answer: '{FAQ_BILL_1_A}' },
  { question: '{FAQ_BILL_2_Q}', answer: '{FAQ_BILL_2_A}' },
];

const support: FAQItem[] = [
  { question: '{FAQ_SUP_1_Q}', answer: '{FAQ_SUP_1_A}' },
  { question: '{FAQ_SUP_2_Q}', answer: '{FAQ_SUP_2_A}' },
];

export default function FAQPage() {
  useSEO({
    title: `FAQ — ${brand.business.name}`,
    description: `Answers to the most common questions about ${brand.business.name}.`,
  });

  return (
    <>
      <Breadcrumbs baseUrl={brand.business.url} />
      <FAQSection
        items={general}
        eyebrow="General"
        headline="Frequently asked questions"
        description="Can't find what you're looking for? Press ⌘+K or use the search above."
      />
      <FAQSection items={billing} eyebrow="Billing" headline="Billing & subscriptions" />
      <FAQSection items={support} eyebrow="Support" headline="Help & support" />
      <CTASection
        eyebrow="Still have questions?"
        headline="We answer email within 24 hours"
        primary={{ label: 'Email us', href: `mailto:${brand.business.email}` }}
        tone="quiet"
      />
    </>
  );
}
