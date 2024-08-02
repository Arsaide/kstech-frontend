import { useMutation } from '@tanstack/react-query';
import useProductsStore from '@/api/store/ProductStore';

export const useMutateSearch = (searchProductInput: string) => {
    const { searchProducts } = useProductsStore();

    const { mutate, isPending } = useMutation({
        mutationKey: ['search', searchProductInput],
        mutationFn: (query: string) => searchProducts(query),
    });

    return { mutate, isPending };
};
