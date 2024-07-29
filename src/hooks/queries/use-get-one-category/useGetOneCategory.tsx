import { useQuery } from '@tanstack/react-query';
import useCategoryStore from '@/api/store/CategoriesStore';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const useGetOneCategory = (id: string | null) => {
    const { getOneCategory } = useCategoryStore();

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['get-one-category', id],
        queryFn: () => getOneCategory(id),
        select: data => data.data,
    });

    return {
        isLoading,
        isError,
        error,
        data,
    };
};
