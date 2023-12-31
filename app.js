// navigaation responsiveness
bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');


if(bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if(close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
};

// generating the shop items
//0 build
let shop = document.getElementById('shop');

//2rd to build
// basket stores selected items when clicked
//in order to retrieve the data from localstorage we have to use JSON.parse localStorage.getItem with data as the key. and we add || statement. if we have data retreve if not we will have an empty array. to avoid getting an error
let basket = JSON.parse(localStorage.getItem("data")) || [];


//3st to build generates card in shop usig html and array
let generateShop = () => {
    // return and define where to be printed in html by shop.innerhtml. linkin to the data.js the data stored in the array will printed. usin a ap function to target all data one by one in data array, the x means it will target all the data. adding .join removes all the ,.
    return (shop.innerHTML = shopItemsData.map((x)=>{//use destucture to define the x with data keys.remove information between tags and link it to data. for example remove <>long tee<> with  <>${name}<> thats in the data array. adding id's to each object generated by adding id=product-id-${id} on div. 
        let {id, brand, name, price, img} = x;
        // the purpose of the search funtion here is to check if the id exists in the localstorage get the item number and put it in the quantity amount, if it doesnt exit do nothing.
        // <div id=${id} class="quatinty"> ${search.item === undefined? 0: search.item} </div> if serch.item === undefined return 0 but if its there returm item amount
        let search = basket.find((x) => x.id === id) || []
        return `
        <div id=product-id-${id} class="pro">
                    <img src=${img} alt="">
                    <div class="des">
                        <span>${brand}</span>
                        <h5>${name}</h5>
                        <h4>R ${price}</h4>
                    </div>
    
                    <div class="buttons">
                        <span onclick="decrement(${id})" class="minus">-</span>
                        <div id= class="quatinty">
                        ${search.item === undefined? 0: search.item}
                        </div>
                        <span onclick="increment(${id})" class="plus">+</span>
                    </div>
                </div>
        `
    }).join(""));
};
//invoking the shop function
generateShop()
//4nd to build
// responsible for increasing quatity
//also added id on quantity div id=${id} class="quatinty" because we want to target it when incrementing and decrementing. add onclick to quality icons and put increment and decrement functions so that they can be called when clicked. also add id as function argument so that we know what item is clicked e.g onclick="increment(${id}). thast also why we gave unique id for all objects in the array
let increment = (id) => {
    let selectedItem = id;

    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }

    update(selectedItem.id);

    localStorage.setItem("data", JSON.stringify(basket));
}

// responsible for decreasing quatity. read the comments on increament since they re similar
let decrement = (id) => {
    let selectedItem = id;

    //checking if id exists in basket
        let search = basket.find((x) => x.id === selectedItem.id);
// if the id doesnt exist undefined or 0 return and do nothing else id exists -1. item is a keyword in the object.
        if(search === undefined) return
        else if(search.item === 0) return;
        else {search.item -= 1;}

        update(selectedItem.id);

        // remmoves 0 item from localstorae. bsket has all peoducts selected. the x means taret all in basket. and we only need tocheck x.item and selelct all that dont have a 0 and returns in to the basket
        basket = basket.filter((x) => x.item !== 0);
        

        // run this line of code last after all calculation and editd data in localstorag
        localStorage.setItem("data", JSON.stringify(basket));
};
// responsible for updating quantity
let update = (id) => {
    // search if the id matches with the id being updated. id being clicked in the html the item quantity is going to update live.
    let search = basket.find((x)=> x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation()
};
//5th build
//adding all numbers and display in cart icon. you want the calculation function run when th update function runs by invokin it in the update fuction
let calculation = ()=>{
    // targeting cart icon from html
    let cartIcon = document.getElementById("cartAmount");
    // getting all in the basket and target all the items one by one using .map and use .reduce to add all the numbers. the 0 is the default number tht we want to start at.
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
}

//everytime the application loads calculation() will run and print the data in the cart amount
calculation()