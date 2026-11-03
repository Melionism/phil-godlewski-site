import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';

/** Каналы Фила, на которые ведёт CTA статьи (ключи из `socials` в site.ts) */
const channel = z.enum(['instagram', 'threads', 'rumble', 'telegram', 'locals']);

/**
 * Рубрики. Один файл = одна рубрика: src/content/categories/<slug>.md.
 * Добавить рубрику — добавить файл, убрать — удалить файл (если на неё ссылается
 * пост, сборка упадёт и назовёт этот пост). Тело файла — вступление на странице рубрики.
 */
const categories = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './src/content/categories' }),
  schema: z.object({
    name: z.string().max(40),
    /** Короткое описание: карточка рубрики и meta description по умолчанию */
    description: z.string().min(50).max(170, 'description 50–170 символов'),
    seoTitle: z.string().max(60).optional(),
    seoDescription: z.string().min(50).max(170).optional(),
    /** Порядок в списках рубрик (меньше — выше) */
    order: z.number().default(100),
  }),
});

/**
 * Теги — закрытый список в src/content/tags.yml. В статье можно ставить только теги из него
 * (по id); опечатка или удалённый тег — ошибка сборки с именем статьи.
 */
const tags = defineCollection({
  loader: file('src/content/tags.yml'),
  schema: z.object({
    name: z.string().max(40),
    description: z.string().min(50).max(170).optional(),
  }),
});

/** Авторы. Файл src/content/authors/<slug>.md, тело — биография. */
const authors = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './src/content/authors' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      position: z.string(),
      photo: image(),
      photoAlt: z.string(),
      /** Короткая подпись под статьёй, ≤ 200 символов */
      short: z.string().max(200),
      /** Ссылки на профили (Schema.org sameAs) */
      sameAs: z.array(z.url()).default([]),
    }),
});

/**
 * Блог. Файлы в src/content/blog/*.md (файлы с подчёркиванием в начале игнорируются — там шаблон).
 * Имя файла = адрес статьи: my-post.md → /blog/my-post.
 * Пока опубликованных постов нет — страницы /blog и пункт меню не создаются.
 */
const blog = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().max(70, 'title ≤ 70 символов'),
        description: z.string().min(50).max(170, 'description 50–170 символов'),
        /** <title> в поиске, если должен отличаться от заголовка статьи */
        seoTitle: z.string().max(60, 'seoTitle ≤ 60 символов').optional(),
        /** Дата публикации. Будущая дата = отложенная публикация (пост появится в первой сборке после этой даты) */
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        category: reference('categories'),
        author: reference('authors').prefault('phil-godlewski'),
        /** Обложка: путь относительно файла поста, например ../../assets/blog/my-post.jpg */
        cover: image().optional(),
        coverAlt: z.string().optional(),
        /** id тегов из src/content/tags.yml */
        tags: z.array(reference('tags')).default([]),
        /** Показать в блоке Recommended на /blog */
        featured: z.boolean().default(false),
        /** Ручной список похожих статей (id = имя файла без .md); иначе подбираются автоматически */
        related: z.array(reference('blog')).default([]),
        /** Вопрос-ответ в конце статьи + разметка FAQPage */
        faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
        /** Старые адреса статьи → 301 на текущий, например ['/blog/old-slug'] */
        aliases: z.array(z.string().regex(/^\/[a-z0-9/_-]*[a-z0-9]$/, 'alias: путь вида /blog/old-slug')).default([]),
        /** Канал, который выделяется в CTA после статьи */
        cta: channel.default('telegram'),
        noindex: z.boolean().default(false),
        /** draft: true — виден только в dev, в сборку не попадает */
        draft: z.boolean().default(false),
      })
      .refine((d) => !d.cover || !!d.coverAlt, { message: 'coverAlt обязателен, если задан cover', path: ['coverAlt'] }),
});

export const collections = { blog, categories, tags, authors };
