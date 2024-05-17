// SignOutButton.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SignOutButton.module.css';

const SignOutButton: React.FC = () => {
    return (
        <section className={styles['sign-out-button-container']}>
            <Link to="/sign-out">Sign out</Link>
        </section>
    );
};

export default SignOutButton;
