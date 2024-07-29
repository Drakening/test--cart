// Navigation responsiveness
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

// Generating the shop items
const shop = document.getElementById('shop');

// Basket stores selected items when clicked
let basket = JSON.parse(localStorage.getItem("data")) || [];

// Generates card in shop using HTML and array
const generateShop = () => {
    // Use map function to target all data one by one in data array
    // Add .join to remove all commas
    return (shop.innerHTML = shopItemsData.map((x) => {
        // Destructure the object to get its properties
        const { id, brand, name, price, img } = x;
        // Check if the item is already in the basket
        const search = basket.find((x) => x.id === id) || {};
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
                <div id=${id} class="quantity">
                    ${search.item === undefined ? 0 : search.item}
                </div>
                <span onclick="increment(${id})" class="plus">+</span>
            </div>
        </div>
        `;
    }).join(''));
};
// Invoke the shop function
generateShop();

// Responsible for increasing quantity
const increment = (id) => {
    const selectedItem = basket.find((x) => x.id === id);

    if (selectedItem === undefined) {
        basket.push({
            id: id,
            item: 1,
        });
    } else {
        selectedItem.item += 1;
    }

    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
}

// Responsible for decreasing quantity
const decrement = (id) => {
    const selectedItem = basket.find((x) => x.id === id);

    if (selectedItem === undefined) return;
    if (selectedItem.item > 0) {
        selectedItem.item -= 1;
    }

    if (selectedI
