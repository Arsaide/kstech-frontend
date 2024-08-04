import React from 'react';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';

interface GenerateMetadataProps {
    searchParams: { category?: string };
}

export async function generateMetadata({ searchParams }: GenerateMetadataProps): Promise<Metadata> {
    const categoryId = searchParams.category;

    return {
        title: 'KS Tech - Товари',
        description:
            'Перегляньте товари в магазині KS TECH. Ми пропонуємо різноманітні товари: металеві каркаси, ' +
            "модульні будинки, офіси, кав'ярні, приміщення для охорони, буржуйки, котли, пічки, обладнання для сільського господарства, " +
            'генератори та інші вироби з металу.',
        keywords: [
            'товари',
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
            title: 'KS Tech - Товари',
            description:
                'Перегляньте товари в магазині KS TECH. Ми пропонуємо різноманітні товари: металеві каркаси, ' +
                "модульні будинки, офіси, кав'ярні, приміщення для охорони, буржуйки, котли, пічки, обладнання для сільського господарства, " +
                'генератори та інші вироби з металу.',
            url: `https://kstech-frontend.vercel.app/catalog/subcatalog/products?id=${categoryId}`,
            siteName: 'KS Tech',
            images: [
                {
                    url: 'https://kstech-frontend.vercel.app/preview.jpg',
                    width: 640,
                    height: 336,
                    alt: 'Товари KS Tech',
                },
            ],
            locale: 'uk-UA',
            type: 'website',
        },
    };
}

const Products = dynamic(() => import('@/components/pages/catalog/products-page/Products'), {
    ssr: false,
});

const ProductsPage = () => {
    return (
        <>
            <Products />
        </>
    );
};

export default ProductsPage;
