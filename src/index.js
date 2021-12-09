import './sass/main.scss';

import articlesTpl from './articles.hbs';
import NewsApiService from './news-service.js';
import LoadMoreBtn from './load-more-btn.js';
// import Notiflix from 'notiflix';

const refs = {
    searchForm: document.querySelector('.search-form'),
    articlesContainer: document.querySelector('.gallery'),
};
const loadMoreBtn = new LoadMoreBtn({
    selector: '.load-more',
    hidden: true,
});
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(e) {
    e.preventDefault();

    newsApiService.query = e.currentTarget.elements.searchQuery.value;

    if (newsApiService.query === '') {
        return alert('Введи что-то нормальное');
    }

    loadMoreBtn.show();
    newsApiService.resetPage();
    clearArticlesContainer();
    fetchArticles();
}

function fetchArticles() {
    loadMoreBtn.disable();
    newsApiService.fetchArticles().then(articles => {
        appendArticlesMarkup(articles);
        loadMoreBtn.enable();
    });
}

function appendArticlesMarkup(articles) {
    refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(articles));
}

function clearArticlesContainer() {
    refs.articlesContainer.innerHTML = '';
}