//NavMenu.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavMenu.module.css';

const NavMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event : any) => {
        if (navRef.current && !navRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const handleScroll = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={isOpen ? styles.open : ''} ref={navRef}>
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
                        <Link to="/" onClick={toggleMenu}>Home</Link>
                    </li>
                    <li>
                        <Link to="/about" onClick={toggleMenu}>About</Link>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default NavMenu;
