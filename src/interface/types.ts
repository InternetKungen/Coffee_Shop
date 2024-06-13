// types.ts

import { Timestamp } from 'firebase/firestore';

// Interface for items in the cart
export interface CartItem {
    productId: string; // Unique identifier for the product
    productName: string; // Name of the product
    quantity: number; // Quantity of the product in the cart
    productPrice: number; // Price of the product
}

// Interface for a product
export interface Product {
    id: string; // Unique identifier for the product
    name: string; // Name of the product
    price: number; // Price of the product
    description: string; // Description of the product
    imageUrl: string; // URL to the product image
    quantity: number; // Quantity available in stock
    category: string;
}

// Interface for an order
export interface Order {
    id?: string; // Unique identifier for the order (optional)
    userId: string; // Unique identifier for the user placing the order
    firstName: string;
    lastName: string;
    email: string;
    orderDate: Date; // Date and time when the order was placed
    status: string; // Status of the order (e.g., "pending", "shipped", "delivered")
    totalAmount: number; // Total amount of the order
    shippingAddress: {
        // Shipping address of the order
        firstName: string;
        lastName: string;
        street: string; // Street address
        postalCode: string; // Postal code
        city: string; // City
        country: string; // Country
    };
    paymentMethod: string; // Payment method used for the order
    orderItems: CartItem[]; // Array of items in the order (cart items)
}

// Interface for an order
export interface OrderHistoryInterface {
    id: string; // Unique identifier for the order
    userId: string; // Unique identifier for the user placing the order
    orderDate: Timestamp; // Original Firestore Timestamp
    orderDateConverted: Date; // Converted Date
    status: string; // Status of the order (e.g., "pending", "shipped", "delivered")
    totalAmount: number; // Total amount of the order
    shippingAddress: {
        // Shipping address of the order
        street: string; // Street address
        postalCode: string; // Postal code
        city: string; // City
        country: string; // Country
    };
    paymentMethod: string; // Payment method used for the order
    orderItems: CartItem[]; // Array of items in the order (cart items)
}

// Interface for user profile information
export interface UserProfile {
    firstName: string; // First name of the user
    lastName: string; // Last name of the user
    email: string; // Email address of the user
    profilePicture: string; // URL to the user's profile picture
    phoneNumber: string; // Phone number of the user
    address: {
        // Address of the user
        street: string; // Street address
        postalCode: string; // Postal code
        city: string; // City
        country: string; // Country
    };
}

// Interface for a product in cart
export interface CartProduct {
    id: string; // Unique identifier for the product
    name: string; // Name of the product
    price: number; // Price of the product
    quantity: number; // Quantity available in stock
}
