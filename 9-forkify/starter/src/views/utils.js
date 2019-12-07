export const elements = {
    searchForm : document.querySelector('.search'),
    searchQuery: document.querySelector('.search__field'),
    recipeList: document.querySelector('.results__list'),
    recipesDiv: document.querySelector('.results'),
    resultsPagination: document.querySelector('.results__pages'),
    recipeDiv: document.querySelector('.recipe')  
};

export const elementStrings = {
    loader:'loader',
    inline:'btn-inline',
    activeLink: 'results__link--active'
}

export const loadSpinner = (parent)=>{
    // create the div for spinner
    const template = `
    <div class='${elementStrings.loader}'>
        <svg>
            <use href='img/icons.svg#icon-cw'/> 
        </svg>
    </div>
    `;
    // add it to the parent, after begin
    parent.insertAdjacentHTML('afterbegin', template);
};

export const clearSpinner = ()=>{
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
}
