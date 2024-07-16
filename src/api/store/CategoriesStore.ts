import { create } from 'zustand';
import CategoriesService from '@/api/services/CategoriesService';
import { CategoryResponseModel } from '@/api/models/CategoriesModels';
import { AxiosResponse } from 'axios';

interface CategoryStoreTypes {
    categories: CategoryResponseModel[] | null;
    getCategories: () => Promise<AxiosResponse<CategoryResponseModel[]>>;
}

const useCategoryStore = create<CategoryStoreTypes>(set => ({
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
