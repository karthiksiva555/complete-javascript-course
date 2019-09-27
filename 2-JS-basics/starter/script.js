console.log('JS loaded');

//-----------------------------------------------------------------------------------------------------------------
// Null and Undefined
// JS assigns undefined to all declared variables by default
// null is an object type which is programatically assigned to a variable when a valid value cannot be decided

//console.log(varNotDeclared); // this would error out because it doesn't exist in execution context

var varUndefined;
console.log(varUndefined); // this out print undefined as variable declared but not assigned a value yet

var manuallyUndefined = undefined;
console.log(manuallyUndefined); // undefined 

var varNull = null; // Null is an assigned value which indicates "nothing".
console.log(varNull); // null 

console.log(typeof null); // object

console.log(typeof undefined); // undefined is a type

console.log(undefined == null); // true

console.log(undefined === null); // false

console.log(2 + null); // 2

console.log(1 + undefined); // undefined

var newObj = {
    name:'siva',
    job:'Developer'
};

console.log(newObj.nonExistentProp); // non existent property of an object => undefined

// falsy values: 0, false, null, '', NaN, null and undefined

// function with default parameter
var logHi = (str = 'Hi') => {
    console.log(str);
};

logHi();
logHi('ssup?');
logHi(undefined); // str will get the default param and prints Hi
logHi(null); // str will be set to null and prints null
 

//-----------------------------------------------------------------------------------------------------------------

// 1. Variable Mutation
// Same variable can be used to hold multiple types. For example, 
var num = 6;
console.log(num);
num = 'six';
console.log(num);

//2. Variable name
// variable name can start with _ and $ and any other special symbol is not allowed
var _a = 'underscore allowed';
var $b = 'doller also allowed';
// var *c= "this is not allowed"; // Uncaught SyntaxError: Unexpected token '*'
// var @d="this is also not allwed"; // Uncaught SyntaxError: Invalid or unexpected token

// 3. Dynamic Typing
// variables doesn't need strong typing 
var x = 5;
console.log(typeof x); // number
var y = 'this is a string type';
console.log(typeof y); // string

// 4. Type Coercion
// JS converts one type to another to evaluate the expression

var typeCoercion = 5 + ' string appended';
console.log(typeCoercion); // 5 is converted to a string and appended to the string 
console.log(typeof typeCoercion); // string

// 5. User input with Prompt
// you can get user input with prompt() function

// var age = prompt('Enter your age:');
// console.log(age);


//6. How to distinguish falsy value from 0
// the below code block will go to else block as 0 is a falsy value

var salary = 0; //so sad :P
if(salary){
    console.log('He/She is a salaried employee with $'+ salary + ' per month');
} else {
    console.log('He/She is not salaried employee');
}

// how to distinguish he is salaried employee but his salary is $0.

if(salary || salary === 0){
    console.log('He/She is a salaried employee with $'+ salary + ' per month');
} else {
    console.log('He/She is not salaried employee');
}

// 7. == vs ===
// == checks for the equality of value but not type
// === checks for equality of value as well as type

console.log(2 == '2'); // true
console.log( 2 === '2'); // false

// 8. Function expressions and Function Statements
// function stored in a variable is called function expression
// result of a function which doesn't return anything => undefined
var addNumbersFE = function(a, b) {
    return a + b;
};

var resultFE = addNumbersFE(10,5);
console.log(resultFE); // 15

// function statement => regular function with name and code block
function addNumbersFS(a, b) {
    return a+b;
}
var resultFS = addNumbersFS(4,6);
console.log(resultFS); // 10

// Function that doesn't return anything will result in 'undefined'
var printResult = function(a ,b) {
    console.log(a+b);
}

var resultPrint = printResult(2,3);
console.log(resultPrint); // first 5 is printed and then undefined

// Both FS and FE does the same thing but one key difference exist: Hoisting

// Function Statements/Declarations are hoisted=> meaning that we can use them before even declaring
// Function Expressions cannot be used before their declaration

subtractFS(10,5); // doesn't error out due to Hoisting

function subtractFS(a,b) {
    return a -  b;
}

//var resultSubFE = subtractFE(20,10); // errors out becuase function expressions are not hoisted: Uncaught TypeError: subtractFE is not a function

var subtractFE = function (a,b){
    return a - b;
};

var resultSubFE2 = subtractFE(20,10); // This works! as function is declared by this time
console.log(resultSubFE2); // 10


//-----------------------------------------------------------------------------------------------------------------
// Arrays
// two ways to initialize arrays

// 1. 
var names = ['siva','karthik','narisetty'];

// 2.
var days = new Array('Monday', 'Tuesday', 'Wednesday');

// 3. save different data types
var john = ['john', 23, true];
console.log(john);
console.log(john[2]);

// 4. popular array methods: push, pop, shift, unshift
john.unshift('unshift used');
console.log(john);
john.shift();
console.log(john);

// 5. indexOf: searches for an element in the array and returns the position. return -1 if element not found
console.log(john.indexOf(23)); // 1
console.log(john.indexOf('emily')); // -1

//-----------------------------------------------------------------------------------------------------------------
// Objects
// Everything in JS is an object (except primitives)
// two ways to create objects

// 1. Object Literal
var siva = {
    name: 'Siva Narisetty',
    job: 'Developer',
    age: 30
};

// 2. creating using Object()
var karthik = new Object();
karthik.name = 'Karthik Narisetty';
karthik.job = 'Architect';
karthik.age = 30.5;

// 3. Valid expressions
console.log(siva['name']);
console.log(siva.name);
var varName = 'name';
console.log(siva[varName]);



