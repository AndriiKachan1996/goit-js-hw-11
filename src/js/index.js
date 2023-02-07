import '../css/styles.css';

import API from './fetch';
import renderMarcup from './render-markup';
import infinityScroll from './infinite-scroll';

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const per_page = 40;

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
});

const refs = {
  searchForm: document.getElementById('search-form'),
  searchInput: document.getElementById('search-input'),
  gallery: document.querySelector('.gallery'),
};

refs.searchForm.addEventListener('submit', onSubmit);

// =================================================================

async function onSubmit(e) {
  e.preventDefault();

  const inputValue = refs.searchInput.value.trim();
  let page = 1;

  if (!inputValue) {
    return;
  }

  formReset();

  try {
    const fetchCards = await API.getPhotos(inputValue, page, per_page);

    if (fetchCards.total === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    Notiflix.Notify.info(`Hooray! We found ${fetchCards.totalHits} images.`);

    refs.gallery.insertAdjacentHTML(
      'beforeend',
      renderMarcup.createMarcup(fetchCards.hits)
    );

    lightbox.refresh();

    if (per_page * page >= fetchCards.totalHits) {
      return;
    }
  } catch (error) {
    console.log(error);
  } finally {
    refs.searchForm.reset();
  }

  infinityScroll.infiniteScroll(inputValue, page, per_page);
}

function formReset() {
  refs.gallery.innerHTML = '';
}
