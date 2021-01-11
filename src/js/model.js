import { async } from 'regenerator-runtime'
import { API_URL, NUMPERPAGE, KEY } from './config'
import { AJAX } from './helpers'
export const state = {
    recipe: {},
    search: {
        query: '',
        result: [],
        page: 1,
        numPerPage: NUMPERPAGE
    },
    bookmark: []
}

const persistBookmarks = function () {
    localStorage.setItem('bookmark', JSON.stringify(state.bookmark))
}

const createRecipeObject = function (data) {
    let { recipe } = data.data;
    return {
        id: recipe.id,
        image: recipe.image_url,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && { key: recipe.key })
    }
}
export const loadRecipe = async function (id) {
    try {
        const data = await AJAX(`${API_URL}${id}?key=${KEY}`)

        // console.log(data);

        // console.log(recipe);
        state.recipe = createRecipeObject(data)

        state.bookmark.some(bkmark => bkmark.id === id) ? state.recipe.bookmarked = true : state.recipe.bookmarked = false

    } catch (err) {

        throw err
    }
}

export const loadSearch = async function (query) {
    try {
        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`)
        // console.log(query);
        // console.log(data);
        state.search.query = query;
        state.search.result = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                image: rec.image_url,
                title: rec.title,
                publisher: rec.publisher,
                ...(rec.key && { key: rec.key })
            }
        })
        // console.log(state.search.result);
    } catch (err) {
        throw err
    }
}

export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page
    const start = (page - 1) * state.search.numPerPage;
    const end = (page * state.search.numPerPage)
    // console.log(start, end);
    // console.log(state.search.numPerPage);
    return state.search.result.slice(start, end)
}

export const getNewServing = function (newServing = 4) {
    // console.log(state.recipe);
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity / state.recipe.servings) * newServing

    }
    )
    state.recipe.servings = newServing
}

export const addBookmark = function (recipe) {
    state.bookmark.push(recipe);
    state.recipe.bookmarked = true
    persistBookmarks()
}

export const deleBookmark = function (id) {
    const index = state.bookmark.findIndex(el => el.id === id);
    state.bookmark.splice(index, 1);
    state.recipe.bookmarked = false;
    persistBookmarks()
}
const init = function () {
    const storage = localStorage.getItem('bookmark')
    if (storage) state.bookmark = JSON.parse(storage)
}
init()
// console.log(state.bookmark);
export const uploadRecipe = async function (newRecipe) {
    try {
        const ingredients = Object.entries(newRecipe).filter(entry => { return entry[0].startsWith('ingredient') && entry[1] !== '' }).map(ing => {

            const ingArr = ing[1].split(',').map(el => el.trim())
            if (ingArr.length !== 3) {
                throw new Error(
                    'Wrong ingredient format! please use the correct format :)'
                )
            }

            const [quantity, unit, description] = ingArr
            return { quantity: quantity ? +quantity : null, unit, description }
        })

        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients

        }
        //这个 data 是从 API 那边又传回来的数据,所以格式又变回了他一开始那样子,这个时候有需要重新进行更改格式:使用 createRecipeObject()
        const data = await AJAX(`${API_URL}?key=${KEY}`, recipe)

        state.recipe = createRecipeObject(data)
        addBookmark(state.recipe)
    } catch (err) {
        throw err
    }
}


