'use client';
import React from 'react';
import useProductsStore from '@/api/store/ProductStore';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

const MainPage = () => {
    const { getProducts } = useProductsStore();
    const searchParams = useSearchParams();

    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['products', currentPage],
        queryFn: () => getProducts(currentPage),
        select: data => data.data,
    });

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    };

    return (
        <div>
            <ul>{data?.products.map(product => <li key={product.id}>{product.name}</li>)}</ul>
            <div>
                {Array.from({ length: data?.totalPages || 1 }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        disabled={currentPage === i + 1}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MainPage;
