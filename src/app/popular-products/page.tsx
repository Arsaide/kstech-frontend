import React from 'react';
import dynamic from 'next/dynamic';
import styles from './page.module.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'KS Tech - Популярні товари',
    description:
        'Перегляньте наші найпопулярніші товари зі знижкою в магазині KS TECH. Ми пропонуємо великий вибір ' +
        "продукції зі знижками: металеві каркаси, модульні будинки, офіси, кав'ярні, приміщення для охорони, " +
        'буржуйки, котли, пічки, обладнання для сільського господарства, генератори та інші вироби з металу.',
    keywords: [
        'популярні товари',
        'товари зі знижкою',
        'скидки',
        'KS TECH',
        'металеві каркаси',
        'модульні будинки',
        'офіси',
        'кафе',
        'приміщення для охорони',
        'буржуйки',
        'котли',
        'пічки',
        'обладнання для сільського господарства',
        'генератори',
        'вироби з металу',
    ],
    openGraph: {
        title: 'KS Tech - Популярні товари зі знижкою',
        description:
            'Перегляньте наші найпопулярніші товари зі знижкою в магазині KS TECH. Ми пропонуємо великий вибір ' +
            "продукції зі знижками: металеві каркаси, модульні будинки, офіси, кав'ярні, приміщення для охорони, " +
            'буржуйки, котли, пічки, обладнання для сільського господарства, генератори та інші вироби з металу.',
        url: 'https://kstech-frontend.vercel.app/popular-products',
        siteName: 'KS Tech',
        images: [
            {
                url: 'https://kstech-frontend.vercel.app/preview.jpg',
                width: 640,
                height: 336,
                alt: 'Популярні товари зі знижкою KS Tech',
            },
        ],
        locale: 'uk-UA',
        type: 'website',
    },
};

const PopularProducts = dynamic(
    () => import('@/components/pages/popular-products-page/PopularProducts'),
    {
        ssr: false,
    },
);

const PopularProductsPage = () => {
    return (
        <main className={styles.main}>
            <PopularProducts />
        </main>
    );
};

export default PopularProductsPage;
