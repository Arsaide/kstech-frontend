import React from 'react';
import dynamic from 'next/dynamic';
import styles from './page.module.scss';

const PopularProducts = dynamic(
    () => import('@/components/pages/popular-products-page/PopularProducts'),
    {
        ssr: false,
    },
);

const PopularProductsPage = () => {
    return (
        <main className={styles.main}>
            <PopularProducts />
        </main>
    );
};

export default PopularProductsPage;
