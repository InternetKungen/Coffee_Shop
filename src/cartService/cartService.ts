import { db } from '../.././src/main';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { handleError } from '../utils/errorHandler';
interface CartItem {
    productId: string;
    productName: string;
    quantity: number;
    productPrice: number;
}

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
}
export async function addItemToCart(productId: string) {
    try {
        const productRef = doc(db, 'products', productId);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
            const productData = productSnap.data() as Product;
            const cartItem: CartItem = {
                productId: productId,
                productName: productData.name,
                productPrice: productData.price,
                quantity: 1,
            };

            const cartRef = doc(db, 'cart', 'defaultCart');
            const cartSnap = await getDoc(cartRef);

            if (cartSnap.exists()) {
                const cartData = cartSnap.data();
                const existingItem = cartData.items.find(
                    (item: CartItem) => item.productId === productId
                );

                if (existingItem) {
                    existingItem.quantity += 1;
                    await setDoc(cartRef, cartData);
                } else {
                    await updateDoc(cartRef, {
                        items: arrayUnion(cartItem),
                    });
                }
            } else {
                await setDoc(cartRef, { items: [cartItem] });
            }
        }
    } catch (error) {
        handleError(error);
    }
}

export async function getCartItems(): Promise<CartItem[]> {
    const cartRef = doc(db, 'cart', 'defaultCart');
    const cartSnap = await getDoc(cartRef);
    if (cartSnap.exists()) {
        const cartData = cartSnap.data();
        return cartData.items;
    }
    return [];
}

export async function updateCartItemQuantity(
    productId: string,
    quantity: number
) {
    try {
        const cartRef = doc(db, 'cart', 'defaultCart');
        const cartSnap = await getDoc(cartRef);

        if (cartSnap.exists()) {
            const cartData = cartSnap.data();
            const itemIndex = cartData.items.findIndex(
                (item: CartItem) => item.productId === productId
            );

            if (itemIndex !== -1) {
                cartData.items[itemIndex].quantity = quantity;
                await setDoc(cartRef, cartData);
            }
        }
    } catch (error) {
        handleError(error);
    }
}

export async function removeCartItem(productId: string) {
    try {
        const cartRef = doc(db, 'cart', 'defaultCart');
        const cartSnap = await getDoc(cartRef);

        if (cartSnap.exists()) {
            const cartData = cartSnap.data();
            const updatedItems = cartData.items.filter(
                (item: CartItem) => item.productId !== productId
            );

            await setDoc(cartRef, { items: updatedItems });
        }
    } catch (error) {
        handleError(error);
    }
}
