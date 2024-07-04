// Aside.tsx
import React from 'react';
import styles from './Aside.module.css';
import coffeeIcon from './../../assets/img/coffee-white.png';
import allProductsIcon from './../../assets/img/all-white.png';
import foodIcon from './../../assets/img/food-white.png';
import pastryIcon from './../../assets/img/pastry-white.png';
import teaIcon from './../../assets/img/tea-white.png';
import hotDrinksIcon from './../../assets/img/hot-drinks-white.png';
import coldDrinksIcon from './../../assets/img/cold-drinks-white.png';

interface AsideProps {
    onSortChange: (sortOrder: string) => void;
}

const Aside: React.FC<AsideProps> = ({ onSortChange }) => {
    return (
        <aside>
            <section>
                {/* <h2>Products</h2> */}
                <button onClick={() => onSortChange('')}>
                    All Products
                    <img
                        className={styles['icon']}
                        src={allProductsIcon}
                        alt="all-products-icon"
                    />
                </button>
                <button onClick={() => onSortChange('Coffee')}>
                    Coffee
                    <img
                        className={styles['icon']}
                        src={coffeeIcon}
                        alt="coffee-icon"
                    />
                </button>
                <button onClick={() => onSortChange('Food')}>
                    Food
                    <img
                        className={styles['icon']}
                        src={foodIcon}
                        alt="food-icon"
                    />
                </button>
                <button onClick={() => onSortChange('Pastry')}>
                    Pastry
                    <img
                        className={styles['icon']}
                        src={pastryIcon}
                        alt="pastry-icon"
                    />
                </button>
                <button onClick={() => onSortChange('Tea')}>
                    Tea
                    <img
                        className={styles['icon']}
                        src={teaIcon}
                        alt="tea-icon"
                    />
                </button>
                <button onClick={() => onSortChange('Hot Drinks')}>
                    Hot Drinks
                    <img
                        className={styles['icon']}
                        src={hotDrinksIcon}
                        alt="hot-drinks-icon"
                    />
                </button>
                <button onClick={() => onSortChange('Cold Drinks')}>
                    Cold Drinks
                    <img
                        className={styles['icon']}
                        src={coldDrinksIcon}
                        alt="cold-drinks-icon"
                    />
                </button>
            </section>
        </aside>
    );
};

export default Aside;
