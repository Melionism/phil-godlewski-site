import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getEntry, getEntries } from 'astro:content';
import { getPosts, postUrl } from '../lib/blog';
import { site, blog } from '../content/site';

/** RSS-лента блога (ТЗ, FR-7): /rss.xml */
export async function GET(context: APIContext) {
  const posts = (await getPosts()).filter((p) => !p.data.noindex);
  const items = await Promise.all(
    posts.slice(0, 50).map(async (p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: postUrl(p.id),
      categories: [(await getEntry(p.data.category))?.data.name ?? '', ...(await getEntries(p.data.tags)).map((t) => t.data.name)].filter(Boolean),
    })),
  );
  return rss({
    title: `${site.name} — Blog`,
    description: blog.description,
    site: context.site!,
    items,
    // Адреса без слеша в конце, как на сайте (иначе каждая ссылка из ленты — лишний 301)
    trailingSlash: false,
    customData: '<language>en</language>',
  });
}
