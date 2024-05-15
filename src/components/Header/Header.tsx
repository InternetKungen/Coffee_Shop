// Header.tsx
import React from 'react';
import NavMenu from '../NavMenu/NavMenu';
import SignInButton from '../SignInButton/SignInButton';
import SignUpButton from '../SignUpButton/SignUpButton';
import styles from './Header.module.css';

const Header: React.FC = () => {
    return (
        <header>
            <NavMenu />
            <h2>Header</h2>
            <section className={styles['header__button-container']}>
                <SignInButton />
                <SignUpButton />
            </section>
        </header>
    );
};

export default Header;
