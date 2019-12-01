import axios from 'axios';
require('@babel/polyfill');

export default class Search{
    constructor(q){
        this.query = q;
    }

    // this returns the list of recipes that matches the search string stored in this.query
    async getResults(){
        try{
            const callRes = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            this.recipes = callRes.data.recipes;
            //console.log(this.recipes);
        } catch(err){
            console.log(`an unexpected error occured! Details: ${err}`);
        }
     }
}