import React from 'react';
import dynamic from 'next/dynamic';

const Product = dynamic(() => import('@/components/pages/catalog/one-product-page/OneProduct'), {
    ssr: false,
});

const ProductPage = () => {
    return (
        <>
            <Product />
        </>
    );
};

export default ProductPage;
