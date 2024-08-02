import { useQuery } from '@tanstack/react-query';
import useCategoryStore from '@/api/store/CategoriesStore';

export const useGetSubcategories = (id: null | string) => {
    const { getOneCategory } = useCategoryStore();
    const { data, isLoading, isSuccess, isError, error } = useQuery({
        queryKey: ['subcategories', id],
        queryFn: () => getOneCategory(id),
        select: data => data.data.subcategory,
        enabled: id != null,
    });

    return { isLoading, isError, isSuccess, error, data };
};
