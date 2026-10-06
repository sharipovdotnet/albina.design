export interface Project {
  /** Идентификатор: якорь карточки и имя папки с фотографиями. */
  readonly slug: string;
  /** На экране не показывается: из него собирается alt для фотографии. */
  readonly title: string;
  /**
   * Путь к обложке от корня сайта. `null` — фотографии ещё нет, рисуется пустая рамка.
   */
  readonly cover: string | null;
}

export const projects: readonly Project[] = [
  {
    slug: 'kvartira-v-novostroyke',
    title: 'Квартира в новостройке',
    cover: '/images/projects/kvartira-v-novostroyke/cover.jpg',
  },
  {
    slug: 'zagorodnyy-dom',
    title: 'Загородный дом',
    cover: '/images/projects/zagorodnyy-dom/cover.jpg',
  },
  {
    slug: 'penthaus-s-terrasoy',
    title: 'Пентхаус с террасой',
    cover: '/images/projects/penthaus-s-terrasoy/cover.jpg',
  },
  {
    slug: 'studiya-dlya-hudozhnika',
    title: 'Студия для художника',
    cover: '/images/projects/studiya-dlya-hudozhnika/cover.jpg',
  },
  {
    slug: 'kvartira-dlya-semi',
    title: 'Квартира для семьи',
    cover: '/images/projects/kvartira-dlya-semi/cover.jpg',
  },
  {
    slug: 'dom-u-ozera',
    title: 'Дом у озера',
    cover: '/images/projects/dom-u-ozera/cover.jpg',
  },
  {
    slug: 'kvartira-v-starom-fonde',
    title: 'Квартира в старом фонде',
    cover: '/images/projects/kvartira-v-starom-fonde/cover.jpg',
  },
  {
    slug: 'townhaus-v-sosnovom-boru',
    title: 'Таунхаус в сосновом бору',
    cover: '/images/projects/townhaus-v-sosnovom-boru/cover.jpg',
  },
  {
    slug: 'kuhnya-gostinaya',
    title: 'Кухня-гостиная',
    cover: '/images/projects/kuhnya-gostinaya/cover.jpg',
  },
  {
    slug: 'kvartira-dlya-dvoih',
    title: 'Квартира для двоих',
    cover: '/images/projects/kvartira-dlya-dvoih/cover.jpg',
  },
  {
    slug: 'dacha-dlya-vyhodnyh',
    title: 'Дача для выходных',
    cover: '/images/projects/dacha-dlya-vyhodnyh/cover.jpg',
  },
  {
    slug: 'mansarda-s-panoramnymi-oknami',
    title: 'Мансарда с панорамными окнами',
    cover: '/images/projects/mansarda-s-panoramnymi-oknami/cover.jpg',
  },
];
