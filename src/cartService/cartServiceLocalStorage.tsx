// cartService.ts

// Importing necessary interfaces
import { CartItem, Product } from '../interface/types';

// Key for storing cart data in localStorage
const CART_KEY = 'shoppingCart';

// Function to add an item to the cart
export function addItemToCart(product: Product) {
    // Retrieving cart items from localStorage
    const cartItems: CartItem[] = getCartItems();
    // Checking if the product already exists in the cart
    const existingItem = cartItems.find(
        (item) => item.productId === product.id
    );

    // If the product exists in the cart, increase its quantity
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        // If the product is not in the cart, add it with a quantity of 1
        cartItems.push({
            productId: product.id,
            productName: product.name,
            productPrice: product.price,
            quantity: 1,
        });
    }

    // Saving updated cart items to localStorage
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
}

// Function to retrieve cart items from localStorage
export function getCartItems(): CartItem[] {
    const cartItems = localStorage.getItem(CART_KEY);
    // If cart items exist in localStorage, parse and return them, otherwise return an empty array
    return cartItems ? JSON.parse(cartItems) : [];
}

// Function to update the quantity of a cart item
export function updateCartItemQuantity(productId: string, quantity: number) {
    // Retrieving cart items from localStorage
    const cartItems: CartItem[] = getCartItems();
    // Finding the index of the item to be updated
    const itemIndex = cartItems.findIndex(
        (item) => item.productId === productId
    );

    // If the item exists in the cart, update its quantity or remove it if the new quantity is 0
    if (itemIndex !== -1) {
        if (quantity === 0) {
            cartItems.splice(itemIndex, 1);
        } else {
            cartItems[itemIndex].quantity = quantity;
        }
        // Saving updated cart items to localStorage
        localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    }
}

// Function to remove a cart item
export function removeCartItem(productId: string) {
    // Retrieving cart items from localStorage
    const cartItems: CartItem[] = getCartItems();
    // Filtering out the item to be removed
    const updatedItems = cartItems.filter(
        (item) => item.productId !== productId
    );
    // Saving updated cart items to localStorage
    localStorage.setItem(CART_KEY, JSON.stringify(updatedItems));
}

// Function to clear the entire cart
export function clearCart() {
    // Removing the cart data from localStorage
    localStorage.removeItem(CART_KEY);
}
