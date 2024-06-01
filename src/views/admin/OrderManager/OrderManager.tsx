import React, { useEffect, useState } from 'react';
import { db } from '../../../main';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import styles from './OrderManager.module.css';
import TitleSection from '../../../components/TitleSection/TitleSection';

interface Order {
    orderId: string;
    orderDate: Date;
    orderItems: Array<{
        productId: string;
        productName: string;
        productPrice: number;
        quantity: number;
    }>;
    paymentMethod: string;
    shippingAddress: {
        city: string;
        country: string;
        postalCode: string;
        street: string;
    };
    status: string;
    totalAmount: number;
    userId: string;
}

interface UserProfile {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
    phoneNumber: string;
    address: {
        street: string;
        city: string;
        country: string;
        postalCode: string;
    };
}

const OrderManager: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
    const [isLoadingOrders, setIsLoadingOrders] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoadingOrders(true);
            try {
                const ordersCollection = collection(db, 'orders');
                const ordersSnapshot = await getDocs(ordersCollection);
                const ordersList: Order[] = ordersSnapshot.docs.map(
                    (doc) =>
                        ({
                            orderId: doc.id,
                            ...doc.data(),
                            orderDate: doc.data().orderDate.toDate(),
                        } as Order)
                );
                setOrders(ordersList);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
            setIsLoadingOrders(false);
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        if (selectedOrder) {
            const fetchUserProfile = async () => {
                try {
                    const userRef = doc(db, 'users', selectedOrder.userId);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        setSelectedUser(userSnap.data() as UserProfile);
                    }
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                }
            };

            fetchUserProfile();
        }
    }, [selectedOrder]);

    const handleSortOrders = (key: keyof Order) => {
        const sortedOrders = [...orders].sort((a, b) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });
        setOrders(sortedOrders);
    };

    if (isLoadingOrders) {
        return <div>Loading orders...</div>;
    }

    return (
        <div className={styles['order-manager-wrapper']}>
            <TitleSection title="Order Manager" />
            <div className={styles['order-manager']}>
                <section className={styles['order-list-container']}>
                    <h3>Select Order From List:</h3>
                    <button onClick={() => handleSortOrders('orderDate')}>
                        Sort by Date
                    </button>
                    <button onClick={() => handleSortOrders('totalAmount')}>
                        Sort by Amount
                    </button>
                    <section className={styles['order-list-inner-container']}>
                        <section className={styles['order-list-titles']}>
                            <p>Order ID</p>
                            <p>Order Status</p>
                            <p>Total Amount</p>
                        </section>
                        <ul className={styles['order-list']}>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <li
                                        key={order.orderId}
                                        onClick={() => setSelectedOrder(order)}
                                        className={
                                            selectedOrder?.orderId ===
                                            order.orderId
                                                ? styles['selected']
                                                : ''
                                        }
                                    >
                                        <p>{order.orderId}</p>
                                        <p>{order.status}</p>
                                        <p>${order.totalAmount}</p>
                                    </li>
                                ))
                            ) : (
                                <li>No orders found.</li>
                            )}
                        </ul>
                    </section>
                </section>
                <div className={styles['order-details-container']}>
                    <section className={styles['user-info']}>
                        <h3>User Information</h3>
                        {selectedUser ? (
                            <div>
                                <p>
                                    Name: {selectedUser.firstName}{' '}
                                    {selectedUser.lastName}
                                </p>
                                <p>Email: {selectedUser.email}</p>
                                <p>Phone: {selectedUser.phoneNumber}</p>
                                <p>
                                    Address: {selectedUser.address.street},{' '}
                                    {selectedUser.address.city},{' '}
                                    {selectedUser.address.country},{' '}
                                    {selectedUser.address.postalCode}
                                </p>
                            </div>
                        ) : (
                            <div>Select an order to see user information.</div>
                        )}
                    </section>
                    <section className={styles['order-items']}>
                        <h3>Order Items</h3>
                        {selectedOrder ? (
                            <ul>
                                {selectedOrder.orderItems.map((item, index) => (
                                    <li key={index}>
                                        {item.productName} - $
                                        {item.productPrice} x {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div>Select an order to see order items.</div>
                        )}
                        {selectedOrder && (
                            <p>Total Amount: ${selectedOrder.totalAmount}</p>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default OrderManager;
