
import * as model from "./model.js"
import searchView from "./views/searchView"
import recipeView from "./views/recipeView.js"
import resultView from "./views/resultView"
import paginationView from "./views/paginationView"
import bookmarkView from "./views/bookmarkView.js"
import addRecipeView from "./views/addRecipeView.js"
import { UPLOADSUCC_SEC } from "./config"

// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
// import { async } from 'regenerator-runtime'

// if (module.hot) {
//   module.hot.accept()
// }



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const controlRecipe = async function () {
  try {
    let id = window.location.hash.slice(1)
    if (!id) return;

    recipeView.renderSpin()

    //update results view to mark selected search result 
    resultView.update(model.getSearchResultsPage())
    //getting the recipe
    await model.loadRecipe(id)

    //rendering the recipe
    recipeView.render(model.state.recipe)

    bookmarkView.update(model.state.bookmark)

    // console.log(model.state.recipe);

  } catch (err) {
    recipeView.renderError(err)
    console.log(err);
  }
}

const controlSearch = async function () {
  try {
    resultView.renderSpin();
    // let query = getQuery()
    // console.log('hi');
    const query = searchView.searchResult()
    if (!query) return

    await model.loadSearch(query)

    resultView.render(model.getSearchResultsPage(1))
    // console.log(paginationView['_pageToRender']);
    // console.log(paginationView.generatePage());
    // console.log(model.state.search.page);

    paginationView.render(model.state.search)
    // console.log(model.getSearchResultsPage(1));
    // console.log(model.state.search.result);
    // paginationView.generatePage(model.state.search.page)
    // resultView.renderSearch()
    // model.getSearchResultsPage(1)
    // paginationView.render(model.state.search)



  } catch (err) {
    console.log(err);
    searchView.renderError(err.message)
  }
}

const controlPagination = function (pageToGo) {
  resultView.render(model.getSearchResultsPage(pageToGo))
  paginationView.render(model.state.search)
}

const controlServing = function (buttserving) {
  // console.log(buttserving);
  //update to new serving
  model.getNewServing(buttserving)
  //render again
  recipeView.update(model.state.recipe)


}

const controlBookmark = function () {
  if (model.state.recipe.bookmarked) {
    model.deleBookmark(model.state.recipe)

  }
  else {
    model.addBookmark(model.state.recipe)


  }
  recipeView.update(model.state.recipe)

  //render bookmarks
  bookmarkView.render(model.state.bookmark)

}

const controlBookmarkStart = function () {
  bookmarkView.render(model.state.bookmark)
}


const controlAddRecipe = async function (data) {
  try {
    addRecipeView.renderSpin()
    await model.uploadRecipe(data)

    //render recipe
    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage()
    bookmarkView.render(model.state.bookmark)
    window.history.pushState(null, '', `#${model.state.recipe.id}`)
    setTimeout(() => {
      addRecipeView.toggleWindow()
    }, UPLOADSUCC_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message)
  }
}


const init = function () {

  recipeView.addHandlerRender(controlRecipe)
  recipeView.addHandlerRenderUpdate(controlServing)
  searchView.addHandlerRender(controlSearch)
  recipeView.addHandlerBookmark(controlBookmark)
  // paginationView.addHandlerRender(controlPagination)
  paginationView.addHandlerRender(controlPagination)
  bookmarkView.addHandlerRenderBookmarkStart(controlBookmarkStart)
  addRecipeView.addHandlerSubmit(controlAddRecipe)

  // paginationView.addHandlerRender_nex(controlPagination)
}

init()
