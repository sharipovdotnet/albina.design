import type { Project } from './data/projects';
import type { OpenProject } from './lightbox';

/** Сколько первых карточек грузить сразу: первый ряд виден без прокрутки. */
const EAGER_COUNT = 5;

/**
 * Рисует сетку проектов и открывает окно галереи по клику. Обработчик клика —
 * колбэк `openProject`, поэтому галерея ничего не знает про окно и его разметку.
 */
export function renderGallery(
  root: HTMLElement,
  projects: readonly Project[],
  openProject: OpenProject,
): void {
  root.replaceChildren(...projects.map(createCard));

  // Карточки несут id по слагу проекта: по нему клик и находит свои данные.
  const bySlug = new Map(projects.map((project) => [project.slug, project] as const));

  // Слушатель один на всю сетку: карточек двенадцать, и обработчик на каждой —
  // та же работа, только двенадцать раз.
  root.addEventListener('click', (event) => {
    const card = findCard(event.target);

    if (card === null) {
      return;
    }

    const project = bySlug.get(card.id);

    if (project !== undefined) {
      openProject(project);
    }
  });
}

function findCard(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) {
    return null;
  }

  const card = target.closest('.project');

  return card instanceof HTMLElement ? card : null;
}

function createCard(project: Project, index: number): HTMLElement {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'project';
  card.id = project.slug;
  // Кнопка открывает окно, а не переключает состояние: поэтому haspopup, а не pressed.
  card.setAttribute('aria-haspopup', 'dialog');
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
