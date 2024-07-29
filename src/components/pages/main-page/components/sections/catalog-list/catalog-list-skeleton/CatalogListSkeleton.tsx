import React, { FC } from 'react';
import styles from './CatalogListSkeleton.module.scss';

interface CatalogListSkeletonProps {
    length?: number;
}

const CatalogListSkeleton: FC<CatalogListSkeletonProps> = ({ length }) => {
    return (
        <ul className={styles.produtcsList}>
            {Array.from({ length: length || 24 }).map((_, index) => (
                <li className={styles.listItem} key={index}>
                    <div className={styles.skeleton}></div>
                </li>
            ))}
        </ul>
    );
};

export default CatalogListSkeleton;
