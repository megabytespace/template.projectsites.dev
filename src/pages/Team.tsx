import { useSEO } from '@/hooks/useSEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { TeamGrid, CTASection, type TeamMember } from '@/components/sections';
import { brand } from '@/brand';

const team: TeamMember[] = [
  { name: '{TEAM_1_NAME}', role: '{TEAM_1_ROLE}', bio: '{TEAM_1_BIO}', photo: '{TEAM_1_PHOTO}',
    links: [{ label: 'LinkedIn', href: '{TEAM_1_LINKEDIN}' }] },
  { name: '{TEAM_2_NAME}', role: '{TEAM_2_ROLE}', bio: '{TEAM_2_BIO}', photo: '{TEAM_2_PHOTO}',
    links: [{ label: 'LinkedIn', href: '{TEAM_2_LINKEDIN}' }] },
  { name: '{TEAM_3_NAME}', role: '{TEAM_3_ROLE}', bio: '{TEAM_3_BIO}', photo: '{TEAM_3_PHOTO}',
    links: [{ label: 'LinkedIn', href: '{TEAM_3_LINKEDIN}' }] },
];

export default function Team() {
  useSEO({
    title: `Team — ${brand.business.name}`,
    description: `Meet the people behind ${brand.business.name}.`,
  });

  return (
    <>
      <Breadcrumbs baseUrl={brand.business.url} />
      <TeamGrid
        members={team}
        headline="The humans behind the work"
        description="Real people. Real expertise. Available whenever you need us."
      />
      <CTASection
        eyebrow="Hiring"
        headline="Like what you see? We're hiring."
        primary={{ label: 'See open roles', href: '/contact?intent=careers' }}
        tone="quiet"
      />
    </>
  );
}
