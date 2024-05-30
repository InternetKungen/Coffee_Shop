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

// Function to check stock availability for a list of cart items
export const checkStock = async (cartItems: CartItem[]): Promise<string[]> => {
    // Array to hold the names of products with insufficient stock
    const insufficientStock: string[] = [];

    // Loop through each item in the cart
    for (const item of cartItems) {
        // Get a reference to the product document in the 'products' collection
        const productDocRef = doc(db, 'products', item.productId);
        // Fetch the product document from the database
        const productSnapshot = await getDoc(productDocRef);

        // Check if the product document exists
        if (productSnapshot.exists()) {
            // Get the data from the product document
            const productData = productSnapshot.data();
            // Check if the available quantity is less than the quantity in the cart
            if (productData.quantity < item.quantity) {
                // Add the product name to the insufficient stock array
                insufficientStock.push(item.productName);
            }
        } else {
            // If the product document does not exist, consider it as insufficient stock
            insufficientStock.push(item.productName);
        }
    }

    // Return the list of products with insufficient stock
    return insufficientStock;
};
