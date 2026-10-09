import type { Project } from './data/projects';
import { requireElement } from './dom';

/** Класс на <html>: пока окно открыто, страница под ним не прокручивается. */
const LOCK_CLASS = 'is-lightbox-open';

/** Открывает окно галереи с фотографиями проекта — колбэк для галереи. */
export type OpenProject = (project: Project) => void;

/**
 * Окно галереи: одно на весь сайт, разметка — `<dialog id="lightbox">` в index.html.
 * Возвращает функцию открытия: её вызывает галерея при клике по ячейке.
 */
export function initLightbox(): OpenProject {
  const dialog = requireElement<HTMLDialogElement>('#lightbox');
  const title = requireElement<HTMLElement>('#lightbox-title', dialog);
  const text = requireElement<HTMLElement>('#lightbox-text', dialog);
  const photo = requireElement<HTMLImageElement>('.lightbox__photo', dialog);
  const note = requireElement<HTMLElement>('.lightbox__note', dialog);
  const controls = requireElement<HTMLElement>('.lightbox__controls', dialog);
  const counter = requireElement<HTMLElement>('.lightbox__counter', dialog);
  const closeButton = requireElement<HTMLButtonElement>('.lightbox__close', dialog);
  const prevButton = requireElement<HTMLButtonElement>('.lightbox__prev', dialog);
  const nextButton = requireElement<HTMLButtonElement>('.lightbox__next', dialog);

  /** Кадры открытого проекта, номер текущего и его название — оно идёт в alt. */
  let shots: readonly string[] = [];
  let current = 0;
  let label = '';

  /*
   * Предзагруженные кадры держим ссылками: пока запрос в ходу, картинку кто-то должен
   * удерживать, иначе сборщик мусора вправе снять её вместе с запросом. Освобождаем
   * по завершении загрузки.
   */
  const preloading = new Set<HTMLImageElement>();

  function open(project: Project): void {
    label = project.title;
    title.textContent = project.title;
    // Описания нет — колонка остаётся с одним заголовком, пустых абзацев не рисуем.
    text.replaceChildren(...project.description.map(createParagraph));
    text.hidden = project.description.length === 0;
    shots = project.photos.length > 0 ? project.photos : coverOnly(project);
    show(0);

    if (dialog.open) {
      return;
    }

    document.documentElement.classList.add(LOCK_CLASS);
    // showModal переводит фокус внутрь окна, делает фон inert и берёт Esc на себя.
    dialog.showModal();
  }

  /** Показывает кадр по номеру и приводит к нему всё остальное содержимое окна. */
  function show(index: number): void {
    const total = shots.length;

    if (total === 0) {
      photo.hidden = true;
      photo.removeAttribute('src');
      note.hidden = false;
      controls.hidden = true;
      // Счётчик прошлого проекта в скрытой полосе не оставляем: живая область должна молчать.
      counter.textContent = '';

      return;
    }

    const src = shots[index];

    if (src === undefined) {
      return;
    }

    current = index;
    photo.src = src;
    // Подпись кадра собирается из названия проекта: своих подписей у фотографий нет.
    photo.alt =
      total > 1 ? `Интерьер: ${label}, фотография ${index + 1} из ${total}` : `Интерьер: ${label}`;
    photo.hidden = false;
    note.hidden = true;
    // Стрелки и счётчик нужны только там, где есть что листать.
    controls.hidden = total < 2;
    counter.textContent = total > 1 ? `Фотография ${index + 1} из ${total}` : '';
    preloadNeighbours();
  }

  /** Листаем по кругу: с последнего кадра «вперёд» возвращает к первому. */
  function step(delta: number): void {
    const total = shots.length;

    if (total < 2) {
      return;
    }

    show((current + delta + total) % total);
  }

  /** Соседние кадры грузим заранее: иначе после стрелки кадр стоит пустым. */
  function preloadNeighbours(): void {
    const total = shots.length;

    if (total < 2) {
      return;
    }

    for (const delta of [1, -1]) {
      const src = shots[(current + delta + total) % total];

      if (src === undefined) {
        continue;
      }

      const image = new Image();
      image.addEventListener('load', () => preloading.delete(image), { once: true });
      image.addEventListener('error', () => preloading.delete(image), { once: true });
      preloading.add(image);
      image.src = src;
    }
  }

  function onDialogKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      step(-1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      step(1);
    }
  }

  // Окно занимает экран целиком, поэтому закрыть его можно только кнопкой и Esc:
  // кликать по затемнению попросту негде.
  dialog.addEventListener('keydown', onDialogKeydown);
  closeButton.addEventListener('click', () => dialog.close());
  prevButton.addEventListener('click', () => step(-1));
  nextButton.addEventListener('click', () => step(1));

  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove(LOCK_CLASS);
    // Кадр отпускаем сразу: держать его в памяти незачем, а «хвост» прошлого проекта
    // иначе мелькнул бы при следующем открытии.
    photo.removeAttribute('src');
    photo.hidden = true;
    shots = [];
    current = 0;
  });

  return open;
}

/** Проект без отснятой серии: в окне показываем обложку — она у него хотя бы одна есть. */
function coverOnly(project: Project): readonly string[] {
  return project.cover === null ? [] : [project.cover];
}

/** Абзац описания. Текст приходит из данных, поэтому только textContent, без разметки. */
function createParagraph(line: string): HTMLParagraphElement {
  const paragraph = document.createElement('p');
  paragraph.textContent = line;

  return paragraph;
}
