
const products = [
    {
        name: '2088 marathon',
        price: '$23',
        image: './img/product1.png',
        description: '• 380GSM\n• Screen printed\n• Cropped but not too cropped fitting',
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        name: 'vincè vice captain division ll',
        price: '$32',
        image: './img/prolevi.png',
        description: '• 400GSM\n• French terry fabric\n• Screen printed\n• Soft washed\n• Cropped fitting',
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        name: 'MARATHON 2088 T',
        price: '$23',
        image: './img/product3.png',
        description: '• 380GSM\n• Screen printing\n• Boxy but not too boxy fitting \n• 100 Cotton',
        sizes: ['S', 'M', 'L', 'XL']
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    cartCountElement.textContent = cart.length;
}

function addToCart(productName, productPrice, productImage, productSize) {
    const product = {
        name: productName,
        price: parseFloat(productPrice.replace('$', '')),
        image: productImage,
        size: productSize,
        quantity: 1
    };

    const existingProductIndex = cart.findIndex(item => item.name === product.name && item.size === product.size);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
    updateCartCount();
    renderCartItems();
}

function openQuickView(title, image, price, description) {
    document.getElementById('quick-view-title').innerText = title;
    document.getElementById('quick-view-image').src = image;
    document.getElementById('quick-view-price').innerText = price;
    document.getElementById('quick-view-description').innerText = description;

    document.getElementById('quick-view-modal').style.display = 'block';
}

function closeQuickView() {
    document.getElementById('quick-view-modal').style.display = 'none';
}

function toggleCart() {
    const cartOverlay = document.getElementById('cart-overlay');
    cartOverlay.classList.toggle('cart-active');
    renderCartItems(); 
}

function renderCartItems() {
    const cartItemsElement = document.querySelector('.cart-items');
    cartItemsElement.innerHTML = '';

    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            cartItemsElement.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <h3>${item.name} (${item.size})</h3>
                        <p>$${item.price} x ${item.quantity}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                </div>
            `;
        });
    }

    updateCartTotal();
}

function updateCartTotal() {
    const cartTotalElement = document.querySelector('.cart-total');
    const deliveryCost = 2.00; // Fixed delivery cost
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    cartTotalElement.textContent = `Total: $${(cartTotal + deliveryCost).toFixed(2)}`;
}

function changeQuantity(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity < 1) {
        cart.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    updateCartCount();
    renderCartItems();
}

function handleCheckout() {
    if (cart.length > 0) {
        alert('Proceeding to checkout...');
        window.location.href = 'check.html'; // Redirect to checkout.html
    } else {
        alert('Your cart is empty!');
    }
}

function displayCurrentTime() {
    const timeElement = document.getElementById('current-time');
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';


    hours = hours % 12 || 12;

    timeElement.textContent = `${hours}:${minutes}:${seconds} ${period}`;
}

setInterval(displayCurrentTime, 1000); 
displayCurrentTime(); 


updateCartCount();
