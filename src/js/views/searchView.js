
class SearchView {

    _parentElement = document.querySelector('.search')

    _search__field = document.querySelector('.search__field')
    _searchButton = document.querySelector('.btn search__btn')


    _clearInput() {
        this._search__field.value = ''
    }
    searchResult() {

        const query = this._search__field.value;
        this._clearInput();
        return query

    }
    addHandlerRender(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            handler()

        })

    }
}

export default new SearchView()