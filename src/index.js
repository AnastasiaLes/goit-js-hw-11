import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

import './css/styles.css';
import ImagesApiService from './images-service';


const DEBOUNCE_DELAY = 300;
const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

const imagesApiService = new ImagesApiService();
 
form.addEventListener('submit', onSearch)
loadMoreBtn.addEventListener('click', fetchImages);
gallery.addEventListener('click', onImageClick);

loadMoreBtn.disabled = true;

function onSearch(event) {
    event.preventDefault();

    imagesApiService.query = event.currentTarget.elements.searchQuery.value;
    // console.log(searchName);
    clearContainer();
    imagesApiService.resetPage();
    fetchImages();  
}


function fetchImages() {
   imagesApiService.fetchImages().then(hits => {
       loadMoreBtn.disabled = true;
       imagesMarkup(hits);
    loadMoreBtn.disabled = false;
    } ); 
}

function onError(hits) {
    if (hits === []) {
return console.log('Sorry');
    }
}


function imagesMarkup(hits) {
   const imagesMarkup = hits.map(({ largeImageURL, previewURL, likes, views, comments, downloads }) =>
       `<div class="photo-card">
        <a href="${largeImageURL}">
  <img src="${previewURL}" width = "200" height = "130" alt="" loading="lazy" />
  </a>
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
      <b>Downloads</b> ${downloads}
    </p>
  </div>
</div>`).join('');
    console.log(imagesMarkup);
    gallery.insertAdjacentHTML('beforeend', imagesMarkup);
}

function clearContainer() {
    gallery.innerHTML = '';
}

function onImageClick(event) {
    event.preventDefault();

    if (event.target.nodeName !== 'IMG') {
        return;
    }

    console.log(event.target.nodeName);
    const modal = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        overlay: true
    });
}