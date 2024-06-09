// main.js
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const API_KEY = '44296746-7471de79088029a055864728c';
const BASE_URL = 'https://pixabay.com/api/';
let searchQuery = '';
let page = 1;

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  searchQuery = event.target.searchQuery.value.trim();
  if (searchQuery === '') return;

  page = 1;
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('hidden');
  await fetchImages();
});

loadMoreBtn.addEventListener('click', fetchImages);

async function fetchImages() {
  try {
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
    const { hits, totalHits } = response.data;

    if (hits.length === 0) {
      iziToast.error({ message: 'Sorry, there are no images matching your search query. Please try again.' });
      return;
    }

    renderImages(hits);
    iziToast.success({ message: `Hooray! We found ${totalHits} images.` });

    if (page * 40 < totalHits) {
      loadMoreBtn.classList.remove('hidden');
    } else {
      loadMoreBtn.classList.add('hidden');
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    }

    page += 1;
  } catch (error) {
    console.error(error);
  }
}

function renderImages(images) {
  const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <a href="${largeImageURL}" class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item"><b>Likes</b> ${likes}</p>
        <p class="info-item"><b>Views</b> ${views}</p>
        <p class="info-item"><b>Comments</b> ${comments}</p>
        <p class="info-item"><b>Downloads</b> ${downloads}</p>
      </div>
    </a>
  `).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
  scrollPage();
}

function scrollPage() {
  const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
