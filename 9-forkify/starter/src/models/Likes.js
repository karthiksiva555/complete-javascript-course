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
        this.persistData();
    }

    deleteLike(id){
        const index = this.likes.findIndex(el=>el.id === id);
        this.likes.splice(index, 1);
        this.persistData();
    }

    isLiked(id){
        return this.likes.findIndex(el=>el.id === id)!=-1;
    }

    likesCount(){
        return this.likes.length;  
    } 

    persistData(){
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    restoreData(){
        const likes = JSON.parse(localStorage.getItem('likes'));
        console.log(likes);
        if(likes) this.likes = likes;
    }
}