export interface Project {
  /** Идентификатор: якорь карточки и имя папки с фотографиями. */
  readonly slug: string;
  readonly title: string;
  /**
   * Путь к обложке от корня сайта, например
   * `/images/projects/kvartira-v-novostroyke/cover.jpg`.
   * `null` — фотографии ещё нет, рисуется пустая рамка.
   */
  readonly cover: string | null;
}

export const projects: readonly Project[] = [
  { slug: 'kvartira-v-novostroyke', title: 'Квартира в новостройке', cover: null },
  { slug: 'zagorodnyy-dom', title: 'Загородный дом', cover: null },
  { slug: 'penthaus-s-terrasoy', title: 'Пентхаус с террасой', cover: null },
  { slug: 'studiya-dlya-hudozhnika', title: 'Студия для художника', cover: null },
  { slug: 'kvartira-dlya-semi', title: 'Квартира для семьи', cover: null },
  { slug: 'dom-u-ozera', title: 'Дом у озера', cover: null },
  { slug: 'kvartira-v-starom-fonde', title: 'Квартира в старом фонде', cover: null },
  { slug: 'townhaus-v-sosnovom-boru', title: 'Таунхаус в сосновом бору', cover: null },
  { slug: 'kuhnya-gostinaya', title: 'Кухня-гостиная', cover: null },
  { slug: 'kvartira-dlya-dvoih', title: 'Квартира для двоих', cover: null },
  { slug: 'dacha-dlya-vyhodnyh', title: 'Дача для выходных', cover: null },
  { slug: 'mansarda-s-panoramnymi-oknami', title: 'Мансарда с панорамными окнами', cover: null },
];
