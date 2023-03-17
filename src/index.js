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
  page = +1;
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
      pre_page: 40,
    },
  };
  try {
    const response = await axios.get(
      URL, options
    );
    const quntity = response.data.totalHits;
    console.log(response.data);
    Notify.success(`Hooray! We found ${quntity} images.`);
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

// refs.btnLoad.style.display = 'block';

// const fetchElement = async () => {
//   const API_KEY = '34475511-5e81bdf830d449013fbfa8a58';
//   const URL = 'https://pixabay.com/api/';

//   const response = await fetch(
//     `'${URL}?key=${API_KEY}&q=${queryEl}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNum}&pre_page=40'`
//   );
//   if (!response.ok) {
//     throw new Error(response.status);
//   }
//   return await response.json();
// };

/* <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div> */

// "Hooray! We found totalHits images."

// "Sorry, there are no images matching your search query. Please try again."

// "We're sorry, but you've reached the end of search results."

/* const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
}); */

// key - твій унікальний ключ доступу до API.
// q - термін для пошуку. Те, що буде вводити користувач.
// image_type - тип зображення. На потрібні тільки фотографії, тому постав значення photo.
// orientation - орієнтація фотографії. Постав значення horizontal.
// safesearch - фільтр за віком. Постав значення true.

// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.

// Notiflix.Notify.success('Sol lucet omnibus');

// Notiflix.Notify.failure('Qui timide rogat docet negare');

// Notiflix.Notify.warning('Memento te hominem esse');

// Notiflix.Notify.info('Cogito ergo sum');
