// CartItemLocalStorage.tsx
import React from 'react';
import styles from './CartItemLocalStorage.module.css';
import {
    // Importing functions from cartServiceLocalStorage for managing cart items
    updateCartItemQuantity,
    removeCartItem,
    getCartItems,
} from '../../cartService/cartServiceLocalStorage';
import { CartItem as CartItemType } from '../../interface/types';

interface CartItemProps {
    // Interface defining props for CartItem component
    item: CartItemType; // Item object of type CartItem
    updateCart: () => void; // Function to update the cart
}

const CartItem: React.FC<CartItemProps> = ({ item, updateCart }) => {
    // Functional component definition accepting CartItemProps as props
    const increaseQuantity = async () => {
        // Function to increase quantity of item in cart
        updateCartItemQuantity(item.productId, item.quantity + 1); // Update quantity in cart service
        updateCart(); // Update cart display
    };

    const decreaseQuantity = async () => {
        // Function to decrease quantity of item in cart
        if (item.quantity > 1) {
            // If quantity is greater than 1
            updateCartItemQuantity(item.productId, item.quantity - 1); // Decrease quantity in cart service
        } else {
            // If quantity is 1
            removeCartItem(item.productId); // Remove item from cart service
        }
        updateCart(); // Update cart display
    };

    return (
        <div className={styles['cart-item']}>
            {/* Container for cart item */}
            {' '}
            <h2>{item.productName}</h2> {/* Display product name */}
            {/* Display product price */}
            <p>Price: ${item.productPrice.toFixed(2)}</p>{' '}
            {/* Container for quantity controls */}
            <div className={styles['quantity-controls']}>
                {' '}
                {/* Button to decrease quantity */}
                <button onClick={decreaseQuantity}>-</button>{' '}

                <span>{item.quantity}</span> {/* Display current quantity */}
                {/* Button to increase quantity */}
                <button onClick={increaseQuantity}>+</button>{' '}
            </div>
            {/* Display total price */}
            <p>Total: ${(item.productPrice * item.quantity).toFixed(2)}</p>{' '}
        </div>
    );
};

export default CartItem; // Exporting CartItem component
