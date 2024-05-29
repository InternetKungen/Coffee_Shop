import React, { useState, useEffect } from 'react';
import {
    getCartItems,
    clearCart,
} from '../../cartService/cartServiceLocalStorage';
import { createOrder, checkStock } from '../../orderService/orderService';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../main';
import { doc, getDoc } from 'firebase/firestore';
import styles from './Order.module.css';
import { CartItem, UserProfile } from '../../interface/types';
import { onAuthStateChanged } from 'firebase/auth';

const Order: React.FC = () => {
    // State variables to manage order details
    const [cartItems, setCartItems] = useState<CartItem[]>(getCartItems());
    const [shippingAddress, setShippingAddress] = useState({
        street: "",
        postalCode: "",
        city: "",
        country: "",
    });
    const [paymentMethod, setPaymentMethod] = useState("Credit Card");
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    // Effect hook to check user authentication status
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                // Redirect user to sign-in page if not authenticated
                navigate("/sign-in");
            } else {
                // Mark loading as false when user is authenticated
                setLoading(false);
            }
        });

        // Cleanup function to unsubscribe from auth state changes
        return () => unsubscribe();
    }, [navigate]);

    // Effect hook to calculate total amount when cart items or loading state changes
    useEffect(() => {
        if (!loading) {
            const calculateTotal = () => {
                // Calculate total amount from cart items
                const total = cartItems.reduce(
                    (acc, item) => acc + item.productPrice * item.quantity,
                    0
                );
                setTotalAmount(total);
            };

            // Call calculateTotal function
            calculateTotal();
        }
    }, [cartItems, loading]);

    // Effect hook to fetch user profile and set shipping address
    useEffect(() => {
        if (!loading) {
            const fetchUserProfile = async () => {
                const user = auth.currentUser;

                if (!user) {
                    navigate("/sign-in");
                    return;
                }

                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    // Set shipping address if user profile exists
                    const userProfile = docSnap.data() as UserProfile;
                    if (userProfile.address) {
                        setShippingAddress(userProfile.address);
                    }
                }
            };

            // Call fetchUserProfile function
            fetchUserProfile();
        }
    }, [navigate, loading]);

    // Function to handle address changes
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Update shipping address state
        setShippingAddress((prev) => ({ ...prev, [name]: value }));
    };

    // Function to validate shipping address
    const validateAddress = () => {
        const newErrors = [];
        if (!shippingAddress.street) newErrors.push("Street is required.");
        if (!shippingAddress.postalCode)
            newErrors.push("Postal Code is required.");
        if (!shippingAddress.city) newErrors.push("City is required.");
        if (!shippingAddress.country) newErrors.push("Country is required.");
        // Update errors state
        setErrors(newErrors);
        return newErrors.length === 0;
    };

    // Function to handle order submission
    const handleSubmitOrder = async () => {
        if (cartItems.length === 0) {
            setErrors([
                'Your cart is empty. Please add products to your cart before placing an order.',
            ]);
            return;
        }

        // Validate the address. If it is not valid, exit the function.
        if (!validateAddress()) return;

        try {
            // Check the stock for the items in the cart asynchronously.
            const insufficientStock = await checkStock(cartItems);
            // If there are items with insufficient stock, set an error message and exit the function.
            if (insufficientStock.length > 0) {
                setErrors([
                    `Insufficient stock for the following products: ${insufficientStock.join(
                        ', '
                    )}`,
                ]);
                return;
            }

            // Get the current authenticated user.
            const user = auth.currentUser;
            // If there is no authenticated user, navigate to the sign-in page.
            if (!user) {
                navigate('/sign-in');
                return;
            }

            // Create order with user details, shipping address, payment method, and cart items
            await createOrder({
                userId: user.uid,
                orderDate: new Date(),
                status: 'pending',
                totalAmount,
                shippingAddress,
                paymentMethod,
                orderItems: cartItems,
            });

            // Clear cart after successful order submission
            clearCart();
            setCartItems([]);
            // Redirect user to order success page
            navigate('/order-success');
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };

    // Render loading indicator while loading
    if (loading) {
        return <div>Loading...</div>;
    }

    // Render order form
    return (
        <div className={styles["order-page"]}>
            <h1>Place Your Order</h1>
            <div className={styles["order-form"]}>
                <h2>Shipping Address</h2>
                {errors.length > 0 && (
                    <div className={styles["error-messages"]}>
                        {/* Render error messages */}
                        {errors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
                <label>
                    Street:
                    <input
                        type="text"
                        name="street"
                        value={shippingAddress.street}
                        onChange={handleAddressChange}
                    />
                </label>
                <label>
                    Postal Code:
                    <input
                        type="text"
                        name="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={handleAddressChange}
                    />
                </label>
                <label>
                    City:
                    <input
                        type="text"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleAddressChange}
                    />
                </label>
                <label>
                    Country:
                    <input
                        type="text"
                        name="country"
                        value={shippingAddress.country}
                        onChange={handleAddressChange}
                    />
                </label>
                <h2>Payment Method</h2>
                {/* Select payment method */}
                <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <option value="Credit Card">Credit Card</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                </select>
                <h2>Order Summary</h2>
                <p>Total Amount: ${totalAmount.toFixed(2)}</p>
                {/* Button to submit order */}
                <button onClick={handleSubmitOrder}>Submit Order</button>
            </div>
        </div>
    );
};

export default Order;
