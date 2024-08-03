import { create } from 'zustand';
import CategoriesService from '@/api/services/CategoriesService';
import { CategoryResponseModel, GetOneCategoryResponseModel } from '@/api/models/CategoriesModels';
import { AxiosResponse } from 'axios';
import { SetStateAction } from 'react';

interface CategoryStoreTypes {
    categoryId: string | null;
    setCategoryId: (categoryId: string | null) => void;
    isOpenCategories: boolean;
    isOpenCart: boolean;
    setIsOpenCategories: (isOpenCategories: SetStateAction<boolean>) => void;
    setIsOpenCart: (isOpenCart: SetStateAction<boolean>) => void;
    categories: CategoryResponseModel[] | null;
    getCategories: () => Promise<AxiosResponse<CategoryResponseModel[]>>;
    getOneCategory: (id: string | null) => Promise<AxiosResponse<GetOneCategoryResponseModel>>;
}

const useCategoryStore = create<CategoryStoreTypes>(set => ({
    categoryId: null,
    setCategoryId: id => set({ categoryId: id }),
    categories: null,

    isOpenCategories: false,
    setIsOpenCategories: isOpenCategories =>
        set(state => ({
            isOpenCategories:
                typeof isOpenCategories === 'function'
                    ? isOpenCategories(state.isOpenCategories)
                    : isOpenCategories,
        })),

    isOpenCart: true,
    setIsOpenCart: isOpenCart =>
        set(state => ({
            isOpenCategories:
                typeof isOpenCart === 'function' ? isOpenCart(state.isOpenCategories) : isOpenCart,
        })),

    getCategories: async () => {
        try {
            const response = await CategoriesService.getCategories();
            set({ categories: response.data });
            return response;
        } catch (error: any) {
            throw error;
        }
    },

    getOneCategory: async (id: string | null) => {
        try {
            const response = await CategoriesService.getOneCategory(id);
            return response;
        } catch (error: any) {
            throw error;
        }
    },
}));

export default useCategoryStore;
