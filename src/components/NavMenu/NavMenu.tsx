//NavMenu.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './NavMenu.module.css';
import searchImg from '../../assets/img/search-01.png';
import allProductsIcon from './../../assets/img/all.png';
import coffeeIcon from './../../assets/img/coffee.png';
import foodIcon from './../../assets/img/food.png';
import pastryIcon from './../../assets/img/pastry.png';
import teaIcon from './../../assets/img/tea-cup.png';
import hotDrinksIcon from './../../assets/img/hot-drinks.png';
import coldDrinksIcon from './../../assets/img/cold-drinks.png';
import downIcon from './../../assets/img/down.png';
import upIcon from './../../assets/img/up.png';

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
                        ? `${styles['hamburger-menu']} ${styles.open}`
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
                                    {isSubMenuOpen ? (
                                        <img src={upIcon} alt="up-icon" />
                                    ) : (
                                        <img src={downIcon} alt="down-icon" />
                                    )}
                                </div>
                            </div>
                            <ul
                                className={
                                    isSubMenuOpen
                                        ? `${styles['nav-menu-menu__sub-menu']} ${styles.open}`
                                        : styles['nav-menu-menu__sub-menu']
                                }
                            >
                                <li onClick={() => handleSortChange('')}>
                                    <img
                                        src={allProductsIcon}
                                        alt="all-products-icon"
                                    />
                                    Show All Products
                                </li>
                                <li onClick={() => handleSortChange('Coffee')}>
                                    <img src={coffeeIcon} alt="coffee-icon" />
                                    Coffee
                                </li>
                                <li onClick={() => handleSortChange('Food')}>
                                    <img src={foodIcon} alt="food-icon" />
                                    Food
                                </li>
                                <li onClick={() => handleSortChange('Pastry')}>
                                    <img src={pastryIcon} alt="pastry-icon" />
                                    Pastry
                                </li>
                                <li onClick={() => handleSortChange('Tea')}>
                                    <img src={teaIcon} alt="tea-icon" />
                                    Chai Tea
                                </li>
                                <li
                                    onClick={() =>
                                        handleSortChange('Hot Drinks')
                                    }
                                >
                                    <img
                                        src={hotDrinksIcon}
                                        alt="hot-drinks-icon"
                                    />
                                    Hot Drinks
                                </li>
                                <li
                                    onClick={() =>
                                        handleSortChange('Cold Drinks')
                                    }
                                >
                                    <img
                                        src={coldDrinksIcon}
                                        alt="cold-drinks-icon"
                                    />
                                    Cold Drinks
                                </li>
                            </ul>
                        </li>
                    </ul>
                )}
            </nav>
        </>
    );
};

export default NavMenu;
