import { elements, elementStrings } from './utils';
import { Fraction } from 'fractional';

export const clearRecipe = ()=>{
    elements.recipeDiv.innerHTML = '';
};

export const formatUnitValue = unitVal => {

    // if value is 3.5 => return 3 1/2 
    // if value is 0.5 => return 1/2
    
    // integer, decimal 
    const [int, dec] = unitVal.toString().split('.').map(el=>parseInt(el, 10));
    if(!dec) return unitVal; // if number is not decimal, eg: 3, return 3
   
    // if integer =0 => value is 0.n so the result would be like 1/x
    if(int===0){
        const fr = new Fraction(unitVal);
        return `${fr.numerator}/${fr.denominator}`;
    } else{ // input is n.5 so result would be x 1/y format
        const fr = new Fraction(unitVal-int);
        return `${int} ${fr.numerator}/${fr.denominator}`;
    }
};

export const renderIngredient = ingredient => {
    return `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatUnitValue(ingredient.unitVal)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.ingredient}
        </div>
    </li>
    `;
};


export const highlightRecipeSelection = id => {

    // clear the current selection, if any
    Array.from(document.querySelectorAll(`.${elementStrings.activeLink}`))
    .forEach(el=>el.classList.remove(`${elementStrings.activeLink}`));
    
    // highlight the current selction
    document.querySelector(`a[href*="#${id}"]`).classList.add(elementStrings.activeLink);
};

export const renderRecipe = (recipe, isLiked) => {
    const recipeHTML = `
    <figure class="recipe__fig">
        <img src="${recipe.image_url}" alt="${recipe.title}" class="recipe__img">
        <h1 class="recipe__title">
            <span>${recipe.title}</span>
        </h1>
    </figure>
    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text"> servings</span>

            <div class="recipe__info-buttons">
                <button class="btn-tiny servings-decrease">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny servings-increase">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>

        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart${isLiked?'':'-outlined'}"></use>
            </svg>
        </button>
    </div>
    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
            ${recipe.parsedIngredients.map(ing => renderIngredient(ing)).join('')}
        </ul>
        <button class="btn-small recipe__btn recipe__btn-addToList">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>

    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">${recipe.publisher}</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href="${recipe.publisher_url}" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>
        </a>
    </div>
    `;

    elements.recipeDiv.insertAdjacentHTML('afterbegin',recipeHTML);
};

export const updateIngredientAndServings = recipe =>{
    
    // update servings
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;
    
    // updte the unit value for ingredients
    const countElements = Array.from(document.querySelectorAll(`.${elementStrings.recipeCount}`));
    countElements.forEach((el, i)=>{
        el.textContent = formatUnitValue(recipe.parsedIngredients[i].unitVal);
    });

};


