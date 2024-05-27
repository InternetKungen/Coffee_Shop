// OrderSuccess.tsx
import React from 'react';
import styles from './OrderSuccess.module.css';

const OrderSuccess: React.FC = () => {
    return (
        <div className={styles['order-success-page']}>
            <h1>Order Successful!</h1>
            <p>
                Thank you for your purchase. Your order has been placed
                successfully.
            </p>
            <p>You will receive an email confirmation shortly.</p>
        </div>
    );
};

export default OrderSuccess;
