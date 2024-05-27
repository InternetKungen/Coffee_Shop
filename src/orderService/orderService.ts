// src/orderService/orderService.ts
import { db, auth } from '../main';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { CartItem } from '../interface/types';

interface Order {
    userId: string;
    orderDate: any;
    status: string;
    totalAmount: number;
    shippingAddress: {
        street: string;
        postalCode: string;
        city: string;
        country: string;
    };
    paymentMethod: string;
    orderItems: CartItem[];
}

export const createOrder = async (order: Order) => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User not authenticated');
    }

    const orderData = {
        ...order,
        userId: user.uid,
        orderDate: serverTimestamp(),
    };

    const orderRef = await addDoc(collection(db, 'orders'), orderData);

    for (const item of order.orderItems) {
        await addDoc(collection(orderRef, 'orderItems'), item);
    }

    return orderRef.id;
};
