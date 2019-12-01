import {elements} from './utils';

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
        <a class="results__link" href="${recipe.source_url}">
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

export const renderRecipes = recipes => {
    recipes.forEach(recipe => {
        renderRecipe(recipe)
    });
    // clear the search string entered in text box
    clearSearchInput();
};

export const clearRecipeList = () =>{
    elements.recipeList.innerHTML = '';
};