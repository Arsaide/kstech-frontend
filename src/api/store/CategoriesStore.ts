import { create } from 'zustand';
import CategoriesService from '@/api/services/CategoriesService';
import { CategoryResponseModel } from '@/api/models/CategoriesModels';
import { AxiosResponse } from 'axios';

interface CategoryStoreTypes {
    categoryId: string | null;
    setCategoryId: (categoryId: string | null) => void;
    categories: CategoryResponseModel[] | null;
    getCategories: () => Promise<AxiosResponse<CategoryResponseModel[]>>;
}

const useCategoryStore = create<CategoryStoreTypes>(set => ({
    categoryId: null,
    setCategoryId: id => set({ categoryId: id }),
    categories: null,

    getCategories: async () => {
        try {
            const response = await CategoriesService.getCategories();
            set({ categories: response.data });
            return response;
        } catch (error: any) {
            throw error;
        }
    },
}));

export default useCategoryStore;
