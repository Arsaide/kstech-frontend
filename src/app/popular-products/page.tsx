import React from 'react';
import dynamic from 'next/dynamic';

const PopularProducts = dynamic(
    () => import('@/components/pages/popular-products-page/PopularProducts'),
    {
        ssr: false,
    },
);

const PopularProductsPage = () => {
    return (
        <>
            <PopularProducts />
        </>
    );
};

export default PopularProductsPage;
