import { create } from 'zustand';
import ProductService from '@/api/services/ProductService';
import { AllProductResponseModel } from '@/api/models/ProductsModels';
import { AxiosResponse } from 'axios';

interface ProductStoreTypes {
    getProducts: (page: number) => Promise<AxiosResponse<AllProductResponseModel>>;
    searchProducts: (query: string) => Promise<AxiosResponse<AllProductResponseModel>>;
    getProductByCategory: (
        categoryId: string | null,
        page: number,
    ) => Promise<AxiosResponse<AllProductResponseModel>>;
    getProductBySubcategory: (
        categoryId: string | null,
        page: number,
    ) => Promise<AxiosResponse<AllProductResponseModel>>;
    getPopularProducts: (page: number) => Promise<AxiosResponse<AllProductResponseModel>>;
}

const useProductsStore = create<ProductStoreTypes>(set => ({
    getProducts: async (page: number) => {
        try {
            return await ProductService.getProductsList(page);
        } catch (error: any) {
            throw error;
        }
    },

    searchProducts: async (query: string) => {
        try {
            const page = parseInt(<string>localStorage.getItem('page')) || 1;
            return await ProductService.searchProducts(page, query);
        } catch (error: any) {
            throw error;
        }
    },

    getProductByCategory: async (categoryId: string | null, page: number) => {
        try {
            return await ProductService.getProductByCategory(categoryId, page);
        } catch (error: any) {
            throw error;
        }
    },

    getProductBySubcategory: async (categoryId: string | null, page: number) => {
        try {
            return await ProductService.getProductBySubcategory(categoryId, page);
        } catch (error: any) {
            throw error;
        }
    },

    getPopularProducts: async (page: number) => {
        try {
            return await ProductService.getPopularProducts(page);
        } catch (error: any) {
            throw error;
        }
    },
}));

export default useProductsStore;
