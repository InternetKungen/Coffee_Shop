import React, { useEffect, useState } from 'react';
import { getCartItems } from '../services/cartService';
import { CartItem as CartItemInterface } from '../interface/interface';
import CartItem from '../ShoppingCart/CartItem';
import styles from './cart.module.css';

interface CartProps {
    userId: string;
    cartItems: CartItemInterface[];
    updateCart: (items: any) => void;
}

const Cart: React.FC<CartProps> = ({ userId, cartItems, updateCart }) => {
    const [items, setItems] = useState<CartItemInterface[]>(cartItems);

    useEffect(() => {
        async function fetchCartItems() {
            const items = await getCartItems(userId);
            setItems(items);
        }

        fetchCartItems();
    }, [userId]);

    const total = items.reduce(
        (sum, item) => sum + item.productPrice * item.quantity,
        0
    );

    return (
        <div className={styles['cart-container']}>
            <h2>Your Shopping Cart 🛒</h2>
            {items.length > 0 ? (
                <>
                    {items.map((item) => (
                        <CartItem
                            key={item.productId}
                            item={item}
                            userId={userId}
                            updateCart={updateCart}
                        />
                    ))}
                    <div className={styles['cart-total']}>
                        <h3>Total: ${total.toFixed(2)}</h3>
                    </div>
                </>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
