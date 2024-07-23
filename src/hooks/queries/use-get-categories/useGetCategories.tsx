import { useQuery } from '@tanstack/react-query';
import useCategoryStore from '@/api/store/CategoriesStore';

export const useGetCategories = () => {
    const { getCategories } = useCategoryStore();
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
        select: data => data.data,
    });

    return { isLoading, isError, error, data };
};
