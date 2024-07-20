'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { navMenu } from '@/components/layout/ui/nav/header/index';
import Categories from '@/components/layout/ui/nav/header/sub-components/categories/Categories';
import useCategoryStore from '@/api/store/CategoriesStore';
import styles from './Header.module.scss';
import adaptiveStyles from './AdaptiveHeader.module.scss';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import categoriesStyle from './sub-components/categories/Categories.module.scss';
import classNames from 'classnames';
import { LoaderCircle, Menu, PhoneCall, Search, ShoppingCart, X, FileStack } from 'lucide-react';
import { ColorsEnum } from '@/utils/enums/ColorEnums';

const Header = () => {
    const queryClient = useQueryClient();
    const {
        getCategories,
        categoryId,
        getOneCategory,
        isOpenCategories,
        setIsOpenCategories,
        setCategoryId,
    } = useCategoryStore();
    const [loadingCategoryId, setLoadingCategoryId] = useState<string | null>(null);
    const [isVisibleSearchInput, setIsVisibleSearchInput] = useState<boolean>(false);

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

    useEffect(() => {
        if (isOpenCategories) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isOpenCategories]);

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

                {/*ADAPTIVE  ADAPTIVE  ADAPTIVE  ADAPTIVE  ADAPTIVE  ADAPTIVE  */}
                {isVisibleSearchInput ? (
                    <>
                        <div className={adaptiveStyles.search}>
                            <div className={adaptiveStyles.searchIconCnt}>
                                <img
                                    className={adaptiveStyles.searchIcon}
                                    src={'/icons/search-icon.svg'}
                                    alt={'Іконка пошуку'}
                                />
                            </div>
                            <input type={'text'} placeholder={'Пошук'} />
                        </div>
                        <button
                            className={adaptiveStyles.closeSearch}
                            onClick={() => setIsVisibleSearchInput(false)}
                        >
                            <X color={ColorsEnum.BLACK} size={24} />
                        </button>
                    </>
                ) : (
                    <>
                        <div className={adaptiveStyles.optionLeft}>
                            <button
                                className={adaptiveStyles.menuIcon}
                                onClick={() => {
                                    setIsOpenCategories(!isOpenCategories);
                                }}
                            >
                                {!isOpenCategories ? (
                                    <Menu color={'#fff'} size={24} />
                                ) : (
                                    <X color={'#fff'} size={24} />
                                )}
                            </button>
                            <button
                                className={adaptiveStyles.searchIcon}
                                onClick={() => {
                                    setIsVisibleSearchInput(true);
                                    setIsOpenCategories(false);
                                }}
                            >
                                <Search color={ColorsEnum.BLACK05} size={24} />
                            </button>
                        </div>
                        <div className={adaptiveStyles.logoCnt}>
                            <Link href={'/'}>
                                <img className={adaptiveStyles.logo} src={'/logo.svg'} alt="Logo" />
                            </Link>
                        </div>
                        <div className={adaptiveStyles.optionRight}>
                            <Link className={adaptiveStyles.phoneIcon} href={'tel:+380500235030'}>
                                <PhoneCall color={'#fff'} size={24} />
                            </Link>
                            <Link className={adaptiveStyles.cartIcon} href={'/cart'}>
                                <ShoppingCart color={'#fff'} size={24} />
                            </Link>
                        </div>
                    </>
                )}
            </div>
            <div
                className={classNames(adaptiveStyles.menu, {
                    [adaptiveStyles.openMenu]: isOpenCategories,
                })}
            >
                <h3 className={adaptiveStyles.listTitle}>Меню</h3>
                <ul className={adaptiveStyles.menuList}>
                    {navMenu.map((item, index) => (
                        <li key={index} className={adaptiveStyles.listItem}>
                            <Link
                                className={adaptiveStyles.listName}
                                href={item.link}
                                prefetch={true}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <h3 className={adaptiveStyles.listTitle}>
                    <FileStack size={18} />
                    Каталог товарів
                </h3>
                <ul className={adaptiveStyles.list}>
                    {isCategoriesLoading ? (
                        <div className={adaptiveStyles.loaderName}>
                            <div className={adaptiveStyles.categoryLoader}>
                                <LoaderCircle
                                    className={adaptiveStyles.loader}
                                    size={19.67}
                                    color={ColorsEnum.WHITE}
                                />
                            </div>
                            Завантаження каталогу...
                        </div>
                    ) : null}
                    {categoriesData?.length &&
                        categoriesData?.map(item => (
                            <li key={item.id} className={adaptiveStyles.listItem}>
                                <Link
                                    href={`/category?=${item.id}`}
                                    className={adaptiveStyles.listCnt}
                                >
                                    <div className={adaptiveStyles.imgIcon}>
                                        <img
                                            src={item.iconImg}
                                            alt={`Іконка категорії ${item.category}`}
                                        />
                                    </div>
                                    <div className={adaptiveStyles.name}>{item.category}</div>
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
        </header>
    );
};

export default Header;
