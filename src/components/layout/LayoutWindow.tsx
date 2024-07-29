'use client';
import React, { FC } from 'react';
import classNames from 'classnames';
import Header from '@/components/layout/nav/header/Header';
import useCategoryStore from '@/api/store/CategoriesStore';
import Footer from '@/components/layout/nav/footer/Footer';

interface LayoutWindowProps {
    children: React.ReactNode;
}

const LayoutWindow: FC<LayoutWindowProps> = ({ children }) => {
    const { isOpenCategories, setIsOpenCategories } = useCategoryStore();

    return (
        <div
            className={classNames('wrapper', { ['open']: isOpenCategories })}
            onClick={() => setIsOpenCategories(false)}
        >
            {isOpenCategories && <div className={'overlay'} />}
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default LayoutWindow;
