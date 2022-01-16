import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

import './css/styles.css';
import ImagesApiService from './images-service';


const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

const imagesApiService = new ImagesApiService();
 
form.addEventListener('submit', onSearch)
loadMoreBtn.addEventListener('click', onLoadMoreClick);
gallery.addEventListener('click', onImageClick);

loadMoreBtn.classList.add("visually-hidden");

function onSearch(event) {
    event.preventDefault();
   
    imagesApiService.query = event.currentTarget.elements.searchQuery.value;
  
     
    clearContainer();
    imagesApiService.resetPage();
    fetchMoreImages();  
}


function fetchMoreImages() {
    loadMoreBtn.classList.remove("visually-hidden");
    imagesApiService.fetchImages().then(hits => {
        // console.log(hits);
        if (hits.length === 0) {
          loadMoreBtn.classList.add("visually-hidden");
          Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again!')
          return
        }; 
       loadMoreBtn.disabled = true;
       imagesMarkup(hits);
        loadMoreBtn.disabled = false;
        console.log(hits.length);
       
    } ); 
}

function onLoadMoreClick() {
    if (imagesApiService.page === 13) {
        const message = `<p class = "message"> <b> We're sorry, but you've reached the end of search results. </b></p>`
        Notiflix.Notify.success('Hooray! We found totalHits images.');
        
        fetchMoreImages();
        
        gallery.insertAdjacentHTML('afterend', message);

        loadMoreBtn.classList.add("visually-hidden");
        return;
    };
    // console.log(imagesApiService.page);
    fetchMoreImages();
     gallery.refresh();
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
    // console.log(imagesMarkup);
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

    // console.log(event.target.nodeName);
    const modal = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        overlay: true
    });
}