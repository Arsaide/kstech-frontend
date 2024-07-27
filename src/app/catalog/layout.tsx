import React, { ReactNode } from 'react';
import styles from './Catalog.module.scss';

const CatalogLayout = ({ children }: { children: ReactNode }) => {
    return (
        <section className={styles.catalog}>
            <div className={styles.cnt}>{children}</div>
        </section>
    );
};

export default CatalogLayout;
