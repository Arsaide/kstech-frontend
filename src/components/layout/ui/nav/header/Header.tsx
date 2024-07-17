'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { navMenu } from '@/components/layout/ui/nav/header/index';
import Categories from '@/components/layout/ui/nav/header/sub-components/categories/Categories';
import useCategoryStore from '@/api/store/CategoriesStore';
import styles from './Header.module.scss';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import categoriesStyle from './sub-components/categories/Categories.module.scss';
import classNames from 'classnames';
import { LoaderCircle } from 'lucide-react';
import { ColorsEnum } from '@/utils/enums/ColorEnums';

const Header = () => {
    const queryClient = useQueryClient();
    const { getCategories, categoryId, getOneCategory, isOpenCategories, setCategoryId } =
        useCategoryStore();
    const [loadingCategoryId, setLoadingCategoryId] = useState<string | null>(null);

    const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
        select: data => data.data,
        enabled: isOpenCategories,
    });

    const {
        data: subcategoriesData,
        isLoading: isSubcategoriesLoading,
        isSuccess,
    } = useQuery({
        queryKey: ['subcategories', categoryId],
        queryFn: () => getOneCategory(categoryId),
        select: data => data.data.subcategory,
        enabled: categoryId != null,
    });

    useEffect(() => {
        if (isSuccess) setLoadingCategoryId(null);
    }, [isSuccess]);

    const handleCategoryClick = (id: string | null) => {
        const cachedData = queryClient.getQueryData(['subcategories', id]);
        if (!cachedData) {
            setLoadingCategoryId(id);
        }
        setCategoryId(id);
    };

    return (
        <header className={styles.header} onClick={e => e.stopPropagation()}>
            <div className={styles.headerCnt}>
                <nav className={styles.nav}>
                    <div className={styles.logoCnt}>
                        <Link href={'/'}>
                            <img className={styles.logo} src={'/logo.svg'} alt="Logo" />
                        </Link>
                    </div>
                    <ul className={styles.navList}>
                        {navMenu.map((item, index) => (
                            <li key={index} className={styles.listItem}>
                                <Link href={item.link}>{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.contacts}>
                        <Link href={'tel:+380500235030'}>(050) 023-50-30</Link>
                    </div>
                </nav>
                <div className={styles.optionPanel}>
                    <Categories isCategoriesLoading={isCategoriesLoading} />
                    <div className={styles.search}>
                        <div className={styles.searchIconCnt}>
                            <img
                                className={styles.searchIcon}
                                src={'/icons/search-icon.svg'}
                                alt={'Іконка пошуку'}
                            />
                        </div>
                        <input type={'text'} placeholder={'Пошук'} />
                    </div>
                    <div className={styles.cart}>
                        <button className={styles.cartBtn}>
                            <div className={styles.cartIconCnt}>
                                <img
                                    className={styles.cartIcon}
                                    src={'/icons/cart-icon.svg'}
                                    alt={'Іконка кошику'}
                                />
                            </div>
                            Кошик
                        </button>
                    </div>
                </div>
                <div className={styles.menu}>
                    {isOpenCategories && (
                        <div className={categoriesStyle.categoriesList}>
                            <ul className={categoriesStyle.list}>
                                {categoriesData?.length &&
                                    categoriesData?.map(item => (
                                        <li key={item.id} className={categoriesStyle.listItem}>
                                            <button
                                                className={categoriesStyle.listCnt}
                                                // onClick={() => setCategoryId(item.id)}
                                                onClick={() => handleCategoryClick(item.id)}
                                            >
                                                <div className={categoriesStyle.imgIcon}>
                                                    <img
                                                        src={item.iconImg}
                                                        alt={`Іконка категорії ${item.category}`}
                                                    />
                                                </div>
                                                <div className={categoriesStyle.name}>
                                                    {item.category}
                                                </div>
                                                <div
                                                    className={categoriesStyle.subcategoriesLoader}
                                                >
                                                    {loadingCategoryId === item.id && (
                                                        <LoaderCircle
                                                            className={categoriesStyle.loader}
                                                            size={19.67}
                                                            color={ColorsEnum.BLACK}
                                                        />
                                                    )}
                                                </div>
                                            </button>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )}
                    {categoryId &&
                    isOpenCategories &&
                    subcategoriesData &&
                    subcategoriesData?.length > 0 ? (
                        <div className={styles.subcategories}>
                            <ul className={styles.subcategoriesCnt}>
                                {subcategoriesData?.map(item => (
                                    <li key={item.id} className={styles.subcategoryItem}>
                                        <img src={item.iconImg} alt={item.subcategory} />
                                        {item.subcategory}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : subcategoriesData?.length == 0 ? (
                        <div
                            className={classNames(
                                styles.subcategories,
                                styles.subcategoriesMessage,
                            )}
                        >
                            За цією категорію нічого не знайдено!
                        </div>
                    ) : null}
                </div>
            </div>
        </header>
    );
};

export default Header;
