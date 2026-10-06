---
title: 'Заголовок поста (до 70 символов)'
description: 'Одно-два предложения о чём пост, 50–170 символов. Идёт в превью, meta description и соцсети.'
pubDate: 2026-10-06
cover: /img/blog/cover.webp
coverAlt: 'Что на обложке'
tags: ['technology', 'sports']
draft: true
---

Текст поста в Markdown. Заголовки начинать с `##`, `#` занят названием поста.

## Подзаголовок

Абзац. **Жирный**, *курсив*, [ссылка](https://example.com).

> Цитата.

- список
- список

![Подпись к картинке](/img/blog/photo.webp)

---
Как опубликовать: скопировать этот файл, назвать латиницей через дефис (имя файла = адрес, например `first-post.md` → /blog/first-post), заполнить шапку, убрать `draft: true`, положить картинки в `public/img/blog/`, затем `npm run build` или push в main.
