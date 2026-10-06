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

Посты — Markdown-файлы в `src/content/blog/`. Шаблон с подсказками: `src/content/blog/_TEMPLATE.md` (файлы с `_` в начале не публикуются).

1. Скопировать шаблон, назвать латиницей через дефис: `first-post.md` → адрес `/blog/first-post`.
2. Заполнить шапку: `title` (≤70), `description` (50–170), `pubDate`, при желании `cover` (картинка в `public/img/blog/`), `tags`.
3. Убрать `draft: true`. Черновики видны только в `npm run dev`, в сборку не попадают.
4. `npm run build` или push в main.

Пока опубликованных постов нет, страница `/blog` и пункт меню «Blog» не создаются автоматически.

## Деплой

См. `DEPLOY.md`.

## Структура

```
src/
  content/site.ts      весь контент
  components/          секции страницы (Hero, Profile, Atom, Ecosystem, Focus, Media, Follow, Contact, Nav, Footer)
  layouts/Base.astro   SEO-голова: title, description, canonical, OG, Twitter, JSON-LD
  lib/schema.ts        Schema.org Person + Organization
  lib/imgSize.ts       реальные размеры картинок на этапе сборки (против скачков вёрстки)
  styles/global.css    токены, типографика, кнопки, карточки
  pages/index.astro    главная и 404
  pages/blog/          список постов (/blog, пагинация по 9) и страница поста (/blog/<id>)
  content/blog/        посты блога (Markdown), _TEMPLATE.md — шаблон
  content.config.ts    схема блога (валидация шапки при сборке)
public/
  img/logos, img/photos, og-default.jpg, favicon.svg, apple-touch-icon.png, robots.txt, llms.txt
```
