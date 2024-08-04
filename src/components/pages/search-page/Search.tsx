'use client';
import React, { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from '@/components/pages/popular-products-page/PopularProducts.module.scss';
import ProductsSkeleton from '@/components/pages/catalog/components/products-skeleton/ProductsSkeleton';
import { useMutateSearch } from '@/hooks/mutations/use-mutate-search/useMutateSearch';
import Breadcrumbs from '@/components/layout/nav/breadcrubms/Breadcrumbs';
import ProductCard from '@/components/ui/product-card/ProductCard';
import Pagination from '@/components/ui/pagination/Pagination';

const Search = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const searchProduct = searchParams.get('req');
    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    const { data, mutate, isPending, isError } = useMutateSearch(searchProduct || '', currentPage);

    useEffect(() => {
        mutate(searchProduct || '');
    }, [searchProduct, currentPage, mutate]);

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        window.history.pushState(null, '', `${pathname}?${params.toString()}`);
    };

    const breadcrumbsItems = [{ label: `Пошук: ${searchProduct}` }];

    if (isPending || isError) {
        return (
            <section className={styles.cnt}>
                <ProductsSkeleton />
            </section>
        );
    }

    return (
        <section className={styles.cnt}>
            <Breadcrumbs items={breadcrumbsItems} />
            <div className={styles.listCnt}>
                <ul className={styles.productsList}>
                    {data?.data?.products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            link={`/catalog/subcatalog/${product.id}`}
                        />
                    ))}
                </ul>
            </div>
            <Pagination
                totalPages={data?.data?.totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </section>
    );
};

export default Search;
