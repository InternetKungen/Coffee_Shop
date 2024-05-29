// Import necessary functions and types from Firebase and local modules
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../main'; // Import the Firestore database instance
import { CartProduct } from '../../interface/types'; // Import the CartProduct type definition

// Function to get a product by its ID from Firestore
export const getProductById = async (id: string): Promise<CartProduct> => {
    // Create a reference to the document in the 'products' collection with the specified ID
    const productDoc = doc(db, 'products', id);

    // Fetch the document snapshot from Firestore
    const docSnap = await getDoc(productDoc);

    // Check if the document exists
    if (!docSnap.exists()) {
        throw new Error('Product not found'); // Throw an error if the product does not exist
    }

    // Extract the data from the document snapshot and cast it to CartProduct type
    const productData = docSnap.data() as CartProduct;

    // Return the product data, including the document ID
    return {
        ...productData,
        id: docSnap.id, // Include the document ID in the returned product data
    };
};
