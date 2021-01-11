import View from "./View"

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload')
    _window = document.querySelector('.add-recipe-window')
    _overlay = document.querySelector('.overlay')
    _uploadButton = document.querySelector('.upload__btn')
    _openButton = document.querySelector('.nav__btn--add-recipe')
    _closeButton = document.querySelector('.btn--close-modal')
    _message = 'Your recipe has been successfully uploaded! You are Gordon Ramsey'
    constructor() {
        super()
        this.addHandler()
    }

    addHandler() {
        [this._closeButton, this._openButton].forEach(button => {
            button.addEventListener('click', () => {


                this.toggleWindow()
            })
        })
    }

    toggleWindow() {
        this._window.classList.toggle('hidden')
        this._overlay.classList.toggle('hidden')
    }

    addHandlerSubmit(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr)
            handler(data)
        })
    }
}

export default new AddRecipeView()