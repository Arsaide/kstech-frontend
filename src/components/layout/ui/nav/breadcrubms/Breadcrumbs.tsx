import React, { FC } from 'react';
import styles from './Breadcrumbs.module.scss';
import classNames from 'classnames';
import Link from 'next/link';
import { House, ChevronRight } from 'lucide-react';
import { ColorsEnum } from '@/utils/enums/ColorEnums';

interface BreadcrumbsItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbsItem[];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => {
    return (
        <nav aria-label={'breadcrumbs'}>
            <ul className={styles.breadcrumbs}>
                <li className={styles.breadcrumbItems}>
                    <Link href={'/'}>
                        <House color={ColorsEnum.BLACK05} size={18} />
                    </Link>
                </li>
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
                                <ChevronRight />
                            </li>
                        )}
                    </React.Fragment>
                ))}
            </ul>
        </nav>
    );
};

export default Breadcrumbs;
