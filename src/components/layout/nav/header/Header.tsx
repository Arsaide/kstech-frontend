'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import Categories from '@/components/layout/nav/header/components/categories/Categories';
import useCategoryStore from '@/api/store/CategoriesStore';
import styles from './Header.module.scss';
import adaptiveStyles from './AdaptiveHeader.module.scss';
import { useQueryClient } from '@tanstack/react-query';
import categoriesStyle from '@/components/layout/nav/header/components/categories/Categories.module.scss';
import classNames from 'classnames';
import {
    LoaderCircle,
    Menu,
    PhoneCall,
    Search,
    ShoppingCart,
    X,
    FileStack,
    SendHorizontal,
} from 'lucide-react';
import { ColorsEnum } from '@/utils/enums/ColorEnums';
import { Controller, useForm } from 'react-hook-form';
import { navMenu } from '@/components/layout/nav';
import { useRouter } from 'next/navigation';
import { useGetCategories } from '@/hooks/queries/use-get-categories/useGetCategories';
import { useGetSubcategories } from '@/hooks/queries/use-get-subcategories/useGetSubcategories';
import { useMutateSearch } from '@/hooks/mutations/use-mutate-search/useMutateSearch';
import Cart from '@/components/layout/nav/header/components/cart/Cart';
import useCartStore from '@/api/store/CartStore';

interface FieldValue {
    search: string;
}

const Header = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const {
        categoryId,
        isOpenCategories,
        setIsOpenCategories,
        setCategoryId,
        setIsOpenCart,
        isOpenCart,
    } = useCategoryStore();
    const cart = useCartStore(state => state.cart);
    const [loadingCategoryId, setLoadingCategoryId] = useState<string | null>(null);
    const [isVisibleSearchInput, setIsVisibleSearchInput] = useState<boolean>(false);
    const [isVisibleSubcategories, setIsVisibleSubcategories] = useState<boolean>(false);
    const [searchProductInput, setSearchProductInput] = useState<string>('');
    const { handleSubmit, control } = useForm<FieldValue>();

    const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategories();

    const { data: subcategoriesData, isSuccess } = useGetSubcategories(categoryId);

    const { mutate, isPending } = useMutateSearch(searchProductInput, 1);

    useEffect(() => {
        if (isSuccess) setLoadingCategoryId(null);
    }, [isSuccess]);

    const handleCategoryClick = (id: string | null) => {
        const cachedData = queryClient.getQueryData(['subcategories', id]);
        if (!cachedData) {
            setLoadingCategoryId(id);
        }
        setIsVisibleSubcategories(true);
        setCategoryId(id);
    };

    useEffect(() => {
        if (isOpenCategories || isOpenCart) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isOpenCategories, isOpenCart]);

    const onSubmit = () => {
        mutate(searchProductInput);
        router.push(`/search?req=${encodeURIComponent(searchProductInput)}`);
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
                        <Link href={'tel:+380674754848'}>(067) 475-48-48</Link>
                    </div>
                </nav>
                <div className={styles.optionPanel}>
                    <Categories isCategoriesLoading={isCategoriesLoading} />
                    <form className={styles.search} onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.searchIconCnt}>
                            <img
                                className={styles.searchIcon}
                                src={'/icons/search-icon.svg'}
                                alt={'Іконка пошуку'}
                            />
                        </div>
                        <Controller
                            name={'search'}
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    name={'search'}
                                    type={'text'}
                                    placeholder={'Пошук'}
                                    value={searchProductInput}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setSearchProductInput(e.target.value);
                                    }}
                                />
                            )}
                        />
                        <button
                            className={styles.submit}
                            type={'submit'}
                            disabled={searchProductInput.length == 0 || isPending}
                        >
                            {isPending ? (
                                <LoaderCircle
                                    className={styles.loader}
                                    size={24}
                                    color={ColorsEnum.BLACK}
                                />
                            ) : (
                                <SendHorizontal color={ColorsEnum.BLACK} />
                            )}
                        </button>
                    </form>
                    <div className={styles.cart}>
                        <button
                            className={styles.cartBtn}
                            onClick={() => {
                                setIsOpenCart(!isOpenCart);
                                setIsOpenCategories(false);
                                setIsVisibleSubcategories(false);
                            }}
                        >
                            <div className={styles.cartIconCnt}>
                                <img
                                    className={styles.cartIcon}
                                    src={'/icons/cart-icon.svg'}
                                    alt={'Іконка кошику'}
                                />
                                <span className={styles.cartQuantity}>{cart.length}</span>
                            </div>
                            Кошик
                        </button>
                    </div>
                </div>
                <div
                    className={classNames(styles.menu, {
                        [styles.subcategoriesOpen]: isVisibleSubcategories,
                    })}
                >
                    {isOpenCategories && !isCategoriesLoading && (
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
                    isVisibleSubcategories &&
                    subcategoriesData &&
                    subcategoriesData?.length > 0 ? (
                        <div className={styles.subcategories}>
                            <ul className={styles.subcategoriesCnt}>
                                {subcategoriesData?.map(item => (
                                    <li key={item.id}>
                                        <Link
                                            href={{
                                                pathname: `/catalog/subcatalog/products`,
                                                query: { id: item.id },
                                            }}
                                            className={styles.subcategoryItem}
                                        >
                                            <img src={item.iconImg} alt={item.subcategory} />
                                            {item.subcategory}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : isOpenCategories && subcategoriesData && subcategoriesData?.length == 0 ? (
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
                        <form className={adaptiveStyles.search} onSubmit={handleSubmit(onSubmit)}>
                            <div className={adaptiveStyles.searchIconCnt}>
                                <img
                                    className={adaptiveStyles.searchIcon}
                                    src={'/icons/search-icon.svg'}
                                    alt={'Іконка пошуку'}
                                />
                            </div>
                            <Controller
                                name={'search'}
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        name={'search'}
                                        type={'text'}
                                        placeholder={'Пошук'}
                                        value={searchProductInput}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            setSearchProductInput(e.target.value);
                                        }}
                                    />
                                )}
                            />
                            <button
                                className={adaptiveStyles.submit}
                                type={'submit'}
                                disabled={searchProductInput.length == 0 || isPending}
                            >
                                {isPending ? (
                                    <LoaderCircle
                                        className={styles.loader}
                                        size={24}
                                        color={ColorsEnum.BLACK}
                                    />
                                ) : (
                                    <SendHorizontal color={ColorsEnum.BLACK} />
                                )}
                            </button>
                        </form>
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
                                    <Menu color={ColorsEnum.WHITE} size={24} />
                                ) : (
                                    <X color={ColorsEnum.WHITE} size={24} />
                                )}
                            </button>
                            <button
                                className={adaptiveStyles.searchIcon}
                                onClick={() => {
                                    setIsVisibleSearchInput(true);
                                    setIsOpenCategories(false);
                                }}
                            >
                                <Search color={ColorsEnum.WHITE} size={24} />
                            </button>
                        </div>
                        <div className={adaptiveStyles.logoCnt}>
                            <Link href={'/'}>
                                <img className={adaptiveStyles.logo} src={'/logo.svg'} alt="Logo" />
                            </Link>
                        </div>
                        <div className={adaptiveStyles.optionRight}>
                            <Link className={adaptiveStyles.phoneIcon} href={'tel:+380500235030'}>
                                <PhoneCall color={ColorsEnum.WHITE} size={24} />
                            </Link>
                            <Link className={adaptiveStyles.cartIcon} href={'/cart'}>
                                <ShoppingCart color={ColorsEnum.WHITE} size={24} />
                            </Link>
                        </div>
                    </>
                )}
            </div>
            <div className={styles.cartMenu}>
                <div className={styles.cartMenuCnt}>
                    {isOpenCart && !isOpenCategories && <Cart />}
                </div>
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
                                    href={{
                                        pathname: `/catalog/subcatalog/products`,
                                        query: { id: item.id },
                                    }}
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
