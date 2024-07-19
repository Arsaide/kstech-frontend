'use client';
import React, { useEffect, useState } from 'react';
import styles from './AdaptiveHeader.module.scss';
import { Menu, PhoneCall, ShoppingCart, Search, X } from 'lucide-react';
import Link from 'next/link';
import { ColorsEnum } from '@/utils/enums/ColorEnums';
import { navMenu } from '@/components/layout/ui/nav/header';
import classNames from 'classnames';

const AdaptiveHeader = () => {
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

    useEffect(() => {
        if (isOpenMenu) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isOpenMenu]);

    return (
        <header className={styles.header}>
            <div className={styles.headerCnt}>
                <div className={styles.optionLeft}>
                    <button className={styles.menuIcon} onClick={() => setIsOpenMenu(!isOpenMenu)}>
                        {!isOpenMenu ? (
                            <Menu color={'#fff'} size={24} />
                        ) : (
                            <X color={'#fff'} size={24} />
                        )}
                    </button>
                    <button className={styles.searchIcon}>
                        <Search color={ColorsEnum.BLACK05} size={24} />
                    </button>
                </div>
                <div className={styles.logoCnt}>
                    <Link href={'/'}>
                        <img className={styles.logo} src={'/logo.svg'} alt="Logo" />
                    </Link>
                </div>
                <div className={styles.optionRight}>
                    <Link className={styles.phoneIcon} href={'tel:+380500235030'}>
                        <PhoneCall color={'#fff'} size={24} />
                    </Link>
                    <Link className={styles.cartIcon} href={'/cart'}>
                        <ShoppingCart color={'#fff'} size={24} />
                    </Link>
                </div>
            </div>
            <nav className={classNames(styles.menu, { [styles.openMenu]: isOpenMenu })}>
                <ul className={styles.menuList}>
                    {navMenu.map((item, index) => (
                        <li key={index} className={styles.listItem}>
                            <Link className={styles.listName} href={item.link} prefetch={true}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default AdaptiveHeader;
