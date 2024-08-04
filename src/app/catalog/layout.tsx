import React, { ReactNode } from 'react';
import styles from './CatalogLayout.module.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'KS Tech - Каталог',
    description:
        'Перегляньте наш повний каталог товарів, де ви знайдете всі категорії та підкатегорії продукції, ' +
        "яку пропонує наш магазин KS TECH. Ми пропонуємо металеві каркаси, модульні будинки, офіси, кав'ярні, " +
        'приміщення для охорони, буржуйки, котли, пічки, обладнання для сільського господарства, ' +
        'генератори та інші вироби з металу.',
    keywords: [
        'каталог товарів',
        'категорії товарів',
        'підкатегорії товарів',
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
        title: 'KS Tech - Каталог товарів',
        description:
            'Перегляньте наш повний каталог товарів, де ви знайдете всі категорії та підкатегорії продукції, ' +
            "яку пропонує KS TECH. Ми пропонуємо металеві каркаси, модульні будинки, офіси, кав'ярні, " +
            'приміщення для охорони, буржуйки, котли, пічки, обладнання для сільського господарства, ' +
            'генератори та інші вироби з металу.',
        url: 'https://kstech-frontend.vercel.app/catalog',
        siteName: 'KS Tech',
        images: [
            {
                url: 'https://www.example.com/catalog-image.jpg',
                width: 800,
                height: 600,
                alt: 'Каталог товарів KS Tech',
            },
        ],
        locale: 'uk-UA',
        type: 'website',
    },
};

const CatalogLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className={styles.main}>
            <div className={styles.cnt}>{children}</div>
        </main>
    );
};

export default CatalogLayout;
