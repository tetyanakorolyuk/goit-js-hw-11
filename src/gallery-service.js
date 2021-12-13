const axios = require('axios').default;
const API_KEY = '24709969-56f23eaa776325f7f26981573';
const BASE_URL = 'https://pixabay.com/api/';

export default class GalleryApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchImages() {
        const url = `${BASE_URL}?key=${API_KEY}`;

        return await axios.get(
                url +
                '&' +
                new URLSearchParams({
                    q: this.searchQuery,
                    image_type: 'photo',
                    orientation: 'horizontal',
                    safesearch: true,
                    page: this.page,
                    per_page: 40,
                }),
            )
            .then(response => {
                const data = response.data;
                this.incrementPage();
                return data;
            })
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