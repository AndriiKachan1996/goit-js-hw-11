import API from './fetch';
import renderMarcup from './render-markup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import throttle from 'lodash.throttle';

const refs = {
  gallery: document.querySelector('.gallery'),
};

const newLightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});

function infiniteScroll(searchQuery, page, per_page) {
  let toggler = false;
  window.addEventListener(
    'scroll',
    throttle(async () => {
      const height = document.body.offsetHeight;
      const screenHeight = window.innerHeight;
      const scrolled = window.scrollY;
      const threshold = height - screenHeight / 4;
      const position = scrolled + screenHeight;

      if (position < threshold || toggler) {
        return;
      }

      toggler = true;

      page += 1;

      const fetchedImages = await API.getPhotos(searchQuery, page, per_page);

      refs.gallery.insertAdjacentHTML(
        'beforeend',
        renderMarcup.createMarcup(fetchedImages.hits)
      );

      newLightbox.refresh();

      if (per_page * page >= fetchedImages.totalHits) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );

        toggler = true;
        return;
      }

      toggler = false;
    }, 400)
  );
}

export default { infiniteScroll };
