'use client';
import React from 'react';
import ServicesList from '@/components/pages/main-page/components/sections/services-list/ServicesList';
import CatalogList from '@/components/pages/main-page/components/sections/catalog-list/CatalogList';
import ProductsList from '@/components/pages/main-page/components/sections/products-list/ProductsList';

const MainPage = () => {
    return (
        <>
            <CatalogList />
            <ServicesList />
            <ProductsList />
        </>
    );
};

export default MainPage;
