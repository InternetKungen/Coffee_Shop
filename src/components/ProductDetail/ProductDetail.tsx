// src/components/ProductDetail/ProductDetail.tsx

// Importing necessary modules and components
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../main';
import { doc, getDoc } from 'firebase/firestore';
import styles from './ProductDetail.module.css';

// Importing functions from cartService and interface types
import {
    addItemToCart,
    updateCartItemQuantity,
    getCartItems,
} from '../../cartService/cartServiceLocalStorage';
import { Product, CartItem } from '../../interface/types';

// Defining the ProductDetail functional component
const ProductDetail: React.FC = () => {
    // Using useParams hook to get the 'id' parameter from the URL
    const { id } = useParams<{ id: string }>();

    // State variables to manage product details and cart items
    const [product, setProduct] = useState<Product | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>(getCartItems());

    // Fetching product details from Firestore based on the 'id' parameter
    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                // Creating a reference to the product document in Firestore
                const productRef = doc(db, 'products', id);
                // Getting the product document snapshot
                const productSnap = await getDoc(productRef);
                if (productSnap.exists()) {
                    // If the product exists, setting the product state with its details
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
        // Fetching product details when 'id' parameter changes
        fetchProduct();
    }, [id]);

    // If product details are not yet fetched, display a loading message
    if (!product) {
        return <p>Loading...</p>;
    }

    // Function to add a product to the cart
    const handleAddToCart = (product: Product) => {
        const cartItem = cartItems.find(
            (item) => item.productId === product.id
        );
        if (cartItem) {
            if (product.quantity > cartItem.quantity) {
                // Check if there's enough stock
                updateCartItemQuantity(product.id, cartItem.quantity + 1); // Update quantity in local storage
                setCartItems(getCartItems());
            }
        } else {
            if (product.quantity > 0) {
                // Check if there's enough stock
                addItemToCart(product); // Add new item to local storage
                setCartItems(getCartItems());
            }
        }
    };

    // Function to increase the quantity of a product in the cart
    const increaseQuantity = (product: Product) => {
        const cartItem = cartItems.find(
            (item) => item.productId === product.id
        );
        if (cartItem) {
            if (product.quantity > cartItem.quantity) {
                // Check if there's enough stock
                updateCartItemQuantity(product.id, cartItem.quantity + 1); // Update quantity in local storage
                setCartItems(getCartItems());
            }
        } else {
            if (product.quantity > 0) {
                // Check if there's enough stock
                addItemToCart(product); // Add new item to local storage
                setCartItems(getCartItems());
            }
        }
    };

    // Function to decrease the quantity of a product in the cart
    const decreaseQuantity = (productId: string) => {
        const cartItem = cartItems.find((item) => item.productId === productId);
        if (cartItem) {
            updateCartItemQuantity(productId, cartItem.quantity - 1); // Update quantity in local storage
            setCartItems(getCartItems()); // Update the cart items state
        }
    };

    // Function to get the quantity of a product in the cart
    const getCartQuantity = (productId: string): number => {
        const cartItem = cartItems.find((item) => item.productId === productId);
        return cartItem ? cartItem.quantity : 0;
    };

    // Function to handle image error
    const handleImageError = (
        event: React.SyntheticEvent<HTMLImageElement>
    ) => {
        event.currentTarget.src = 'src/assets/product-img/placeholder.jpg';
    };

    // Rendering the product details section
    return (
        <section className={styles['product-detail']}>
            {/* Displaying product image */}
            <img
                src={`src/assets/product-img/${product.imageUrl}`}
                alt={product.name}
                onError={handleImageError}
                className={styles['product-image']}
            />
            <div>
                {/* Displaying product details */}
                <h1>{product.name}</h1>
                <p>Price: ${product.price.toFixed(2)}</p>
                <p>Stock Quantity: {product.quantity}</p>
                <p>{product.description}</p>
                {/* Conditional rendering based on product availability */}
                {product.quantity > 0 ? (
                    <div>
                        {/* Button to add product to cart */}
                        <button onClick={() => handleAddToCart(product)}>
                            Add to Cart
                        </button>
                        <div>
                            {/* Button to decrease product quantity */}
                            <button
                                onClick={() => decreaseQuantity(product.id)}
                            >
                                -
                            </button>
                            {/* Displaying product quantity in cart */}
                            <span>{getCartQuantity(product.id)}</span>
                            {/* Button to increase product quantity */}
                            <button onClick={() => increaseQuantity(product)}>
                                +
                            </button>
                        </div>
                    </div>
                ) : (
                    // Displaying out-of-stock message if product is not available
                    <p className={styles['out-of-stock']}>Out of Stock</p>
                )}
            </div>
        </section>
    );
};

export default ProductDetail;
