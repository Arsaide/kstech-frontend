'use client';
import React from 'react';
import styles from './CatalogList.module.scss';
import Link from 'next/link';
import CatalogListSkeleton from '@/components/pages/main-page/components/sections/catalog-list/catalog-list-skeleton/CatalogListSkeleton';
import { useGetCategories } from '@/hooks/queries/use-get-categories/useGetCategories';

const CatalogList = () => {
    const { data, isLoading, isError } = useGetCategories();

    return (
        <section className={styles.cnt}>
            <h3 className={styles.title}>Каталог</h3>
            <div className={styles.productsListContainer}>
                {isLoading || isError ? (
                    <CatalogListSkeleton />
                ) : (
                    <ul className={styles.produtcsList}>
                        {data?.map(category => (
                            <li className={styles.listItem} key={category.id}>
                                <Link
                                    className={styles.link}
                                    href={{
                                        pathname: `/category`,
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
        </section>
    );
};

export default CatalogList;
