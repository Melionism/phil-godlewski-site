import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import postbuild from './src/integrations/postbuild.mjs';

// SITE_URL задаётся при сборке (Docker build-arg). Домен: philgodlewski.link
const site = process.env.SITE_URL || 'https://philgodlewski.link';

/** Тип страницы для разбивки sitemap (ТЗ, SEO-7): sitemap-posts-0.xml, sitemap-categories-0.xml… */
const kind = (url) => {
  const p = new URL(url).pathname;
  if (/^\/blog\/category\//.test(p)) return 'categories';
  if (/^\/blog\/tag\//.test(p)) return 'tags';
  if (/^\/blog\/author\//.test(p)) return 'authors';
  if (/^\/blog\/(?!\d+$|archive$|search$)[^/]+$/.test(p)) return 'posts';
  // Остальное плагин сам кладёт в sitemap-pages-0.xml (имя «pages» у него зарезервировано)
  return null;
};
const chunk = (name) => (item) => (kind(item.url) === name ? item : undefined);

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      filter: (page) => !/\/(404|redirects\.caddy|rss\.xml)$/.test(page),
      chunks: Object.fromEntries(['posts', 'categories', 'tags', 'authors'].map((n) => [n, chunk(n)])),
    }),
    // После sitemap: дописывает в него lastmod, убирает noindex-страницы, строит поиск
    postbuild(),
  ],
});
