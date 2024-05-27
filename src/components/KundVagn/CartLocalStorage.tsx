// Cart.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getCartItems,
    updateCartItemQuantity,
    removeCartItem,
    clearCart,
} from '../../cartService/cartServiceLocalStorage';
import CartItemComponent from './CartItemLocalStorage'; // Renaming to avoid confusion
import { CartItem } from '../../interface/types'; // Importing the type
import styles from './CartLocalStorage.module.css';

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>(getCartItems());
    const navigate = useNavigate();

    const updateCart = () => {
        setCartItems(getCartItems());
    };

    const handleClearCart = () => {
        clearCart();
        setCartItems([]);
    };

    const handleCheckout = () => {
        navigate('/order');
    };

    return (
        <div className={styles['cart-page']}>
            <h1>Shopping Cart</h1>
            {cartItems.length > 0 ? (
                <div>
                    {cartItems.map((item) => (
                        <CartItemComponent
                            key={item.productId}
                            item={item}
                            updateCart={updateCart}
                        />
                    ))}
                    <button
                        className={styles['checkout-button']}
                        onClick={handleCheckout}
                    >
                        Checkout
                    </button>
                    <button onClick={handleClearCart}>Clear Cart</button>
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
