// // Menu.tsx
// import React, { useState } from 'react';
// import TitleSection from '../../components/TitleSection/TitleSection';
// import ProductList from '../../components/ProductList/ProductList';
// import Aside from '../../components/Aside/Aside';

// const Menu: React.FC = () => {
//     const [sortOrder, setSortOrder] = useState<string>(''); // State to manage sort order

//     const handleSortChange = (order: string) => {
//         setSortOrder(order);
//     };

//     return (
//         <div>
//             <TitleSection title="Menu" />
//             <Aside onSortChange={handleSortChange} />
//             <ProductList sortOrder={sortOrder} />
//             <p>This is the menu view.</p>
//         </div>
//     );
// };

// export default Menu;
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TitleSection from '../../components/TitleSection/TitleSection';
import ProductList from '../../components/ProductList/ProductList';
import Aside from '../../components/Aside/Aside';
import styles from './Menu.module.css';

const Menu: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const initialSortOrder = searchParams.get('sortOrder') || '';

    const [sortOrder, setSortOrder] = useState(initialSortOrder);

    useEffect(() => {
        const currentSearchParams = new URLSearchParams(location.search);
        const currentSortOrder = currentSearchParams.get('sortOrder') || '';
        setSortOrder(currentSortOrder);
    }, [location.search]);

    const handleSortChange = (order: string) => {
        navigate(`/menu?sortOrder=${order}`);
    };

    return (
        <div>
            <TitleSection title="Menu" />
            <section className={styles['menu-container']}>
                <Aside onSortChange={handleSortChange} />
                <ProductList sortOrder={sortOrder} />
            </section>
        </div>
    );
};

export default Menu;
