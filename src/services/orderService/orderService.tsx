// orderService.ts

// Importing the Firestore database instance and authentication module from the main file
import { db, auth } from '../../main';

// Importing necessary functions from Firestore library
import {
    collection,
    addDoc,
    serverTimestamp,
    updateDoc,
    doc,
    getDoc,
} from 'firebase/firestore';

// Importing the Order interface from types
import { Order } from '../../interface/types';

// Function to create an order asynchronously
export const createOrder = async (order: Order) => {
    // Get the current user from authentication
    const user = auth.currentUser;

    // If user is not authenticated, throw an error
    if (!user) {
        throw new Error('User not authenticated');
    }

    // Prepare order data with additional information (userId and orderDate)
    const orderData = {
        ...order,
        userId: user.uid,
        orderDate: serverTimestamp(),
    };

    // Add the order data to the 'orders' collection in Firestore and get the reference
    const orderRef = await addDoc(collection(db, 'orders'), orderData);

    // Iterate over each order item and add them to the 'orderItems' subcollection under the order reference
    for (const item of order.orderItems) {
        await addDoc(collection(orderRef, 'orderItems'), item);
    }

    for (const item of order.orderItems) {
        await addDoc(collection(orderRef, 'orderItems'), item);

        // Update the product quantity after placing the order
        const productDocRef = doc(db, 'products', item.productId);
        const productSnapshot = await getDoc(productDocRef);
        if (productSnapshot.exists()) {
            const productData = productSnapshot.data();
            const updatedQuantity = productData.quantity - item.quantity;
            if (updatedQuantity >= 0) {
                // Ensure quantity doesn't go below 0
                await updateDoc(productDocRef, {
                    quantity: updatedQuantity,
                });
            } else {
                throw new Error(
                    `Insufficient stock for product ${item.productId}`
                );
            }
        } else {
            throw new Error(`Product ${item.productId} not found`);
        }
    }

    // Return the ID of the newly created order
    return orderRef.id;
};
