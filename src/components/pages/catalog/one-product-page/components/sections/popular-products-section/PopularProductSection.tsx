import React, { FC } from 'react';
import ProductsListByCategory from '@/components/pages/main-page/components/products-list-by-category/ProductsListByCategory';
import ProductsListByCategorySkeleton from '@/components/pages/main-page/components/products-list-by-category-skeleton/ProductsListByCategorySkeleton';
import { useGetPopularProducts } from '@/hooks/queries/use-get-popular-products/useGetPopularProducts';

interface PopularProductSectionProps {
    productId?: string;
}

const PopularProductSection: FC<PopularProductSectionProps> = ({ productId }) => {
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
                    link={'/popular-products'}
                    productId={productId as string}
                />
            )}
        </>
    );
};

export default PopularProductSection;
