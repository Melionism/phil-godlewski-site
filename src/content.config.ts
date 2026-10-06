import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Блог. Файлы в src/content/blog/*.md (файлы с подчёркиванием в начале игнорируются — там шаблон).
 * Пока постов нет — страницы /blog и пункт меню не создаются.
 */
const blog = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(70, 'title ≤ 70 символов'),
    description: z.string().min(50).max(170, 'description 50–170 символов'),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    /** Обложка: путь в public/, например /img/blog/cover.webp */
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    /** draft: true — виден только в dev, в сборку не попадает */
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
