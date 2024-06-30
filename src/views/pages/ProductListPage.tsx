// ProductListPage.tsx
import React from 'react';
import ProductList from '../../components/ProductList/ProductList';

// Render-ProductList-function
const ProductListPage: React.FC = () => {
    return (
        <div>
            {/* <h2>Product List Page</h2> */}
            <ProductList sortOrder="defaultOrder" />
        </div>
    );
};

export default ProductListPage;
