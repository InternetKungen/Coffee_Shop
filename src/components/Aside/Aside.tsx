// Aside.tsx
import React from 'react';
import './Aside.module.css';
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
                    <img src={allProductsIcon} alt="all-products-icon" />
                </button>
                <button onClick={() => onSortChange('Coffee')}>
                    Coffee
                    <img src={coffeeIcon} alt="coffee-icon" />
                </button>
                <button onClick={() => onSortChange('Food')}>
                    Food
                    <img src={foodIcon} alt="food-icon" />
                </button>
                <button onClick={() => onSortChange('Pastry')}>
                    Pastry
                    <img src={pastryIcon} alt="pastry-icon" />
                </button>
                <button onClick={() => onSortChange('Tea')}>
                    Tea
                    <img src={teaIcon} alt="tea-icon" />
                </button>
                <button onClick={() => onSortChange('Hot Drinks')}>
                    Hot Drinks
                    <img src={hotDrinksIcon} alt="hot-drinks-icon" />
                </button>
                <button onClick={() => onSortChange('Cold Drinks')}>
                    Cold Drinks
                    <img src={coldDrinksIcon} alt="cold-drinks-icon" />
                </button>
            </section>
        </aside>
    );
};

export default Aside;
