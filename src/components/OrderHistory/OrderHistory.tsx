// OrderHistory.tsx
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../main';
import {
    collection,
    query,
    where,
    getDocs,
    Timestamp,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import styles from './OrderHistory.module.css';
import { OrderHistoryInterface } from '../../interface/types';
import { onAuthStateChanged } from 'firebase/auth';
import TitleSection from '../TitleSection/TitleSection';

const OrderHistory: React.FC = () => {
    const [orders, setOrders] = useState<OrderHistoryInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Function to convert Firestore Timestamp to JavaScript Date
    const convertTimestampToDate = (timestamp: Timestamp): Date => {
        return timestamp.toDate();
    };

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
                const ordersList: OrderHistoryInterface[] = [];
                querySnapshot.forEach((doc) => {
                    const orderData = doc.data() as OrderHistoryInterface;
                    ordersList.push({
                        ...orderData,
                        id: doc.id,
                        orderItems: orderData.orderItems || [],
                        orderDateConverted: convertTimestampToDate(
                            orderData.orderDate
                        ), // Convert Timestamp to Date
                    });
                });

                // Sort orders by orderDateConverted in descending order (most recent first)
                ordersList.sort(
                    (a, b) =>
                        b.orderDateConverted.getTime() -
                        a.orderDateConverted.getTime()
                );

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
                        <p>
                            Order Date:{' '}
                            {
                                order.orderDateConverted
                                    .toISOString()
                                    .split('T')[0]
                            }{' '}
                            {order.orderDateConverted.toLocaleTimeString(
                                'sv-SE',
                                { hour: '2-digit', minute: '2-digit' }
                            )}
                        </p>{' '}
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
