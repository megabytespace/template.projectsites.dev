import { JsonLd } from './JsonLd';

interface Props {
  name: string;
  jobTitle?: string;
  url?: string;
  image?: string;
  description?: string;
  worksFor?: { name: string; url?: string };
  sameAs?: string[];
  alumniOf?: string[];
  knowsAbout?: string[];
}

export function PersonJsonLd({
  name,
  jobTitle,
  url,
  image,
  description,
  worksFor,
  sameAs,
  alumniOf,
  knowsAbout,
}: Props) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
  };
  if (jobTitle) data.jobTitle = jobTitle;
  if (url) data.url = url;
  if (image) data.image = image;
  if (description) data.description = description;
  if (worksFor) {
    data.worksFor = {
      '@type': 'Organization',
      name: worksFor.name,
      ...(worksFor.url ? { url: worksFor.url } : {}),
    };
  }
  if (sameAs?.length) data.sameAs = sameAs;
  if (alumniOf?.length) {
    data.alumniOf = alumniOf.map((n) => ({
      '@type': 'EducationalOrganization',
      name: n,
    }));
  }
  if (knowsAbout?.length) data.knowsAbout = knowsAbout;
  return <JsonLd data={data} />;
}
