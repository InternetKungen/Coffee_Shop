export interface Product {
    id: string;
    productName: string;
    price: number;
    description?: string;
    img: string;
}

export interface CartItem {
    productId: string;
    productName: string;
    quantity: number;
    productPrice: number;
}

export interface User {
    id: string;
    cart: CartItem[];
}
