'use client';
import React, { useEffect } from 'react';
import useProductsStore from '@/api/store/ProductStore';

const ProductsList = () => {
    const { products, getProducts } = useProductsStore();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await getProducts(1);
            } catch (e: any) {
                console.log('error', e);
            }
        };

        fetchProducts();
    }, [getProducts]);

    if (!products) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            qwe
            {products.products.map(product => (
                <div key={product.id}>{product.name}</div>
            ))}
        </div>
    );
};

export default ProductsList;
