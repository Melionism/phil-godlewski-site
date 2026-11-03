#!/usr/bin/env node
/**
 * Новая статья-черновик: npm run new-post -- "Article title" --category ai [--tags "ixo, future-of-money"] [--date 2026-11-10]
 * Создаёт src/content/blog/<slug>.md с заполненной шапкой и draft: true.
 * slug: латиница, нижний регистр, дефисы, ≤ 75 символов (ТЗ, SEO-1), без совпадений с существующими.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';

const root = path.resolve(import.meta.dirname, '..');
const blogDir = path.join(root, 'src/content/blog');
const catDir = path.join(root, 'src/content/categories');
const tagsFile = path.join(root, 'src/content/tags.yml');

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    category: { type: 'string', short: 'c' },
    tags: { type: 'string', short: 't', default: '' },
    date: { type: 'string', short: 'd' },
    slug: { type: 'string', short: 's' },
  },
});

const fail = (msg) => {
  console.error(`new-post: ${msg}`);
  process.exit(1);
};

const title = positionals.join(' ').trim();
const categories = readdirSync(catDir).filter((f) => f.endsWith('.md') && !f.startsWith('_')).map((f) => f.slice(0, -3));
if (!title) fail('укажите заголовок: npm run new-post -- "Article title" --category ai');
if (title.length > 70) fail(`заголовок ${title.length} символов, максимум 70`);
if (!values.category || !categories.includes(values.category)) fail(`--category одна из: ${categories.join(', ')}`);

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
let slug = slugify(values.slug ?? title);
if (slug.length > 75) slug = slug.slice(0, 75).replace(/-[^-]*$/, '');
if (!slug) fail('из заголовка не получился slug — задайте --slug латиницей');
const file = path.join(blogDir, `${slug}.md`);
if (existsSync(file)) fail(`статья ${slug}.md уже есть`);

const date = values.date ?? new Date().toISOString().slice(0, 10);
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) fail('--date в формате YYYY-MM-DD');
const tags = values.tags.split(',').map((t) => t.trim()).filter(Boolean);
const knownTags = [...readFileSync(tagsFile, 'utf8').matchAll(/^- id: *(\S+)/gm)].map((m) => m[1]);
const unknown = tags.filter((t) => !knownTags.includes(t));
if (unknown.length) fail(`нет в src/content/tags.yml: ${unknown.join(', ')}. Доступные теги: ${knownTags.join(', ')}`);
const q = (s) => `'${s.replaceAll("'", "''")}'`;

writeFileSync(
  file,
  `---
title: ${q(title)}
description: 'TODO: 50–170 characters — shown in search results, previews and social cards.'
pubDate: ${date}
category: ${values.category}
tags: [${tags.map(q).join(', ')}]
# cover: ../../assets/blog/${slug}.jpg
# coverAlt: ''
# cta: telegram
draft: true
---

Intro paragraph.

## First section
`,
);
console.log(`created src/content/blog/${slug}.md → /blog/${slug}`);
