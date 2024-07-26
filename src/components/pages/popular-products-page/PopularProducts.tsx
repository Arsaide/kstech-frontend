'use client';
import React from 'react';
import useProductsStore from '@/api/store/ProductStore';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/components/layout/ui/product-card/ProductCard';
import styles from './PopularProducts.module.scss';

const PopularProducts = () => {
    const { getPopularProducts } = useProductsStore();
    const searchParams = useSearchParams();

    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['popular-products', currentPage],
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
                <ul className={styles.productsList}>
                    {data?.products.map(product => (
                        <ProductCard
                            key={product.id}
                            name={product.name}
                            img={product.imgArr[0]}
                            price={product.price}
                            discount={product.discount}
                            link={''}
                        />
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
