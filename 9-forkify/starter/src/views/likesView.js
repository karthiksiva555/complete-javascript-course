import {elements} from '../views/utils';

export const toggleLikesBtn = isLiked => {

    //icon-heart-outlined : if not liked, icon-heart if liked
    const iconStr = isLiked ?'icon-heart':'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconStr}`);
};