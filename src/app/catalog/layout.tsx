import React, { ReactNode } from 'react';
import styles from './CatalogLayout.module.scss';

const CatalogLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className={styles.main}>
            <div className={styles.cnt}>{children}</div>
        </main>
    );
};

export default CatalogLayout;
