'use client';
import React from 'react';
import useProductsStore from '@/api/store/ProductStore';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import styles from '@/components/pages/main-page/components/sections/products-grid/ProductGrid.module.scss';

const PopularProducts = () => {
    const { getPopularProducts } = useProductsStore();
    const searchParams = useSearchParams();

    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['products', currentPage],
        queryFn: () => getPopularProducts(currentPage),
        select: data => data.data,
    });

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    };

    return (
        <section className={styles.cnt}>
            <div className={styles.listCnt}>
                <ul className={styles.produtcsList}>
                    {data?.products.map(product => (
                        <li className={styles.listItem} key={product.id}>
                            <div className={styles.imgCnt}>
                                <img
                                    className={styles.img}
                                    src={product.imgArr[0]}
                                    alt={`Товар ${product.name}`}
                                />
                            </div>
                            <h5 className={styles.name}>{product.name}</h5>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                {Array.from({ length: data?.totalPages || 1 }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        disabled={currentPage === i + 1}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default PopularProducts;
