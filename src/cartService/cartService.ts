import { db } from '../.././src/main';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { Product, CartItem, User } from '../interface/interface';
import { handleError } from '../utils/errorHandler';

export async function addItemToCart(
    userId: string,
    product: Product,
    quantity: number
) {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data() as User;
            const cartItem: CartItem = {
                productId: product.id,
                productName: product.productName,
                quantity,
                productPrice: product.price,
            };

            const existingItem = userData.cart.find(
                (item) => item.productId === product.id
            );

            if (existingItem) {
                existingItem.quantity += quantity;
                await setDoc(userRef, userData);
            } else {
                await updateDoc(userRef, {
                    cart: arrayUnion(cartItem),
                });
            }
        } else {
            const newUser: User = {
                id: userId,
                cart: [
                    {
                        productId: product.id,
                        productName: product.productName,
                        quantity,
                        productPrice: product.price,
                    },
                ],
            };
            await setDoc(userRef, newUser);
        }
    } catch (error) {
        handleError(error);
    }
}

export async function removeItemFromCart(userId: string, productId: string) {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data() as User;
            userData.cart = userData.cart.filter(
                (item) => item.productId !== productId
            );
            await setDoc(userRef, userData);
        } else {
            console.log('User not found');
        }
    } catch (error) {
        handleError(error);
    }
}

export async function getCartItems(userId: string): Promise<CartItem[]> {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data() as User;
            return userData.cart;
        } else {
            console.log('User not found');
            return [];
        }
    } catch (error) {
        handleError(error);
        return [];
    }
}
