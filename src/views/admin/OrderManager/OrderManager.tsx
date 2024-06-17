// import React, { useEffect, useState } from 'react';
// import { db } from '../../../main';
// import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
// import styles from './OrderManager.module.css';
// import TitleSection from '../../../components/TitleSection/TitleSection';

// interface Order {
//     orderId: string;
//     orderDate: Date;
//     orderItems: Array<{
//         productId: string;
//         productName: string;
//         productPrice: number;
//         quantity: number;
//     }>;
//     paymentMethod: string;
//     shippingAddress: {
//         city: string;
//         country: string;
//         postalCode: string;
//         street: string;
//     };
//     status: string;
//     totalAmount: number;
//     userId: string;
// }

// interface UserProfile {
//     uid: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     profilePicture: string;
//     phoneNumber: string;
//     address: {
//         street: string;
//         city: string;
//         country: string;
//         postalCode: string;
//     };
// }

// const OrderManager: React.FC = () => {
//     const [orders, setOrders] = useState<Order[]>([]);
//     const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
//     const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//     const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
//     const [isLoadingOrders, setIsLoadingOrders] = useState(false);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             setIsLoadingOrders(true);
//             try {
//                 const ordersCollection = collection(db, 'orders');
//                 const ordersSnapshot = await getDocs(ordersCollection);
//                 const ordersList: Order[] = ordersSnapshot.docs.map(
//                     (doc) =>
//                         ({
//                             orderId: doc.id,
//                             ...doc.data(),
//                             orderDate: doc.data().orderDate.toDate(),
//                         } as Order)
//                 );
//                 setOrders(ordersList);
//                 setFilteredOrders(ordersList); // Set initial filtered orders to all orders
//             } catch (error) {
//                 console.error('Error fetching orders:', error);
//             }
//             setIsLoadingOrders(false);
//         };

//         fetchOrders();
//     }, []);

//     useEffect(() => {
//         if (selectedOrder) {
//             const fetchUserProfile = async () => {
//                 try {
//                     const userRef = doc(db, 'users', selectedOrder.userId);
//                     const userSnap = await getDoc(userRef);
//                     if (userSnap.exists()) {
//                         setSelectedUser(userSnap.data() as UserProfile);
//                     }
//                 } catch (error) {
//                     console.error('Error fetching user profile:', error);
//                 }
//             };

//             fetchUserProfile();
//         }
//     }, [selectedOrder]);

//     const handleSortOrders = (key: keyof Order) => {
//         const sortedOrders = [...filteredOrders].sort((a, b) => {
//             if (a[key] < b[key]) return -1;
//             if (a[key] > b[key]) return 1;
//             return 0;
//         });
//         setFilteredOrders(sortedOrders);
//     };

//     const showAllOrdersFromUser = () => {
//         if (selectedOrder) {
//             const userOrders = orders.filter(
//                 (order) => order.userId === selectedOrder.userId
//             );
//             setFilteredOrders(userOrders);
//         }
//     };

//     const showAllItems = () => {
//         setFilteredOrders(orders);
//     };

//     if (isLoadingOrders) {
//         return <div>Loading orders...</div>;
//     }

//     return (
//         <div className={styles['order-manager-wrapper']}>
//             <TitleSection title="Order Manager" />
//             <div className={styles['order-manager']}>
//                 <section className={styles['order-manager__top-section']}>
//                     <section
//                         className={
//                             styles['order-manager__top-section__left-section']
//                         }
//                     >
//                         <section className={styles['search-bar-order-list']}>
//                             //add a search-bar for searching order-list and
//                             profile information
//                         </section>
//                         <section className={styles['sort-order-list']}>
//                             <button
//                                 onClick={() => handleSortOrders('orderDate')}
//                             >
//                                 Sort by Date
//                             </button>
//                             <button
//                                 onClick={() => handleSortOrders('totalAmount')}
//                             >
//                                 Sort by Amount
//                             </button>
//                         </section>
//                     </section>
//                     <section className={styles['order-list-container']}>
//                         <h3>Select Order From List:</h3>

//                         <section
//                             className={styles['order-list-inner-container']}
//                         >
//                             <section className={styles['order-list-titles']}>
//                                 <p>Order ID</p>
//                                 <p>Order Status</p>
//                                 <p>Total Amount</p>
//                             </section>
//                             <ul className={styles['order-list']}>
//                                 {filteredOrders.length > 0 ? (
//                                     filteredOrders.map((order) => (
//                                         <li
//                                             key={order.orderId}
//                                             onClick={() =>
//                                                 setSelectedOrder(order)
//                                             }
//                                             className={
//                                                 selectedOrder?.orderId ===
//                                                 order.orderId
//                                                     ? styles['selected']
//                                                     : ''
//                                             }
//                                         >
//                                             <p>{order.orderId}</p>
//                                             <p>{order.status}</p>
//                                             <p>${order.totalAmount}</p>
//                                         </li>
//                                     ))
//                                 ) : (
//                                     <li>No orders found.</li>
//                                 )}
//                             </ul>
//                         </section>
//                     </section>
//                 </section>
//                 <section className={styles['order-manager__bottom-section']}>
//                     <div className={styles['order-details-container']}>
//                         <section className={styles['user-info']}>
//                             <h3>User Information</h3>
//                             {selectedUser ? (
//                                 <div>
//                                     <p>
//                                         Name: {selectedUser.firstName}{' '}
//                                         {selectedUser.lastName}
//                                     </p>
//                                     <p>Email: {selectedUser.email}</p>
//                                     <p>Phone: {selectedUser.phoneNumber}</p>
//                                     <p>
//                                         Address: {selectedUser.address.street},{' '}
//                                         {selectedUser.address.city},{' '}
//                                         {selectedUser.address.country},{' '}
//                                         {selectedUser.address.postalCode}
//                                     </p>
//                                     <section>
//                                         //button to ' Open in ProfileManager '
//                                     </section>
//                                 </div>
//                             ) : (
//                                 <div>
//                                     Select an order to see user information.
//                                 </div>
//                             )}
//                         </section>
//                         <section className={styles['order-items']}>
//                             <h3>Order Items</h3>
//                             {selectedOrder ? (
//                                 <ul>
//                                     {selectedOrder.orderItems.map(
//                                         (item, index) => (
//                                             <li key={index}>
//                                                 {item.productName} - $
//                                                 {item.productPrice} x{' '}
//                                                 {item.quantity}
//                                             </li>
//                                         )
//                                     )}
//                                 </ul>
//                             ) : (
//                                 <div>Select an order to see order items.</div>
//                             )}
//                             {selectedOrder && (
//                                 <>
//                                     <p>
//                                         Total Amount: $
//                                         {selectedOrder.totalAmount}
//                                     </p>

//                                     <button onClick={showAllOrdersFromUser}>
//                                         Show all orders from user
//                                     </button>
//                                     <button onClick={showAllItems}>
//                                         Show all items
//                                     </button>
//                                 </>
//                             )}
//                         </section>
//                     </div>
//                 </section>
//             </div>
//         </div>
//     );
// };

// export default OrderManager;

// #1 ---------------------------------------------------

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
        firstName: string;
        lastName: string;
        city: string;
        country: string;
        postalCode: string;
        street: string;
    };
    status: string;
    totalAmount: number;
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

interface UserProfile {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
    phoneNumber: string;
    address: {
        firstName: string;
        lastName: string;
        street: string;
        city: string;
        country: string;
        postalCode: string;
    };
}

const OrderManager: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null); //använder Order - för att namn och adress kan skilja
    const [isLoadingOrders, setIsLoadingOrders] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoadingOrders(true);
            try {
                const ordersCollection = collection(db, 'orders');
                const ordersSnapshot = await getDocs(ordersCollection);
                const ordersList: Order[] = ordersSnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        orderId: doc.id,
                        ...data,
                        orderDate: data.orderDate?.toDate
                            ? data.orderDate.toDate()
                            : new Date(),
                    } as Order;
                });
                setOrders(ordersList);
                setFilteredOrders(ordersList); // Set initial filtered orders to all orders
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
        const sortedOrders = [...filteredOrders].sort((a, b) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });
        setFilteredOrders(sortedOrders);
    };

    const showAllOrdersFromUser = () => {
        if (selectedOrder) {
            const userOrders = orders.filter(
                (order) => order.userId === selectedOrder.userId
            );
            setFilteredOrders(userOrders);
        }
    };

    const showAllItems = () => {
        setFilteredOrders(orders);
    };

    // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchTerm(e.target.value);
    //     const filtered = orders.filter((order) =>
    //         order.orderId.toLowerCase().includes(e.target.value.toLowerCase())
    //     );
    //     setFilteredOrders(filtered);
    // };
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        const searchTermLower = e.target.value.toLowerCase();

        const filtered = orders.filter((order) => {
            // Kontrollera att alla nödvändiga fält finns
            if (
                !order ||
                !order.orderDate ||
                !order.orderItems ||
                !order.shippingAddress
            ) {
                return false;
            }

            // Convert order date to string for comparison
            const orderDateStr = order.orderDate.toString().toLowerCase();

            // Convert order items to string for comparison
            const orderItemsStr = order.orderItems
                .map(
                    (item) =>
                        `${item.productName} ${item.productId} ${item.productPrice} ${item.quantity}`
                )
                .join(' ')
                .toLowerCase();

            // Convert shipping address to string for comparison
            const shippingAddressStr = `
                ${order.shippingAddress.firstName}
                ${order.shippingAddress.lastName}
                ${order.shippingAddress.city}
                ${order.shippingAddress.country}
                ${order.shippingAddress.postalCode}
                ${order.shippingAddress.street}
                `.toLowerCase();

            // Convert other fields to strings for comparison
            const paymentMethodStr = order.paymentMethod.toLowerCase();
            const statusStr = order.status.toLowerCase();
            const totalAmountStr = order.totalAmount.toString();
            const userIdStr = order.userId.toLowerCase();
            const emailStr = order.email.toLowerCase();

            // Debugging information
            console.log({
                orderId: order.orderId.toLowerCase().includes(searchTermLower),
                orderDateStr: orderDateStr.includes(searchTermLower),
                orderItemsStr: orderItemsStr.includes(searchTermLower),
                paymentMethodStr: paymentMethodStr.includes(searchTermLower),
                shippingAddressStr:
                    shippingAddressStr.includes(searchTermLower),
                statusStr: statusStr.includes(searchTermLower),
                totalAmountStr: totalAmountStr.includes(searchTermLower),
                userIdStr: userIdStr.includes(searchTermLower),
            });

            // Check if search term is included in any of the order fields
            return (
                order.orderId.toLowerCase().includes(searchTermLower) ||
                orderDateStr.includes(searchTermLower) ||
                orderItemsStr.includes(searchTermLower) ||
                paymentMethodStr.includes(searchTermLower) ||
                shippingAddressStr.includes(searchTermLower) ||
                statusStr.includes(searchTermLower) ||
                totalAmountStr.includes(searchTermLower) ||
                userIdStr.includes(searchTermLower) ||
                emailStr.includes(searchTermLower)
            );
        });

        setFilteredOrders(filtered);
    };

    if (isLoadingOrders) {
        return <div>Loading orders...</div>;
    }

    return (
        <div className={styles['order-manager-wrapper']}>
            <TitleSection title="Order Manager" />
            <div className={styles['order-manager']}>
                <section className={styles['order-manager__top-section']}>
                    <section
                        className={
                            styles['order-manager__top-section__left-section']
                        }
                    >
                        <section className={styles['search-bar-order-list']}>
                            <input
                                type="text"
                                placeholder="Search Orders"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </section>
                        <section className={styles['sort-order-list']}>
                            <button
                                onClick={() => handleSortOrders('orderDate')}
                            >
                                Sort by Date
                            </button>
                            <button
                                onClick={() => handleSortOrders('totalAmount')}
                            >
                                Sort by Amount
                            </button>
                        </section>
                    </section>

                    <section className={styles['order-list-container']}>
                        {/* <h3>Select Order From List:</h3> */}
                        <section
                            className={styles['order-list-inner-container']}
                        >
                            <section className={styles['order-list-titles']}>
                                <p>Order ID</p>
                                <p>Customer</p>
                                <p>Order Date</p>
                                <p>Order Status</p>
                                <p>Total Amount</p>
                            </section>
                            <ul className={styles['order-list']}>
                                {filteredOrders.length > 0 ? (
                                    filteredOrders.map((order) => (
                                        <li
                                            key={order.orderId}
                                            onClick={() =>
                                                setSelectedOrder(order)
                                            }
                                            className={
                                                selectedOrder?.orderId ===
                                                order.orderId
                                                    ? styles['selected']
                                                    : ''
                                            }
                                        >
                                            <p>{order.orderId}</p>
                                            <p>{order.email}</p>
                                            <p>
                                                {order.orderDate.toLocaleDateString()}
                                            </p>
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
                </section>
                <section className={styles['order-manager__bottom-section']}>
                    <div className={styles['order-details-container']}>
                        <section className={styles['user-info']}>
                            <h3>Profile Information</h3>
                            {selectedOrder ? (
                                <div>
                                    <div className={styles['info-row']}>
                                        <span className={styles['info-title']}>
                                            Name:
                                        </span>
                                        <span
                                            className={styles['info-content']}
                                        >
                                            {selectedOrder.firstName}{' '}
                                            {selectedOrder.lastName}
                                        </span>
                                    </div>
                                    <div className={styles['info-row']}>
                                        <span className={styles['info-title']}>
                                            Email:
                                        </span>
                                        <span
                                            className={styles['info-content']}
                                        >
                                            {selectedOrder.email}
                                        </span>
                                    </div>
                                    <div className={styles['info-row']}>
                                        <span className={styles['info-title']}>
                                            Phone:
                                        </span>
                                        <span
                                            className={styles['info-content']}
                                        >
                                            {selectedOrder.phoneNumber}
                                        </span>
                                    </div>
                                    <div className={styles['info-row']}>
                                        <span className={styles['info-title']}>
                                            Address:
                                        </span>
                                        <span
                                            className={styles['info-content']}
                                        >
                                            {
                                                selectedOrder.shippingAddress
                                                    .firstName
                                            }{' '}
                                            {
                                                selectedOrder.shippingAddress
                                                    .lastName
                                            }
                                            <br></br>
                                            {
                                                selectedOrder.shippingAddress
                                                    .street
                                            }
                                            <br></br>
                                            {
                                                selectedOrder.shippingAddress
                                                    .postalCode
                                            }
                                            ,{' '}
                                            {selectedOrder.shippingAddress.city}
                                            <br></br>
                                            {
                                                selectedOrder.shippingAddress
                                                    .country
                                            }
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            alert('Open in ProfileManager');
                                        }}
                                    >
                                        Open in ProfileManager
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    Select an order to see user information.
                                </div>
                            )}
                        </section>

                        <section className={styles['order-items']}>
                            <h3>Order Items</h3>
                            {selectedOrder ? (
                                <ul>
                                    {selectedOrder.orderItems.map(
                                        (item, index) => (
                                            <li key={index}>
                                                {item.productName} - $
                                                {item.productPrice} x{' '}
                                                {item.quantity}
                                            </li>
                                        )
                                    )}
                                </ul>
                            ) : (
                                <div>Select an order to see order items.</div>
                            )}
                            {selectedOrder && (
                                <>
                                    <p>
                                        Total Amount: $
                                        {selectedOrder.totalAmount}
                                    </p>
                                    <button onClick={showAllOrdersFromUser}>
                                        Show all orders from user
                                    </button>
                                    <button onClick={showAllItems}>
                                        Show all items
                                    </button>
                                </>
                            )}
                        </section>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default OrderManager;
