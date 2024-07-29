import React from 'react';
import dynamic from 'next/dynamic';
import CategoryProducts from '@/components/pages/catalog/category-products/CategoryProducts';

const DynamicCategoryProducts = dynamic(() => Promise.resolve(CategoryProducts), {
    ssr: false,
});

const CategoryProductsPage = () => {
    return (
        <>
            <DynamicCategoryProducts />
        </>
    );
};

export default CategoryProductsPage;
