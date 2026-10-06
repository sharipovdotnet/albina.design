# albina.design

Одностраничный сайт дизайнера интерьера: галерея проектов в виде непрерывной сетки
прямоугольников на белом фоне.

## Стек

HTML, CSS, TypeScript. Сборка — Vite, без фреймворков, CSS-библиотек и UI-китов.
Шрифт Golos Text самохостится через Fontsource, внешних запросов за шрифтом нет.

## Команды

```powershell
npm install
npm run dev        # dev-сервер с hot-reload
npm run build      # tsc --noEmit + сборка в dist/
npm run preview    # локальный просмотр сборки
npm run typecheck  # только проверка типов
```

## Структура

```
index.html                 разметка страницы
src/styles/main.css        стили: токены, layout, компоненты
src/ts/main.ts             точка входа
src/ts/gallery.ts          отрисовка карточек галереи
src/ts/data/projects.ts    данные проектов
public/images/projects/    обложки проектов, см. README внутри
```

## Как устроена сетка

Верхнюю и левую линии даёт контейнер `.gallery`, правую и нижнюю — каждая ячейка
`.project`. Соседние прямоугольники делят одну линию, поэтому сетка читается как единая
конструкция, а не как набор отдельных карточек. Колонок: одна до 640 px, две до 1024 px,
три дальше.

## Что осталось заглушками

- Контакты в `<footer>` — в `index.html` стоит TODO.
- Обложки: у всех проектов `cover: null`, поэтому рисуется пустая рамка. Файлы кладутся
  в `public/images/projects/<slug>/cover.jpg`, путь прописывается в `src/ts/data/projects.ts`.
- Названия и метаданные проектов выдуманы и предназначены под замену.
- Favicon не добавлен.

## Скиллы проекта

`.dsh/skills` — правила дизайна (`frontend-design`), кода (`vanilla-web-standards`),
аудита интерфейса (`web-design-guidelines`) и поведения агента (`karpathy-guidelines`).
Лицензии сторонних скиллов — в `.dsh/THIRD-PARTY.md`.
