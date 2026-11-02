import { site, socials, socialOrder, atom } from '../content/site';

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
      sameAs: socialOrder.map((k) => socials[k].url),
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

/** BreadcrumbList для хлебных крошек; href — путь от корня */
export function breadcrumbSchema(origin: string, items: { name: string; href: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: origin + it.href })),
  };
}

/** BlogPosting статьи. Автор и издатель — тот же Person, что на главной (#person) */
export function articleSchema(
  origin: string,
  a: { url: string; title: string; description: string; image: string; published: Date; modified?: Date; section?: string; tags: string[]; words: number },
) {
  const personId = `${origin}/#person`;
  return {
    '@type': 'BlogPosting',
    '@id': `${origin}${a.url}#article`,
    headline: a.title,
    description: a.description,
    image: a.image,
    datePublished: a.published.toISOString(),
    dateModified: (a.modified ?? a.published).toISOString(),
    author: { '@type': 'Person', '@id': personId, name: site.name, url: `${origin}/` },
    publisher: { '@id': personId },
    mainEntityOfPage: { '@type': 'WebPage', '@id': origin + a.url },
    isPartOf: { '@id': `${origin}/#website` },
    inLanguage: 'en',
    ...(a.section ? { articleSection: a.section } : {}),
    ...(a.tags.length ? { keywords: a.tags.join(', ') } : {}),
    wordCount: a.words,
  };
}

export function faqSchema(faq: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}
