// console.log('this is a test');

// 1. Async behaviour explained with setTimeout()
// const second = ()=>{
//     setTimeout(()=>console.log("This is second function with 2sec timeout!"),2000);
// };

// const first = ()=> {
//     console.log('Hey there! this is first function!');
//     second();
//     console.log('second() is still processing, but this log won\'t wait for it to complete');
// };

// first();

// 2. call-back hell explained: the nested setTimeout calls below explains how hard it gets to maintain this code
// const getRecipe = ()=>{
//     // this block simulates a DB call which returns a list of recipes
//     setTimeout(()=>{
//         const recipes=[34,23,76,1];

//         // this block simulates a DB call to take recipe ID as input and returns the recipe object
//         setTimeout((recipeId)=>{
//             const recipe = {Id:76, title:"Tandoori Chicken", publisher: 'Siva Kitchen'};

//             console.log(`the recipe requeseted with ID ${recipeId} is ${recipe.title}`);

//             // this block simulated a DB call to get a recipe with same publisher
//             setTimeout((publisher)=>{
//                 const relRecipe = {Id:45, title:"Chicken Biriyani", publisher: 'Siva Kitchen'};
//                 console.log(`The related recipe from the publisher ${relRecipe.publisher} is ${relRecipe.title}`);
//             },2000, recipe.publisher);
//         }, 2000, recipes[2]); // this recipes[2] (76 in this case) is sent as argument to call-back function
//     }, 2000);
// };

// getRecipe();

// 3. Promises to avoid call-back hell: more readable
// call resolve in success criteria, and reject in failure
// const getIds = new Promise((resolve, reject)=>{
//     const recipes = [34,23,76,1];
//     // simualte DB call to return recipe IDs
//     setTimeout(()=>{
//         resolve(recipes); // reject(recipes) will call the catch block in the promise chain
//     },2000);
// });

// // simulate a DB call to take Id as input and return the recipe
// const getRecipe = recipeID => {
//     return new Promise((res, rej)=>{
//         setTimeout(recId => {
//             const recipe = {Id:recId, title:"Tandoori Chicken", publisher: 'Siva Kitchen'};
//             res(recipe);
//         }, 2000, recipeID);
//     });
// };

// // this code is to simulate DB call that takes publisher as input and returns a recipe from same publisher
// const getRelatedRecipe = publisher => {
//     return new Promise((resolve, reject)=>{
//         const relRecipe = {Id:45, title:"Chicken Biriyani", publisher: 'Siva Kitchen'};
//         resolve(relRecipe); // reject(relRecipe); will send relRecipe to catch block with err = relRecipe 
//     });
// };

// getIds
// .then(Ids=>{
//     console.log(Ids);
//     // call DB to get recipe with Id 76
//     return getRecipe(Ids[2]); // this return statement passes result to the "Then" block below 
// })
// .then(recipe=>{
//     console.log(`The retrieved recipe is ${recipe.title}`);
//     return getRelatedRecipe(recipe.publisher);
// })
// .then(relRecipe=>{
//     console.log(`the related recipe for publisher ${relRecipe.publisher} is ${relRecipe.title}`);
// })
// .catch(err=>{ // this err contains whatever reject method passes
//     console.log('There is an error');
//     console.log(err);
// });

// 4. async/await for consuming promises
// we are going to use the same promises created in previous section but, consuming them will be using async/await
// there is no .then() chain for this method

// const getIds = new Promise((resolve, reject)=>{
//     const recipes = [34,23,76,1];
//     // simualte DB call to return recipe IDs
//     setTimeout(()=>{
//         resolve(recipes); // reject(recipes) will call the catch block in the promise chain
//     },2000);
// });

// // simulate a DB call to take Id as input and return the recipe
// const getRecipe = recipeID => {
//     return new Promise((res, rej)=>{
//         setTimeout(recId => {
//             const recipe = {Id:recId, title:"Tandoori Chicken", publisher: 'Siva Kitchen'};
//             rej(recipe);
//         }, 2000, recipeID);
//     });
// };

// // this code is to simulate DB call that takes publisher as input and returns a recipe from same publisher
// const getRelatedRecipe = publisher => {
//     return new Promise((resolve, reject)=>{
//         const relRecipe = {Id:45, title:"Chicken Biriyani", publisher: 'Siva Kitchen'};
//         resolve(relRecipe); // reject(relRecipe); will send relRecipe to catch block with err = relRecipe 
//     });
// };

// async function getRecipeAW(){
//     try{
//         const recipeIds = await getIds; // this statement waits till getIds() fetch data from DB and returns
//         const recipe = await getRecipe(recipeIds[2]); // this statement waits till getRecipe returns data from DB
//         const relRecipe = await getRelatedRecipe(recipe.publisher);
//         console.log(relRecipe);
//         return recipe;
//     } catch(err){
//         console.log('An error occured');
//         console.log(err);
//     }
// }

// getRecipeAW().then(recipe => {
//     console.log(`The Recipe for publisher ${recipe.publisher} is ${recipe.title}`);
// }).catch(recipe=>console.log(`An error occured while working on ${recipe.title}`));

// 5. fetch API to make async call to API using Promises

const proxy = 'https://cors-anywhere.herokuapp.com/';
const domain = 'https://www.metaweather.com/';

// function getWeatherLocation(query){
//     fetch(`${proxy}${domain}api/location/search/?query=${query}`)
//     .then(response=>response.json())
//     .then(respJson => console.log(respJson))
//     .catch(err => console.log(err));
// }

// getWeatherLocation('san');
// getWeatherLocation('toronto');

function getWeatherByWoeId(woeId){
    fetch(`${proxy}${domain}/api/location/${woeId}/`)
    .then(result => result.json())
    .then(data=>{
        // console.log(data);
        const today = data.consolidated_weather[0];
        console.log(`The ${data.title} ${data.location_type}'s temparatures today will be between ${today.min_temp} and ${today.max_temp} with ${today.weather_state_name}`);
    })
    .catch(err=>console.log(err));
}

getWeatherByWoeId(44418); // london
getWeatherByWoeId(2487956); // San Francisco

// 6. fetch API calls using async /await

async function getWeatherByWoeIdAW(woeId){
    try{
        const result = await fetch(`${proxy}${domain}/api/location/${woeId}/`);
        const data = await result.json();
        const tomorrow = data.consolidated_weather[1];
        console.log(`The ${data.title} ${data.location_type}'s temparatures tomorrow will be between ${tomorrow.min_temp} and ${tomorrow.max_temp} with ${tomorrow.weather_state_name}`);
    } catch(err){
        console.log(err);
    };
}
getWeatherByWoeIdAW(44418); // london
getWeatherByWoeIdAW(2487956); // San Francisco

// we can also make the async function return the data and use .then on the function call like below
// getWeatherByWoeIdAW(44418).then(data=>console.log(data)).catch(err=>console.log(err));