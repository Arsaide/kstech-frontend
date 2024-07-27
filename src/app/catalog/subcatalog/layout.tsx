import React, { ReactNode } from 'react';
import styles from './Subcatalog.module.scss';

const SubcategoriesLayout = ({ children }: { children: ReactNode }) => {
    return (
        <section className={styles.catalog}>
            <div className={styles.cnt}>{children}</div>
        </section>
    );
};

export default SubcategoriesLayout;
