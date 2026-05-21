/**
 * Applied output — src/pages/FAQ.tsx for Latch.
 *
 * 3 FAQ groups (general / security / billing). Each emits its own FAQPage
 * JSON-LD node — total of 3 FAQPage schemas on this route.
 */
import { useSEO } from '@/hooks/useSEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { FAQ as FAQSection, CTASection, type FAQItem } from '@/components/sections';
import { brand } from '@/brand';

const general: FAQItem[] = [
  {
    question: 'What does Latch do?',
    answer: 'Latch reviews every pull request on your GitHub (GitLab + Bitbucket in beta). It flags race conditions, off-by-one errors, regex DoS, unsafe SQL, missing null checks — the bug classes that escape human review and the summarization-focused AI tools. Median review time: 47 seconds.',
  },
  {
    question: 'How is Latch different from Copilot / Cursor / CodeRabbit?',
    answer: 'Copilot and Cursor write code. CodeRabbit and Greptile summarize PRs. Latch focuses narrowly on catching bugs reviewers miss. We post fewer comments — but each one is actionable. Most teams use Latch alongside one of those tools, not instead.',
  },
  {
    question: 'What languages do you support?',
    answer: 'TypeScript, JavaScript, Python, Go, Rust, Java, Kotlin, Swift, Ruby, PHP, C++, C#, Elixir, Scala, Bash. Coverage varies by language — TypeScript/Python/Go are strongest; Scala and Elixir are the newest. Request languages at hello@latch.example.',
  },
  {
    question: 'Can I customize what Latch flags?',
    answer: 'Yes. On Team and Enterprise, configure rules in `.latch.yml` at your repo root. Disable specific check categories, set severity thresholds, exclude paths, or write custom rules in our YAML DSL. Documentation at /docs/rules.',
  },
  {
    question: 'How accurate is Latch?',
    answer: 'On our internal benchmark (12,000 real production bugs from open-source post-mortems), Latch catches 67% of the bugs that escaped human review. False-positive rate is 4.1% — comments that get a thumbs-down from reviewers. We retrain weekly on user feedback.',
  },
];

const security: FAQItem[] = [
  {
    question: 'Where is my code stored?',
    answer: 'Diffs are processed in-memory and discarded immediately on Free and Team plans. Enterprise customers configure retention from 0 days to 7 years. We never train our model on customer code by default — opt-in only, contractually exclusive.',
  },
  {
    question: 'Are you SOC 2 / GDPR compliant?',
    answer: 'Yes. SOC 2 Type II audited annually. GDPR-compliant — EU customers can pin to our eu-west-1 region. DPA signed by default. Team customers can request our SOC 2 attestation; Enterprise gets the full report under NDA.',
  },
  {
    question: 'Can I self-host Latch?',
    answer: 'Enterprise plan only. We ship a Helm chart that runs in your Kubernetes cluster — your code never leaves your network. Talk to sales for installation support; typical onboarding is 2-3 weeks including security review.',
  },
  {
    question: 'How do you handle secrets in PRs?',
    answer: 'Latch detects and redacts API keys, tokens, and passwords before processing. Detected secrets are reported back as a check (failing) so you can rotate. We never store, log, or transmit detected secrets — they\'re zeroed from memory immediately.',
  },
  {
    question: 'What happens during a security incident?',
    answer: 'We notify Enterprise customers within 24 hours of confirmed incidents. Public status page at status.latch.example. Post-incident reports published within 5 business days. Incident response runbooks shared on request.',
  },
];

const billing: FAQItem[] = [
  {
    question: 'Is there a free trial?',
    answer: '14-day free trial of Team — full features, no card required. Add a card at trial end or downgrade to Free. We email you 3 days before trial end with a one-click "skip to Free" link.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes. Cancel from the billing page; access continues through end of period. We refund unused months on annual plans — no questions asked.',
  },
  {
    question: 'How is "user" counted?',
    answer: 'A user is anyone who opens a PR that Latch reviews in a given billing month. Bots (Dependabot, Renovate) don\'t count. Read-only viewers don\'t count. You pay for active reviewers, not the whole org.',
  },
  {
    question: 'Do you offer discounts?',
    answer: '50% off Team for verified students and 501(c)(3) nonprofits — email with .edu address or EIN. 20% off annual plans (built into the yearly price). Enterprise pricing is custom; we beat any like-for-like quote.',
  },
];

export default function FAQ() {
  useSEO({
    title: 'FAQ — Latch · How AI code review works, pricing, security',
    description: 'Answers about how Latch reviews PRs, what languages we support, where code is stored, pricing tiers, SOC 2 + GDPR compliance.',
  });

  return (
    <>
      <Breadcrumbs baseUrl={brand.business.url} />

      <FAQSection
        eyebrow="General"
        headline="How Latch works"
        description="Quick answers to the most common questions. Can't find what you're looking for? Press ⌘+K or email hello@latch.example."
        items={general}
      />

      <FAQSection
        eyebrow="Security + compliance"
        headline="Security questions"
        items={security}
      />

      <FAQSection
        eyebrow="Billing"
        headline="Billing + pricing"
        items={billing}
      />

      <CTASection
        eyebrow="Still have questions?"
        headline="We answer email within 4 hours"
        description="Business hours Mon-Fri, US East. Slack Community for community questions (linked in footer)."
        primary={{ label: 'Email us', href: `mailto:${brand.business.email}` }}
        secondary={{ label: 'Talk to sales', href: '/contact?intent=enterprise' }}
        tone="quiet"
      />
    </>
  );
}
