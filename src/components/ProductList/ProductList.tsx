import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../main';
import { collection, getDocs } from 'firebase/firestore';
import styles from './ProductList.module.css';
import { addItemToCart, getCartItems } from '../../cartService/cartService';
import Cart from '../KundVagn/Cart';
import { Product, CartItem } from '../../interface/interface';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const productCollection = collection(db, 'products');
            const productSnapshot = await getDocs(productCollection);
            const productList = productSnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    name: data.name,
                    price: Number(data.price),
                    description: data.description,
                    imageUrl: data.imageUrl,
                } as Product;
            });
            setProducts(productList);
        };

        const fetchCartItems = async () => {
            const items = await getCartItems();
            setCartItems(items);
        };

        fetchProducts();
        fetchCartItems();
    }, []);

    const addToCart = async (productId: string) => {
        try {
            await addItemToCart(productId);
            const items = await getCartItems();
            updateCart(items);
            setSuccessMessage('Item added to cart successfully!');
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const updateCart = (items: CartItem[]) => {
        setCartItems(items);
    };

    return (
        <div className={styles['product-list-page']}>
            {successMessage && (
                <p className={styles['success-message']}>{successMessage}</p>
            )}
            <h1>Product List</h1>
            <div className={styles['products-list-div']}>
                {products.map((product) => (
                    <section
                        className={styles['product-list-item']}
                        key={product.id}
                    >
                        <h2>{product.name}</h2>
                        <img
                            src={`src/assets/product-img/${product.imageUrl}`}
                            alt={product.name}
                            className={styles['product-image']}
                        />
                        <p>Price: ${product.price.toFixed(2)}</p>
                        <p>{product.description}</p>
                        <Link to={`/products/${product.id}`}>
                            <button>View Product</button>
                        </Link>
                        <div>
                            <button onClick={() => addToCart(product.id)}>
                                Add to Cart
                            </button>
                        </div>
                    </section>
                ))}
            </div>
            <h1>Cart</h1>
            <div className={styles['cart-items']}>
                {cartItems.map((item) => (
                    <Cart
                        key={item.productId}
                        item={item}
                        updateCart={updateCart}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
