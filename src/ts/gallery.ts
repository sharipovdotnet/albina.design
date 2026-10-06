import type { Project } from './data/projects';

/** Сколько первых карточек грузить сразу: первый ряд виден без прокрутки. */
const EAGER_COUNT = 3;

export function renderGallery(root: HTMLElement, projects: readonly Project[]): void {
  root.replaceChildren(...projects.map(createCard));
}

function createCard(project: Project, index: number): HTMLElement {
  const card = document.createElement('article');
  card.className = 'project';
  card.id = project.slug;
  card.style.setProperty('--index', String(index));

  card.append(createMedia(project, index), createCaption(project));

  return card;
}

function createMedia(project: Project, index: number): HTMLElement {
  const media = document.createElement('div');
  media.className = 'project__media';

  if (project.cover === null) {
    return media;
  }

  const image = document.createElement('img');
  image.src = project.cover;
  image.alt = `Интерьер: ${project.title}`;
  // Обложки по конвенции 3:4 (см. public/images/projects/README.md), поэтому атрибуты
  // размеров совпадают с aspect-ratio ячейки и разметка не «прыгает» при загрузке.
  image.width = 1200;
  image.height = 1600;
  image.loading = index < EAGER_COUNT ? 'eager' : 'lazy';
  image.decoding = 'async';
  media.append(image);

  return media;
}

function createCaption(project: Project): HTMLElement {
  const caption = document.createElement('div');
  caption.className = 'project__caption';

  const title = document.createElement('h2');
  title.className = 'project__title';
  title.textContent = project.title;

  caption.append(title);

  return caption;
}
