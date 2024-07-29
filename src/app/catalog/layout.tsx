import React, { ReactNode } from 'react';
import styles from './CatalogLayout.module.scss';
import classNames from 'classnames';

const CatalogLayout = ({ children }: { children: ReactNode }) => {
    return <main className={classNames(styles.cnt, 'main')}>{children}</main>;
};

export default CatalogLayout;
