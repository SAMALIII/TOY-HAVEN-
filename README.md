# Toy Haven – Integrated E-Commerce Web App

A clean, fully integrated frontend for a toy store built with pure HTML, CSS and JavaScript (no frameworks).

## Project Structure

```
toy-haven/
├── index.html          → Home page
├── products.html       → Product listing + search/filter
├── wishlist.html       → Wishlist
├── cart.html           → Shopping cart
├── checkout.html       → Checkout & place order
├── contact.html        → Contact / feedback form
├── css/
│   ├── style.css       → Shared styles (navbar, footer, buttons, toasts)
│   ├── home.css
│   ├── products.css
│   ├── wishlist.css
│   ├── cart.css
│   ├── checkout.css
│   └── contact.css
├── js/
│   ├── main.js         → Shared utilities (cart, wishlist, notifications, mobile menu)
│   ├── home.js
│   ├── products.js
│   ├── wishlist.js
│   ├── cart.js
│   ├── checkout.js
│   └── contact.js
└── images/             → Put your product images here
```

## What Was Fixed & Improved

- Consistent branding → **Toy Haven** everywhere
- All internal links fixed and consistent
- Shared navbar with live **cart count badge**
- Shared mobile menu on every page
- Currency standardized to **Rs.**
- Font Awesome icons working on all pages
- Toast notifications instead of only `alert()`
- Clear Cart / Clear Wishlist buttons
- Wishlist heart state persists correctly
- Better empty states
- Auto-fill previous order details on checkout
- Draft saving on contact form
- Cleaner, less duplicated CSS
- Price parsing works with Rs. / $ formats

## How to Run

1. Place your product images in the `images/` folder:
   - `hero.jpg` (home hero background)
   - `product1.jpg` … `product8.jpg`

2. Open `index.html` in a browser (or use a local server).

All data (cart, wishlist, orders, feedback) is stored in **localStorage**.

## Notes

- This is a frontend-only demo. No real payment or backend.
- Pagination on the products page is a placeholder.
- Replace image paths if your images have different names.
