import uniqId from "uniqid";

export default class ShopList{
    constructor(){
        this.shopList = [];
    }

    addItem(unitVal, unit, ingredient){
        // create new item
        const newItem = {
            id:uniqId(),
            unitVal,
            unit,
            ingredient
        };
        // add item to the current list
        this.shopList.push(newItem);
        return newItem;
    }

    deleteItem(id){
        
        // find the index of the element to be removed
        const itemIndex = this.shopList.findIndex(el=>el.id===id);

        // use splice to remove the element from list
        // splice vs slice: 
        // splice mutates the original array => X = [3,4,5,6] => X.splice(1, 2) => start at index 1 and removes 2 items=> returns [4, 5]
        // original array is changed to: [3,5]
        // slice doesn't mutate the original array and second argument is end index; X.slice(2,3) => starts removing at index 2 
        // and removes till index 3
        // x.slice(2,3) => returns [5,6]; original array is [3,4,5,6]; 2 = start index, 3 = end index

        this.shopList.splice(itemIndex, 1);

    }

    updateItemUnitVal(id, newUnitVal){
        this.shopList.find(el=>el.id === id).unitVal = newUnitVal;
    }
}