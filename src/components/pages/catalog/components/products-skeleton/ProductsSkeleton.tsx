import React from 'react';
import Breadcrumbs from '@/components/layout/nav/breadcrubms/Breadcrumbs';
import Pagination from '@/components/ui/pagination/Pagination';
import styles from './ProductsSkeleton.module.scss';

const ProductsSkeleton = () => {
    const breadcrumbsItems = [
        { label: 'Каталог', href: '/catalog' },
        {
            label: 'Категорія...',
        },
        { label: '...' },
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbsItems} />
            <div className={styles.listCnt}>
                <ul className={styles.list}>
                    {Array.from({ length: 20 }).map((_, index) => (
                        <li className={styles.item} key={index}>
                            <div className={styles.skeleton}></div>
                        </li>
                    ))}
                </ul>
            </div>
            <Pagination
                totalPages={1}
                currentPage={1}
                onPageChange={() => console.log('Loading...')}
            />
        </>
    );
};

export default ProductsSkeleton;
