import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as pagefind from 'pagefind';

/**
 * Шаги после сборки. Подключать в astro.config ПОСЛЕ sitemap(): хуки astro:build:done идут по порядку.
 * 1. Индекс поиска Pagefind в dist/pagefind (индексируются только статьи — data-pagefind-body).
 * 2. Sitemap: убирает страницы с <meta name="robots" content="noindex…"> (поиск, редкие теги)
 *    и проставляет <lastmod> статьям из article:modified_time (ТЗ, SEO-7, SEO-11).
 */
export default function postbuild() {
  return {
    name: 'phil-postbuild',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const dist = fileURLToPath(dir);

        const { index } = await pagefind.createIndex({});
        const { page_count } = await index.addDirectory({ path: dist });
        await index.writeFiles({ outputPath: path.join(dist, 'pagefind') });
        await pagefind.close();
        logger.info(`pagefind: ${page_count} pages scanned`);

        const html = (await readdir(dist, { recursive: true })).filter((f) => f.endsWith('.html'));
        const noindex = new Set();
        const lastmod = new Map();
        for (const file of html) {
          const src = await readFile(path.join(dist, file), 'utf8');
          const route = '/' + file.replaceAll('\\', '/').replace(/(^|\/)index\.html$/, '').replace(/\.html$/, '');
          if (/<meta name="robots" content="noindex/.test(src)) noindex.add(route);
          const mod = src.match(/<meta property="article:modified_time" content="([^"]+)"/);
          if (mod) lastmod.set(route, mod[1]);
        }

        // loc в sitemap абсолютные — сравниваем по pathname
        const maps = (await readdir(dist)).filter((f) => /^sitemap-(?!index).*\.xml$/.test(f));
        let removed = 0;
        for (const file of maps) {
          const xml = await readFile(path.join(dist, file), 'utf8');
          const out = xml.replace(/<url><loc>([^<]+)<\/loc>(.*?)<\/url>/g, (all, loc, rest) => {
            const route = new URL(loc).pathname.replace(/\/$/, '') || '/';
            if (noindex.has(route)) {
              removed++;
              return '';
            }
            const mod = lastmod.get(route);
            return mod && !rest.includes('<lastmod>') ? `<url><loc>${loc}</loc><lastmod>${mod}</lastmod>${rest}</url>` : all;
          });
          await writeFile(path.join(dist, file), out);
        }
        logger.info(`sitemap: ${removed} noindex pages removed, ${lastmod.size} lastmod set`);
      },
    },
  };
}
