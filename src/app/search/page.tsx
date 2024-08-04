import React from 'react';
import dynamic from 'next/dynamic';
import styles from './page.module.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'KS Tech - Список товарів',
    description:
        'Перегляньте результати пошуку товарів в магазині KS TECH. Знайдіть все, що вам потрібно: металеві каркаси, ' +
        "модульні будинки, офіси, кав'ярні, приміщення для охорони, буржуйки, котли, пічки, обладнання для сільського господарства, " +
        'генератори та інші вироби з металу.',
    keywords: [
        'пошук товарів',
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
        title: 'KS Tech - Список товарів',
        description:
            'Перегляньте результати пошуку товарів в магазині KS TECH. Знайдіть все, що вам потрібно: металеві каркаси, ' +
            "модульні будинки, офіси, кав'ярні, приміщення для охорони, буржуйки, котли, пічки, обладнання для сільського господарства, " +
            'генератори та інші вироби з металу.',
        url: 'https://kstech-frontend.vercel.app/search-results',
        siteName: 'KS Tech',
        images: [
            {
                url: 'https://kstech-frontend.vercel.app/preview.jpg',
                width: 640,
                height: 336,
                alt: 'Результати пошуку товарів KS Tech',
            },
        ],
        locale: 'uk-UA',
        type: 'website',
    },
};

const SearchProducts = dynamic(() => import('@/components/pages/search-page/Search'), {
    ssr: false,
});

const SearchPage = () => {
    return (
        <main className={styles.main}>
            <SearchProducts />
        </main>
    );
};

export default SearchPage;
