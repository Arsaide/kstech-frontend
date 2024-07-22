'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useCategoryStore from '@/api/store/CategoriesStore';
import styles from './CatalogList.module.scss';
import Link from 'next/link';
import CatalogListSkeleton from '@/components/pages/main-page/components/catalog-list/catalog-list-skeleton/CatalogListSkeleton';

const CatalogList = () => {
    const { getCategories } = useCategoryStore();

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
        select: data => data.data,
    });

    return (
        <section className={styles.cnt}>
            <h3 className={styles.title}>Каталог</h3>
            <div className={styles.productsListContainer}>
                {isLoading ? (
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
