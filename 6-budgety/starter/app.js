// Component pattern example
// separation of concerns
// encapsulation: all data inside the module is private, write public methods to expose allowed items to outside world

/*
// Data module: all data related calculations happens here
var dataLayer = (function(){

    var a = 45;

    //this function add is private. To make it available for the outside world, write public function
    function addPrivate(b){
        console.log(a+b);
    }

    return {
        // this method is accessible as dataLayer.addPublic
        addPublic: function(x){
            addPrivate(x);
        }
    }
})();

//dataLayer.addPrivate(34); // Uncaught TypeError: dataLayer.addPrivate is not a function

dataLayer.addPublic(34); // 79

// module 2:
var userInterfaceLayer = (function(){

    // all the UI related methods go here

    return {
        printUIData: function(){
            console.log('print some UI data');
        }
    }
})();

// module 3: linking both module 1 and 2
var controllerLayer = (function(dataL, uiL){

    dataL.addPublic(23); // 68
    uiL.printUIData(); // print some UI data

})(dataLayer, userInterfaceLayer);
*/

// here only controller layer is executed immediately because of IIFE syntax. 
// controllerLayer is executed immediately because of () at the end.
// make sure all IIFEs have () at the end
/*
var UILayer = (function(){
    console.log('executed only when called: UI layer');
});

var dataLayer = (function(){
    console.log('executed only when called: data layer');
});

// this layer connects both UI and data layers
var controllerLayer = (function(ui, data){
 console.log('immediately executed: controller layer');
})(UILayer, dataLayer);
*/

var UILayer = (function(){

    var DOMStrings = {
        type: '.add__type',
        description: '.add__description',
        value: '.add__value',
        addButton: '.add__btn'
    }

    function readUserInputPrivate(){
        return {
            type: document.querySelector(DOMStrings.type).value,
            description: document.querySelector(DOMStrings.description).value,
            value: document.querySelector(DOMStrings.value).value
        };
    }

    return {
        readUserInput: function (){
            return readUserInputPrivate();
        },
        getDOMStrings: function(){
            return DOMStrings;
        }
    }
 
})();

var dataLayer = (function(){
    
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        items:{
            inc: [],
            exp:[]
        },
        totals:{
            inc:0,
            exp:0
        }
    };

    return {
        addItem: function(type, description, value){
            var item;
            var nextId = 0;
            if(data.items[type] && data.items[type].length>0) nextId = data.items[type].length;
            
            if(type==='exp')
                item = new Expense(nextId, description, value);
            else
                item = new Income(nextId, description, value);

            data.items[type].push(item);
            data.totals[type] += parseFloat(value);
        },
        printData: function(){
            console.log(data);
        }
    };
})();

// this layer connects both UI and data layers
var controllerLayer = (function(ui, data){
 
    var setupEventListeners = function(){
        var domStrings = ui.getDOMStrings();
        document.querySelector(domStrings.addButton).addEventListener('click', addItem);
        // call add Item when ENTER is pressed instead of clicking Add button
        // keycode is a new prop, may not be available in old browsers;use which also
        document.addEventListener('keypress', function(e){
            if(e.keyCode === 13 || e.which === 13) addItem(); 
        });
    }; 

    function addItem(){

        var item, itemAdded;
        //console.log('Add button clicked');

        // 1. Read user input from the controls: type, value and description
        item = ui.readUserInput();
        //console.log(item);
        
        // 2. create expense or income based on type
        itemAdded = dataLayer.addItem(item.type, item.description, item.value);
        dataLayer.printData();
        // 3. Add it to the UI
    }

    return {
        init: function(){
            console.log('This is the only endpoint to start/stop the application.');
            setupEventListeners();
        }
    };
})(UILayer, dataLayer);

// the event listeners are placed in a function to get the ability to control start/stop of application
// if they are in IIFE without being wrapped in function, they execute by default when we load page
// this below line can control that behaviour; if we don't want to execute the app, just comment init() call.
controllerLayer.init();
