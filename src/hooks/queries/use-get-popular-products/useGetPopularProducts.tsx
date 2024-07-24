import { useQuery } from '@tanstack/react-query';
import useProductsStore from '@/api/store/ProductStore';

interface GetPopularProductsProps {
    page: number;
}

export const useGetPopularProducts = ({ page }: GetPopularProductsProps) => {
    const { getPopularProducts } = useProductsStore();

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['popularProducts'],
        queryFn: () => getPopularProducts(page),
        select: data => data.data,
    });

    return { isLoading, isError, error, data };
};
