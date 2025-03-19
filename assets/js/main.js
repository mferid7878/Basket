const products = [
    { id: 1, name: "LD01 LOUNGE CHAIR", price: 200, image: "assets/images/1.png", count: 0 },
    { id: 2, name: "LD02 LOUNGE CHAIR", price: 250, image: "assets/images/2.png", count: 0 },
    { id: 3, name: "LD03 LOUNGE CHAIR", price: 200, image: "assets/images/3.png", count: 0 },
    { id: 4, name: "LD04 LOUNGE CHAIR", price: 200, image: "assets/images/4.png", count: 0 },
    { id: 5, name: "LD05 LOUNGE CHAIR", price: 300, image: "assets/images/5.png", count: 0 },
    { id: 6, name: "LD06 LOUNGE CHAIR", price: 200, image: "assets/images/6.png", count: 0 },
    { id: 7, name: "LD07 LOUNGE CHAIR", price: 200, image: "assets/images/7.png", count: 0 },
    { id: 8, name: "LD08 LOUNGE CHAIR", price: 250, image: "assets/images/8.png", count: 0 },
];

let card_wrapper = document.getElementById("cardWrapper");
let shoppingList = document.getElementById("shoppingList");
let list_items = document.getElementById("list_items");
let total = document.getElementById("total");
let cartButton = document.getElementById("cart-button");

cartButton.addEventListener("click", toggleCart);

function toggleCart() {
    if (shoppingList.classList.contains("open")) {
        shoppingList.classList.remove("open");
        shoppingList.classList.add("closed");
        localStorage.setItem("cartOpen", "false");
    } else {
        shoppingList.classList.remove("closed");
        shoppingList.classList.add("open");
        localStorage.setItem("cartOpen", "true");
    }
}

function addToCart(id) {
    let productsInCart = JSON.parse(localStorage.getItem("products")) || products;
    
    productsInCart = productsInCart.map(product => {
        if (product.id === id) {
            product.count++;
        }
        return product;
    });
    
    localStorage.setItem("products", JSON.stringify(productsInCart));
    updateShoppingList();
    calculateTotal();
    
    if (!shoppingList.classList.contains("open")) {
        shoppingList.classList.remove("closed");
        shoppingList.classList.add("open");
        localStorage.setItem("cartOpen", "true");
    }
}

function increment(id) {
    let productsInCart = JSON.parse(localStorage.getItem("products")) || products;
    
    productsInCart = productsInCart.map(product => {
        if (product.id === id) {
            product.count++;
        }
        return product;
    });
    
    localStorage.setItem("products", JSON.stringify(productsInCart));
    updateShoppingList();
    calculateTotal();
}

function decrement(id) {
    let productsInCart = JSON.parse(localStorage.getItem("products")) || products;
    
    productsInCart = productsInCart.map(product => {
        if (product.id === id) {
            if (product.count > 0) {
                product.count--;
            } 
            else {
                alert("Item cannot be less than 0");
            }
        }
        return product;
    });
    
    localStorage.setItem("products", JSON.stringify(productsInCart));
    updateShoppingList();
    calculateTotal();
}

function updateShoppingList() {
    let productsInCart = JSON.parse(localStorage.getItem("products")) || products;
    let cartItems = productsInCart.filter(product => product.count > 0);
    
    list_items.innerHTML = cartItems.map(product => 
        `<li class="cart-item">
            <img src="${product.image}" alt="${product.name}" class="cart-item-image">
            <div class="cart-item-details">
                <span class="cart-item-name">${product.name}</span>
                <span class="cart-item-price">$${product.price}</span>
                <div class="cart-item-actions">
                  <p class="decrement" onclick="decrement(${product.id})">-</p>
                  <p class="cart-item-count">${product.count}</p>
                  <p class="increment" onclick="increment(${product.id})">+</p>
                </div>
                <span class="cart-item-price">Final Price: $${product.count * product.price}</span>
                
            </div>
        </li>`
    ).join("");
    
    if (cartItems.length > 0) {
        list_items.style.display = "block";
    } else {
        alert("Basket is empty");
    }
}

function calculateTotal() {
    let productsInCart = JSON.parse(localStorage.getItem("products")) || products;
    let totalAmount = productsInCart.reduce((sum, product) => sum + (product.price * product.count), 0);
    total.textContent = `$${totalAmount}`;
}

function renderProducts() {
    if (!localStorage.getItem("products")) {
        localStorage.setItem("products", JSON.stringify(products));
    }
    
    let productsFromStorage = JSON.parse(localStorage.getItem("products"));
    
    card_wrapper.innerHTML = productsFromStorage.map(product => 
        `
        <div class="card">
            <img src="${product.image}" alt="...">
            <div class="card-body">
                <h3 class="card-title">${product.name}</h3>
                <p class="card-text">Price: $${product.price}</p>
                <button onclick="addToCart(${product.id})" class="shopping-btn">Add to Cart</button>
            </div>
        </div>
        `
    ).join("");
    
    updateShoppingList();
    calculateTotal();
    
    shoppingList.classList.remove("closed");
    shoppingList.classList.add("open");
    localStorage.setItem("cartOpen", "true");
}

renderProducts();