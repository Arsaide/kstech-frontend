import React from 'react';
import styles from './ProductsListByCategorySkeleton.module.scss';

const ProductsListByCategorySkeleton = () => {
    return (
        <div className={styles.category}>
            <div className={styles.info}>
                <h6 className={styles.infoName}>
                    <div className={styles.nameSkeleton}></div>
                </h6>
                <div className={styles.infoLink}>Показати всі</div>
            </div>
            <ul className={styles.list}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <li key={index} className={styles.listItem}>
                        <div className={styles.itemSkeleton}></div>
                    </li>
                ))}
            </ul>
            <div className={styles.btnCnt}>
                <div className={styles.btnSkeleton}></div>
            </div>
        </div>
    );
};

export default ProductsListByCategorySkeleton;
