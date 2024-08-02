'use client';
import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from '@/components/pages/popular-products-page/PopularProducts.module.scss';
import ProductsSkeleton from '@/components/pages/catalog/components/products-skeleton/ProductsSkeleton';

const Search = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        window.history.pushState(null, '', `${pathname}?${params.toString()}`);
    };

    const breadcrumbsItems = [{ label: 'Пошук' }];

    // if (isLoading || isError) {
    //     return (
    //         <section className={styles.cnt}>
    //             <ProductsSkeleton />
    //         </section>
    //     );
    // }

    return <div></div>;
};

export default Search;
