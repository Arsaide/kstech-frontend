import { useQuery } from '@tanstack/react-query';
import useProductsStore from '@/api/store/ProductStore';

interface GetProductsByCategoryProps {
    categoryId: string | null;
    page: number;
}

export const useGetProductsByCategory = ({ categoryId, page }: GetProductsByCategoryProps) => {
    const { getProductByCategory } = useProductsStore();

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['get-products-page-by-category', categoryId],
        queryFn: () => getProductByCategory(categoryId, page),
        select: data => data.data,
    });

    return { isLoading, isError, error, data };
};
