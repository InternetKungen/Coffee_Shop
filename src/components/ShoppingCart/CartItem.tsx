import React, { useState } from 'react';
import { CartItem as CartItemInterface } from '../../interface/interface';
import {
    removeItemFromCart,
    getCartItems,
} from '../../cartService/cartService';
import styles from './CartItem.module.css';
import Product from './Product';
import { handleError } from '../../utils/errorHandler';

interface CartItemProps {
    item: CartItemInterface;
    userId: string;
    updateCart: (items: any) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, userId, updateCart }) => {
    const [quantity, setQuantity] = useState<number>(item.quantity);

    const handleDecrease = async () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            item.quantity -= 1;
            await updateCart(item.quantity);
        }
    };

    const handleIncrease = async () => {
        setQuantity(quantity + 1);
        item.quantity += 1;
        await updateCart(item.quantity);
    };

    const handleRemove = async () => {
        try {
            await removeItemFromCart(userId, item.productId);
            const items = await getCartItems(userId);
            updateCart(items);
        } catch (error) {
            // console.error('Error removing item from cart:', error);
            handleError(error);
        }
    };

    return (
        <div className={styles['cart-item']}>
            <p>Product Name: {item.productName}</p>
            <button
                className={styles['quantity-button']}
                onClick={handleDecrease}
                disabled={quantity <= 1}
            >
                -
            </button>
            <span id="quantity">Qty: {quantity}</span>
            <button
                className={styles['quantity-button']}
                onClick={handleIncrease}
            >
                +
            </button>
            <p>Price: ${item.productPrice}</p>
            <p>Total: ${item.productPrice * quantity}</p>
            <button onClick={handleRemove}>Remove</button>
        </div>
    );
};

export default CartItem;
