export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
}

export interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}
