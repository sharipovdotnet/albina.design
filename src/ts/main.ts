import { projects } from './data/projects';
import { requireElement } from './dom';
import { renderGallery } from './gallery';
import { initIntro } from './intro';

initIntro();

const gallery = requireElement<HTMLElement>('#gallery');

renderGallery(gallery, projects);
