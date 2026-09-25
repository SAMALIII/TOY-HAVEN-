// ===================================
// TOY HAVEN - SHARED UTILITIES
// ===================================

// Cart & Wishlist helpers
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function getWishlist() {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function saveWishlist(wishlist) {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function parsePrice(priceStr) {
    // Handles "Rs.750.00", "RS:750.00", "$19.99", "750.00"
    if (!priceStr) return 0;
    const cleaned = String(priceStr).replace(/[^\d.]/g, "");
    return parseFloat(cleaned) || 0;
}

function formatPrice(amount) {
    return "Rs." + amount.toFixed(2);
}

// Cart count badge
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    document.querySelectorAll(".cart-count").forEach(el => {
        el.textContent = totalItems;
        el.classList.toggle("hidden", totalItems === 0);
    });
}

// Toast notification
function showNotification(message, isError = false) {
    const existing = document.querySelector(".notification");
    if (existing) existing.remove();

    const notification = document.createElement("div");
    notification.className = "notification" + (isError ? " error" : "");
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add("show"), 50);

    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// Mobile menu
function initMobileMenu() {
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });
        });
    }
}

// Initialize on every page
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    initMobileMenu();
});
