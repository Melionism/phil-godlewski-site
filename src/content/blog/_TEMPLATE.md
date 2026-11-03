---
# Обязательные поля
title: 'Заголовок статьи (до 70 символов) — он же H1'
description: 'Одно-два предложения о чём статья, 50–170 символов. Идёт в превью, meta description и соцсети.'
pubDate: 2026-11-03          # будущая дата = отложенная публикация
category: ai                 # id рубрики = имя файла в src/content/categories/ (technology, sports, ai, design, ventures)

# Необязательные поля
# seoTitle: 'Короче, под поиск (до 60 символов)'   # если <title> должен отличаться от заголовка
# updatedDate: 2026-11-10                           # дата заметного обновления — видна на странице и в sitemap
# cover: ../../assets/blog/my-post.jpg              # картинка в src/assets/blog/, путь относительно этого файла
# coverAlt: 'Что на обложке'                         # обязателен, если есть cover
tags: ['ixo', 'future-of-money']   # id тегов из src/content/tags.yml; тег с 3+ статьями получает индексируемую страницу
# featured: true                                    # показать в блоке Recommended на /blog
# related: ['other-post-id']                        # ручной список похожих статей (имена файлов без .md)
# cta: telegram                                     # канал, который выделяется после статьи: instagram | threads | rumble | telegram | locals
# aliases: ['/blog/old-address']                    # старые адреса → 301 сюда (если меняли имя файла)
# faq:                                              # вопрос-ответ в конце статьи + разметка FAQPage
#   - q: 'Вопрос?'
#     a: 'Ответ.'
# noindex: true                                     # закрыть статью от поисковиков
draft: true                  # убрать, чтобы опубликовать
---

Текст статьи в Markdown. Заголовки начинать с `##` (H2), дальше `###`, `####` — без пропуска уровней. `#` занят заголовком статьи.

## Подзаголовок

Абзац. **Жирный**, *курсив*, [ссылка на другую статью](/blog/other-post), [внешняя ссылка](https://example.com).

> Цитата.

- список
- список

![Осмысленный alt картинки](../../assets/blog/photo.jpg)

---
Как опубликовать: `npm run new-post -- "Title" --category ai` (или скопировать этот файл, назвать латиницей через дефис: `first-post.md` → /blog/first-post), заполнить шапку, убрать `draft: true`, положить картинки в `src/assets/blog/`, затем push в main. Подробно — docs/BLOG.md.
