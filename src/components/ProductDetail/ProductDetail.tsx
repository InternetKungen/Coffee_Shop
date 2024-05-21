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
    img: string;
}

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                const productRef = doc(db, 'productsalt1', id);
                const productSnap = await getDoc(productRef);
                if (productSnap.exists()) {
                    setProduct({
                        id: productSnap.id,
                        name: productSnap.data().name,
                        price: Number(productSnap.data().price),
                        description: productSnap.data().description,
                        img: productSnap.data().img,
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
        <div className={styles['product-detail']}>
            <img
                src={`src/assets/product-img/${product.img}`}
                alt={product.name}
            />
            <div>
                <h1>{product.name}</h1>
                <p>Price: ${product.price.toFixed(2)}</p>
                <p>{product.description}</p>
                <div>
                    <button onClick={() => addToCart(product!.id)}>
                        Add to Cart
                    </button>
                    {/* Add +/- buttons for quantity control */}
                    <div>
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
