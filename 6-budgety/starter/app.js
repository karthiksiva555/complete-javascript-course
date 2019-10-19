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
        percentageLabel:'.budget__expenses--percentage',
        containerLabel: '.container',
        percentageItemLabel: '.item__percentage',
        monthYear: '.budget__title--month'
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

    function setMonthAndYearPrivate(){

        var year, months, now, month;
        
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 
            'November', 'December'];
        now = new Date();
        month = now.getMonth();
        year = now.getFullYear();
        document.querySelector(DOMStrings.monthYear).textContent = months[month]+ ' '+year;
    }


    /* Format number:
    1.  + or - for inc or exp 
    2. fix the decimal places to 2
    3. separate thousands with comma
    */
    function formatNumber(num, type){

        num = Math.abs(num);
        num = num.toFixed(2);
        var parts = num.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
        return (type==='exp' ? '- ':'+ ') + parts[0] + '.'+ parts[1];
    }

    function addListItemPrivate(item, type){

        var html, htmlToAdd, element;
        // create the placeholder for the income
        if(type==='inc'){
            element = DOMStrings.incomeList;
            html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%desc%</div>'+
                         '<div class="right clearfix"><div class="item__value">%val%</div>'+
                         '<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i>'+
                         '</button></div></div></div>';
        } else {
            element = DOMStrings.expenseList;
            html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%desc%</div>'+
                    '<div class="right clearfix"><div class="item__value">%val%</div><div class="item__percentage">21%</div>'+
                    '<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>'+
                    '</div></div></div>';
        }

        // replace the placeholders with actual values
        htmlToAdd = html.replace('%id%', item.id)
                        .replace('%desc%', item.description)
                        .replace('%val%', formatNumber(item.value, type));

        // insert the HTML to the DOM
        document.querySelector(element).insertAdjacentHTML('beforeend', htmlToAdd);
    }

    function deleteListItemPrivate(controlId){
        // we cannot remove an element by ID. So find the element, get the parent and use removeChild() 
        var ele = document.getElementById(controlId);
        ele.parentNode.removeChild(ele);
    }

    //list doesn't support forEach so we need to convert a list to Array
    // this function mimics forEach for list so that we don't have to convert list to array; 
    var nodeListForEach = function(list, callBack){

        for(var i=0;i<list.length; i++){
            callBack(list[i], i);
        }
    };

    var updatePercentagesPrivate = function(percentages){

        var expenseList = document.querySelectorAll(DOMStrings.percentageItemLabel);
        // console.log(expenseList);
        // assign percentage based on index of list item
        nodeListForEach(expenseList, function(cur, i){
            //console.log(percentages[i]);
            cur.textContent = percentages[i]>=0?percentages[i] + '%' : '---';
        });
    };

    var updateBudgetDetailsPrivate = function(budget){
        document.querySelector(DOMStrings.totalIncomeLabel).textContent = formatNumber(budget.totalInc, 'inc');
        document.querySelector(DOMStrings.totalExpenseLabel).textContent = formatNumber(budget.totalExp, 'exp');
        document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(budget.budget, budget.budget<0?'exp':'inc');
        if(budget.percentage>0){
            document.querySelector(DOMStrings.percentageLabel).textContent = budget.percentage;
        } else {
            document.querySelector(DOMStrings.percentageLabel).textContent = '---';
        }
    };

    var inputTypeChangedPrivate = function() {
        var inputFields = document.querySelectorAll(DOMStrings.type +','+DOMStrings.description+','+DOMStrings.value);

        nodeListForEach(inputFields, function(cur){
            cur.classList.toggle('red-focus');
        });

        document.querySelector(DOMStrings.addButton).classList.toggle('red');   
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
        },
        deleteListItem: function(controlId){
            deleteListItemPrivate(controlId);
        },
        setMonthAndYear: function(){
            setMonthAndYearPrivate();
        },
        updatePercentages: function(percentages){
            updatePercentagesPrivate(percentages);
        },
        inputTypeChanged: function(){
            inputTypeChangedPrivate();
        }
    }
})();

var dataLayer = (function(){
    
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Expense = function(id, description, value, percentage){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = percentage;
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

    var calculateTotal = function(type){
        var sum = 0;

        data.items[type].forEach(function(current){
            sum+=current.value;
        });

        data.totals[type] = sum;
    };

    var calculateBudgetPrivate = function(){

        // 1. Calculate the totals of inc and exp
        calculateTotal('inc');
        calculateTotal('exp');
        
        // 2. income - expenses = available budget
        data.budget = data.totals.inc - data.totals.exp;

        // 3. percentage of spending = expenses/income * 100
        data.percentage = data.totals.inc>=0 ? Math.round((data.totals.exp/data.totals.inc)*100.0) : -1;
    };

    var addItemPrivate = function(type, description, value){
        var item;
        var nextId = 0;

        if(data.items[type] && data.items[type].length>0){
            // get the Id of last item of array and add 1
            nextId = data.items[type][data.items[type].length-1].id + 1;
            //console.log(nextId);
        } 
        
        if(type==='exp')
            item = new Expense(nextId, description, value);
        else
            item = new Income(nextId, description, value);

        data.items[type].push(item);
        //data.totals[type] += value; // this calculation is now done in calculateTotal()

        return item;
    };

    var deleteItemPrivate = function(type, id){
        
        var index;
        // console.log(data.items[type].indexOf(data.items[type][id])); // prints the index of item by type-id
        // console.log(data.items[type][id] + ': this can access the item but cannot be removed from array');

        // way 1
        //index = data.items[type].indexOf(data.items[type][id]);
      
        // way 2: extract only IDs from the income/expense list
        var ids = data.items[type].map(function(current){
            return current.id;
        });
        //console.log(ids);
        index = ids.indexOf(id);

        if(index!==-1){
            data.items[type].splice(index, 1);
        }
    };

    /*  percentage logic
        if total income is 100, expense A is 20 => A is 20% of total income
        percentage = expense / total income * 100 
    */
    var calculatePercentagePrivate = function(){

        data.items.exp.forEach(function(cur){
            cur.percentage = Math.round((cur.value/data.totals.inc)*100);
        });
    };

    return {
        addItem: function(type, description, value){
            return addItemPrivate(type, description, value);
        },
        deleteItem: function(type, id){
            deleteItemPrivate(type, id);
        },
        calculateBudget: function(){
            calculateBudgetPrivate();
        },
        calculatePercentage: function(){
            calculatePercentagePrivate();
        },
        getPercentages: function(){
            var percentages= data.items.exp.map(function(cur){
                return cur.percentage;
            });

            return percentages;
        },
        getBudget: function(){
            return {
                budget: data.budget,
                percentage : data.percentage,
                totalExp: data.totals.exp,
                totalInc: data.totals.inc
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

        // taking advantage of Event Bubbling, adding event listener on 'container' which is parent for both income and expense list
        // any click on either income or expense, will bubble up to container div
        document.querySelector(domStrings.containerLabel).addEventListener('click', deleteItem);
        document.querySelector(domStrings.type).addEventListener('change', UILayer.inputTypeChanged);
    }; 

    function updateBudget(){

        // 1. Calculate the budget
        dataLayer.calculateBudget();

        // 2. get current budget details
        var budget = dataLayer.getBudget();
        //console.log(budget);
        
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

            // 6. calculate and update percentages
            updatePercentages();

        }
    };

    function deleteItem(event){
        var ctrlId;
        
        // the target element is <i class="ion-ios-close-outline"></i> 
        // so navigate till you find the div with id inc-0 or exp-o;
        ctrlId = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(ctrlId){
            var typeAndId = ctrlId.split('-');
            var type = typeAndId[0];
            var id = parseInt(typeAndId[1]);

            // 1. Delete the item from data structure
            dataLayer.deleteItem(type, id);

            // 2. Delete the item from UI
            UILayer.deleteListItem(ctrlId);

            // 3. Update budget
            updateBudget();

            // 4. calculate and update percentages
            updatePercentages()
        }
    };

    function updatePercentages(){
        
        // 1. calculate percentages
        dataLayer.calculatePercentage();

        // 2. get percentages
        var percentages = dataLayer.getPercentages();

        // 3. update UI with calculated percentages
        UILayer.updatePercentages(percentages);
        //console.log(percentages);
    }
    
    return {
        init: function(){
            console.log('This is the only endpoint to start/stop the application.');
            UILayer.setMonthAndYear();
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
