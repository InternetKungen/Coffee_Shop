import React from 'react';
import styles from './Cart.module.css';
import {
    updateCartItemQuantity,
    removeCartItem,
    getCartItems,
} from '../../cartService/cartService';
import { CartItem } from '../../interface/interface';

interface CartProps {
    item: CartItem;
    updateCart: (items: CartItem[]) => void;
}

const Cart: React.FC<CartProps> = ({ item, updateCart }) => {
    const increaseQuantity = async () => {
        await updateCartItemQuantity(item.productId, item.quantity + 1);
        const updatedItems = await getCartItems();
        updateCart(updatedItems);
    };

    const decreaseQuantity = async () => {
        if (item.quantity > 1) {
            await updateCartItemQuantity(item.productId, item.quantity - 1);
        } else {
            await removeCartItem(item.productId);
        }
        const updatedItems = await getCartItems();
        updateCart(updatedItems);
    };

    return (
        <div className={styles['cart-item']}>
            <h2>{item.name}</h2>
            <p>Price: ${item.price.toFixed(2)}</p>
            <div className={styles['quantity-controls']}>
                <button onClick={decreaseQuantity}>-</button>
                <span>{item.quantity}</span>
                <button onClick={increaseQuantity}>+</button>
            </div>
            <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
        </div>
    );
};

export default Cart;
