// Component pattern example
// separation of concerns
// encapsulation: all data inside the module is private, write public methods to expose allowed items to outside world


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




