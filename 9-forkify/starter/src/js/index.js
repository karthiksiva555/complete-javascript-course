import Search from "../models/Search";
import {elements, loadSpinner, clearSpinner, elementStrings} from '../views/utils';
import * as searchView from '../views/searchView';

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