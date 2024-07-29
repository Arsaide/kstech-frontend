'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetOneCategory } from '@/hooks/queries/use-get-one-category/useGetOneCategory';
import styles from '@/components/pages/catalog/Catalog.module.scss';
import Breadcrumbs from '@/components/layout/nav/breadcrubms/Breadcrumbs';
import CatalogListSkeleton from '@/components/pages/main-page/components/sections/catalog-list/catalog-list-skeleton/CatalogListSkeleton';
import Link from 'next/link';

const Subcatalog = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('category');
    const { data, isLoading, isError } = useGetOneCategory(id);

    const breadcrumbsItems = [
        { label: 'Каталог', href: '/catalog' },
        { label: data?.category.category },
    ];

    return (
        <div className={styles.listCnt}>
            <Breadcrumbs items={breadcrumbsItems} />
            {isLoading || isError ? (
                <CatalogListSkeleton />
            ) : (
                <ul className={styles.list}>
                    {data?.subcategory.map(subcategory => (
                        <li className={styles.item} key={subcategory.id}>
                            <Link
                                className={styles.link}
                                href={{
                                    pathname: `/catalog/products`,
                                    query: { category: subcategory.id },
                                }}
                            >
                                <div className={styles.imgCnt}>
                                    <img
                                        className={styles.img}
                                        src={subcategory.mainImg}
                                        alt={`Зображення категорії ${subcategory.subcategory}`}
                                    />
                                </div>
                                <h5 className={styles.name}>{subcategory.subcategory}</h5>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Subcatalog;
