# albina.design

Одностраничник дизайнера интерьера: приветственный экран поверх галереи проектов.
HTML + CSS + TypeScript, сборка Vite, без фреймворков, CSS-библиотек и UI-китов.
Пользовательское описание, устройство сетки и список заглушек — в README.md: читай его,
когда задача этого требует, и не пересказывай содержимое здесь.

## Команды

```powershell
npm run dev        # http://localhost:5173/ — сервер слушает IPv6-петлю, 127.0.0.1 не отвечает
npm run typecheck  # tsc --noEmit: strict, noUncheckedIndexedAccess, noUnusedLocals
npm run build      # typecheck + сборка в dist/
npm run preview    # просмотр собранной версии
```

## Карта файлов

```
.github/workflows/deploy.yml  сборка + публикация на GitHub Pages при push в main
index.html                 разметка: шапка, main#main, подвал, оверлей .intro, окно #lightbox
src/styles/main.css        вся вёрстка: @layer reset, tokens, base, layout, components, utilities
src/ts/main.ts             точка входа: initIntro() + initLightbox() + renderGallery()
src/ts/intro.ts            приветственный экран: 10 с, Esc, inert под оверлеем
src/ts/gallery.ts          карточки-<button> галереи; клик по ячейке открывает окно
src/ts/lightbox.ts         окно галереи на весь экран: кадры, описание, стрелки, Esc
src/ts/dom.ts              requireElement() — единственный способ достать узел разметки
src/ts/data/projects.ts    данные 10 проектов: slug, title, cover, photos, description
tools/prepare-photos.ps1   подготовка исходников проекта: обложка 3:4, кадры серии, вес
public/favicon.ico         монограмма «A» для вкладки: кадры 16/32/48 в одном файле
public/favicon-16.png      та же монограмма отдельными PNG — их предпочитают браузеры
public/favicon-32.png
public/CNAME               домен albina.rustamshar.ru для GitHub Pages
public/images/projects/    обложки и серии кадров; требования — в README внутри папки
```

## Поиск по репозиторию

- `glob` в DSH запускается с `--no-ignore --hidden`: шаблон без пути от корня вытащит
  `node_modules`, `.npm-cache` (147 МБ), `dist/` и `.preview/`. Всегда сужай —
  `path: "src"` или шаблон `src/**/*.ts`.
- `grep` — обычный ripgrep и `.gitignore` уважает, но `path`/`include` всё равно экономят вывод.
- `node_modules`, `dist`, `.npm-cache`, `.preview` — не исходники: не читай и не правь их.
- Большие файлы (`src/styles/main.css`, 12,9 КБ) читай через `offset`/`limit`, а не целиком.

## Как проверять результат

- Типы: `npm run typecheck` — обязателен до слова «готово».
- Вёрстка: только скриншотом живого рендера, рецепт — в README, раздел «Визуальная проверка».
  Chromium в confined-песочнице DSH не стартует: нужен разовый `danger-full-access` либо
  собственный запуск браузера с `--remote-debugging-port=9222`.
- Приветственный экран держится 10 секунд: чтобы снять галерею, нужен больший
  `--virtual-time-budget` или подключение по CDP.
- `tools/prepare-photos.ps1` запускается и в Windows PowerShell 5.1, а он читает `.ps1`
  без BOM как ANSI: файл должен оставаться в UTF-8 **с BOM**, иначе кириллица в нём
  превращается в мусор и скрипт падает на разборе. После правки файла проверь BOM.

## Конвенции

- Дизайн — по скиллу `frontend-design`: фотографии ведут, интерфейс — рамка вокруг них;
  ничего похожего на шаблонный AI-лендинг.
- CSS: токены в `:root`, слои `@layer`, mobile-first media queries в rem (40 / 64 / 80rem).
- TS: strict, доступ к DOM только через `requireElement`, без `any` и `!`.
- Шрифт — самохостящийся Montserrat (`@fontsource`), внешних запросов за шрифтами нет.
- Комментарии и тексты — по-русски, как в существующем коде; комментарий объясняет «почему»,
  а не «что».

## Что сейчас заглушки

Контакты в подвале, текст приветствия и описания проектов — подробности и TODO в README.
