
// CHECKOUT PAGE


const orderItemsEl = document.getElementById("orderItems");
const orderTotalEl = document.getElementById("orderTotal");

function loadOrder() {
    const cart = getCart();

    if (cart.length === 0) {
        orderItemsEl.innerHTML = "<p>Your cart is empty.</p>";
        orderTotalEl.textContent = "Rs.0.00";
        return;
    }

    orderItemsEl.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const price = parsePrice(item.price);
        const itemTotal = price * item.quantity;
        total += itemTotal;

        orderItemsEl.innerHTML += `
            <div class="order-item">
                <span>${item.name} × ${item.quantity}</span>
                <span>${formatPrice(itemTotal)}</span>
            </div>
        `;
    });

    orderTotalEl.textContent = formatPrice(total);
}

document.getElementById("checkoutForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const postal = document.getElementById("postal").value.trim();
    const payment = document.getElementById("payment").value;

    if (!name || !email || !phone || !address || !city || !postal) {
        showNotification("Please fill in all fields", true);
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showNotification("Please enter a valid email", true);
        return;
    }

    const cart = getCart();
    if (cart.length === 0) {
        showNotification("Your cart is empty", true);
        return;
    }

    const order = {
        customer: { name, email, phone, address, city, postal, payment },
        items: cart,
        total: orderTotalEl.textContent,
        date: new Date().toLocaleString()
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));
    saveCart([]); // clear cart

    alert(`🎉 Order Placed Successfully!\n\nThank you for shopping with Toy Haven.\n\nPayment: ${payment}\nTotal: ${order.total}`);

    window.location.href = "index.html";
});

// Auto-fill from previous order
document.addEventListener("DOMContentLoaded", () => {
    loadOrder();

    const previous = JSON.parse(localStorage.getItem("lastOrder"));
    if (previous?.customer) {
        document.getElementById("name").value = previous.customer.name || "";
        document.getElementById("email").value = previous.customer.email || "";
        document.getElementById("phone").value = previous.customer.phone || "";
        document.getElementById("address").value = previous.customer.address || "";
        document.getElementById("city").value = previous.customer.city || "";
        document.getElementById("postal").value = previous.customer.postal || "";
        document.getElementById("payment").value = previous.customer.payment || "Cash on Delivery";
    }
});
