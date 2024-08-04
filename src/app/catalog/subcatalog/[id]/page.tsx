import React from 'react';
import { Metadata } from 'next';
import OneProduct from '@/components/pages/catalog/one-product-page/OneProduct';
import ProductService from '@/api/services/ProductService';

type Props = {
    params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = params;

    const product = await ProductService.getProduct(id);

    return {
        title: product.data.product.name,
        description:
            `Перегляньте наш товар ${product.data.product.name}, каталогу ${product.data.product.categoryName} та 
             категорії ${product.data.product.subcategoryName} в магазині KS TECH. Ми пропонуємо вам різноманітні товари: металеві каркаси, ` +
            "модульні будинки, офіси, кав'ярні, приміщення для охорони, буржуйки, котли, пічки, обладнання для сільського господарства, " +
            'генератори та інші вироби з металу.',
        keywords: [
            `${product.data.product.name}`,
            `${product.data.product.categoryName}`,
            `${product.data.product.subcategoryName}`,
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
            title: `KS Tech товар - ${product.data.product.name}`,
            description:
                `Перегляньте наш товар ${product.data.product.name}, каталогу ${product.data.product.categoryName} та 
             категорії ${product.data.product.subcategoryName} в магазині KS TECH. Ми пропонуємо вам різноманітні товари: металеві каркаси, ` +
                "модульні будинки, офіси, кав'ярні, приміщення для охорони, буржуйки, котли, пічки, обладнання для сільського господарства, " +
                'генератори та інші вироби з металу.',
            url: `https://kstech-frontend.vercel.app/catalog/subcatalog/${id}`,
            siteName: 'KS Tech',
            images: [
                {
                    url: 'https://kstech-frontend.vercel.app/preview.jpg',
                    width: 640,
                    height: 336,
                    alt: `Товар ${product.data.product.name}. KS Tech`,
                },
            ],
            locale: 'uk-UA',
            type: 'website',
        },
    };
}

const ProductPage = ({ params: { id } }: Props) => {
    return (
        <>
            <OneProduct id={id} />
        </>
    );
};

export default ProductPage;
