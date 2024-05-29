import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './NavMenu.module.css';
import searchImg from '../../assets/img/search-01.png';

const NavMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleSubMenu = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
    };

    const handleClickOutside = (event: any) => {
        if (menuRef.current && menuRef.current.contains(event.target)) {
            return;
        }
        if (navRef.current && !navRef.current.contains(event.target)) {
            setIsOpen(false);
            setIsSubMenuOpen(false);
        }
    };

    const handleScroll = () => {
        setIsOpen(false);
        setIsSubMenuOpen(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSortChange = (order: string) => {
        navigate(`/menu?sortOrder=${order}`);
        setIsOpen(false);
        setIsSubMenuOpen(false);
    };

    return (
        <>
            <div
                ref={menuRef}
                className={
                    isOpen
                        ? styles['hamburger-menu'] + ' ' + styles.open
                        : styles['hamburger-menu']
                }
                onClick={toggleMenu}
            >
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
            <nav className={isOpen ? styles.open : ''} ref={navRef}>
                {isOpen && (
                    <ul>
                        <li>
                            <button>
                                <img src={searchImg} alt="Search Button" />
                            </button>
                        </li>
                        <li>
                            <Link to="/" onClick={toggleMenu}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" onClick={toggleMenu}>
                                About
                            </Link>
                        </li>
                        <li>
                            <div className={styles['nav-menu-menu']}>
                                <Link to="/menu" onClick={toggleMenu}>
                                    Menu
                                </Link>
                                <div
                                    className={styles['nav-menu-menu__button']}
                                    onClick={toggleSubMenu}
                                >
                                    {isSubMenuOpen ? '-' : '+'}
                                </div>
                            </div>
                            {isSubMenuOpen && (
                                <ul
                                    className={
                                        styles['nav-menu-menu__sub-menu']
                                    }
                                >
                                    <li onClick={() => handleSortChange('')}>
                                        Show all products
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleSortChange('Coffee')
                                        }
                                    >
                                        Coffee
                                    </li>
                                    <li
                                        onClick={() => handleSortChange('Food')}
                                    >
                                        Food
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleSortChange('Pastry')
                                        }
                                    >
                                        Pastry
                                    </li>
                                    <li onClick={() => handleSortChange('Tea')}>
                                        Chai Tea
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleSortChange('Hot Drinks')
                                        }
                                    >
                                        Hot Drinks
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleSortChange('Cold Drinks')
                                        }
                                    >
                                        Cold Drinks
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                )}
            </nav>
        </>
    );
};

export default NavMenu;
