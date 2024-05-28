// Aside.tsx
import React from 'react';
import './Aside.module.css';

interface AsideProps {
    onSortChange: (sortOrder: string) => void;
}

const Aside: React.FC<AsideProps> = ({ onSortChange }) => {
    return (
        <aside>
            <section>
                <h2>Products</h2>
                <button onClick={() => onSortChange('')}>All Products</button>
                <button onClick={() => onSortChange('Coffee')}>Coffee</button>
                <button onClick={() => onSortChange('Food')}>Food</button>
                <button onClick={() => onSortChange('Pastry')}>Pastry</button>
                <button onClick={() => onSortChange('Tea')}>Tea</button>
                <button onClick={() => onSortChange('Hot Drinks')}>
                    Hot Drinks
                </button>
                <button onClick={() => onSortChange('Cold Drinks')}>
                    Cold Drinks
                </button>
            </section>
        </aside>
    );
};

export default Aside;
