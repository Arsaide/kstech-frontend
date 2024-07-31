import React from 'react';
import Subcatalog from '@/components/pages/catalog/subcatalog-page/Subcatalog';
import dynamic from 'next/dynamic';

const DynamicSubcatalog = dynamic(() => Promise.resolve(Subcatalog), {
    ssr: false,
});

const SubcatalogPage = () => {
    return (
        <>
            <DynamicSubcatalog />
        </>
    );
};

export default SubcatalogPage;
