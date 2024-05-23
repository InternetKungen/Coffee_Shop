// src/components/ProductDetail/ProductDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../main';
import { doc, getDoc } from 'firebase/firestore';
import styles from './ProductDetail.module.css';

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    quantity: number;
}

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                const productRef = doc(db, 'products', id);
                const productSnap = await getDoc(productRef);
                if (productSnap.exists()) {
                    setProduct({
                        id: productSnap.id,
                        name: productSnap.data().name,
                        price: Number(productSnap.data().price),
                        description: productSnap.data().description,
                        imageUrl: productSnap.data().imageUrl,
                        quantity: Number(productSnap.data().quantity), // product quantity
                    });
                }
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) {
        return <p>Loading...</p>;
    }

    const addToCart = (productId: string) => {
        // Placeholder function to simulate adding product to cart
        console.log(`Added product with ID ${productId} to cart`);
    };

    return (
        <section className={styles['product-detail']}>
            <img
                src={`src/assets/product-img/${product.imageUrl}`}
                alt={product.name}
            />
            <div>
                <h1>{product.name}</h1>
                <p>Price: ${product.price.toFixed(2)}</p>
                <p>{product.description}</p>
                {product.quantity > 0 ? (
                    <div>
                        <button onClick={() => addToCart(product.id)}>
                            Add to Cart
                        </button>
                        {/* Add +/- buttons for quantity control */}
                        <div>
                            <button>-</button>
                            <span>1</span>
                            <button>+</button>
                        </div>
                    </div>
                ) : (
                    <p className={styles['out-of-stock']}>Out of Stock</p>
                )}
            </div>
        </section>
    );
};

export default ProductDetail;
