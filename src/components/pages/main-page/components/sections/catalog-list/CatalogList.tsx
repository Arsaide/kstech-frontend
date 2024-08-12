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
            <div className={styles.content}>
                <h3 className={styles.title}>Каталог</h3>
                <Link className={styles.infoLink} href={'/catalog'}>
                    Показати всі
                </Link>
            </div>
            <div className={styles.productsListContainer}>
                {isLoading || isError ? (
                    <CatalogListSkeleton />
                ) : (
                    <ul className={styles.produtcsList}>
                        {data?.slice(0, 17).map(category => (
                            <li className={styles.listItem} key={category.id}>
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
                        <li className={styles.listItem}>
                            <Link
                                className={styles.linkAll}
                                href={{
                                    pathname: `/catalog`,
                                }}
                            >
                                <h5 className={styles.nameAll}>Показати всі</h5>
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </section>
    );
};

export default CatalogList;
