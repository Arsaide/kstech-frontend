import React from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import { navMenu } from '@/components/layout/ui/nav/header/index';
import Categories from '@/components/layout/ui/nav/header/sub-components/categories/Categories';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerCnt}>
                <nav className={styles.nav}>
                    <div className={styles.logoCnt}>
                        <Link href={'/'}>
                            <img
                                className={styles.logo}
                                src={'/logo.svg'}
                                alt="Logo"
                            />
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
                    <Categories />
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
            </div>
        </header>
    );
};

export default Header;
