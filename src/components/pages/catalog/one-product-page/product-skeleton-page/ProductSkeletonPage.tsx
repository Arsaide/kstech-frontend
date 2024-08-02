import React from 'react';
import styles from './ProductSkeletonPage.module.scss';
import Breadcrumbs from '@/components/layout/nav/breadcrubms/Breadcrumbs';

const ProductSkeletonPage = () => {
    const breadcrumbsItems = [
        { label: 'Каталог', href: '/catalog' },
        {
            label: 'Категорія...',
        },
        {
            label: '...',
        },
        {
            label: '...',
        },
    ];

    return (
        <div className={styles.skeletonCnt}>
            <Breadcrumbs items={breadcrumbsItems} />
            <div className={styles.skeletonNav}></div>
            <div className={styles.skeletonContent}>
                <div className={styles.skeletonImage}></div>
                <div className={styles.skeletonTextContent}>
                    <div className={styles.skeletonTitle}></div>
                    <div className={styles.skeletonAvailability}></div>
                    <div className={styles.skeletonPrice}></div>
                    <div className={styles.skeletonColor}></div>
                    <div className={styles.skeletonButton}></div>
                    <div className={styles.skeletonServices}></div>
                    <div className={styles.skeletonServices}></div>
                    <div className={styles.skeletonServices}></div>
                </div>
            </div>
        </div>
    );
};

export default ProductSkeletonPage;
