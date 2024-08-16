import React from 'react';
import dynamic from "next/dynamic";

const Catalog = dynamic(() => import('@/components/pages/catalog/Catalog'), {
    ssr: false,
});

const CatalogPage = () => {
    return (
        <>
            <Catalog />
        </>
    );
};

export default CatalogPage;
