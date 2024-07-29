'use client';
import React from 'react';
import { useGetCategories } from '@/hooks/queries/use-get-categories/useGetCategories';
import styles from './Catalog.module.scss';
import Link from 'next/link';
import Breadcrumbs from '@/components/layout/nav/breadcrubms/Breadcrumbs';
import CatalogSkeleton from '@/components/pages/catalog/components/catalog-skeleton/CatalogSkeleton';

const Catalog = () => {
    const { data, isLoading, isError } = useGetCategories();

    const breadcrumbsItems = [{ label: 'Каталог' }];

    return (
        <div className={styles.listCnt}>
            <Breadcrumbs items={breadcrumbsItems} />
            {isLoading || isError ? (
                <CatalogSkeleton />
            ) : (
                <ul className={styles.list}>
                    {data?.slice(0, 24).map(category => (
                        <li className={styles.item} key={category.id}>
                            <Link
                                className={styles.link}
                                href={{
                                    pathname: `/catalog/subcatalog`,
                                    query: { category: category.id },
                                }}
                            >
                                <div className={styles.imgCnt}>
                                    <img
                                        className={styles.img}
                                        src={category.mainImg}
                                        alt={`Зображення категорії ${category.category}`}
                                    />
                                </div>
                                <h5 className={styles.name}>{category.category}</h5>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Catalog;
