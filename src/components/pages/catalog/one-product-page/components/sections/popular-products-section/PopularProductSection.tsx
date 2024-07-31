import React from 'react';
import ProductsListByCategory from '@/components/pages/main-page/components/products-list-by-category/ProductsListByCategory';
import ProductsListByCategorySkeleton from '@/components/pages/main-page/components/products-list-by-category-skeleton/ProductsListByCategorySkeleton';
import { useGetPopularProducts } from '@/hooks/queries/use-get-popular-products/useGetPopularProducts';

const PopularProductSection = () => {
    const {
        data: popularProducts,
        isLoading: popularProductsLoading,
        isError: popularProductsError,
    } = useGetPopularProducts({ page: 1 });

    if (popularProductsLoading) {
        return <ProductsListByCategorySkeleton />;
    }

    return (
        <>
            {popularProducts?.products && (
                <ProductsListByCategory
                    categoryName={'Також можуть зацікавити:'}
                    productsArr={popularProducts}
                    link={'/popular-products-page'}
                />
            )}
        </>
    );
};

export default PopularProductSection;
