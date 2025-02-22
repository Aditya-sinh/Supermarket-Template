// Cart functionality
let cart = [];

// Select elements
const cartBtn = document.getElementById("cart-btn");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCartBtn = document.getElementById("close-cart");
const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const addToCartButtons = document.querySelectorAll(".product button");

// Open cart sidebar
cartBtn.addEventListener("click", () => {
    cartSidebar.style.right = "0";
});

// Close cart sidebar
closeCartBtn.addEventListener("click", () => {
    cartSidebar.style.right = "-500px";
});

// Add to cart function
addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const product = event.target.parentElement;
        const productName = product.querySelector("h3").innerText;
        const productPrice = parseFloat(product.querySelector("p").innerText.replace("$", ""));

        // Check if item already exists in the cart
        const existingItem = cart.find(item => item.name === productName);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }

        updateCartUI();
    });
});

// Update cart UI
function updateCartUI() {
    cartItemsList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        // Create list item for cart
        const li = document.createElement("li");
        li.innerHTML = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
                        <button onclick="removeFromCart(${index})">❌</button>`;
        cartItemsList.appendChild(li);
    });

    // Update total price
    cartTotal.innerText = `$${total.toFixed(2)}`;
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}
