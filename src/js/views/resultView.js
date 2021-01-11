import previewView from "./previewView"
import icons from "url:../../img/icons.svg"
class ResultView extends previewView {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query, please try again';
  _message = ''

  _generateMarkup() {
    // this._clear()
    // console.log(this._data);
    return this._data.map(this._generateMarkupPreview.bind(this)).join('')
  }
  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1)
    return `
        <li class="preview">
        <a class="preview__link  ${result.id === id ? 'preview__link--active' : ''}"href="#${result.id}">
          <figure class="preview__fig">
            <img src=${result.image} alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            <div class="preview__user-generated ${this._data.key ? '' : 'hidden'}">
              <svg>
                <use href="${icons}#icon-user "></use>
              </svg>
            </div>
          </div>
        </a>
        </li>`
  }

}
export default new ResultView()