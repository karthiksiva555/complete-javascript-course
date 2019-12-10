import {elements} from '../views/utils';
import {limitedTitle} from './searchView';

export const toggleLikesBtn = isLiked => {

    //icon-heart-outlined : if not liked, icon-heart if liked
    const iconStr = isLiked ?'icon-heart':'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconStr}`);
};

export const addToLikesList = like=>{
    const template = `
        <li>
            <a class="likes__link" href="#${like.id}" data-likeid='${like.id}'>
                <figure class="likes__fig">
                    <img src="${like.img}" alt="${like.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitedTitle(like.title)}</h4>
                    <p class="likes__author">${like.author}</p>
                </div>
            </a>
        </li>
    `;

    elements.likesList.insertAdjacentHTML('beforeend',template);
};

export const removeFromLikesList = id =>{
    const like = document.querySelector(`a[data-likeid='${id}']`).parentElement;
    if(like) like.parentElement.removeChild(like);
};

export const toggleLikesList = length => {
    elements.likesDiv.style.visibility = length>0?'visible':'hidden';
    console.log(elements.likesList.style.visibility);
};