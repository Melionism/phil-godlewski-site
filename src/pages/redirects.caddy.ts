import { getCollection } from 'astro:content';
import { postUrl } from '../lib/blog';

/**
 * 301-редиректы со старых адресов статей (frontmatter `aliases`, ТЗ SEO-4).
 * Собирается в dist/redirects.caddy; Dockerfile переносит файл в /etc/caddy/ и убирает из /srv,
 * Caddyfile подключает его через import. Берём все посты, включая черновики: старый адрес
 * должен вести на новый, даже пока статья временно снята.
 */
export async function GET() {
  const posts = await getCollection('blog');
  const own = new Set(posts.map((p) => postUrl(p.id)));
  const seen = new Map<string, string>();
  const lines = ['# Генерируется при сборке из `aliases` статей. Не править вручную.'];
  for (const post of posts) {
    const target = postUrl(post.id);
    for (const alias of post.data.aliases) {
      if (own.has(alias)) throw new Error(`aliases: ${alias} в ${post.id}.md совпадает с адресом существующей статьи`);
      const prev = seen.get(alias);
      if (prev && prev !== target) throw new Error(`aliases: ${alias} указан и в ${prev}, и в ${target}`);
      seen.set(alias, target);
      lines.push(`redir ${alias} ${target} permanent`);
    }
  }
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
