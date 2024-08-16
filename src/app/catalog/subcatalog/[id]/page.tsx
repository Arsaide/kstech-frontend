'use server';
import React from 'react';
import {Metadata, ResolvingMetadata} from 'next';
import dynamic from "next/dynamic";

const OneProduct = dynamic(() => import('@/components/pages/catalog/one-product-page/OneProduct'), {
    ssr: false,
});


type Props = {
    params: { id: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    try {
        const id = params.id;
        const product = await fetch(`${process.env.NGINX_API_URL}/products/getone?id=${id}`).then((res) => res.json());
        if (!product.product) {
            throw new Error('Product data isnt available');
        }
        const productData = product.product;
        const parentMetadata = await parent;

        return {
            title: productData.name || parentMetadata?.title,
            description:
                `Перегляньте наш товар ${productData.name}, каталогу ${productData.categoryName} та 
             категорії ${productData.subcategoryName} в магазині KS TECH. Ми пропонуємо вам різноманітні товари: металеві каркаси, ` +
                "модульні будинки, офіси, кав'ярні, приміщення для охорони, буржуйки, котли, пічки, обладнання для сільського господарства, " +
                'генератори та інші вироби з металу.',
            keywords: [
                `${productData.name}`,
                `${productData.categoryName}`,
                `${productData.subcategoryName}`,
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
                ...parentMetadata?.openGraph,
                title: `KS Tech товар - ${productData.name}`,
                description:
                    `Перегляньте наш товар ${productData.name}, каталогу ${productData.categoryName} та 
             категорії ${productData.subcategoryName} в магазині KS TECH. Ми пропонуємо вам різноманітні товари: металеві каркаси, ` +
                    "модульні будинки, офіси, кав'ярні, приміщення для охорони, буржуйки, котли, пічки, обладнання для сільського господарства, " +
                    'генератори та інші вироби з металу.',
                url: `https://kstech-frontend.vercel.app/catalog/subcatalog/${id}`,
                siteName: 'KS Tech',
                images: [
                    {
                        url: productData.imgArr[0] || 'https://kstech-frontend.vercel.app/preview.jpg',
                        width: 640,
                        height: 336,
                        alt: `Товар ${productData.name}. KS Tech`,
                    },
                ],
                locale: 'uk-UA',
                type: 'website',
            },
        };
    } catch (error) {
        return {
            title: 'Товара немає',
            description: 'Інформація недоступна',
        };
    }
}

const ProductPage = ({ params: { id } }: Props) => {
    return (
        <>
            <OneProduct id={id} />
        </>
    );
};

export default ProductPage;
