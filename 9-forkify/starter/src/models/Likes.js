export default class Likes{
    constructor(){
        this.likes = [];
    }

    addLike(id, title, author, img){
        const newLike = {
            id,
            title,
            author,
            img
        };

        this.likes.push(newLike);
    }

    deleteLike(id){
        const index = this.likes.findIndex(el=>el.id === id);
        this.likes.splice(index, 1);
    }

    isLiked(id){
        return this.likes.findIndex(el=>el.id === id)!=-1;
    }
}