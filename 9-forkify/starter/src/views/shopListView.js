import { elements } from "./utils";

export const clearShoppingList = ()=>{
    elements.shoppingList.innerHTML = '';
};

export const renderShoppingItem = item => {
    const template = `
        <li class="shopping__item" data-itemId=${item.id}>
            <div class="shopping__count">
                <input type="number" value="${item.unitVal}" step="${item.unitVal}" class="shopping__count-value">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>`;
    
        elements.shoppingList.insertAdjacentHTML('beforeend', template);
};

export const deleteShoppingItem = id => {
    const item = document.querySelector(`[data-itemid=${id}]`);
    item.parentElement.removeChild(item);
};