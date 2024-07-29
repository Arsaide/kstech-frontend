import React, { ReactNode } from 'react';
import styles from './Catalog.module.scss';
import classNames from 'classnames';

const CatalogLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className={classNames(styles.catalog, 'main')}>
            <div className={styles.cnt}>{children}</div>
        </main>
    );
};

export default CatalogLayout;
