// HOME PAGE

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // JSON DATA
    // ==========================================

    let homeData = {
        products: [],
        settings: {
            currency: "LKR",
            sliderInterval: 5000,
            notificationDuration: 1500
        }
    };

    // Load product data from home.json
    async function loadHomeData() {
        try {
            const response = await fetch("home.json");

            if (!response.ok) {
                throw new Error("Failed to load home.json");
            }

            homeData = await response.json();

            console.log("JSON data loaded successfully:", homeData);

            // Render products if the container exists
            renderProducts(homeData.products);

            // Start slider after JSON settings are loaded
            startAuto();

        } catch (error) {
            console.error("Error loading JSON data:", error);

            showNotification("Unable to load product data", true);

            // Start slider with default settings
            startAuto();
        }
    }


    // ==========================================
    // RENDER PRODUCTS FROM JSON
    // ==========================================

    function renderProducts(products) {
        const productContainer =
            document.getElementById("productContainer");

        if (!productContainer) {
            console.warn("Product container not found");
            return;
        }

        productContainer.innerHTML = "";

        products.forEach(product => {

            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            productCard.innerHTML = `
                <img 
                    src="${product.image}" 
                    alt="${product.name}"
                >

                <h3>${product.name}</h3>

                <p>${homeData.settings.currency} ${product.price}</p>

                <button 
                    class="add-to-cart"
                    data-name="${product.name}"
                    data-price="${product.price}"
                    data-image="${product.image}"
                >
                    Add to Cart
                </button>
            `;

            productContainer.appendChild(productCard);
        });

        // Activate cart buttons for dynamically generated products
        attachCartEvents();
    }


    // ==========================================
    // HERO BANNER SLIDER
    // ==========================================

    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-dots .dot");
    const prevBtn = document.querySelector(".hero-prev");
    const nextBtn = document.querySelector(".hero-next");

    let current = 0;
    let autoTimer;

    function showSlide(index) {
        if (slides.length === 0) return;

        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        dots.forEach(dot => {
            dot.classList.remove("active");
        });

        slides[index].classList.add("active");

        if (dots[index]) {
            dots[index].classList.add("active");
        }

        current = index;
    }

    function nextSlide() {
        showSlide(current + 1);
    }

    function prevSlide() {
        showSlide(current - 1);
    }

    function startAuto() {
        stopAuto();

        const interval =
            homeData.settings?.sliderInterval || 5000;

        if (slides.length > 0) {
            autoTimer = setInterval(nextSlide, interval);
        }
    }

    function stopAuto() {
        if (autoTimer) {
            clearInterval(autoTimer);
            autoTimer = null;
        }
    }

    if (slides.length > 0) {

        nextBtn?.addEventListener("click", () => {
            nextSlide();
            startAuto();
        });

        prevBtn?.addEventListener("click", () => {
            prevSlide();
            startAuto();
        });

        dots.forEach(dot => {
            dot.addEventListener("click", () => {
                showSlide(parseInt(dot.dataset.slide));
                startAuto();
            });
        });

        const hero = document.querySelector(".hero");

        hero?.addEventListener("mouseenter", stopAuto);
        hero?.addEventListener("mouseleave", startAuto);

        showSlide(0);
    }


    // ==========================================
    // CART FUNCTIONS
    // ==========================================

    function getCart() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    function saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function attachCartEvents() {

        document.querySelectorAll(".add-to-cart").forEach(button => {

            // Prevent duplicate event listeners
            if (button.dataset.cartAttached === "true") {
                return;
            }

            button.dataset.cartAttached = "true";

            button.addEventListener("click", function () {

                const product = {
                    name: this.dataset.name,
                    price: this.dataset.price,
                    image: this.dataset.image,
                    quantity: 1
                };

                let cart = getCart();

                const existing = cart.find(
                    item => item.name === product.name
                );

                if (existing) {
                    existing.quantity++;
                } else {
                    cart.push(product);
                }

                saveCart(cart);

                showNotification(
                    product.name + " added to cart"
                );

                this.textContent = "Added ✓";
                this.style.background = "#8FBC8F";

                const button = this;

                setTimeout(() => {
                    button.textContent = "Add to Cart";
                    button.style.background = "";
                }, homeData.settings?.notificationDuration || 1500);
            });
        });
    }


    // ==========================================
    // NEWSLETTER
    // ==========================================

    const form = document.getElementById("newsletterForm");

    if (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            const emailInput = this.querySelector("input");
            const email = emailInput.value.trim();

            const pattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!email || !pattern.test(email)) {
                showNotification(
                    "Please enter a valid email",
                    true
                );
                return;
            }

            showNotification("Thank you for subscribing!");

            this.reset();
        });
    }


    // ==========================================
    // NOTIFICATION
    // ==========================================

    function showNotification(message, isError = false) {

        let notification =
            document.getElementById("notification");

        if (!notification) {

            notification = document.createElement("div");
            notification.id = "notification";

            notification.style.position = "fixed";
            notification.style.bottom = "20px";
            notification.style.right = "20px";
            notification.style.padding = "15px 20px";
            notification.style.borderRadius = "8px";
            notification.style.color = "#fff";
            notification.style.zIndex = "9999";
            notification.style.fontSize = "14px";

            document.body.appendChild(notification);
        }

        notification.textContent = message;
        notification.style.background =
            isError ? "#d9534f" : "#333";

        notification.style.display = "block";

        setTimeout(() => {
            notification.style.display = "none";
        }, 3000);
    }


    // ==========================================
    // INITIALISE JSON DATA
    // ==========================================

    loadHomeData();

});