// ProductList.tsx
import React, { useEffect, useState } from 'react';
import { db } from '../../main';
import { collection, getDocs } from 'firebase/firestore';
import styles from './ProductList.module.css';

// Define a TypeScript interface for the Product object
interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
}

// ProductList function
const ProductList: React.FC = () => {
    // State to store the list of products
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Function to fetch product data from Firestore
        const fetchProducts = async () => {
            // Get a reference to the 'productsalt1' collection in Firestore
            const productCollection = collection(db, 'productsalt1');
            const productSnapshot = await getDocs(productCollection);
            // Map over the documents and transform them into Product objects
            const productList = productSnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id, // Document ID
                    name: data.name, // Product name
                    price: Number(data.price), // Ensure price is a number
                    description: data.description, // Product description
                } as Product;
            });
            // Update the state with the fetched product list
            setProducts(productList);
        };

        // Call the fetchProducts function to fetch the data
        fetchProducts();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    return (
        <div>
            <h1>Product List</h1>
            <section className={styles['product-list-div']}>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price.toFixed(2)}</p>{' '}
                        {/* Format price to 2 decimal places */}
                        <p>{product.description}</p>
                    </li>
                ))}
                </ul>
            </section>
        </div>
    );
};
export default ProductList;
