'use client';
import React from 'react';
import ServicesList from '@/components/pages/main-page/components/services-list/ServicesList';
import CatalogList from '@/components/pages/main-page/components/catalog-list/CatalogList';
import ProductsList from '@/components/pages/main-page/components/products-list/ProductsList';

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
