// CartButton.tsx
import React, { useEffect, useState } from 'react';
import { Product } from '../../interface/types';
import {
    addItemToCart,
    updateCartItemQuantity,
    getCartItems,
} from '../../services/cartService/cartServiceLocalStorage';

interface CartButtonProps {
    product: Product;
}

const CartButton: React.FC<CartButtonProps> = ({ product }) => {
    const [cartItems, setCartItems] = useState(getCartItems());
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const productInCart = cartItems.find(
            (item) => item.productId === product.id
        );
        if (productInCart) {
            setIsAdded(true);
        }
    }, [cartItems, product.id]);

    const handleCartChange = () => {
        const event = new CustomEvent('cartChange', {
            detail: getCartItems().reduce(
                (total, item) => total + item.quantity,
                0
            ),
        });
        window.dispatchEvent(event);
    };

    const handleAddToCart = () => {
        addItemToCart(product);
        setCartItems(getCartItems());
        handleCartChange();
        setIsAdded(true);
    };

    const increaseQuantity = () => {
        const cartItem = cartItems.find(
            (item) => item.productId === product.id
        );
        if (cartItem && product.quantity > cartItem.quantity) {
            updateCartItemQuantity(product.id, cartItem.quantity + 1);
            setCartItems(getCartItems());
            handleCartChange();
        }
    };

    const decreaseQuantity = () => {
        const cartItem = cartItems.find(
            (item) => item.productId === product.id
        );
        if (cartItem) {
            updateCartItemQuantity(product.id, cartItem.quantity - 1);
            setCartItems(getCartItems());
            handleCartChange();
            if (cartItem.quantity - 1 === 0) {
                setIsAdded(false);
            }
        }
    };

    const getCartQuantity = (): number => {
        const cartItem = cartItems.find(
            (item) => item.productId === product.id
        );
        return cartItem ? cartItem.quantity : 0;
    };

    return (
        <>
            {!isAdded ? (
                <button onClick={handleAddToCart}>Add to Cart</button>
            ) : (
                <div>
                    <button onClick={decreaseQuantity}>-</button>
                    <span>{getCartQuantity()}</span>
                    <button onClick={increaseQuantity}>+</button>
                </div>
            )}
        </>
    );
};

export default CartButton;
