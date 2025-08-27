function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, i) => sum + i.quantity, 0);
    document.querySelectorAll("#cartCount").forEach(el => el.textContent = count);
}

function addToCart(id, name, price, img) {
    let cart = getCart();
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id, name, price, img, quantity: 1 });
    }
    saveCart(cart);
}

function updateQuantity(id, change) {
    let cart = getCart();
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== id);
    }
    saveCart(cart);
    window.dispatchEvent(new Event("storage"));
}

function removeFromCart(id) {
    let cart = getCart().filter(i => i.id !== id);
    saveCart(cart);
    window.dispatchEvent(new Event("storage"));
}

window.addEventListener("DOMContentLoaded", updateCartCount);
