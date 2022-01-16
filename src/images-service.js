export default class ImagesApiService {
    constructor() {
        this.searchName = '';
        this.page = 1;
    }
    fetchImages() {
        console.log(this);

       const url = `https://pixabay.com/api/?key=25256496-da285e9dc7351a7d44328e376&q=${this.searchName}&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&page=${this.page}`;
        return fetch(url)
            .then(resopnse => resopnse.json())
            .then(data => {
                this.incrementPage();

                return data.hits;
            }); 
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchName;
    }

    set query(newQuery) {
        this.searchName = newQuery;
    }
}

