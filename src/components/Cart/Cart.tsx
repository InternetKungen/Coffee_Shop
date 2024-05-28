// WAS CartLocalStorage.tsx --> NOW Cart.tsx
// This component is used on the shopping cart page where users can view and manage their cart items.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getCartItems, // Function to retrieve cart items from local storage
    clearCart, // Function to clear the cart in local storage
} from '../../services/cartService/cartServiceLocalStorage';
import CartItemComponent from './CartItemLocalStorage';
import { CartItem } from '../../interface/types';
import styles from './Cart.module.css';
import TitleSection from '../TitleSection/TitleSection';

// Cart functional component
const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>(getCartItems()); // State for storing cart items
    const navigate = useNavigate(); // Hook for navigating to other pages

    const handleCartChange = () => {
        const event = new CustomEvent('cartChange', {
            detail: getCartItems().reduce(
                (total, item) => total + item.quantity,
                0
            ),
        });
        window.dispatchEvent(event);
    };

    // Function to update cart items from local storage
    const updateCart = () => {
        setCartItems(getCartItems());
        handleCartChange();
    };

    // Function to handle clearing the cart
    const handleClearCart = () => {
        clearCart(); // Clearing cart items from local storage
        setCartItems([]); // Resetting cart items state to empty array
        handleCartChange();
    };

    // Function to handle checkout button click, navigates to the order page
    const handleCheckout = () => {
        navigate('/order'); // Navigate to the order page
    };

    // Rendering JSX for the cart component
    return (
        <div className={styles['cart-page']}>
            <TitleSection title="Shopping Cart" />
            {/* Rendering based on whether cart has items or not */}
            {cartItems.length > 0 ? (
                // If cart has items, render cart items list
                <div>
                    {/* Mapping through cart items to render each item */}
                    {cartItems.map((item) => (
                        <CartItemComponent
                            key={item.productId}
                            item={item}
                            updateCart={updateCart}
                        />
                    ))}
                    {/* Checkout button */}
                    <button
                        className={styles['checkout-button']}
                        onClick={handleCheckout}
                    >
                        Checkout
                    </button>
                    {/* Clear cart button */}
                    <button onClick={handleClearCart}>Clear Cart</button>
                </div>
            ) : (
                // If cart is empty, show a message
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
