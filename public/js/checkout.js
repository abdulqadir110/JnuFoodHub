// Function to retrieve cart items from localStorage
var cartItems;

function getCartItems() {
    cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    return cartItems;
}

// Function to display cart items on the checkout page
let total
function displayCartItems() {
    const cartList = document.getElementById('cartList');
    const totalAmount = document.getElementById('totalAmount');
    const cartItems = getCartItems();

    cartList.innerHTML = '';
    total = 0;

    cartItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price}</td>
            <td>₹${item.price * item.quantity}</td>
        `;
        cartList.appendChild(row);
        total += item.price * item.quantity;
    });

    totalAmount.textContent = `₹${total}`;
}

// Function to handle order confirmation
function confirmOrder() {
    try {
        const name = document.getElementById('name').value;
        const contact = document.getElementById('contact').value;

        // Check if the cart is empty
        if (cartItems.length === 0) {
            throw new Error('Cart is empty. Please add items before confirming the order.');
        }

        // Validate name and contact number
        if (name.trim() === '' || !/^\d{10}$/.test(contact)) {
            throw new Error('Please provide a valid name and contact number.');
        }

        const loadingIndicator = document.getElementById('loadingIndicator');
        loadingIndicator.style.display = 'block'; // Show loading indicator

        // Simulate a delay (you can replace this with actual order processing logic)
        setTimeout(() => {
            loadingIndicator.style.display = 'none'; // Hide loading indicator

            // Proceed with order confirmation
            const modal = document.getElementById('confirmationModal');
            modal.style.display = 'block';
            
            const orderDetails = document.getElementById('orderDetails');
            orderDetails.innerHTML = `
                <p>Name: ${name}</p>
                <p>Contact Number: ${contact}</p>
                <p>Items:</p>
                <ul>
                    ${cartItems.map(item => `<li class="order-item">${item.name} - Quantity: ${item.quantity}</li>`).join('')}
                </ul>
            `;
            // You can now process the order (e.g., send details to canteen owner or save in a database)
            // Remember, this is a placeholder and you'll need to implement actual logic here
            console.log(`Order confirmed! Name: ${name}, Contact: ${contact}`);
            // Redirect to confirmation page
            const orderDetailsData = {
                name: name,
                contact: contact,
                items: cartItems,
                total: total
            };
            localStorage.setItem('orderDetails', JSON.stringify(orderDetailsData));
            window.location.href = 'Confirmation Page/confirmation.html';
        }, 1500); // Simulate a 2-second processing time (adjust as needed)

    } catch (error) {
        // Handle the error
        alert(`Error: ${error.message}`);
        console.error(error); // Optionally, log the error details
    }
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'none';
}

// Display cart items on page load
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
});
