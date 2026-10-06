export interface Project {
  /** Идентификатор: якорь карточки и имя папки с фотографиями. */
  readonly slug: string;
  readonly title: string;
  /** Строка под названием: год и площадь. */
  readonly meta: string;
  /**
   * Путь к обложке от корня сайта, например
   * `/images/projects/kvartira-v-novostroyke/cover.jpg`.
   * `null` — фотографии ещё нет, рисуется пустая рамка.
   */
  readonly cover: string | null;
}

export const projects: readonly Project[] = [
  {
    slug: 'kvartira-v-novostroyke',
    title: 'Квартира в новостройке',
    meta: '2025 · 78 м²',
    cover: null,
  },
  {
    slug: 'zagorodnyy-dom',
    title: 'Загородный дом',
    meta: '2024 · 210 м²',
    cover: null,
  },
  {
    slug: 'penthaus-s-terrasoy',
    title: 'Пентхаус с террасой',
    meta: '2024 · 140 м²',
    cover: null,
  },
  {
    slug: 'studiya-dlya-hudozhnika',
    title: 'Студия для художника',
    meta: '2023 · 46 м²',
    cover: null,
  },
  {
    slug: 'kvartira-dlya-semi',
    title: 'Квартира для семьи',
    meta: '2023 · 96 м²',
    cover: null,
  },
  {
    slug: 'dom-u-ozera',
    title: 'Дом у озера',
    meta: '2022 · 260 м²',
    cover: null,
  },
];
