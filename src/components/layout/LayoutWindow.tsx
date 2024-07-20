'use client';
import React, { FC } from 'react';
import classNames from 'classnames';
import Header from '@/components/layout/ui/nav/header/Header';
import useCategoryStore from '@/api/store/CategoriesStore';

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
                {children}
            </div>
        </>
    );
};

export default LayoutWindow;
