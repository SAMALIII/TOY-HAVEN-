
// PRODUCTS PAGE //


document.addEventListener("DOMContentLoaded", () => {
    const productCards = document.querySelectorAll(".product-card");
    const searchInput = document.getElementById("search");
    const categorySelect = document.getElementById("category");

    // SEARCH 
    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            const value = this.value.toLowerCase().trim();

            productCards.forEach(card => {
                const name = card.querySelector("h3").textContent.toLowerCase();
                if (name.includes(value)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }

    // CATEGORY FILTER 
    if (categorySelect) {
        categorySelect.addEventListener("change", function () {
            const selected = this.value;

            productCards.forEach(card => {
                if (selected === "all" || card.dataset.category === selected) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }

    // ADD TO CART 
    document.querySelectorAll(".cart-btn").forEach(button => {
        button.addEventListener("click", function () {
            const card = this.closest(".product-card");

            // NEW AND CLEAN DATA//
            const name = card.querySelector("h3").textContent.trim();
            const priceText = card.querySelector(".price").textContent;
            // ONLY THE VALUE //
            const price = parseFloat(priceText.replace(/[^\d.]/g, ""));
            const image = card.querySelector("img").getAttribute("src"); // keeps relative path

            const product = {
                name: name,
                price: price,
                image: image,
                quantity: 1
            };

            let cart = getCart();
            const existing = cart.find(item => item.name === product.name);

            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push(product);
            }

            saveCart(cart);
            updateCartCount(); // if you have this function in main.js
            showNotification(name + " added to cart");

            //  feedback // 
            const originalText = this.textContent;
            this.textContent = "Added ✓";
            this.style.background = "#198754";
            this.disabled = true;

            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = "";
                this.disabled = false;
            }, 1500);
        });
    });

    //  WISHLIST 
    const wishlist = getWishlist();

    document.querySelectorAll(".wishlist-btn").forEach(button => {
        const card = button.closest(".product-card");
        const name = card.querySelector("h3").textContent.trim();

        // Show filled heart if already in wishlist //
        if (wishlist.some(item => item.name === name)) {
            button.classList.add("active");
            button.innerHTML = '<i class="fa-solid fa-heart"></i>';
        }

        button.addEventListener("click", function () {
            let list = getWishlist();

            const product = {
                name: name,
                price: card.querySelector(".price").textContent,
                image: card.querySelector("img").getAttribute("src")
            };

            const exists = list.find(item => item.name === product.name);

            if (exists) {
                // Remove from wishlist //
                list = list.filter(item => item.name !== product.name);
                this.classList.remove("active");
                this.innerHTML = '<i class="fa-regular fa-heart"></i>';
                showNotification(name + " removed from wishlist");
            } else {
                // Add to wishlist
                list.push(product);
                this.classList.add("active");
                this.innerHTML = '<i class="fa-solid fa-heart"></i>';
                showNotification(name + " added to wishlist");
            }

            saveWishlist(list);
        });
    });

    // PLACEHOLDER//
    document.getElementById("prevPage")?.addEventListener("click", () => {
        showNotification("More products coming soon!");
    });

    document.getElementById("nextPage")?.addEventListener("click", () => {
        showNotification("More products coming soon!");
    });
});