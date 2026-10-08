import { requireElement } from './dom';

/** Класс на <html>: пока он есть, страница под приветственным экраном не прокручивается. */
const LOCK_CLASS = 'is-intro-open';

/** Класс ухода: включает затухание оверлея. */
const LEAVING_CLASS = 'is-leaving';

/** Совпадает с transition у .intro.is-leaving в main.css — код ждёт ровно этот срок. */
const LEAVE_DURATION = 420;

/** Сколько экран висит сам, если человек ничего не нажал: 10 секунд. */
const AUTO_CLOSE_DELAY = 10_000;

/**
 * Приветственный экран: показывается поверх сайта до первого действия. Пока он открыт,
 * контент страницы помечен inert — Tab и клики под оверлей не уходят. Экран уходит сам
 * через AUTO_CLOSE_DELAY, раньше — по Esc или по кнопке, если она есть в разметке.
 * После закрытия блок убирается, а фокус переходит к содержимому.
 *
 * Если блока .intro на странице нет, функция молча ничего не делает.
 */
export function initIntro(): void {
  const intro = document.querySelector<HTMLElement>('.intro');

  if (intro === null) {
    return;
  }

  setupIntro(intro);
}

function setupIntro(intro: HTMLElement): void {
  const page = requireElement<HTMLElement>('#page');
  const main = requireElement<HTMLElement>('#main');
  // Кнопка необязательна: экран может закрываться только сам и по Esc.
  const cta = intro.querySelector<HTMLButtonElement>('.intro__cta');

  document.documentElement.classList.add(LOCK_CLASS);
  page.inert = true;
  intro.focus({ preventScroll: true });

  let leaving = false;
  // Экран уходит сам: сайт не должен оставаться закрытым, если человек просто смотрит.
  const autoTimer = window.setTimeout(close, AUTO_CLOSE_DELAY);

  const onKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      close();
    }
  };

  function close(): void {
    if (leaving) {
      return;
    }

    leaving = true;
    window.clearTimeout(autoTimer);
    document.removeEventListener('keydown', onKeydown);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduced) {
      intro.classList.add(LEAVING_CLASS);
    }

    window.setTimeout(
      () => {
        intro.remove();
        document.documentElement.classList.remove(LOCK_CLASS);
        page.inert = false;
        main.focus({ preventScroll: true });
      },
      reduced ? 0 : LEAVE_DURATION,
    );
  }

  cta?.addEventListener('click', close);
  document.addEventListener('keydown', onKeydown);
}
