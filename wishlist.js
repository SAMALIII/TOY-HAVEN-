
// WISHLIST PAGE JS


const container = document.getElementById("wishlistContainer");

function displayWishlist() {
    const wishlist = getWishlist();

    if (wishlist.length === 0) {
        container.innerHTML = `
            <div class="empty-wishlist">
                <i class="fa-regular fa-heart"></i>
                <h2>Your Wishlist is Empty</h2>
                <p>Save your favourite products to view them here.</p>
                <a href="products.html" class="shop-btn">Shop Now</a>
            </div>
        `;
        return;
    }

    container.innerHTML = "";
    wishlist.forEach((product, index) => {
        container.innerHTML += `
            <div class="wishlist-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="wishlist-info">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price}</p>
                </div>
                <div class="wishlist-buttons">
                    <button class="cart-btn" onclick="addToCartFromWishlist(${index})">
                        <i class="fa-solid fa-cart-shopping"></i> Add to Cart
                    </button>
                    <button class="remove-btn" onclick="removeFromWishlist(${index})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
}

function removeFromWishlist(index) {
    if (!confirm("Remove this product from your wishlist?")) return;

    let wishlist = getWishlist();
    wishlist.splice(index, 1);
    saveWishlist(wishlist);
    displayWishlist();
    showNotification("Item removed from wishlist");
}

function addToCartFromWishlist(index) {
    const wishlist = getWishlist();
    const product = wishlist[index];

    let cart = getCart();
    const existing = cart.find(item => item.name === product.name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart(cart);
    showNotification(product.name + " added to cart");
}

document.getElementById("clearWishlist")?.addEventListener("click", () => {
    if (!confirm("Clear your entire wishlist?")) return;
    saveWishlist([]);
    displayWishlist();
    showNotification("Wishlist cleared");
});

document.addEventListener("DOMContentLoaded", displayWishlist);
