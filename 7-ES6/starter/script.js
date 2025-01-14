// 1. let and const are block scoped

var letConstTest = function(){

    {
        var a5 = "function scoped - this is still accessible outside the block"; 
        let a6 = "block scoped - this is not accessible outside this block";
    }
    console.log(a5); // output: function scoped - this is still accessible outside the block
    console.log(a6); // output: a6 is not defined
};

//letConstTest();

// 2. let and const won't support hoisting; temporal death zone: a place where variable cannot be accessed before its declared and defined

// 3. IIFE's now can be replaced with just one block; 
// this ensures IIFE's objective: data privacy

{
    const a=10;
    let b = 'this is a variable inside ES6 IIFE';
}
//console.log(a + b); // a is not defined

// 4. Strings

// 4.1: template literals
let a='this is';
let b='an example';
let c='to demo template literal';

// ES5 way
//console.log(a+' '+ 'additional text '+b+' '+c); // this is additional text an example to demo template literal

// ES6 - with template literals
//console.log(`${a} additional text ${b} ${c}`); // this is additional text an example to demo template literal

// 4.2: new string methods: startsWith, endsWith, includes, repeat
// let name = 'siva karthik narisetty';
// console.log(name.startsWith('s')); // true
// console.log(name.startsWith('si')); // true
// console.log(name.startsWith('ka')); // false
// console.log(name.endsWith('tty')); // true
// console.log(name.endsWith('n')); // false
// console.log(name.includes('karthik')); // true
// console.log('ram '.repeat(3)); // ram ram ram

// 5: Arrow functions

var yearofBirth = [1954, 1965, 2010, 1988, 1978];

// ES5 
// var ages5 = yearofBirth.map(function(cur){
//     return 2019-cur;
// });
// console.log(ages5);

// ES6 - using arrow function
// usage 1: single param, single line code
//var ages6 = yearofBirth.map(cur => 2019 -cur);
//console.log(ages6);

// usage 2: two params, single line code
//var printAgeWithIndex = yearofBirth.map((cur, index)=> ` Element ${index+1}: ${cur}`);
//console.log(printAgeWithIndex);

// usage 3: two params, more than one line code
// var printAgeAndRetirement = yearofBirth.map((cur, ind)=>{
//     let retirementYears = 60 - (2019-cur);
//     return ` Element ${ind}: Age - ${2019-cur} and years left for retirement - ${retirementYears}`;
// });
// console.log(printAgeAndRetirement);

// 6: Arrow functions - this keyword usage

// ES5
var box5 = {
    color: 'green',
    clickMe: function(){
        document.querySelector('.green').addEventListener('click', function(){
            console.log(this.color); // output: undefined - because the click event handler is anonymous function and this keyword 
                                     // here refers to window object 
        });
    }
};
box5.clickMe();

// The above clickMe function looks like below behind the scenes
// var box5Expanded = {
//     color: 'green',
//     clickMe: function(){
//         document.querySelector('.green').addEventListener('click',clickMeClicked);
//     }
// };

// var clickMeClicked = function(){
//     console.log(this.color); // this refers to window object; there is no color property in window object, so undefined will be printed
// };
// box5Expanded.clickMe();

// ES6 : this keyword refers to the immediate object who called the arrow function
// var box6 = {
//     color: 'green',
//     clickMe: function(){
//         document.querySelector('.green')
//         .addEventListener('click', ()=> console.log(this.color)); // output: green; 'this' here refers to the immediate object which is box6
//     }
// };
// box6.clickMe();

// var box6Careful = {
//     color: 'green',
//     clickMe: ()=> { // now 'this' will refer to immediate object which is window; so make sure this is not used 
//         document.querySelector('.green')
//         .addEventListener('click', ()=> console.log(this.color)); // output: undefined; 
//     }
// };
// box6Careful.clickMe();

// 7. Destructuring - array elements to variables
// var nameAge = ['Siva', 30];

// // ES5
// var name5 = nameAge[0];
// var age5 = nameAge[1];
// console.log('Name: '+name5+ ' and Age: '+age5);

// // ES6: Array to variables
// const [name6, age6] = nameAge;
// console.log(`Name: ${name6} and Age: ${age6}`); 

// // Object to variables with names matching the property of object
// let student = {fName: 'Siva', lName: 'Narisetty'};
// const {fName, lName} = student;
// console.log(` First Name: ${fName} and Last Name: ${lName}`);

// // object to variables with different name from 
// let teacher = {name:'Karthik', subject:'Maths'};
// const {name:nome, subject:sub} = teacher;
// console.log(`Name: ${nome} and Subject:${sub}`);

// Return more than one value from function using destructuring
// function getAgeAndRetirementYears(yearofBirth){
//     let age = 2019 - yearofBirth;
//     let retirement = 60-age;

//     return [age, retirement];
// }

// const[age6, retirement6] = getAgeAndRetirementYears(1988);
// console.log(`Age : ${age6} and Retirement Years Left: ${retirement6}`);

// 8. Arrays 
// 8.1 from : converts a list to array; usage: querySelectorAll returns a node list, to convert it to array, we used slice function 
// in ES5; with ES6, this is simplified with from()

// Task: access three boxes on web page and change the color to 'blue'
//var boxesNodeList = document.querySelectorAll('.box');

// ES5: using slice
// var boxesArray5 = Array.prototype.slice.call(boxesNodeList);
// boxesArray5.forEach(function(cur){
//     cur.style.backgroundColor = 'blue';
// });

// ES6: using from
//Array.from(boxesNodeList).forEach(cur=>cur.style.backgroundColor = 'blue');

// 8.2 new 'for' loop: to be able to use break and continue
// map and forEach work on all the elements of the array; no way to skip operation conditionally
// introducing new for loop, combination of old for (var i=0; i<5; i++) and forEach

// task: update box content to 'I am now blue'; if classList has 'blue', skip update
// let boxesNodeList = document.querySelectorAll('.box');
// let boxes = Array.from(boxesNodeList);
// boxes.forEach(cur=>cur.style.backgroundColor = 'blue');
// // the new updated for loop 
// for(const box of boxes){
//     if(box.className.includes('blue'))
//         continue;
//     box.textContent = 'I am now blue!';
// }

// 9. findIndex: in ES5, to find the index of an element that satisfies a criteria, first filter the array and then find index of result

// ES5
// var ages = [2,6,45,23,14];
// var fullAge = ages.map(function(cur){
//     return cur>=18;
// });
// var firstFullAgeIndex = fullAge.indexOf(true);
// console.log(firstFullAgeIndex);

// // ES6: using findIndex
// let ages6 = [2,6,45,23,14];
// const fullAgeIndex = ages6.findIndex(cur=>cur>=18); // we don't have to map the full age array
// console.log(fullAgeIndex);

// // 10. find: find the element that matches a criteria: in the above example, find the full age element instead of finding index
// let ages6 = [2,6,45,23,14];
// const firstFullAge = ages6.find(cur=>cur>=18);
// console.log(firstFullAge);

// 11. Spread parameters: ... => to send array [a,b,c] to function name(a,b,c): array to variable mapping

// ES5
// var nums5 = [10,20,30,40];
// function Sum(a,b,c,d){
//     return a+b+c+d;
// }

// var sumofVars = Sum(nums5[0], nums5[1], nums5[2],nums5[3]);
// console.log('Sum of all variables: '+ sumofVars);

// ES6: with spread parameters
// const nums6 = [10,20,30,40];
// let sum6 = Sum(...nums6); // this now spreads the array elements to arguments a, b, c, d
// console.log(`Sum of all variables: ${sum6}`);

// combine two arrays into one big array without having to write all elelemnts 

// let family1 = ['Siva', 'Mark', 'Bujji'];
// let family2 = ['vaish', 'Jayanthy', 'Baskaran'];
// let newFamily = [...family1, ...family2]; // in ES5 we need to write [family1[0], family1[1], family2[0]..etc]
// console.log(newFamily); 
// let newFamilyAdd = [...family1, 'child', ...family2];
// console.log(newFamilyAdd);

// 12. Rest Parameters: to access arbitrary number of parameters as arguments to a function

// ES5: 
// function sumArbitrary(){
//     // console.log(arguments);
//     var sum = 0;
//     for(var i=0;i<arguments.length;i++){
//         sum+=arguments[i];
//     }
//     console.log(sum);
// }

// sumArbitrary(2,4,6,8);
// sumArbitrary(4,3,5,4,7,8);

// if you have extra parameters 
// function sumArbitraryWithExtraParamES5(){
//     var name = arguments[0];
//     console.log(name);
//     var numsArray = Array.prototype.slice.call(arguments, 1); // returns an array of elements from arguments from index 1, 
//                                                                 // ignoring the first argument
//     console.log('extra param array'+numsArray);
// }

// sumArbitraryWithExtraParamES5('siva', 5,6,7,8,9);
// sumArbitraryWithExtraParamES5('karthik', 4,6,3,5,7);

// ES6: with rest parameters
// function sumArbitraryES6(...nums){ // you can pass any num of parameters
//     let sum = 0;
//     nums.forEach(num => sum+=num);
//     console.log(sum);
// }
// sumArbitraryES6(5,4);
// sumArbitraryES6(6,7,8,9);
// sumArbitraryES6(32,54,67,1,2,3,4);

// if you have extra parameters that are not number you want to sum up =>
// function sumArbitraryWithExtraParamES6(name, ...nums){ // clear separation of nums and other params
//     console.log(name);
//     let sum = 0;
//     nums.forEach(num => sum+=num);
//     console.log(sum);
// }

// sumArbitraryWithExtraParamES6('siva', 5,6,7,8,9);
// sumArbitraryWithExtraParamES6('karthik', 4,6,3,5,7);

// 13. Default Parameters - similar to C# default parameters

// function defaultDemo(name, lastName = 'Narisetty'){
//     console.log(name+' '+lastName);
// }

// defaultDemo('siva');
// defaultDemo('vaish', 'baskaran');
// defaultDemo('Vaishnavi');

// 14. map: a data structure to store a key value pair: 
// an object can also be used, but key for an objec would only be string; map allows you to let key of any data type

// below, key is of types string, num, bool, float
// var question = new Map();
// question.set('question', 'What is the coolest programming language?');
// question.set(1, 'C#');
// question.set(2,'Javascript');
// question.set(3, 'SQL');
// question.set(4, 'Python');
// question.set(4.5, 'to be deleted');
// question.set('answer', 2);
// question.set(true, 'Great job!');
// question.set(false, 'Please try again!');

// // get value based on key
// console.log(question.get(true));
// console.log(question.get('question'));

// // get the size of map => expected value = 9 because there are 9 elements in map
// console.log(question.size);

// // delete a map item
// question.delete(4.5);
// console.log(question.size)

// // returns true if item in the map exists
// console.log(question.has(2)); 

// // to loop through all the map entries
// for(let [key, value] of question.entries()){
//     console.log(` Key: ${key} and Value: ${value}`);
// }

// console.log(question);
// // makes the map empty
// question.clear();
// console.log(question);

// 15. Class : syntactic sugar for the function constructors; class will be converted to function constructors behind scenes
// // ES5
// var Animal5 = function(name, numOfLegs, type){
//     this.name = name;
//     this.numOfLegs = numOfLegs;
//     this.type = type;
// };

// Animal5.prototype.printAnimalType = function(){
//     console.log('The animal '+this.name+' is of type '+this.type);
// };

// var elephant = new Animal5('Elephant', 4, 'Herbivore');
// elephant.printAnimalType();

// // ES6 : Animal class
// class Animal6 {
    
//     // constructor method is mandatory
//     constructor(name, numOfLegs, type){
//         this.name = name;
//         this.numOfLegs = numOfLegs;
//         this.type = type;
//     }

//     printAnimalType(){
//         console.log(`The animal ${this.name} is of type ${this.type}`);
//     }
// }

// const gajam = new Animal6('Gajam', 4, 'Herbivore');
// gajam.printAnimalType();

// 16. Inheritence: use subclass and superclass

// ES5
// // super class
// var Animal5 = function(name, numOfLegs, type){
//     this.name = name;
//     this.numOfLegs = numOfLegs;
//     this.type = type;
// };

// Animal5.prototype.printAnimalType = function(){
//     console.log('The '+this.name+' is of type '+this.type);
// };

// // subclass
// var Bird5 = function(name, numOfLegs, type, strength, isPet){
//     // call super class to initialize the properties
//     //Animal5.call(this, name, numOfLegs, type);
//     this.name = name;
//     this.numOfLegs = numOfLegs;
//     this.type = type;
//     this.strength = strength;
//     this.isPet = isPet;
// }

// // establish inheritence using object.create
// Bird5.prototype = Object.create(Animal5.prototype);

// Bird5.prototype.showStrength = function(){
//     console.log('The '+this.name+'\'s strength is '+this.strength);
// }

// var eagle = new Bird5('Eagle', 2, 'Carnivore', 'Grip', false);
// eagle.printAnimalType(); // super class method
// eagle.showStrength(); // subclass method

// // ES6 : Animal class
// class Animal6 {
    
//     // constructor method is mandatory
//     constructor(name, numOfLegs, type){
//         this.name = name;
//         this.numOfLegs = numOfLegs;
//         this.type = type;
//     }

//     printAnimalType(){
//         console.log(`The ${this.name} is of type ${this.type}`);
//     }
// }

// class Bird6 extends Animal6{
    
//     constructor(name, numOfLegs, type, strength, isPet){
//         // this is a mandatory call; if this line is commented, error will be thrown
//         super(name, numOfLegs, type);

//         // this would throw error: Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' 
//         // or returning from derived constructor
//         // this.name = name;
//         // this.numOfLegs = numOfLegs;
//         // this.type = type;
//         this.strength = strength;
//         this.isPet = isPet;
//     }

//     showStrength(){
//         console.log(`The ${this.name}'s strength is ${this.strength}`);
//     }
// }

// var parrot = new Bird6('Parrot', 2, 'Herbivore', 'Beak', true);
// parrot.printAnimalType();
// parrot.showStrength();

//--------------------------------------------------------------------------------------------------------------------------------
//    Coding Challenge
//--------------------------------------------------------------------------------------------------------------------------------

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

// ----------------------------------------VERSION 1--------------------------------------

// class TownElement {
//     constructor(name, buildYear){
//         this.name = name;
//         this.buildYear = buildYear;
//     }
// }

// class Park extends TownElement{
//     constructor(name, buildYear, parkArea, noOfTrees){
//         super(name, buildYear);
//         this.parkArea = parkArea;
//         this.noOfTrees = noOfTrees;
//     }

//     calculateTreeDensity(){
//         const density = (this.noOfTrees/this.parkArea).toFixed(2);
//         console.log(`The park ${this.name}'s density is ${density} per square kilometer`);
//     }
// }

// const allParks = [  new Park('McGregor', 2000, 2.2, 300),
//                     new Park('Victoria', 1993, 3.4, 1004),  
//                     new Park('Queens Park', 1967, 5.3, 950)
//                  ];

// const printAverageAge = function(){
//     let totalAge = 0;
//     allParks.forEach(park=>totalAge+=(2019-park.buildYear));
//     console.log(`The average age of park is ${Math.round(totalAge/3)} years`);
// };

// // 3. name of park that has more than 1000 trees
// const parkWith1000Trees = function(){
//     for(let park of allParks){
//         if(park.noOfTrees<1000) continue;
//         console.log(`The ${park.name} has ${park.noOfTrees} trees`);
//     }
// };

// const reportParkData = function(){
//     console.log('-------------------PARK REPORT------------------');
    
//     // 1. Park Density
//     allParks.forEach((park)=>park.calculateTreeDensity());

//     // 2. Average age
//     printAverageAge();

//     // 3. Park with more than 1000 trees
//     parkWith1000Trees();
// };

// class Street extends TownElement{
//     constructor(name, buildYear, length, size = 'normal'){
//         super(name, buildYear);
//         this.length = length;
//         this.size = size;
//     }

//     printStreetData(){
//         console.log(`The street ${this.name} is built in ${this.buildYear} and is a ${this.size} street`);
//     }
// }

// let allStreets = [new Street('Hollingworth', 1945, 3, 'small'),
//                  new Street('Ramji Nagar', 1989, 1.2),
//                 new Street('Ellesmere', 2000, 34, 'big'),
//                 new Street('Younge', 1900, 594, 'huge')];
// const calculateAverageLength = function(){
//     let totalLength = 0;
//     allStreets.forEach(street => totalLength+=street.length);
//     return [totalLength, totalLength/3];
// };

// const reportStreetData = function(){
//     console.log('-------------------STREET REPORT------------------');

//     // 4. Total and average length of streets
//     const [totalLen, avgLen] = calculateAverageLength();
//     console.log(`The total length of streets is ${totalLen.toFixed(2)} km and average is ${avgLen.toFixed(2)} km`);

//     // 5. print street build year with size info
//     allStreets.forEach(street=> street.printStreetData());
// };

// reportParkData();
// reportStreetData();

// ----------------------------------------VERSION 2--------------------------------------

// improvisations
// 1. use map to store street size instead of storing string
// 2. use reduce method on array to sum up all elements instead of using forEach to loop through
// 3. instead of hardcoding 2019, use new Date().getFullYear() to keep the app up to date
// 4. use findIndex to get the name of park with more than 1000 trees 
// 5. create one function to return sum and avg of array

class TownElement {
    constructor(name, buildYear){
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends TownElement{
    constructor(name, buildYear, parkArea, noOfTrees){
        super(name, buildYear);
        this.parkArea = parkArea;
        this.noOfTrees = noOfTrees;
    }

    calculateTreeDensity(){
        const density = (this.noOfTrees/this.parkArea).toFixed(2);
        console.log(`The park ${this.name}'s density is ${density} per square kilometer`);
    }
}

const allParks = [  new Park('McGregor', 2000, 2.2, 300),
                    new Park('Victoria', 1993, 3.4, 1004),  
                    new Park('Queens Park', 1967, 5.3, 950)
                 ];

const printAverageAge = function(){
    const ages = allParks.map(park=>new Date().getFullYear()-park.buildYear);
    const[total, avg] = getSumAndAvg(ages);
    console.log(`The average age of parks is ${Math.round(avg)} years`);
};

const getSumAndAvg = function(arr){
    // use reduce function to calculate sum
    const total = arr.reduce((prev, cur, index)=>prev+cur, 0);
    return [total, total/arr.length];
};

// 3. name of park that has more than 1000 trees
const parkWith1000Trees = function(){
    // find the index of park with more than 1000 trees
    const i = allParks.map(p=>p.noOfTrees).findIndex(t=>t>=1000);
    console.log(`The ${allParks[i].name} has more than 1000 trees`);
};

const reportParkData = function(){
    console.log('-------------------PARK REPORT------------------');
    
    // 1. Park Density
    allParks.forEach((park)=>park.calculateTreeDensity());

    // 2. Average age
    printAverageAge();

    // 3. Park with more than 1000 trees
    parkWith1000Trees();
};

class Street extends TownElement{
    constructor(name, buildYear, length, size = 2){
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }

    printStreetData(){
        const streetSize = new Map();
        streetSize.set(0, 'tiny');
        streetSize.set(1, 'small');
        streetSize.set(2, 'normal');
        streetSize.set(3, 'big');
        streetSize.set(4, 'huge');

        console.log(`The street ${this.name} is built in ${this.buildYear} and is a ${streetSize.get(this.size)} street`);
    }
}

let allStreets = [new Street('Hollingworth', 1945, 3, 1),
                 new Street('Ramji Nagar', 1989, 1.2),
                new Street('Ellesmere', 2000, 34, 3),
                new Street('Younge', 1900, 594, 4)];
const calculateAverageLength = function(){
    let totalLength = 0;
    allStreets.forEach(street => totalLength+=street.length);
    return [totalLength, totalLength/3];
};

const reportStreetData = function(){
    console.log('-------------------STREET REPORT------------------');

    // 4. Total and average length of streets
    const lengthArr = allStreets.map(st=>st.length);
    const [totalLen, avgLen] = getSumAndAvg(lengthArr);
    console.log(`The total length of streets is ${totalLen.toFixed(2)} km and average is ${avgLen.toFixed(2)} km`);

    // 5. print street build year with size info
    allStreets.forEach(street=> street.printStreetData());
};

reportParkData();
reportStreetData();