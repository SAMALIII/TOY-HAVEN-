
// CART PAGE


const cartItemsEl = document.getElementById("cartItems");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");

function displayCart() {
    let cart = getCart();

    if (cart.length === 0) {
        cartItemsEl.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Browse our products and start shopping.</p>
                <a href="products.html" class="continue-btn" style="display:inline-block;width:auto;padding:12px 28px;">Continue Shopping</a>
            </div>
        `;
        subtotalEl.textContent = "Rs.0.00";
        totalEl.textContent = "Rs.0.00";
        return;
    }

    cartItemsEl.innerHTML = "";
    let grandTotal = 0;

    cart.forEach((product, index) => {
        const price = parsePrice(product.price);
        const itemTotal = price * product.quantity;
        grandTotal += itemTotal;

        cartItemsEl.innerHTML += `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}">
                <div class="cart-details">
                    <h3>${product.name}</h3>
                    <p>${product.price}</p>
                </div>
                <div class="quantity">
                    <button onclick="changeQty(${index}, -1)">−</button>
                    <span>${product.quantity}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </div>
                <div class="item-total">${formatPrice(itemTotal)}</div>
                <button class="remove-btn" onclick="removeItem(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    });

    subtotalEl.textContent = formatPrice(grandTotal);
    totalEl.textContent = formatPrice(grandTotal);
}

function changeQty(index, delta) {
    let cart = getCart();
    cart[index].quantity += delta;

    if (cart[index].quantity < 1) {
        cart.splice(index, 1);
    }

    saveCart(cart);
    displayCart();
}

function removeItem(index) {
    if (!confirm("Remove this item from the cart?")) return;
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    displayCart();
    showNotification("Item removed from cart");
}

document.getElementById("clearCartBtn")?.addEventListener("click", () => {
    if (!confirm("Clear your entire shopping cart?")) return;
    saveCart([]);
    displayCart();
    showNotification("Cart cleared");
});

document.getElementById("checkoutBtn")?.addEventListener("click", () => {
    const total = totalEl.textContent;
    localStorage.setItem("orderTotal", total);
});

document.addEventListener("DOMContentLoaded", displayCart);
