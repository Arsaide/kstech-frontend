import { useQuery } from '@tanstack/react-query';
import useProductsStore from '@/api/store/ProductStore';

export const useGetProduct = (id: string | null) => {
    const { getProduct } = useProductsStore();

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['get-product', id],
        queryFn: () => getProduct(id),
        select: data => data.data.product,
    });

    return { isLoading, isError, error, data };
};
