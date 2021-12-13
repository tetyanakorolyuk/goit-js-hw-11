import './sass/main.scss';
import imagesTpl from './gallery.hbs';
import GalleryApiService from './gallery-service.js';
import LoadMoreBtn from './load-more-btn.js';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    searchForm: document.querySelector('.search-form'),
    imagesContainer: document.querySelector('.gallery'),
};

const loadMoreBtn = new LoadMoreBtn({
    selector: '.load-more',
    hidden: true,
});

const galleryApiService = new GalleryApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

async function onSearch(e) {
    try {
        e.preventDefault();

        galleryApiService.query = e.currentTarget.elements.searchQuery.value;

        if (galleryApiService.query === '') {
            return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }

        loadMoreBtn.show();
        galleryApiService.resetPage();
        clearImagesContainer();
        await fetchImages();
    } catch (error) {
        console.log(error)
    }
}

async function fetchImages() {
    try {
        loadMoreBtn.disable();
        await galleryApiService.fetchImages().then(data => {
            appendImagesMarkup(data);
            loadMoreBtn.enable();
        });
    } catch (error) {
        console.log(error)
    }
}

async function appendImagesMarkup(data) {
    try {
        refs.imagesContainer.insertAdjacentHTML('beforeend', imagesTpl(data.hits));
        console.log(data);
        const lightbox = new SimpleLightbox('.gallery a');
        await lightbox.refresh();

        if (data.hits.length === 0) {
            loadMoreBtn.hide();
            clearImagesContainer();
            return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
        if (data.hits.length < 40) {
            loadMoreBtn.hide();
            return Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        }
        loadMoreBtn.enable();
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
    } catch (error) {
        console.log(error)
    }
}

function clearImagesContainer() {
    refs.imagesContainer.innerHTML = '';
}