import React from 'react';
import dynamic from 'next/dynamic';

const SearchProducts = dynamic(() => import('@/components/pages/search-page/Search'), {
    ssr: false,
});

const SearchPage = () => {
    return (
        <>
            <SearchProducts />
        </>
    );
};

export default SearchPage;
