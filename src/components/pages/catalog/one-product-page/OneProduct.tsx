'use client';
import React from 'react';
import { useGetProduct } from '@/hooks/queries/use-get-product/useGetProduct';
import { useSearchParams } from 'next/navigation';
import Breadcrumbs from '@/components/layout/nav/breadcrubms/Breadcrumbs';
import styles from './OneProduct.module.scss';

const OneProduct = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const { data, isLoading } = useGetProduct(id);

    const breadcrumbsItems = [
        { label: 'Каталог', href: '/catalog' },
        {
            label: data?.categoryName,
            href: `/catalog/subcatalog?category=${data?.category}`,
        },
        {
            label: data?.subcategoryName,
            href: `/catalog/subcatalog/products?id=${data?.subcategory}`,
        },
        {
            label: data?.name,
        },
    ];

    return (
        <div className={styles.cnt}>
            <Breadcrumbs items={breadcrumbsItems} />
        </div>
    );
};

export default OneProduct;
