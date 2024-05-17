export interface Product {
    id: string;
    name: string;
    price: number;
    description?: string;
    imageUrl?: string;
}

export interface CartItem {
    productId: string;
    quantity: number;
}

export interface User {
    id: string;
    cart: CartItem[];
}
