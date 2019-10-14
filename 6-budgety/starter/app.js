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
        addButton: '.add__btn',
        incomeList:'.income__list',
        expenseList:'.expenses__list',
        totalIncomeLabel: '.budget__income--value',
        totalExpenseLabel:'.budget__expenses--value',
        budgetLabel: '.budget__value',
        percentageLabel:'.budget__expenses--percentage'
    }

    function readUserInputPrivate(){
        return {
            type: document.querySelector(DOMStrings.type).value,
            description: document.querySelector(DOMStrings.description).value,
            value: parseFloat(document.querySelector(DOMStrings.value).value)
        };
    }

    function clearInputFieldsPrivate(){
        var fields, fieldArr;

        fields = document.querySelectorAll(DOMStrings.description+', '+DOMStrings.value);
        fieldArr = Array.prototype.slice.call(fields);

        fieldArr.forEach(element => {
            element.value = '';
        });
        fieldArr[0].focus();
    }

    function addListItemPrivate(item, type){

        var html, htmlToAdd, element;
        // create the placeholder for the income
        if(type==='inc'){
            element = DOMStrings.incomeList;
            html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%desc%</div>'+
                         '<div class="right clearfix"><div class="item__value">+ %val%</div>'+
                         '<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i>'+
                         '</button></div></div></div>';
        } else {
            element = DOMStrings.expenseList;
            html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%desc%</div>'+
                    '<div class="right clearfix"><div class="item__value">- %val%</div><div class="item__percentage">21%</div>'+
                    '<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>'+
                    '</div></div></div>';
        }

        // replace the placeholders with actual values
        htmlToAdd = html.replace('%id%', item.id)
                        .replace('%desc%', item.description)
                        .replace('%val%', item.value);

        // insert the HTML to the DOM
        document.querySelector(element).insertAdjacentHTML('beforeend', htmlToAdd);
    }

    var updateBudgetDetailsPrivate = function(budget){
        document.querySelector(DOMStrings.totalIncomeLabel).textContent = budget.totalInc;
        document.querySelector(DOMStrings.totalExpenseLabel).textContent = budget.totalExp;
        document.querySelector(DOMStrings.budgetLabel).textContent = budget.budget;
        if(budget.percentage>0){
            document.querySelector(DOMStrings.percentageLabel).textContent = budget.percentage;
        } else {
            document.querySelector(DOMStrings.percentageLabel).textContent = '---';
        }
    };

    return {
        readUserInput: function (){
            return readUserInputPrivate();
        },
        getDOMStrings: function(){
            return DOMStrings;
        },
        addListItem: function(item, type){
            addListItemPrivate(item, type);
        },
        clearInputFields: function(){
            clearInputFieldsPrivate();
        },
        updateBudgetDetails: function(budget){
            updateBudgetDetailsPrivate(budget);
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
        },
        budget:0,
        percentage:-1 // to represent there is nothing because 0% gives a meaning
    };

    var calculateBudgetPrivate = function(){

        // 1. income - expenses = available budget
        data.budget = data.totals.inc - data.totals.exp;

        // 2. percentage of spending = expenses/income * 100
        data.percentage = data.totals.inc>0 ? Math.round((data.totals.exp/data.totals.inc)*100.0) : -1;
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
            data.totals[type] += value;

            return item;
        },
        calculateBudget: function(){
            calculateBudgetPrivate();
        },
        getBudget: function(){
            return {
                budget: data.budget.toFixed(2),
                percentage : data.percentage.toFixed(2),
                totalExp: data.totals.exp.toFixed(2),
                totalInc: data.totals.inc.toFixed(2)
            };
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

    function updateBudget(){

        // 1. Calculate the budget
        dataLayer.calculateBudget();

        // 2. get current budget details
        var budget = dataLayer.getBudget();
        console.log(budget);
        
        // 3. Update the UI with the calculated budget details
        UILayer.updateBudgetDetails(budget);

    };

    function addItem(){

        var item, itemAdded;
        //console.log('Add button clicked');

        // 1. Read user input from the controls: type, value and description
        item = ui.readUserInput();
        //console.log(item);
        
        // Add data only if description and value are valid 
        if(item.description && !isNaN(item.value) && item.value>0){
            // 2. create expense or income based on type
            itemAdded = dataLayer.addItem(item.type, item.description, item.value);
            //dataLayer.printData();
            
            // 3. Add it to the UI
            UILayer.addListItem(itemAdded, item.type);

            // 4. Clear all the input fields
            UILayer.clearInputFields();

            // 5. Calculate and update budget
            updateBudget();
        }
    }

    return {
        init: function(){
            console.log('This is the only endpoint to start/stop the application.');
            UILayer.updateBudgetDetails(
                {
                    budget: 0,
                    percentage : -1,
                    totalExp: 0,
                    totalInc: 0
                }
            );
            setupEventListeners();
        }
    };
})(UILayer, dataLayer);

// the event listeners are placed in a function to get the ability to control start/stop of application
// if they are in IIFE without being wrapped in function, they execute by default when we load page
// this below line can control that behaviour; if we don't want to execute the app, just comment init() call.
controllerLayer.init();
