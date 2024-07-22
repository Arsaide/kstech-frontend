'use client';
import React from 'react';
import ServicesList from '@/components/pages/main-page/components/services-list/ServicesList';
import CatalogList from '@/components/pages/main-page/components/catalog-list/CatalogList';

const MainPage = () => {
    return (
        <>
            <CatalogList />
            <ServicesList />
        </>
    );
};

export default MainPage;
