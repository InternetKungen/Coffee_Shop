// NavMenu.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SignUpButton.module.css';

const SignUpButton: React.FC = () => {
    return (
        <section className={styles['sign-up-button-container']}>
            <Link to="/sign-up">Join Us</Link>
        </section>
    );
};

export default SignUpButton;
