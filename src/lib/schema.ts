import { site, socials, atom } from '../content/site';

/**
 * Schema.org nodes for the home page. Person and Organization share ids so
 * Google reads them as one connected graph (Person worksFor Organization).
 */
export function homeSchema(origin: string) {
  const personId = `${origin}/#person`;
  const orgId = `${origin}/#organization`;
  return [
    {
      '@type': 'Person',
      '@id': personId,
      name: site.name,
      url: `${origin}/`,
      jobTitle: 'Owner & Co-Founder',
      worksFor: { '@id': orgId },
      sameAs: [socials.instagram.url, socials.threads.url],
    },
    {
      '@type': 'Organization',
      '@id': orgId,
      name: 'ATOM Ventures Group',
      url: atom.url,
      founder: { '@id': personId },
    },
    {
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
      url: `${origin}/`,
      name: site.siteName,
      about: { '@id': personId },
    },
  ];
}
