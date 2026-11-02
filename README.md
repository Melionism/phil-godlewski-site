# Phil Godlewski — personal site

Одностраничный статический сайт на **Astro**. Без бэкенда и БД: на выходе чистый HTML/CSS/JS в `dist/`.

## Быстрый старт

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # -> dist/
npm run preview   # проверить сборку локально
```

Нужен Node.js **22.12+**.

## Как менять контент (для администратора)

Весь контент — в одном файле **`src/content/site.ts`**. Структура страницы при этом не трогается.

| Что поменять | Где |
|---|---|
| Тексты hero, профиля, ATOM, focus, follow, contact | соответствующие объекты в `site.ts` |
| Портрет | положить файл в `public/img/`, в `hero.portrait` указать путь вида `/img/phil.jpg` |
| Карточки проектов (название, описание, ссылка, логотип) | массив `ecosystem.list`. Логотип — файл в `public/img/logos/`. Белый логотип → `dark: true` |
| Фото в блоке Media | массив `media.items`: `src` (файл в `public/img/photos/`), `caption`, `url` (ссылка на оригинал поста или `null`) |
| Соцсети | объект `socials` + порядок в `socialOrder` (Instagram, Threads, Rumble, Telegram, Locals) |
| Контакт-форма | `contact.formEndpoint` — адрес обработчика (Formspree / Web3Forms / свой). Пока пусто — показывается кнопка на Instagram |
| Title / description / OG-картинка | объект `site` |

После правок — `npm run build` и выложить `dist/` (или пересобрать Docker-образ).

Правило из ТЗ: не добавлять даты, цифры, звания, географию и результаты проектов без подтверждения клиентом.

## Блог

Статьи — Markdown-файлы в `src/content/blog/`, рубрики — файлы в `src/content/categories/`, авторы — в `src/content/authors/`. Полная инструкция для редакции и пакетной заливки — **`docs/BLOG.md`**.

Коротко:

1. `npm run new-post -- "Article title" --category ai --tags "ai, sports"` — создаёт черновик `src/content/blog/<slug>.md` (адрес `/blog/<slug>`).
2. Заполнить шапку (`description` 50–170, при желании обложка, `cta`, `faq`), написать текст, убрать `draft: true`.
3. Push в `main` — сайт пересоберётся сам (поллер на сервере, ~1 мин).

Сборка падает, если шапка заполнена с ошибкой (длины, несуществующая рубрика, обложка без `coverAlt`) — это и есть проверка перед публикацией.

Пока опубликованных постов нет, страница `/blog` и пункт меню «Blog» не создаются.

| URL | Что |
|---|---|
| `/blog`, `/blog/2` | лента + Recommended (`featured: true`) |
| `/blog/<slug>` | статья: крошки, автор, похожие, «поделиться», CTA в каналы Фила |
| `/blog/category/<id>` | рубрика (только если в ней есть статьи) |
| `/blog/tag/<slug>` | тег; меньше 3 статей — `noindex` и вне sitemap |
| `/blog/author/<id>` | автор |
| `/blog/archive`, `/blog/search` | архив по месяцам; поиск (Pagefind, `noindex`) |
| `/rss.xml`, `/llms.txt`, `/sitemap-index.xml` | генерируются при сборке |

## Аналитика

GA4 — `analytics.gaId` в `src/content/site.ts` (пусто — скрипт не выводится). Consent Mode v2: для EEA/UK/CH аналитика включается только после Accept в баннере. События и их параметры описаны в `src/components/Analytics.astro`; ключевое — `social_click` (переход в канал Фила, параметры `channel`, `placement`).

## Деплой

См. `DEPLOY.md`.

## Структура

```
src/
  content/site.ts      весь контент
  components/          секции страницы (Hero, Profile, Atom, Ecosystem, Focus, Media, LatestPosts, Follow, Contact, Nav, Footer), Analytics
  components/blog/     блоки блога: карточка, сетка, крошки, рубрики, пагинация, CTA каналов, «поделиться», каркас списков
  layouts/Base.astro   SEO-голова: title, description, canonical, OG, Twitter, JSON-LD
  lib/schema.ts        Schema.org: Person, Organization, BlogPosting, BreadcrumbList, FAQPage
  lib/blog.ts          выборка опубликованных постов, рубрики, теги, похожие статьи
  lib/imgSize.ts       реальные размеры картинок на этапе сборки (против скачков вёрстки)
  styles/global.css    токены, типографика, кнопки, карточки
  pages/index.astro    главная и 404
  pages/blog/          лента, статья, рубрики, теги, автор, архив, поиск
  pages/rss.xml.ts, llms.txt.ts, redirects.caddy.ts   генерируемые файлы
  content/blog/        статьи (Markdown), _TEMPLATE.md — шаблон со всеми полями
  content/categories/  рубрики, content/authors/ — авторы
  assets/              картинки статей и авторов (оптимизируются при сборке)
  integrations/        после сборки: индекс поиска Pagefind, lastmod и noindex в sitemap
  content.config.ts    схемы статей, рубрик, авторов (валидация при сборке)
scripts/new-post.mjs   создание черновика статьи
public/
  img/logos, img/photos, og-default.jpg, favicon.svg, apple-touch-icon.png, robots.txt
```
