import type { APIContext } from 'astro';
import { getEntry } from 'astro:content';
import { getPosts, getCategories, postUrl, categoryUrl } from '../lib/blog';
import { socials, socialOrder } from '../content/site';

/**
 * /llms.txt — краткая выжимка сайта для AI-ассистентов и AI-поиска.
 * Раздел Blog собирается из опубликованных статей; пока их нет — раздела нет.
 */
export async function GET(context: APIContext) {
  const origin = context.site!.origin;
  const posts = (await getPosts()).filter((p) => !p.data.noindex);
  const cats = (await getCategories(posts)).filter((c) => c.count > 0);

  const blog = posts.length
    ? `
## Blog

- [All articles](${origin}/blog): notes on technology, sports, AI, design and the ATOM ecosystem.
${cats.map(({ cat }) => `- [${cat.data.name}](${origin}${categoryUrl(cat.id)}): ${cat.data.description}`).join('\n')}

### Latest articles

${(
  await Promise.all(
    posts.slice(0, 30).map(async (p) => `- [${p.data.title}](${origin}${postUrl(p.id)}) (${(await getEntry(p.data.category))?.data.name}): ${p.data.description}`),
  )
).join('\n')}
`
    : '';

  const body = `# Phil Godlewski

> Entrepreneur, owner and co-founder of ATOM Ventures Group. Building ventures at the intersection of technology, sports, AI and design.

Key facts:
- Owner and co-founder of ATOM Ventures Group — a venture platform connecting technology, sports, AI and creative industries.
- Public profile brings together technology, sports, AI-driven products and creative design.

## Projects

- [JGGL](https://jggl.ai/): AI social platform — one tap turns a moment into a post, a clip and a soundtrack. Live on iOS and Android.
- [Blockchain Sports](https://bcsports.io/en): SportTech ecosystem — XR football, computer vision, football academies and haptic XR hardware.
- Neurodesign: a creative and technology-driven approach to design.
- Arteki Studio: full-cycle AI animation studio at the intersection of art, design and technology.

## Site

- Home: single-page profile — profile, ATOM Ventures Group, ecosystem, focus areas, media, follow, contact.
${blog}
## Social

${socialOrder.map((k) => `- ${socials[k].label}: ${socials[k].url}`).join('\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
