// Undefined vs Reference Error
// 1.
//console.log(typeof notdeclaredvariable); // undefined

//console.log(notdeclaredvariable); // Uncaught ReferenceError: notdeclaredvariable is not defined

// 2.
// all undeclared variables are global 
function undeclaredDemo(){
    a = 20; // not declared, so created as global variable
    var b = 15;
}

undeclaredDemo();

//console.log(a); // accessible, because its global
//console.log(b); // cannot be accessed because its local to undeclaredDemo function

///////////////////////////////////////
// Lecture: Hoisting
// all the declarations run first and are made available in the execution context so that those are available 
// for usage even before declaration
// Caution: the variable will hold undefined till it is assigned a value

// 1. Variables
// this line won't throw error eventhough it is declared in next line, but prints undefined
// console.log('this variable is declared in next line, but can be accessed here because of Hoisting! :'+hoistedVar);

// var hoistedVar = 'hellow Nellore';

// console.log('after definition: '+ hoistedVar);

// // 2. Function statement

// calculateAge(1989);

// function calculateAge(year) {
//     console.log(2019-year);
// }

// 3. Function Expression

// this would throw error because hoisting won't work with function expressions
// calculateRetirementAge(1989); // Uncaught TypeError: calculateRetirementAge is not a function

// var calculateRetirementAge = function(yearOfBirth) {
//     console.log(60 - (2019 - yearOfBirth));
// }

// calculateRetirementAge(1989); // 30


///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/

// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword









