'use client';
import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import Header from '@/components/layout/ui/nav/header/Header';
import useCategoryStore from '@/api/store/CategoriesStore';
import AdaptiveHeader from '@/components/layout/ui/nav/adaptive-header/AdaptiveHeader';

interface LayoutWindowProps {
    children: React.ReactNode;
}

const LayoutWindow: FC<LayoutWindowProps> = ({ children }) => {
    const { isOpenCategories, setIsOpenCategories } = useCategoryStore();

    return (
        <>
            <div
                className={classNames('wrapper', { ['open']: isOpenCategories })}
                onClick={() => setIsOpenCategories(false)}
            >
                <Header />
                <AdaptiveHeader />
                {children}
            </div>
        </>
    );
};

export default LayoutWindow;
