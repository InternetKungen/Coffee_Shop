import React, { useState } from 'react';
import { Product as ProductInterface } from '../../interface/interface';
import { addItemToCart, getCartItems } from '../../cartService/cartService';
import styles from './product.module.css';
import { handleError } from '../../utils/errorHandler';

interface ProductProps {
    product: ProductInterface;
    userId: string;
    updateCart: (items: any) => void;
}

const Product: React.FC<ProductProps> = ({ product, userId, updateCart }) => {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleAddToCart = async () => {
        try {
            await addItemToCart(userId, product, 1);
            const items = await getCartItems(userId);
            updateCart(items);
            setSuccessMessage('Item added to cart successfully!');
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (error) {
            // console.error('Error adding item to cart:', error);
            handleError(error);
        }
    };

    return (
        <div className={styles['product-container']}>
            <img
                src={product.imageUrl}
                alt={product.productName}
                width={'200px'}
            />
            <h3>{product.productName}</h3>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
            {successMessage && (
                <p className={styles['success-message']}>{successMessage}</p>
            )}
        </div>
    );
};

export default Product;
