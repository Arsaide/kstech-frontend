import React, { FC, useEffect, useState } from 'react';
import styles from './Breadcrumbs.module.scss';
import classNames from 'classnames';
import Link from 'next/link';
import { House, ChevronRight } from 'lucide-react';
import { ColorsEnum } from '@/utils/enums/ColorEnums';

interface BreadcrumbsItem {
    label: string | undefined;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbsItem[];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => {
    const [displayItems, setDisplayItems] = useState<BreadcrumbsItem[]>(items);

    const updateTextLength = () => {
        const width = window.innerWidth;

        if (width < 600) {
            setDisplayItems(
                items.map(item => ({
                    ...item,
                    label: item.label?.slice(0, 30) + '...',
                })),
            );
        } else if (width < 800) {
            setDisplayItems(
                items.map(item => ({
                    ...item,
                    label: item.label?.slice(0, 50) + '...',
                })),
            );
        } else {
            setDisplayItems(items);
        }
    };

    useEffect(() => {
        updateTextLength();

        window.addEventListener('resize', updateTextLength);

        return () => {
            window.removeEventListener('resize', updateTextLength);
        };
    }, [items]);

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 740;

    return (
        <nav aria-label={'breadcrumbs'}>
            <ul className={styles.breadcrumbs}>
                <li className={styles.breadcrumbItems}>
                    <Link href={'/'}>
                        <House className={styles.home} size={18} />
                    </Link>
                </li>
                {!isMobile && (
                    <>
                        <li className={styles.breadcrumbSeparator}>
                            <ChevronRight color={ColorsEnum.BLACK05} size={18} />
                        </li>
                        {items.map((item, index) => (
                            <React.Fragment key={index}>
                                <li
                                    className={classNames(styles.breadcrumbItems, {
                                        active: index === items.length - 1,
                                    })}
                                    aria-current={index === items.length - 1 ? 'page' : undefined}
                                >
                                    {index !== items.length - 1 ? (
                                        <Link href={item.href || '#'}>{item.label}</Link>
                                    ) : (
                                        item.label
                                    )}
                                </li>
                                {index !== items.length - 1 && (
                                    <li className={styles.breadcrumbSeparator}>
                                        <ChevronRight color={ColorsEnum.BLACK05} size={18} />
                                    </li>
                                )}
                            </React.Fragment>
                        ))}
                    </>
                )}
                {isMobile && (
                    <>
                        <li
                            className={classNames(styles.breadcrumbItems, {
                                active: items.length > 0,
                            })}
                        >
                            <Link href={items[0]?.href || '#'}>{items[0]?.label}</Link>
                        </li>
                        <li className={classNames(styles.breadcrumbSeparator, styles.mobile)}>
                            <ChevronRight color={ColorsEnum.BLACK05} size={18} />
                        </li>
                        <li className={classNames(styles.breadcrumbItems, styles.mobile)}>...</li>
                        <li className={classNames(styles.breadcrumbSeparator, styles.mobile)}>
                            <ChevronRight color={ColorsEnum.BLACK05} size={18} />
                        </li>
                        <li
                            className={classNames(styles.breadcrumbItems, styles.mobile, {
                                active: items.length > 0,
                            })}
                        >
                            {displayItems[displayItems.length - 1]?.label}
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Breadcrumbs;
