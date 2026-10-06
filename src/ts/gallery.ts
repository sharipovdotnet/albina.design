import type { Project } from './data/projects';

/** Сколько первых карточек грузить сразу: первый ряд виден без прокрутки. */
const EAGER_COUNT = 4;

/** Класс, включающий цвет в ячейке. */
const REVEALED_CLASS = 'is-revealed';

export function renderGallery(root: HTMLElement, projects: readonly Project[]): void {
  root.replaceChildren(...projects.map(createCard));
  root.addEventListener('click', toggleReveal);
}

/**
 * Тап по ячейке возвращает ей цвет: на тач-устройстве hover недоступен, а стили :hover
 * там ещё и «залипают» после касания. Клик приходит и с Enter/Space, так что галерея
 * остаётся управляемой с клавиатуры.
 */
function toggleReveal(event: MouseEvent): void {
  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  const card = target.closest('.project');

  if (card === null) {
    return;
  }

  const revealed = card.classList.toggle(REVEALED_CLASS);
  card.setAttribute('aria-pressed', String(revealed));
}

function createCard(project: Project, index: number): HTMLElement {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'project';
  card.id = project.slug;
  card.setAttribute('aria-pressed', 'false');
  card.style.setProperty('--index', String(index));

  card.append(createMedia(project, index));

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
  // Размеры обложек разные (от 591×886 до 2275×1728), поэтому фиксированные width/height
  // были бы враньём. Место под снимок резервирует aspect-ratio у .project__media, так что
  // сдвига при загрузке нет и без этих атрибутов.
  image.loading = index < EAGER_COUNT ? 'eager' : 'lazy';
  image.decoding = 'async';
  media.append(image);

  return media;
}
