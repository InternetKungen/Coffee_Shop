// SignInButton.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SignInButton.module.css';

const SignInButton: React.FC = () => {
    return (
        <section className={styles['sign-in-button-container']}>
            <Link to="/sign-in">Sign In</Link>
        </section>
    );
};

export default SignInButton;
