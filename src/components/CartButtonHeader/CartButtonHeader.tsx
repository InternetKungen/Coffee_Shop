// CartButtonHeader.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CartButtonHeader.module.css';
import cartIcon from '../../assets/img/shopping-cart.png';

const CartButtonHeader: React.FC = () => {
    return (
        <section className={styles['cart-button-container']}>
            <Link to="/cart">
                <button>
                    <img src={cartIcon} alt="cart-icon" />
                </button>
            </Link>
        </section>
    );
};

export default CartButtonHeader;
