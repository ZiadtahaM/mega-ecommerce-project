// JavaScript code to add functionality to the shopping cart page

document.addEventListener('DOMContentLoaded', function() {
    // Constants for coupon and shipping
    const VALID_COUPON = 'DISCOUNT10'; // Example coupon code for 10% off
    const SHIPPING_COST = 20.00; // Fixed shipping cost

    // Function to update totals
    function updateTotals() {
        let subtotal = 0;
        const rows = document.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const quantity = parseInt(row.querySelector('.quantity span').textContent);
            const price = parseFloat(row.querySelector('.price').textContent.replace('$', ''));
            const subtotalCell = row.querySelector('.subtotal');
            const itemSubtotal = price * quantity;
            subtotalCell.textContent = `$${itemSubtotal.toFixed(2)}`;
            subtotal += itemSubtotal;
        });

        // Update summary
        const subtotalElement = document.querySelector('.summary-line span:last-child');
        const totalElement = document.querySelector('.summary-line.total span:last-child');
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        const total = subtotal + SHIPPING_COST;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Handle quantity increase
    document.querySelectorAll('.quantity-box button[aria-label="Increase quantity"]').forEach(button => {
        button.addEventListener('click', function() {
            const span = this.parentElement.querySelector('span');
            let quantity = parseInt(span.textContent);
            quantity++;
            span.textContent = quantity;
            updateTotals();
        });
    });

    // Handle quantity decrease
    document.querySelectorAll('.quantity-box button[aria-label="Decrease quantity"]').forEach(button => {
        button.addEventListener('click', function() {
            const span = this.parentElement.querySelector('span');
            let quantity = parseInt(span.textContent);
            if (quantity > 1) {
                quantity--;
                span.textContent = quantity;
                updateTotals();
            }
        });
    });

    // Handle remove item
    document.querySelectorAll('.action').forEach(action => {
        action.addEventListener('click', function() {
            this.closest('tr').remove();
            updateTotals();
        });
    });

    // Handle Update Cart button
    document.querySelector('.update').addEventListener('click', function() {
        updateTotals(); // Recalculate totals
        alert('Cart updated!');
    });

    // Handle Apply Coupon button
    document.querySelector('.coupon-box button').addEventListener('click', function() {
        const couponInput = document.querySelector('.coupon-box input');
        const code = couponInput.value.trim().toUpperCase();
        if (code === VALID_COUPON) {
            // Apply 10% discount to subtotal
            const subtotalElement = document.querySelector('.summary-line span:last-child');
            let subtotal = parseFloat(subtotalElement.textContent.replace('$', ''));
            const discount = subtotal * 0.10;
            subtotal -= discount;
            subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
            const totalElement = document.querySelector('.summary-line.total span:last-child');
            const total = subtotal + SHIPPING_COST;
            totalElement.textContent = `$${total.toFixed(2)}`;
            alert('Coupon applied! 10% discount added.');
            couponInput.value = ''; // Clear input
        } else {
            alert('Invalid coupon code.');
        }
    });

    // Handle Continue Shopping button
    document.querySelector('.continue').addEventListener('click', function() {
        // Assuming redirect to shop page; replace with actual URL
        window.location.href = '#'; // Placeholder, e.g., '/shop'
    });

    // Handle Proceed to Checkout button
    document.querySelector('.checkout-btn').addEventListener('click', function() {
        // Assuming redirect to checkout page; replace with actual URL
        window.location.href = '#'; // Placeholder, e.g., '/checkout'
    });

    // Handle Search button
    document.querySelector('.cart-search button').addEventListener('click', function() {
        const query = document.querySelector('.cart-search input').value.trim();
        if (query) {
            // Placeholder: In a real app, this would search products
            alert(`Searching for: ${query}`);
        } else {
            alert('Please enter a search term.');
        }
    });

    // Initial total calculation
    updateTotals();
});
