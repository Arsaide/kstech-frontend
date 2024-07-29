import React from 'react';
import styles from './CatalogSkeleton.module.scss';

const CatalogSkeleton = () => {
    return (
        <ul className={styles.produtcsList}>
            {Array.from({ length: 24 }).map((_, index) => (
                <li className={styles.listItem} key={index}>
                    <div className={styles.skeleton}></div>
                </li>
            ))}
        </ul>
    );
};

export default CatalogSkeleton;
