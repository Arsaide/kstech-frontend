import React from 'react';
import styles from './CatalogListSkeleton.module.scss';

const CatalogListSkeleton = () => {
    return (
        <ul className={styles.produtcsList}>
            {Array.from({ length: 10 }).map((_, index) => (
                <li className={styles.listItem} key={index}>
                    <div className={styles.skeleton}></div>
                </li>
            ))}
        </ul>
    );
};

export default CatalogListSkeleton;
