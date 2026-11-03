import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;
export type Category = CollectionEntry<'categories'>;

/** Посты на странице ленты, рубрики и тега */
export const PAGE_SIZE = 9;
/** Тег с меньшим числом статей не индексируется и не попадает в sitemap (ТЗ, FR-3) */
export const TAG_INDEX_MIN = 3;

/**
 * Опубликованные посты, новые сверху. В сборку не попадают черновики и посты с датой в будущем
 * (отложенная публикация). В `npm run dev` видно всё — для предпросмотра.
 */
export async function getPosts(): Promise<Post[]> {
  const now = Date.now();
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || (!data.draft && data.pubDate.valueOf() <= now));
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Все рубрики по порядку, с числом опубликованных статей */
export async function getCategories(posts?: Post[]) {
  const list = posts ?? (await getPosts());
  const cats = (await getCollection('categories')).sort((a, b) => a.data.order - b.data.order || a.data.name.localeCompare(b.data.name));
  return cats.map((cat) => ({ cat, count: list.filter((p) => p.data.category.id === cat.id).length }));
}

/** Теги из списка, у которых есть опубликованные статьи */
export async function getTags(posts: Post[]) {
  const all = await getCollection('tags');
  return all
    .map((tag) => ({ tag, posts: posts.filter((p) => p.data.tags.some((t) => t.id === tag.id)) }))
    .filter((t) => t.posts.length > 0);
}

/** Минуты чтения, ~220 слов в минуту */
export function readingTime(body = ''): number {
  const words = body.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** Похожие статьи: ручной список из `related`, затем та же рубрика и общие теги, затем свежие */
export function relatedPosts(post: Post, posts: Post[], limit = 3): Post[] {
  const others = posts.filter((p) => p.id !== post.id);
  const manual = post.data.related.map((r) => others.find((p) => p.id === r.id)).filter((p): p is Post => !!p);
  const tags = new Set(post.data.tags.map((t) => t.id));
  const score = (p: Post) => (p.data.category.id === post.data.category.id ? 2 : 0) + p.data.tags.filter((t) => tags.has(t.id)).length;
  const auto = others
    .filter((p) => !manual.includes(p))
    .map((p) => ({ p, s: score(p) }))
    .sort((a, b) => b.s - a.s || b.p.data.pubDate.valueOf() - a.p.data.pubDate.valueOf())
    .map(({ p }) => p);
  return [...manual, ...auto].slice(0, limit);
}

export const fmtDate = (d: Date) => d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

export const postUrl = (id: string) => `/blog/${id}`;
export const categoryUrl = (id: string) => `/blog/category/${id}`;
export const tagUrl = (id: string) => `/blog/tag/${id}`;
export const authorUrl = (id: string) => `/blog/author/${id}`;
