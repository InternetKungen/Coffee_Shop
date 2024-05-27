// OrderSuccess.tsx
import React from 'react';
import styles from './OrderSuccess.module.css';

// Functional component for the Order Success page
const OrderSuccess: React.FC = () => {
    return (
        <div className={styles['order-success-page']}>
            {/* Applying CSS class from the module */}
            {' '}
            <h1>Order Successful!</h1> {/* Heading indicating order success */}
            {/* Message thanking the user for their purchase */}
            <p>
                Thank you for your purchase. Your order has been placed
                successfully.
            </p>{' '}
            {/* Message about email confirmation */}
            <p>You will receive an email confirmation shortly.</p>{' '}
        </div>
    );
};

export default OrderSuccess;
