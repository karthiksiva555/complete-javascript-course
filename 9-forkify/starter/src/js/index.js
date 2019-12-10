import Search from "../models/Search";
import {elements, loadSpinner, clearSpinner, elementStrings} from '../views/utils';
import * as searchView from '../views/searchView';
import Recipe from "../models/Recipe";
import * as recipeView from '../views/recipeView';
import * as shopListView from '../views/shopListView';
import ShopList from "../models/ShopList";
import Likes from "../models/Likes";
import * as likesView from '../views/likesView';

// Global app controller

// Modules practice-----------------------------------------------------------------------
// 1. importing a default export
// import num from './test';
// console.log(`default import test: ${num}`);

// 2. importing named exports
// 2.1 importing with same names as export
// import {add, multiply, Id} from './test';
// console.log(`Add: ${add(10,Id)}, Multiply: ${multiply(10,Id)}`);

// // 2.2 importing with different names as export: using 'as'
// import {add as a, multiply as m, Id as id} from './test';
// console.log(`Add: ${a(10,id)}, Multiply: ${m(10,id)}`);

// //2.3 with *
// 3.2: with *
// import * as testNames from './test';
// console.log(`Add: ${testNames.add(10,testNames.Id)}, Multiply: ${testNames.multiply(10,testNames.Id)}`);

// // 3. Importing default and named exports at a time
// 3.1: with individual names
// import num, {add as a, multiply as m, Id as id} from './test';
// console.log(`default param: ${num}, Add: ${a(10,id)}, Multiply: ${m(10,id)}`);

// Babel - Convert ES6 to ES5 practice: make sure section 1 is uncommented for this to work--------------------------
// import num from './test';
// const conv = 'this is  test string in ES6';
// console.log(`the number ${num} is imported from test.js. ES6 string after babel magic ${conv}`);

// Forkify project - controller - index.js

// forkify API call

// this being the controller, calls the search model and receives the related recipes

// this is a state variable to access the current state of application at any given moment
/**Store the below
 * search object
 */
const state ={};

window.state = state;

// For Testing: before adding localStorage
//state.likes = new Likes();

async function onSearchClicked(){
    
    // get the search query entered by the user: UI interaction
    const query = searchView.getSearchQuery();
    
    // show spinner during while data being fetched from database
    loadSpinner(elements.recipesDiv);

    // initialize search model
    const search = new Search(query);
    state.search = search;
    await state.search.getResults();
    //console.log(state.search.recipes);
    
    // clear the current list, if already populated
    searchView.clearRecipeList();
    
    // stop the spinner
    clearSpinner();

    // send the list to UI
    searchView.renderRecipes(state.search.recipes);
};

//add event listener to form submit
elements.searchForm.addEventListener('submit', e=>{
    e.preventDefault();
    onSearchClicked();
});

// on pagination button is clicked
elements.resultsPagination.addEventListener('click', e=>{
    //console.log(e.target.closest('.btn-inline'));
    const buttonClicked = e.target.closest(`.${elementStrings.inline}`);
    const pageToGo = parseInt(buttonClicked.dataset.goto);
    searchView.clearRecipeList();
    searchView.renderRecipes(state.search.recipes, pageToGo);
});

//onSearchClicked();

// This is to test if model fetching the recipes correctly
//const search = new Search('bacon');
//search.getResults().then(()=>console.log(search.recipes));
//console.log(search.recipes);

/**
 * Recipe Controller
 */

 // when the hash in the URL changes, or page re-loads => call the Recipe model to get recipe based on hash

async function getRecipe(){
    // remove the # from the URL Hash value. Eg: #1234 => 1234
    const id = window.location.hash.replace('#','');
    
    // if there is an ID exists in the URL 
    if(id){

        // load the spinner
        loadSpinner(elements.recipeDiv);

        // clear the recipe page if already loaded with someother recipe
        recipeView.clearRecipe();

        // highlight the selector on recipe
        if(state.recipe) recipeView.highlightRecipeSelection(id);

        // initialize the recipe model
        state.recipe = new Recipe(id);
        await state.recipe.getRecipe();
        
        // calculate time and servings
        state.recipe.calculateTime();
        state.recipe.noOfServings();

        // parse ingredients
        state.recipe.parseIngredients();
        
        // render recipe on web page
        recipeView.renderRecipe(state.recipe, state.likes.isLiked(id)); 
        shopListView.clearShoppingList();

        // clear the spinner as the data processing has been complete
        clearSpinner();
    }
};

// hashchange and load are window object related events
['hashchange', 'load'].forEach(event=>window.addEventListener(event, getRecipe));

elements.recipeDiv.addEventListener('click', e=>{

    // <className>,<className> * => element that matches className and all its child elements
    if(e.target.matches(`.${elementStrings.servingDecrease}, .${elementStrings.servingDecrease} *`)){
        if(state.recipe.servings>1){
            state.recipe.updateServingsAndIngs('decrease');
            recipeView.updateIngredientAndServings(state.recipe);     
        }
    } else if(e.target.matches(`.${elementStrings.servingIncrease},.${elementStrings.servingIncrease} *`)){
        state.recipe.updateServingsAndIngs('increase');
        recipeView.updateIngredientAndServings(state.recipe);     
    } else if(e.target.matches(`.${elementStrings.btnAddToList}, .${elementStrings.btnAddToList} *`)){
        controlShopList();
    } else if(e.target.matches('.recipe__love, .recipe__love *')){
        controlLikes();
    }
});

/**
 * Shopping List Controller
 */

 // this exposes list to console so we can test the methods of ShopList()
 // window.list = new ShopList();

 const controlShopList = ()=>{
    
    if(!state.shopList) state.shopList = new ShopList();

    shopListView.clearShoppingList();
    state.recipe.parsedIngredients.forEach(ing=>{
        // add the item to the list model
        const item = state.shopList.addItem(ing.unitVal, ing.unit, ing.ingredient);

        // add the item to the UI; we can also send ing as param; but item is optimal coz it has only three props, don't send extra props
        shopListView.renderShoppingItem(item);
    });
 }

// click on any of shopping list area
elements.shoppingList.addEventListener('click', e=>{
    const id = e.target.closest('.shopping__item').dataset.itemid;
    
    // if clicked on the shopping list item delete
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        state.shopList.deleteItem(id);
        shopListView.deleteShoppingItem(id);
    } else if(e.target.matches('.shopping__count-value')){
        // when the arrow up / down clicked that updates the unit value
        const newUnitVal = parseFloat(e.target.value, 10);
        state.shopList.updateItemUnitVal(id, newUnitVal);
    }
});

/**
 * Likes Controller
 */

 const controlLikes = ()=>{
    if(!state.likes) state.likes = new Likes();
    
    const currentId = state.recipe.recipe_id;

    // if the current recipe is already liked
    if(state.likes.isLiked(currentId)){
        // remove the recipe from Likes list
        state.likes.deleteLike(currentId);
        // toggle the like button
        likesView.toggleLikesBtn(false);
        // remove like from the list
        likesView.removeFromLikesList(currentId);        
    } else{
        // add the recipe to Likes list
        state.likes.addLike(currentId, state.recipe.title, state.recipe.publisher,state.recipe.image_url);
        // toggle the like button 
        likesView.toggleLikesBtn(true);
        // render the likes in the list
        const like = {
            id:currentId, title:state.recipe.title, author:state.recipe.publisher, img:state.recipe.image_url
        };
        likesView.addToLikesList(like);
    }

    likesView.toggleLikesList(state.likes.likesCount());
 };

 window.addEventListener('load', ()=>{
    restoreLikes();
 });

 const restoreLikes = ()=>{
    state.likes = new Likes();

    state.likes.restoreData();

    state.likes.likes.forEach(lk => likesView.addToLikesList(lk));
 };