// target in html to give total amount and buttons
let label = document.getElementById('label');

// target in htmmml t
let shoppingCart = document.getElementById('shopping-cart');

// 1st build
//pulling data from localstorage
let basket = JSON.parse(localStorage.getItem("data")) || [];

//2nd build adds all the number and shows it on cart amount
let calculation = ()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
}
calculation()

//3rd build
// in this function we are going to create two probabilities. 1 when there is data on the pae and 2 when there is no data by using the if else statement.
let generateCartItems = () => {
    // if the basket is not 0(empty) run this code
    if (basket.length !== 0){
        //in the shoppin cart html run what is in the basket by using map, x stands for targetin all the objects one by one. and all of them are going to be returned in id div cart item one by one.
        return (shoppingCart.innerHTML = basket.map((x) => { 
            // destructuring to et id which is coming from x.
            let {id, item} = x;
            //now we are serching the data array we want to match if from basket and if from data js. if you find something return it if not  return empty array.
            let search = shopItemsData.find((y) => y.id === id) || [];
            //destructure to be able to link with search function
            let {img, name, price} = search;
            return `
            <div class="cart-item">
                <img width="100" src=${img} alt=""/>

                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-prie">R ${price}</p>
                        </h4>
                        <span onclick="removeItem(${id})" class="i-x">X</span>
                    </div>

                    <div class="buttons">
                        <span onclick="decrement(${id})" class="minus">-</span>

                        <div id=${id} class="quatinty">
                        ${item}</div>

                        <span onclick="increment(${id})" class="plus">+</span>
                        
                    </div>

                    <h3>
                    R ${item * search.price}
                    </h3>

                </div>
            </div>
            `;
        }).join(''));
    } 
    //if basket is empty
    //targeting shoppicart html to be empty
    //targeting label html to display text and buttons
    else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="shop.html">
        <button class="HomeBtn">Back to shop</button>
        </a>
        `;
    }
};
//invoke function to run when the page is loaded
generateCartItems();

//4th build does the same thing as it does in the app.js
let increment = (id) => {
    let selectedItem = id;
//checking if id exists in basket
    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }
    
    generateCartItems();
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
    let selectedItem = id;

    //checking if id exists in basket
        let search = basket.find((x) => x.id === selectedItem.id);

        if(search === undefined) return
        else if(search.item === 0) return;
        else {search.item -= 1;}

        update(selectedItem.id);
        basket = basket.filter((x) => x.item !== 0);
        // generateCartItems(); to remove when it reaches 0. update function ives us latest numbers and generatecart renders the numbers
        generateCartItems();
        localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
    let search = basket.find((x)=> x.id === id);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};

//5th build
// we pass the if in the arrow function param to know what to delete
let removeItem = (id)=>{
    //everytime you click remove button you get unique id
    let selectedItem = id
// in order to remove when clicked we will use .filter. we are goin to trget x.id and it will update the basket
    basket = basket.filter((x)=>x.id !== selectedItem.id);
    // we re-render cart evrytime the id is removed and its going to be live
    generateCartItems();
    // we re-render cart evrytime the id is removed and its oing to update total amount
    totalAmount();
    // we re-render cart evrytime the id is removed and its oing to update the cart amount
    calculation();

    // so the local storage can update when clicked
    localStorage.setItem("data", JSON.stringify(basket));
};

//7th build
//remove all in cart
let clearCart = () => {
    //clear bsket
    basket = []
    //eneratecart
    generateCartItems();
    //does cart amount calculations and updates
    calculation();
    //and saves inside local storages the changes
    localStorage.setItem("data", JSON.stringify(basket));

}

//6th build
// using if else we are going to have to probabilities. if busket is not 0(empty) run the 1st probability else return nothing
let totalAmount = ()=>{
    if(basket.length !== 0){
        //we are going to map the basket and look into the database
        let amount = basket.map((x)=>{
            //destructuring the x
            let {id, item} = x;
            // search the database to look for the id and once identified ulptle it with the item amount.  its going to do this for wevery object in the basket
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x,y) => x + y, 0);
        //reduce will add all from each object

        //this is what is going to be displayed for tiotal amount in html
        label.innerHTML = `
        <h2>Total bill : R${amount}</h2>
        <button class="checkout">checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear cart</button>
        `;
    } else return
}
//invoke it so we can see it
totalAmount();