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

