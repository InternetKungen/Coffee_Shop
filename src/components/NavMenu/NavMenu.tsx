//NavMenu.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavMenu.module.css';

const NavMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className={isOpen ? styles.open : ''}>
            <div className={isOpen ? styles['hamburger-menu'] + ' ' + styles.open : styles['hamburger-menu']} onClick={toggleMenu}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
            <div className={styles['nav-menu-header']}>
                <p>Coffe Palace</p>
                <button>🔍</button>
            </div>
            {isOpen && (
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default NavMenu;
