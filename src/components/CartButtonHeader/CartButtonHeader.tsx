// CartButtonHeader.tsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import styles from './CartButtonHeader.module.css';
// import cartIcon from '../../assets/img/shopping-cart.png';

// const CartButtonHeader: React.FC = () => {
//     return (
//         <section className={styles['cart-button-container']}>
//             <Link to="/cart">
//                 <button>
//                     <img src={cartIcon} alt="cart-icon" />
//                 </button>
//             </Link>
//         </section>
//     );
// };

// export default CartButtonHeader;

// CartButtonHeader.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './CartButtonHeader.module.css';
import cartIcon from '../../assets/img/shopping-cart.png';
import { getCartItems } from '../../services/cartService/cartServiceLocalStorage';

const CartButtonHeader: React.FC = () => {
    const [cartItemCount, setCartItemCount] = useState(0);

    const updateCartCount = () => {
        const cartItems = getCartItems();
        const itemCount = cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        );
        setCartItemCount(itemCount);
    };

    useEffect(() => {
        updateCartCount();

        const handleCartChange = (event: CustomEvent) => {
            console.log('Received cartChange event with detail:', event.detail);
            setCartItemCount(event.detail);
        };

        window.addEventListener(
            'cartChange',
            handleCartChange as EventListener
        );

        return () => {
            window.removeEventListener(
                'cartChange',
                handleCartChange as EventListener
            );
        };
    }, []);

    return (
        <section className={styles['cart-button-container']}>
            <Link to="/cart">
                <button>
                    <img src={cartIcon} alt="cart-icon" />
                    {cartItemCount > 0 && (
                        <span className={styles['cart-count']}>
                            {cartItemCount}
                        </span>
                    )}
                </button>
            </Link>
        </section>
    );
};

export default CartButtonHeader;
