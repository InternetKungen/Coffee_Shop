//Header.tsx
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../main';
import NavMenu from '../NavMenu/NavMenu';
import SignInButton from '../SignInButton/SignInButton';
import SignUpButton from '../SignUpButton/SignUpButton';
import ProfileButton from '../ProfileButton/ProfileButton';
import styles from './Header.module.css';
import Logo from '../Logo/Logo';
import FavoritesButton from '../FavoritesButton/FavoritesButton';
import CartButtonHeader from '../CartButtonHeader/CartButtonHeader';

const Header: React.FC = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsUserLoggedIn(!!user);
        });

        // Rensa upp prenumerationen när komponenten avmonteras
        return () => unsubscribe();
    }, []);

    return (
        <header>
            <NavMenu />
            <Logo />
            <section className={styles['header__button-container']}>
                {isUserLoggedIn ? (
                    <>
                        <CartButtonHeader />
                        <FavoritesButton />
                        <ProfileButton />
                    </>
                ) : (
                    <>
                        <SignInButton />
                        <SignUpButton />
                    </>
                )}
            </section>
        </header>
    );
};

export default Header;
