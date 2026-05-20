import { useSEO } from '@/hooks/useSEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CaseStudyGrid, CTASection, type CaseStudy } from '@/components/sections';
import { brand } from '@/brand';

const studies: CaseStudy[] = [
  {
    slug: '{CS_1_SLUG}', title: '{CS_1_TITLE}', client: '{CS_1_CLIENT}', summary: '{CS_1_SUMMARY}',
    industry: '{CS_1_INDUSTRY}', cover: '{CS_1_COVER}',
    metrics: [{ value: '{CS_1_M1_V}', label: '{CS_1_M1_L}' }, { value: '{CS_1_M2_V}', label: '{CS_1_M2_L}' }, { value: '{CS_1_M3_V}', label: '{CS_1_M3_L}' }],
  },
  {
    slug: '{CS_2_SLUG}', title: '{CS_2_TITLE}', client: '{CS_2_CLIENT}', summary: '{CS_2_SUMMARY}',
    industry: '{CS_2_INDUSTRY}', cover: '{CS_2_COVER}',
    metrics: [{ value: '{CS_2_M1_V}', label: '{CS_2_M1_L}' }, { value: '{CS_2_M2_V}', label: '{CS_2_M2_L}' }, { value: '{CS_2_M3_V}', label: '{CS_2_M3_L}' }],
  },
  {
    slug: '{CS_3_SLUG}', title: '{CS_3_TITLE}', client: '{CS_3_CLIENT}', summary: '{CS_3_SUMMARY}',
    industry: '{CS_3_INDUSTRY}', cover: '{CS_3_COVER}',
    metrics: [{ value: '{CS_3_M1_V}', label: '{CS_3_M1_L}' }, { value: '{CS_3_M2_V}', label: '{CS_3_M2_L}' }, { value: '{CS_3_M3_V}', label: '{CS_3_M3_L}' }],
  },
];

export default function CaseStudies() {
  useSEO({
    title: `Case studies — ${brand.business.name}`,
    description: `Selected client work from ${brand.business.name}. Outcomes, metrics, methodology.`,
  });

  return (
    <>
      <Breadcrumbs baseUrl={brand.business.url} />
      <CaseStudyGrid
        studies={studies}
        eyebrow="Work"
        headline="Selected case studies"
      />
      <CTASection
        eyebrow="Your turn"
        headline="Let's build something worth a case study"
        primary={{ label: 'Start a project', href: '/contact' }}
      />
    </>
  );
}
