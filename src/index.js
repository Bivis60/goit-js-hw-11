import './css/styles.css';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  input: document.querySelector('input'),
  gallery: document.querySelector('.gallery'),
  btnLoad: document.querySelector('.load-more'),
};

let page = 1;

refs.searchForm.addEventListener('submit', searchElements);
refs.btnLoad.addEventListener('click', loadMore);

function searchElements(event) {
  event.preventDefault();

  page = 1;
  refs.gallery.innerHTML = '';
  refs.btnLoad.style.display = 'none';
  const queryEl = refs.input.value.trim();

  if (queryEl !== '') {
    fetchElements(queryEl, page);
  } else {
    return Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

function loadMore() {
  page += 1;
  const queryEl = refs.input.value.trim();
  fetchElements(queryEl, page);
}

async function fetchElements(queryEl, page) {
  const URL = 'https://pixabay.com/api/';
  const API_KEY = '34475511-5e81bdf830d449013fbfa8a58';
  const options = {
    params: {
      key: API_KEY,
      q: queryEl,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: page,
      per_page: 40,
    },
  };

  try {
    const response = await axios.get(URL, options);
    const quntity = response.data.totalHits;
    const result = response.data;
    const length = response.data.hits.length;

    messages(length, quntity);
    createGallery(result);

  } catch (error) {
    console.log(error);
  }
}

function createGallery(elements) {
  const marcup = elements.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<a class="card-link" href="${largeImageURL}">
                <div class="photo-card">
                  <img src="${webformatURL}" alt="${tags}" width = 240 loading="lazy" />
                    <div class="info">
                      <p class="info-item">
                        <b>Likes</b> ${likes}
                      </p>
                      <p class="info-item">
                        <b>Views</b> ${views}
                      </p>
                      <p class="info-item">
                        <b>Comments</b> ${comments}
                      </p>
                      <p class="info-item">
                        <b>Downloads</b> 
                        ${downloads}
                      </p>
                    </div>
                </div>
              </a>`
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', marcup);
  galleryElement.refresh();
}

let galleryElement = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function messages(length, quntity) {
  if (length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  if (page === 1) {
    refs.btnLoad.style.display = 'block';
    Notify.success(`Hooray! We found ${quntity} images.`);
  }
  if (length < 40) {
    refs.btnLoad.style.display = 'none';
    Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}
