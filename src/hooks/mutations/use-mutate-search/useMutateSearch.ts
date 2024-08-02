import { useMutation } from '@tanstack/react-query';
import useProductsStore from '@/api/store/ProductStore';

export const useMutateSearch = (searchProductInput: string, page: number) => {
    const { searchProducts } = useProductsStore();

    const { data, mutate, isPending, isError } = useMutation({
        mutationKey: ['search', searchProductInput],
        mutationFn: (query: string) => searchProducts(query, page),
    });

    return { data, mutate, isPending, isError };
};
