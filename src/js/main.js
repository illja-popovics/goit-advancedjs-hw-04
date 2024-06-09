import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '44296746-7471de79088029a055864728c';
const BASE_URL = 'https://pixabay.com/api/';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');

let query = '';
let page = 1;
let totalHits = 0;
let lightbox;

const fetchImages = async (searchQuery, page) => {
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({ title: 'Error', message: 'Failed to fetch images' });
  }
};

const createImageCard = ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
  <div class="photo-card">
    <a href="${largeImageURL}" data-lightbox="gallery">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
        <div class="info-item-wrapper">
            <p class="info-item"><b>Likes</b></p>
            <p class="info-item">${likes}</p>
        </div>
        <div class="info-item-wrapper">
            <p class="info-item"><b>Views</b></p>
            <p class="info-item">${views}</p>
        </div>

        <div class="info-item-wrapper">
            <p class="info-item"><b>Comments</b></p>
            <p class="info-item">${comments}</p>
        </div>

        <div class="info-item-wrapper">
            <p class="info-item"><b>Downloads</b></p>
            <p class="info-item">${downloads}</p>
        </div>
    </div>
  </div>
`;


const renderImages = images => {
  const markup = images.map(createImageCard).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
  } else {
    lightbox.refresh();
  }
};

const handleSearch = async event => {
  event.preventDefault();
  query = event.currentTarget.elements.searchQuery.value.trim();
  if (!query) return;

  page = 1;
  gallery.innerHTML = '';

  const data = await fetchImages(query, page);
  totalHits = data.totalHits;

  if (data.hits.length === 0) {
    iziToast.warning({ title: 'No results', message: 'Sorry, there are no images matching your search query. Please try again.' });
    return;
  }

  iziToast.success({ title: 'Hooray!', message: `We found ${totalHits} images.` });
  renderImages(data.hits);
};

const loadMoreImages = async () => {
  if (query && page * 40 < totalHits) {
    page += 1;
    const data = await fetchImages(query, page);
    renderImages(data.hits);
  }
};

const handleIntersection = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadMoreImages();
    }
  });
};

const observer = new IntersectionObserver(handleIntersection, {
  rootMargin: '200px',
});

form.addEventListener('submit', handleSearch);

// Create a sentinel element
const sentinel = document.createElement('div');
sentinel.className = 'sentinel';
document.body.appendChild(sentinel);

// Start observing the sentinel
observer.observe(sentinel);
