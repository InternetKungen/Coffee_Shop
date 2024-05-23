import React from 'react';
import styles from './CartItem.module.css';
import {
    updateCartItemQuantity,
    removeCartItem,
    getCartItems,
} from '../../cartService/cartService';

interface CartItem {
    productId: string;
    productName: string;
    quantity: number;
    productPrice: number;
}

interface CartItemProps {
    item: CartItem;
    updateCart: (items: CartItem[]) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, updateCart }) => {
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
            <h2>{item.productName}</h2>
            <p>Price: ${item.productPrice.toFixed(2)}</p>
            <div className={styles['quantity-controls']}>
                <button onClick={decreaseQuantity}>-</button>
                <span>{item.quantity}</span>
                <button onClick={increaseQuantity}>+</button>
            </div>
            <p>Total: ${(item.productPrice * item.quantity).toFixed(2)}</p>
        </div>
    );
};

export default CartItem;
