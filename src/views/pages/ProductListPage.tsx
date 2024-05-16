// ProductListPage.tsx
import React from 'react';
import ProductList from '../../components/productList/Productlist';

// Render-ProductList-function
const ProductListPage: React.FC = () => {
    return (
        <div>
            <h2>Product List Page</h2>
            <ProductList />
        </div>
    );
};

export default ProductListPage;
