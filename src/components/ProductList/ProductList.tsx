// // ProductList.tsx
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../main';
// import styles from './ProductList.module.css';
// import {
//     addItemToCart,
//     updateCartItemQuantity,
//     getCartItems,
// } from '../../services/cartService/cartServiceLocalStorage';
// import { Product, CartItem } from '../../interface/types';
// import AddToFavoritesButton from '../AddToFavoritesButton/AddToFavoritesButton';
// import TitleSection from '../TitleSection/TitleSection';

// interface ProductListProps {
//     sortOrder: string;
// }

// const ProductList: React.FC<ProductListProps> = ({ sortOrder }) => {
//     const [products, setProducts] = useState<Product[]>([]);
//     const [cartItems, setCartItems] = useState<CartItem[]>(getCartItems());

//     useEffect(() => {
//         const fetchProducts = async () => {
//             const productCollection = collection(db, 'products');
//             const productSnapshot = await getDocs(productCollection);
//             const productList = productSnapshot.docs.map((doc) => {
//                 const data = doc.data();
//                 return {
//                     id: doc.id,
//                     name: data.name,
//                     price: Number(data.price),
//                     description: data.description,
//                     imageUrl: data.imageUrl,
//                     quantity: Number(data.quantity),
//                     category: data.category,
//                 } as Product;
//             });
//             setProducts(productList);
//         };

//         fetchProducts();
//     }, []);

//     useEffect(() => {
//         if (sortOrder) {
//             let filteredProducts = [...products];
//             if (sortOrder) {
//                 filteredProducts = filteredProducts.filter(
//                     (product) => product.category === sortOrder
//                 );
//             }
//             setProducts(filteredProducts);
//         }
//     }, [sortOrder]);

//     const handleCartChange = () => {
//         const event = new CustomEvent('cartChange', {
//             detail: getCartItems().reduce(
//                 (total, item) => total + item.quantity,
//                 0
//             ),
//         });
//         window.dispatchEvent(event);
//     };

//     const handleAddToCart = (product: Product) => {
//         addItemToCart(product);
//         setCartItems(getCartItems());
//         handleCartChange();
//     };

//     const increaseQuantity = (product: Product) => {
//         const cartItem = cartItems.find(
//             (item) => item.productId === product.id
//         );
//         if (cartItem) {
//             if (product.quantity > cartItem.quantity) {
//                 updateCartItemQuantity(product.id, cartItem.quantity + 1);
//                 setCartItems(getCartItems());
//                 handleCartChange();
//             }
//         } else {
//             if (product.quantity > 0) {
//                 addItemToCart(product);
//                 setCartItems(getCartItems());
//                 handleCartChange();
//             }
//         }
//     };

//     const decreaseQuantity = (productId: string) => {
//         const cartItem = cartItems.find((item) => item.productId === productId);
//         if (cartItem) {
//             updateCartItemQuantity(productId, cartItem.quantity - 1);
//             setCartItems(getCartItems());
//             handleCartChange();
//         }
//     };

//     const getCartQuantity = (productId: string): number => {
//         const cartItem = cartItems.find((item) => item.productId === productId);
//         return cartItem ? cartItem.quantity : 0;
//     };

//     return (
//         <div className={styles['product-list-page']}>
//             <TitleSection title="Menu" />
//             <div className={styles['products-list-div']}>
//                 {products.map((product) => (
//                     <section
//                         className={styles['product-list-item']}
//                         key={product.id}
//                     >
//                         <div className={styles['favorite-icon-container']}>
//                             <AddToFavoritesButton product={product} />
//                         </div>
//                         <h2>{product.name}</h2>
//                         <img
//                             src={`src/assets/product-img/${product.imageUrl}`}
//                             alt={product.name}
//                             className={styles['product-image']}
//                         />
//                         <p>Price: ${product.price.toFixed(2)}</p>
//                         <p>{product.description}</p>
//                         <Link to={`/products/${product.id}`}>
//                             <button>View Product</button>
//                         </Link>
//                         {product.quantity > 0 ? (
//                             <div>
//                                 <button
//                                     onClick={() => handleAddToCart(product)}
//                                 >
//                                     Add to Cart
//                                 </button>
//                                 <div>
//                                     <button
//                                         onClick={() =>
//                                             decreaseQuantity(product.id)
//                                         }
//                                     >
//                                         -
//                                     </button>
//                                     <span>{getCartQuantity(product.id)}</span>
//                                     <button
//                                         onClick={() =>
//                                             increaseQuantity(product)
//                                         }
//                                     >
//                                         +
//                                     </button>
//                                 </div>
//                             </div>
//                         ) : (
//                             <p className={styles['out-of-stock']}>
//                                 Out of Stock
//                             </p>
//                         )}
//                     </section>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ProductList;

// // ### --------------------------------------
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../main';
// import styles from './ProductList.module.css';
// import {
//     addItemToCart,
//     updateCartItemQuantity,
//     getCartItems,
// } from '../../services/cartService/cartServiceLocalStorage';
// import { Product, CartItem } from '../../interface/types';
// import AddToFavoritesButton from '../AddToFavoritesButton/AddToFavoritesButton';
// import TitleSection from '../TitleSection/TitleSection';

// interface ProductListProps {
//     sortOrder: string;
// }

// const ProductList: React.FC<ProductListProps> = ({ sortOrder }) => {
//     const [products, setProducts] = useState<Product[]>([]);
//     const [cartItems, setCartItems] = useState<CartItem[]>(getCartItems());

//     useEffect(() => {
//         const fetchProducts = async () => {
//             const productCollection = collection(db, 'products');
//             const productSnapshot = await getDocs(productCollection);
//             const productList = productSnapshot.docs.map((doc) => {
//                 const data = doc.data();
//                 return {
//                     id: doc.id,
//                     name: data.name,
//                     price: Number(data.price),
//                     description: data.description,
//                     imageUrl: data.imageUrl,
//                     quantity: Number(data.quantity),
//                     category: data.category,
//                 } as Product;
//             });
//             setProducts(productList);
//         };

//         fetchProducts();
//     }, []);

//     useEffect(() => {
//         if (sortOrder) {
//             let filteredProducts = [...products];
//             if (sortOrder) {
//                 filteredProducts = filteredProducts.filter(
//                     (product) => product.category === sortOrder
//                 );
//             }
//             setProducts(filteredProducts);
//         }
//     }, [sortOrder, products]); // Add `products` as dependency to refilter when products change

//     const handleCartChange = () => {
//         const event = new CustomEvent('cartChange', {
//             detail: getCartItems().reduce(
//                 (total, item) => total + item.quantity,
//                 0
//             ),
//         });
//         window.dispatchEvent(event);
//     };

//     const handleAddToCart = (product: Product) => {
//         addItemToCart(product);
//         setCartItems(getCartItems());
//         handleCartChange();
//     };

//     const increaseQuantity = (product: Product) => {
//         const cartItem = cartItems.find(
//             (item) => item.productId === product.id
//         );
//         if (cartItem) {
//             if (product.quantity > cartItem.quantity) {
//                 updateCartItemQuantity(product.id, cartItem.quantity + 1);
//                 setCartItems(getCartItems());
//                 handleCartChange();
//             }
//         } else {
//             if (product.quantity > 0) {
//                 addItemToCart(product);
//                 setCartItems(getCartItems());
//                 handleCartChange();
//             }
//         }
//     };

//     const decreaseQuantity = (productId: string) => {
//         const cartItem = cartItems.find((item) => item.productId === productId);
//         if (cartItem) {
//             updateCartItemQuantity(productId, cartItem.quantity - 1);
//             setCartItems(getCartItems());
//             handleCartChange();
//         }
//     };

//     const getCartQuantity = (productId: string): number => {
//         const cartItem = cartItems.find((item) => item.productId === productId);
//         return cartItem ? cartItem.quantity : 0;
//     };

//     return (
//         <div className={styles['product-list-page']}>
//             <TitleSection title="Menu" />
//             <div className={styles['products-list-div']}>
//                 {products.map((product) => (
//                     <section
//                         className={styles['product-list-item']}
//                         key={product.id}
//                     >
//                         <div className={styles['favorite-icon-container']}>
//                             <AddToFavoritesButton product={product} />
//                         </div>
//                         <h2>{product.name}</h2>
//                         <img
//                             src={`src/assets/product-img/${product.imageUrl}`}
//                             alt={product.name}
//                             className={styles['product-image']}
//                         />
//                         <p>Price: ${product.price.toFixed(2)}</p>
//                         <p>{product.description}</p>
//                         <Link to={`/products/${product.id}`}>
//                             <button>View Product</button>
//                         </Link>
//                         {product.quantity > 0 ? (
//                             <div>
//                                 <button
//                                     onClick={() => handleAddToCart(product)}
//                                 >
//                                     Add to Cart
//                                 </button>
//                                 <div>
//                                     <button
//                                         onClick={() =>
//                                             decreaseQuantity(product.id)
//                                         }
//                                     >
//                                         -
//                                     </button>
//                                     <span>{getCartQuantity(product.id)}</span>
//                                     <button
//                                         onClick={() =>
//                                             increaseQuantity(product)
//                                         }
//                                     >
//                                         +
//                                     </button>
//                                 </div>
//                             </div>
//                         ) : (
//                             <p className={styles['out-of-stock']}>
//                                 Out of Stock
//                             </p>
//                         )}
//                     </section>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ProductList;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../main';
import styles from './ProductList.module.css';
import {
    addItemToCart,
    updateCartItemQuantity,
    getCartItems,
} from '../../services/cartService/cartServiceLocalStorage';
import { Product, CartItem } from '../../interface/types';
import AddToFavoritesButton from '../AddToFavoritesButton/AddToFavoritesButton';
import TitleSection from '../TitleSection/TitleSection';

interface ProductListProps {
    sortOrder: string;
}

const ProductList: React.FC<ProductListProps> = ({ sortOrder }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [cartItems, setCartItems] = useState<CartItem[]>(getCartItems());

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
        if (sortOrder) {
            setFilteredProducts(
                products.filter((product) => product.category === sortOrder)
            );
        } else {
            setFilteredProducts(products);
        }
    }, [sortOrder, products]);

    const handleCartChange = () => {
        const event = new CustomEvent('cartChange', {
            detail: getCartItems().reduce(
                (total, item) => total + item.quantity,
                0
            ),
        });
        window.dispatchEvent(event);
    };

    const handleAddToCart = (product: Product) => {
        addItemToCart(product);
        setCartItems(getCartItems());
        handleCartChange();
    };

    const increaseQuantity = (product: Product) => {
        const cartItem = cartItems.find(
            (item) => item.productId === product.id
        );
        if (cartItem) {
            if (product.quantity > cartItem.quantity) {
                updateCartItemQuantity(product.id, cartItem.quantity + 1);
                setCartItems(getCartItems());
                handleCartChange();
            }
        } else {
            if (product.quantity > 0) {
                addItemToCart(product);
                setCartItems(getCartItems());
                handleCartChange();
            }
        }
    };

    const decreaseQuantity = (productId: string) => {
        const cartItem = cartItems.find((item) => item.productId === productId);
        if (cartItem) {
            updateCartItemQuantity(productId, cartItem.quantity - 1);
            setCartItems(getCartItems());
            handleCartChange();
        }
    };

    const getCartQuantity = (productId: string): number => {
        const cartItem = cartItems.find((item) => item.productId === productId);
        return cartItem ? cartItem.quantity : 0;
    };

    return (
        <div className={styles['product-list-page']}>
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
                            className={styles['product-image']}
                        />
                        <p>Price: ${product.price.toFixed(2)}</p>
                        <p>{product.description}</p>
                        <Link to={`/products/${product.id}`}>
                            <button>View Product</button>
                        </Link>
                        {product.quantity > 0 ? (
                            <div>
                                <button
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to Cart
                                </button>
                                <div>
                                    <button
                                        onClick={() =>
                                            decreaseQuantity(product.id)
                                        }
                                    >
                                        -
                                    </button>
                                    <span>{getCartQuantity(product.id)}</span>
                                    <button
                                        onClick={() =>
                                            increaseQuantity(product)
                                        }
                                    >
                                        +
                                    </button>
                                </div>
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
