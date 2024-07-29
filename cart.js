// Target elements in HTML for total amount and buttons
const label = document.getElementById('label');
const shoppingCart = document.getElementById('shopping-cart');

// Pulling data from local storage
let basket = JSON.parse(localStorage.getItem("data")) || [];

// Calculate the total number of items and display it on the cart amount
const calculation = () => {
    const cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();

// Generate cart items
const generateCartItems = () => {
    if (basket.length !== 0) {
        shoppingCart.innerHTML = basket.map((x) => {
            const { id, item } = x;
            const search = shopItemsData.find((y) => y.id === id) || [];
            const { img, name, price } = search;
            return `
            <div class="cart-item">
                <img width="100" src=${img} alt=""/>

                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-price">R ${price}</p>
                        </h4>
                        <span onclick="removeItem(${id})" class="i-x">X</span>
                    </div>

                    <div class="buttons">
                        <span onclick="decrement(${id})" class="minus">-</span>
                        <div id=${id} class="quantity">${item}</div>
                        <span onclick="increment(${id})" class="plus">+</span>
                    </div>

                    <h3>R ${item * price}</h3>
                </div>
            </div>
            `;
        }).join('');
    } else {
        shoppingCart.innerHTML = '';
        label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="shop.html">
        <button class="HomeBtn">Back to shop</button>
        </a>
        `;
    }
};
generateCartItems();

// Increment item quantity in the basket
const increment = (id) => {
    const selectedItem = basket.find((x) => x.id === id);
    if (selectedItem === undefined) {
        basket.push({ id, item: 1 });
    } else {
        selectedItem.item += 1;
    }
    update(id);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

// Decrement item quantity in the basket
const decrement = (id) => {
    const selectedItem = basket.find((x) => x.id === id);
    if (selectedItem === undefined) return;
    if (selectedItem.item > 0) {
        selectedItem.item -= 1;
    }
    basket = basket.filter((x) => x.item !== 0);
    update(id);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

// Update item quantity in the cart
const update = (id) => {
    const selectedItem = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = selectedItem.item;
    calculation();
    totalAmount();
};

// Remove item from the basket
const removeItem = (id) => {
    basket = basket.filter((x) => x.id !== id);
    generateCartItems();
    totalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

// Clear all items in the cart
const clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

// Calculate and display the total amount
const totalAmount = () => {
    if (basket.length !== 0) {
        const amount = basket.map((x) => {
            const { id, item } = x;
            const search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x, y) => x + y, 0);

        label.innerHTML = `
        <h2>Total bill : R${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear cart</button>
        `;
    } else {
        label.innerHTML = '';
    }
};
totalAmount();
