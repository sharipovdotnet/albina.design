import type { Project } from './data/projects';

/** Сколько первых карточек грузить сразу: первый ряд виден без прокрутки. */
const EAGER_COUNT = 4;

/** Класс, включающий цвет в ячейке. */
const REVEALED_CLASS = 'is-revealed';

export function renderGallery(root: HTMLElement, projects: readonly Project[]): void {
  root.replaceChildren(...projects.map(createCard));
  root.addEventListener('click', toggleReveal);
  root.addEventListener('pointerout', dropRevealOnMouseLeave);
}

/**
 * Тап или клик по ячейке возвращает ей цвет; повторный — убирает. Клик приходит и
 * с Enter/Space, так что галерея управляема с клавиатуры.
 */
function toggleReveal(event: MouseEvent): void {
  const card = findCard(event.target);

  if (card === null) {
    return;
  }

  setRevealed(card, !card.classList.contains(REVEALED_CLASS));
}

/**
 * Мышь ушла с ячейки — снимаем раскраску, даже если по ячейке щёлкали: цвет по клику
 * не залипает, его даёт наведение. События тача сюда не попадают — у них другой
 * pointerType, иначе цвет слетал бы сразу после касания.
 */
function dropRevealOnMouseLeave(event: PointerEvent): void {
  if (event.pointerType !== 'mouse') {
    return;
  }

  const card = findCard(event.target);

  if (card === null) {
    return;
  }

  const next = event.relatedTarget;

  // Переход внутри ячейки (например, с картинки на её контейнер) уходом не считаем.
  if (next instanceof Node && card.contains(next)) {
    return;
  }

  setRevealed(card, false);
}

function findCard(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) {
    return null;
  }

  const card = target.closest('.project');

  return card instanceof HTMLElement ? card : null;
}

function setRevealed(card: HTMLElement, revealed: boolean): void {
  card.classList.toggle(REVEALED_CLASS, revealed);
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
