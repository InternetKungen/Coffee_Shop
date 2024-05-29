// productServiceFirestore.ts
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../main';
import { CartProduct } from '../../interface/types';

export const getProductById = async (id: string): Promise<CartProduct> => {
    const productDoc = doc(db, 'products', id);
    const docSnap = await getDoc(productDoc);

    if (!docSnap.exists()) {
        throw new Error('Product not found');
    }

    const productData = docSnap.data() as CartProduct;
    return {
        ...productData,
        id: docSnap.id, // Include the document ID in the returned product data
    };
};;
