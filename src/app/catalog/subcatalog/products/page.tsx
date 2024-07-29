import React from 'react';
import dynamic from 'next/dynamic';

const Products = dynamic(() => import('@/components/pages/catalog/products/Products'), {
    ssr: false,
});

const ProductsPage = () => {
    return (
        <>
            <Products />
        </>
    );
};

export default ProductsPage;
