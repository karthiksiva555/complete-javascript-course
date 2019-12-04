import axios from 'axios';

export default class Recipe{
    constructor(id){
        this.recipe_id = id;
    }

    async getRecipe(){
        try{
            const result = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.recipe_id}`);
            const recipe = result.data.recipe;
            this.title = recipe.title;
            this.publisher = recipe.publisher;
            this.publisher_url = recipe.publisher_url;
            this.ingredients = recipe.ingredients;
            this.image_url = recipe.image_url;
            this.source_url = recipe.source_url;
            this.social_rank = recipe.social_rank;
        } catch(err){
            alert(`Error while fetching the recipe! Details: ${err}`);
        }
    }

    calculateTime(){
        // assuming approx it takes 15 mins for each three ingredients
        this.time = Math.round(this.ingredients.length/3) * 15;
    }

    noOfServings(){
        // no logic yet, set to 4 for now
        this.servings = 4;
    }

    parseIngredients(){

        // standardize the units. Eg: tablespoons, tablespoon, table spoon => tbsp
        const unitName = ['tablespoons', 'tablespoon', 'cups', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'pounds', 'slices', 'strips'];
        const parsedUnit = ['tbsp', 'tbsp', 'cup', 'oz','oz', 'tsp','tsp','pound','slice','strip'];

        const parsedIngredients = this.ingredients.map(el=>{
            
            let ingredient = el.toLowerCase();
                        
            // replace units with parsed units
            unitName.forEach((u,i)=>{
                ingredient = ingredient.replace(u, parsedUnit[i]);
            });

            // remove the extra information between parentheses using regEx
            ingredient = ingredient.replace(/ *\([^)]*\)*/g, "");

            // extract the numbers before the unit name
            let ingArr = ingredient.split(' ');
            // index of the unit name, if exists: 
            // eg: 3 1/2 cups of water => index = 2 because cups located at array position 2
            const unitIndex = ingArr.findIndex(ing=>parsedUnit.includes(ing));
            
            let objIng;
            if(unitIndex > -1){
                // unit value exists
                const unitArr = ingArr.slice(0, unitIndex);
                let unitVal;
                if(unitArr.length===1){
                    unitVal = eval(unitArr[0].replace('-','+'));
                } else{
                    unitVal = eval(unitArr.join('+'));
                }
                objIng = {
                    unitVal,
                    unit:ingArr[unitIndex],
                    ingredient:ingArr.slice(unitIndex+1).join(' ') // exclude the first item which is a number
                }           

            } else if(parseInt(ingArr[0],10)){
                // no unit name, but there is number. eg: 3 garlic cloves
                objIng = {
                    unitVal:parseInt(ingArr[0],10),
                    unit:'',
                    ingredient:ingArr.slice(1).join(' ') // exclude the first item which is a number
                }

            } else if(unitIndex===-1){
                // unit name does not exist
                objIng = {
                    unitVal:1,
                    unit:'',
                    ingredient // ES6 doesn't need ingredient:ingredient
                }
            }
            return objIng;
        });
        this.parsedIngredients = parsedIngredients;
    }
}