const API_KEY = '24709969-56f23eaa776325f7f26981573';
const BASE_URL = 'https://pixabay.com/api/';
const options = {
    headers: {
        Authorization: API_KEY,
    },
};

export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchArticles() {
        const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

        return fetch(url, options)
            .then(response => response.json())
            .then(({ articles }) => {
                this.incrementPage();
                return articles;
            });
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}