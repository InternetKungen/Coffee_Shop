// Order.tsx
import React, { useState, useEffect } from 'react';
import {
    getCartItems,
    clearCart,
} from '../../cartService/cartServiceLocalStorage';
import { createOrder } from '../../orderService/orderService';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../main';
import { doc, getDoc } from 'firebase/firestore';
import styles from './Order.module.css';
import { CartItem } from '../../interface/types';
import { onAuthStateChanged } from 'firebase/auth';

interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
    phoneNumber: string;
    address: {
        street: string;
        postalCode: string;
        city: string;
        country: string;
    };
}

const Order: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>(getCartItems());
    const [shippingAddress, setShippingAddress] = useState({
        street: '',
        postalCode: '',
        city: '',
        country: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(true); // New loading state
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/sign-in');
            } else {
                setLoading(false); // Set loading to false when user is determined
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    useEffect(() => {
        if (!loading) {
            const calculateTotal = () => {
                const total = cartItems.reduce(
                    (acc, item) => acc + item.productPrice * item.quantity,
                    0
                );
                setTotalAmount(total);
            };

            calculateTotal();
        }
    }, [cartItems, loading]);

    useEffect(() => {
        if (!loading) {
            const fetchUserProfile = async () => {
                const user = auth.currentUser;

                if (!user) {
                    navigate('/sign-in');
                    return;
                }

                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const userProfile = docSnap.data() as UserProfile;
                    if (userProfile.address) {
                        setShippingAddress(userProfile.address);
                    }
                }
            };

            fetchUserProfile();
        }
    }, [navigate, loading]);

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitOrder = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                navigate('/sign-in');
                return;
            }

            await createOrder({
                userId: user.uid,
                orderDate: new Date(),
                status: 'pending',
                totalAmount,
                shippingAddress,
                paymentMethod,
                orderItems: cartItems,
            });
            clearCart();
            setCartItems([]);
            navigate('/order-success');
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show a loading message while checking auth state
    }

    return (
        <div className={styles['order-page']}>
            <h1>Place Your Order</h1>
            <div className={styles['order-form']}>
                <h2>Shipping Address</h2>
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
                <button onClick={handleSubmitOrder}>Submit Order</button>
            </div>
        </div>
    );
};

export default Order;
