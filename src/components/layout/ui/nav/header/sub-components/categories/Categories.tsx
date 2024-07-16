'use client';
import React from 'react';
import styles from '@/components/layout/ui/nav/header/Header.module.scss';
import { useQuery } from '@tanstack/react-query';
import useCategoryStore from '@/api/store/CategoriesStore';
import Link from 'next/link';

const Categories = () => {
    const { categories, getCategories } = useCategoryStore();

    const { data } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
        select: data => data.data,
    });

    console.log(data);

    return (
        <div className={styles.categories}>
            <button className={styles.categoriesBtn}>
                <div className={styles.categoriesIconCnt}>
                    <img
                        className={styles.categoriesIcon}
                        src={'/icons/categories-icon.svg'}
                        alt={'Іконка категорій'}
                    />
                </div>
                Каталог товарів
            </button>
            <div className={styles.categoriesList}>
                <ul className={styles.list}>
                    {data?.map(item => (
                        <li key={item.id} className={styles.listItem}>
                            <Link href={`/category?id=${item.id}}`}>
                                <div className={styles.listCnt}>
                                    <div className={styles.imgIcon}>
                                        <img
                                            src={item.iconImg}
                                            alt={`Іконка категорії ${item.category}`}
                                        />
                                    </div>
                                    <div className={styles.name}>
                                        {item.category}
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Categories;
