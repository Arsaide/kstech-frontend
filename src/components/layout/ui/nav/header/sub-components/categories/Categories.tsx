'use client';
import React, { useState } from 'react';
import styles from './Categories.module.scss';
import { useQuery } from '@tanstack/react-query';
import useCategoryStore from '@/api/store/CategoriesStore';
import { ColorsEnum } from '@/utils/enums/ColorEnums';
import { LoaderCircle } from 'lucide-react';

const Categories = () => {
    const { getCategories, setCategoryId } = useCategoryStore();
    const [isOpenCategories, setIsOpenCategories] = useState<boolean>(false);

    const { data, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
        select: data => data.data,
        enabled: isOpenCategories,
    });

    return (
        <div className={styles.categories}>
            <button
                className={styles.categoriesBtn}
                onClick={() => setIsOpenCategories(!isOpenCategories)}
            >
                <div className={styles.categoriesIconCnt}>
                    {isLoading ? (
                        <LoaderCircle
                            className={styles.loader}
                            size={19.67}
                            color={ColorsEnum.WHITE}
                        />
                    ) : (
                        <img
                            className={styles.categoriesIcon}
                            src={'/icons/categories-icon.svg'}
                            alt={'Іконка категорій'}
                        />
                    )}
                </div>
                Каталог товарів
            </button>
            {isOpenCategories && (
                <div className={styles.categoriesList}>
                    <ul className={styles.list}>
                        {data?.map(item => (
                            <li key={item.id} className={styles.listItem}>
                                <button
                                    className={styles.listCnt}
                                    onClick={() => setCategoryId(item.id)}
                                >
                                    <div className={styles.imgIcon}>
                                        <img
                                            src={item.iconImg}
                                            alt={`Іконка категорії ${item.category}`}
                                        />
                                    </div>
                                    <div className={styles.name}>
                                        {item.category}
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Categories;
