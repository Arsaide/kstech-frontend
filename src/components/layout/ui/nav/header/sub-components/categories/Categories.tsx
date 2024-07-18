'use client';
import React, { FC } from 'react';
import styles from './Categories.module.scss';
import useCategoryStore from '@/api/store/CategoriesStore';
import { ColorsEnum } from '@/utils/enums/ColorEnums';
import { LoaderCircle } from 'lucide-react';

interface CategoriesProps {
    isCategoriesLoading: boolean;
}

const Categories: FC<CategoriesProps> = ({ isCategoriesLoading }) => {
    const { setIsOpenCategories, isOpenCategories } = useCategoryStore();

    return (
        <div className={styles.categories}>
            <button
                className={styles.categoriesBtn}
                onClick={() => setIsOpenCategories(!isOpenCategories)}
                disabled={isCategoriesLoading}
            >
                <div className={styles.categoriesIconCnt}>
                    {isCategoriesLoading ? (
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
                Каталог
            </button>
        </div>
    );
};

export default Categories;
