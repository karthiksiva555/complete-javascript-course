import {elements, elementStrings} from './utils';

export const getSearchQuery = ()=> elements.searchQuery.value;

export const clearSearchInput = ()=>{
    elements.searchQuery.value = '';
};

const limitedTitle = (title, limit=17)=>{
    
    if(title.length<=limit) return title;
    
    let newTitle = new Array();
    title.split(' ').reduce((acc, cur)=>{
        if(acc+cur.length<=limit)
            newTitle.push(cur);
        return acc+cur.length;
    }, 0);
    
    return newTitle.join(' ')+'...';
};

const renderRecipe = recipe =>{
    
    // shorten the title if exceeding one line
    //console.log(limitedTitle(recipe.title));
    
    const recipeTemplate = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitedTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`;

    // add recipe to the last element of recipe list on UI
    elements.recipeList.insertAdjacentHTML('beforeend', recipeTemplate);
};

// Without pagination
// export const renderRecipes = recipes => {
//     recipes.forEach(recipe => {
//         renderRecipe(recipe)
//     });
//     // clear the search string entered in text box
//     clearSearchInput();
// };

// type: prev or next
const createButton = (pageNo, type)=>{
    return `
    <button class="${elementStrings.inline} results__btn--${type}" data-goto=${type==='prev'?pageNo-1:pageNo+1}>
        <span>Page ${type==='prev'?pageNo-1:pageNo+1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type==='prev'?'left':'right'}"></use>
        </svg>
    </button>
    `;
}

export const renderPaginationButtons = (totalPages, currentPage)=>{

    let buttonCode;
    // if list has less than 10 results
    if(totalPages===1) return;

    // if on first page, show only next button
    if(currentPage === 1){
        buttonCode = createButton(currentPage, 'next');
    }
    // if on last page, show only prev button
    else if(totalPages === currentPage){
        buttonCode = createButton(currentPage, 'prev');
    }
    // if in middle pages, show both prev and next buttons
    else if(currentPage<totalPages){
        buttonCode = `
        ${createButton(currentPage, 'prev')}
        ${createButton(currentPage, 'next')}
        `;
    }
    
    // insert this buttonCode HTML after begin of result page list
    elements.resultsPagination.insertAdjacentHTML('afterbegin', buttonCode);
};

// with pagination
export const renderRecipes = (recipes, pageNo = 1, recipesPerPage = 10) => {

    // show only page data
    // if pageNo = 1 => start = 0 and end = 9
    // if pageNo = 2 => start = 10 and end =19
    const start=(pageNo-1)*recipesPerPage;
    const end = pageNo * recipesPerPage;
    recipes.slice(start, end).forEach(recipe => {
        renderRecipe(recipe)
    });
    const totalPages = Math.ceil(recipes.length/recipesPerPage);
    
    // show pagination buttons
    renderPaginationButtons(totalPages, pageNo);

    // clear the search string entered in text box
    clearSearchInput();
};

export const clearRecipeList = () =>{
    elements.recipeList.innerHTML = '';
    elements.resultsPagination.innerHTML = '';
};