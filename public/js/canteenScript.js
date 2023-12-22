sessionStorage.removeItem('cartItems');

function addToCart(item, quantity, price) {
    var cartItem = {
        name: item,
        quantity: quantity,
        price: price
    };

    // Retrieve existing cart items from sessionStorage
    var existingCartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    
    // Add the new item to the cart
    existingCartItems.push(cartItem);

    // Store the updated cart items in sessionStorage
    sessionStorage.setItem('cartItems', JSON.stringify(existingCartItems));

    alert(quantity + " " + item + "(s) have been added to your cart.");
    updateCartDisplay(cartItem); // Pass the new item to the function
}

function updateCartDisplay(newItem) {
    var cartListElement = document.getElementById("cartList");

    var listItem = document.createElement("li");
    listItem.textContent = newItem.quantity + " " + newItem.name + " - ₹" + (newItem.quantity * newItem.price).toFixed(2);
    cartListElement.appendChild(listItem);
}

function proceedToCheckout() {
    // Retrieve cart items from sessionStorage
    var cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];

    // Here you can proceed with sending the cart items to the server or redirect to the checkout page
    console.log(cartItems);

    // Example: Redirecting to the checkout page
    window.location.href = '/canteen/checkout';
}
