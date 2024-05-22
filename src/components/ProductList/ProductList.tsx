// ProductList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../main';
import { collection, getDocs } from 'firebase/firestore';
import styles from './ProductList.module.css';

// Define a TypeScript interface for the Product object
interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
}

// ProductList function
const ProductList: React.FC = () => {
    // State to store the list of products
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Function to fetch product data from Firestore
        const fetchProducts = async () => {
            // Get a reference to the 'products' collection in Firestore
            const productCollection = collection(db, 'products');
            const productSnapshot = await getDocs(productCollection);
            // Map over the documents and transform them into Product objects
            const productList = productSnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id, // Document ID
                    name: data.name, // Product name
                    price: Number(data.price), // Ensure price is a number
                    description: data.description, // Product description
                    imageUrl: data.imageUrl, // Product image
                } as Product;
            });
            // Update the state with the fetched product list
            setProducts(productList);
        };

        // Call the fetchProducts function to fetch the data
        fetchProducts();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    const addToCart = (productId: string) => {
        // Placeholder function to simulate adding product to cart
        console.log(`Added product with ID ${productId} to cart`);
    };

    return (
        <div className={styles['product-list-page']}>
            <h1>Product List</h1>
            <div className={styles['products-list-div']}>
                {products.map((product) => (
                    <section
                        className={styles['product-list-item']}
                        key={product.id}
                    >
                        <h2>{product.name}</h2>
                        {/* Render the product image */}
                        <img
                            src={`src/assets/product-img/${product.imageUrl}`}
                            alt={product.name}
                            className={styles['product-image']}
                        />
                        <p>Price: ${product.price.toFixed(2)}</p>{' '}
                        {/* Format price to 2 decimal places */}
                        <p>{product.description}</p>
                        <Link to={`/products/${product.id}`}>
                            <button>View Product</button>
                        </Link>
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
                    </section>
                ))}
            </div>
        </div>
    );
};
export default ProductList;
