// CartButton.tsx
import React, { useEffect, useState } from 'react';
import { Product } from '../../interface/types';
import {
    addItemToCart,
    updateCartItemQuantity,
    getCartItems,
} from '../../services/cartService/cartServiceLocalStorage';
import addToCartIcon from './../../assets/img/shopping-cart-add-white.png';
import styles from './CartButton.module.css';
import hollowCartIcon from './../../assets/img/shopping-cart-white.png';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../main';

interface CartButtonProps {
    product: Product;
}

const CartButton: React.FC<CartButtonProps> = ({ product }) => {
    const [cartItems, setCartItems] = useState(getCartItems());
    const [isAdded, setIsAdded] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const productInCart = cartItems.find(
            (item) => item.productId === product.id
        );
        if (productInCart) {
            setIsAdded(true);
        }
    }, [cartItems, product.id]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsUserLoggedIn(!!user);
        });

        return () => unsubscribe();
    }, []);

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
        if (!isUserLoggedIn) {
            navigate('/sign-in');
            return;
        }

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
            <div className={styles['cart-button-container']}>
                {!isAdded ? (
                    <button onClick={handleAddToCart}>
                        <p>Add to Cart</p>
                        <img src={addToCartIcon} alt="add-to-cart-icon" />
                    </button>
                ) : (
                    <div
                        className={
                            styles['cart-button-container__quantity-container']
                        }
                    >
                        <img src={hollowCartIcon} alt="add-to-cart-icon" />
                        <div
                            className={
                                styles['cart-button-container__quantity']
                            }
                        >
                            <button onClick={decreaseQuantity}>
                                <p>-</p>
                            </button>
                            <span>{getCartQuantity()}</span>
                            <button onClick={increaseQuantity}>
                                <p>+</p>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartButton;
