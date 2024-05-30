// WAS CartLocalStorage.tsx --> NOW Cart.tsx
// This component is used on the shopping cart page where users can view and manage their cart items.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getCartItems,
    clearCart,
    updateCartItemQuantity,
    removeCartItem,
} from '../../services/cartService/cartServiceLocalStorage';
import { CartItem, CartProduct } from '../../interface/types';
import styles from './Cart.module.css';
import TitleSection from '../TitleSection/TitleSection';
// Import getProductById at the top of your file
import { getProductById } from './cartPageService'; // Adjust the path as necessary

// The main Cart component
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
    // State to hold cart items
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    // Hook for navigation
    const navigate = useNavigate();

    // useEffect to fetch cart items from local storage and product details on component mount
    useEffect(() => {
        const fetchCartItems = async () => {
            // Get cart items from local storage
            const cartItems = getCartItems();
            // Fetch product details for each cart item
            const fetchedItems: CartItem[] = await Promise.all(
                cartItems.map(async (item) => {
                    const product = await getProductById(item.productId);
                    return {
                        ...item,
                        productName: product.name,
                        productPrice: product.price,
                    };
                })
            );
            // Update state with fetched items
            setCartItems(fetchedItems);
        };

        fetchCartItems();
    }, []);

    // Handler to clear the cart
    const handleClearCart = () => {
        clearCart();
        setCartItems([]);
        handleCartChange();
    };

    // Handler to navigate to the checkout page
    const handleCheckout = () => {
        navigate('/order');
    };

    // Handler to increase the quantity of a cart item
    const increaseQuantity = async (productId: string) => {
        const updatedItems = await Promise.all(
            cartItems.map(async (item) => {
                if (item.productId === productId) {
                    const updatedQuantity = item.quantity + 1;
                    const productQuantity = await getProductQuantity(productId);
                    if (updatedQuantity <= productQuantity) {
                        updateCartItemQuantity(productId, updatedQuantity);
                        return { ...item, quantity: updatedQuantity };
                    }
                }
                return item;
            })
        );
        setCartItems(updatedItems);
    };

    // Handler to decrease the quantity of a cart item
    const decreaseQuantity = async (productId: string) => {
        const updatedItems = (
            await Promise.all(
                cartItems.map(async (item) => {
                    if (item.productId === productId) {
                        const updatedQuantity = item.quantity - 1;
                        if (updatedQuantity >= 1) {
                            updateCartItemQuantity(productId, updatedQuantity);
                            return { ...item, quantity: updatedQuantity };
                        } else {
                            removeCartItem(productId);
                            return null; // Indicate item should be removed
                        }
                    }
                    return item;
                })
            )
        ).filter((item) => item !== null); // Filter out null values
        setCartItems(updatedItems as CartItem[]);
    };

    // Helper function to get the available quantity of a product
    const getProductQuantity = async (productId: string): Promise<number> => {
        try {
            const product = await getProductById(productId);
            return product.quantity;
        } catch (error) {
            console.error('Error fetching product quantity', error);
            return 0; // Return 0 or handle the error as needed
        }
    };

    // Render the cart component
    return (
        <div className={styles['cart-page']}>
            <TitleSection title="Shopping Cart" />
            {/* Rendering based on whether cart has items or not */}
            {cartItems.length > 0 ? (
                <div>
                    {cartItems.map((item) => (
                        <div
                            key={item.productId}
                            className={styles['cart-item']}
                        >
                            <h2>{item.productName}</h2>
                            <p>Price: ${item.productPrice.toFixed(2)}</p>
                            <div className={styles['quantity-controls']}>
                                <button
                                    onClick={() =>
                                        decreaseQuantity(item.productId)
                                    }
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() =>
                                        increaseQuantity(item.productId)
                                    }
                                >
                                    +
                                </button>
                            </div>
                            <p>
                                Total: $
                                {(item.productPrice * item.quantity).toFixed(2)}
                            </p>
                        </div>
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
