import React from 'react';
import dynamic from 'next/dynamic';
import styles from './page.module.scss';

const SearchProducts = dynamic(() => import('@/components/pages/search-page/Search'), {
    ssr: false,
});

const SearchPage = () => {
    return (
        <main className={styles.main}>
            <SearchProducts />
        </main>
    );
};

export default SearchPage;
