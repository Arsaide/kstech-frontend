import React from 'react';
import styles from './page.module.scss';
import type { Metadata } from 'next';
import dynamic from "next/dynamic";

const Cart = dynamic(() => import('@/components/pages/cart-page/Cart'), {
    ssr: false,
});

export const metadata: Metadata = {
    title: 'KS Tech - Кошик',
    description:
        'Перегляньте та керуйте своїми товарами в кошику. KS TECH пропонує металеві каркаси, ' +
        "модульні будинки, офіси, кав'ярні, приміщення для охорони, буржуйки, котли, пічки, " +
        'обладнання для сільського господарства, генератори та інші вироби з металу.',
    keywords:
        'кошик, товари в кошику, управління кошиком, KS TECH, металеві каркаси, модульні будинки',
    openGraph: {
        title: 'KS Tech - Кошик',
        description:
            'Перегляньте та керуйте своїми товарами в кошику. Ми пропонуємо пропонує металеві каркаси, ' +
            "модульні будинки, офіси, кав'ярні, приміщення для охорони, буржуйки, котли, пічки, " +
            'обладнання для сільського господарства, генератори та інші вироби з металу.',
        url: 'https://kstech-frontend.vercel.app/cart',
        siteName: 'KS Tech',
        images: [
            {
                url: 'https://kstech-frontend.vercel.app/preview.jpg',
                width: 640,
                height: 336,
                alt: 'KS Tech Image',
            },
        ],
        locale: 'uk-UA',
        type: 'website',
    },
};

const CartPage = () => {
    return (
        <main className={styles.main}>
            <Cart />
        </main>
    );
};

export default CartPage;
