import View from "./View"
import icons from "url:../../img/icons.svg"

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination')
    // _pageToRender = this._data.page
    // _pageToRender = 1

    _generateMarkup() {
        const curPage = this._data.page
        const numPages = Math.ceil(this._data.result.length / this._data.numPerPage)
        // return this
        // _pageToRender = this._data.page

        //page1 and there are other pages
        if (curPage === 1 && numPages > 1) {
            return `
            <button data-goto='${curPage + 1}' class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> `
        }
        //last page
        if (curPage === numPages && numPages > 1) {
            return `
            <button data-goto='${curPage - 1}' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>`
        }
        //in the middle of many pages
        if (curPage < numPages) {
            return `
            <button data-goto='${curPage - 1}' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          <button data-goTo='${curPage + 1}' class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> 
            `
        }

        //only 1 page
        return ''

    }
    addHandlerRender(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const button = e.target.closest('.btn--inline')
            if (!button) return
            // console.log(button);
            const pageToGo = +button.dataset.goto
            handler(pageToGo)
        })
    }


}

export default new PaginationView()

// const chili = new PaginationView()
// console.log(chili._data.page);