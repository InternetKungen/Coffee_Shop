// OrderHistory.tsx
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../main';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import styles from './OrderHistory.module.css';
import { Order } from '../../interface/types';
import { onAuthStateChanged } from 'firebase/auth';
import TitleSection from '../TitleSection/TitleSection';

const OrderHistory: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                navigate('/sign-in');
            } else {
                const q = query(
                    collection(db, 'orders'),
                    where('userId', '==', user.uid)
                );
                const querySnapshot = await getDocs(q);
                const ordersList: Order[] = [];
                querySnapshot.forEach((doc) => {
                    const orderData = doc.data() as Order;
                    ordersList.push({
                        ...orderData,
                        id: doc.id,
                        orderItems: orderData.orderItems || [],
                    });
                });
                setOrders(ordersList);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles['order-history-page']}>
            <TitleSection title="Order History" />
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map((order) => (
                    <div key={order.id} className={styles['order-item']}>
                        <h2>Order ID: {order.id}</h2>
                        <p>Status: {order.status}</p>
                        <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
                        <h3>Items:</h3>
                        <ul>
                            {order.orderItems.map((item) => (
                                <li key={item.productId}>
                                    {item.productName} - Quantity:{' '}
                                    {item.quantity} - Price: $
                                    {item.productPrice.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default OrderHistory;
