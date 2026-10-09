import { projects } from './data/projects';
import { requireElement } from './dom';
import { renderGallery } from './gallery';
import { initIntro } from './intro';
import { initLightbox } from './lightbox';

initIntro();

const gallery = requireElement<HTMLElement>('#gallery');
const openProject = initLightbox();

renderGallery(gallery, projects, openProject);
