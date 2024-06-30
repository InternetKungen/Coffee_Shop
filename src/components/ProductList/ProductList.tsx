import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../main';
import styles from './ProductList.module.css';
// import {
//     getCartItems,
// } from '../../services/cartService/cartServiceLocalStorage';
import { Product } from '../../interface/types';
import AddToFavoritesButton from '../AddToFavoritesButton/AddToFavoritesButton';
import CartButton from '../CartButton/CartButton';

interface ProductListProps {
    sortOrder: string;
}

// Utility function to truncate text
const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
};

const ProductList: React.FC<ProductListProps> = ({ sortOrder }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    // const [cartItems, setCartItems] = useState<CartItem[]>(getCartItems());
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [submittedSearchQuery, setSubmittedSearchQuery] =
        useState<string>('');

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
                    quantity: Number(data.quantity),
                    category: data.category,
                } as Product;
            });
            setProducts(productList);
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        let filtered = products;

        if (sortOrder) {
            filtered = filtered.filter(
                (product) => product.category === sortOrder
            );
        }

        if (submittedSearchQuery) {
            filtered = filtered.filter((product) =>
                product.name
                    .toLowerCase()
                    .includes(submittedSearchQuery.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    }, [sortOrder, submittedSearchQuery, products]);

    // const handleCartChange = () => {
    //     const event = new CustomEvent('cartChange', {
    //         detail: getCartItems().reduce(
    //             (total, item) => total + item.quantity,
    //             0
    //         ),
    //     });
    //     window.dispatchEvent(event);
    // };

    //Detta hanteras av CartButton.tsx nu! ----------------
    // const handleAddToCart = (product: Product) => {
    //     const cartItem = cartItems.find(
    //         (item) => item.productId === product.id
    //     );
    //     if (cartItem) {
    //         if (product.quantity > cartItem.quantity) {
    //             // Check if there's enough stock
    //             updateCartItemQuantity(product.id, cartItem.quantity + 1); // Update quantity in local storage
    //             setCartItems(getCartItems());
    //             handleCartChange();
    //         }
    //     } else {
    //         if (product.quantity > 0) {
    //             // Check if there's enough stock
    //             addItemToCart(product); // Add new item to local storage
    //             setCartItems(getCartItems());
    //             handleCartChange();
    //         }
    //     }
    // };

    // const increaseQuantity = (product: Product) => {
    //     const cartItem = cartItems.find(
    //         (item) => item.productId === product.id
    //     );
    //     if (cartItem) {
    //         if (product.quantity > cartItem.quantity) {
    //             updateCartItemQuantity(product.id, cartItem.quantity + 1);
    //             setCartItems(getCartItems());
    //             handleCartChange();
    //         }
    //     } else {
    //         if (product.quantity > 0) {
    //             addItemToCart(product);
    //             setCartItems(getCartItems());
    //             handleCartChange();
    //         }
    //     }
    // };

    // const decreaseQuantity = (productId: string) => {
    //     const cartItem = cartItems.find((item) => item.productId === productId);
    //     if (cartItem) {
    //         updateCartItemQuantity(productId, cartItem.quantity - 1);
    //         setCartItems(getCartItems());
    //         handleCartChange();
    //     }
    // };

    // const getCartQuantity = (productId: string): number => {
    //     const cartItem = cartItems.find((item) => item.productId === productId);
    //     return cartItem ? cartItem.quantity : 0;
    // };

    //---------------------------------------------------------

    // Function to handle image error
    const handleImageError = (
        event: React.SyntheticEvent<HTMLImageElement>
    ) => {
        event.currentTarget.src = 'src/assets/product-img/placeholder.jpg';
    };

    // Function to handle search form submission
    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmittedSearchQuery(searchQuery);
    };

    // Function to handle reset button click
    const handleReset = () => {
        setSearchQuery('');
        setSubmittedSearchQuery('');
    };

    // Rendering the Product List component
    return (
        <div className={styles['product-list-page']}>
            <form
                onSubmit={handleSearchSubmit}
                className={styles['search-form']}
            >
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles['search-input']}
                />
                <button type="submit" className={styles['search-button']}>
                    Search
                </button>
                <button
                    type="button"
                    onClick={handleReset}
                    className={styles['reset-button']}
                >
                    Reset
                </button>
            </form>
            <div className={styles['products-list-div']}>
                {filteredProducts.map((product) => (
                    <section
                        className={styles['product-list-item']}
                        key={product.id}
                    >
                        <div className={styles['favorite-icon-container']}>
                            <AddToFavoritesButton product={product} />
                        </div>
                        <h2>{product.name}</h2>
                        <img
                            src={`src/assets/product-img/${product.imageUrl}`}
                            alt={product.name}
                            onError={handleImageError}
                            className={styles['product-image']}
                        />
                        <p>${product.price.toFixed(2)};-</p>
                        {/* Limited description */}
                        <p>{truncateText(product.description, 120)}</p>{' '}
                        {/* Link to view individual product details */}
                        <Link to={`/products/${product.id}`}>
                            <button className={styles['view-product-button']}>
                                i
                            </button>
                        </Link>
                        {product.quantity > 0 ? (
                            <div className={styles['cart-button']}>
                                <CartButton product={product} />
                            </div>
                        ) : (
                            <p className={styles['out-of-stock']}>
                                Out of Stock
                            </p>
                        )}
                    </section>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
