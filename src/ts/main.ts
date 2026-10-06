import { projects } from './data/projects';
import { renderGallery } from './gallery';

const gallery = document.querySelector<HTMLElement>('#gallery');

if (gallery === null) {
  throw new Error('Не найден контейнер галереи #gallery');
}

renderGallery(gallery, projects);
