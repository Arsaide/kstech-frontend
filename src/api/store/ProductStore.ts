import { create } from 'zustand';
import ProductService from '@/api/services/ProductService';
import { AllProductResponseModel } from '@/api/models/ProductsModels';
import { AxiosResponse } from 'axios';

interface ProductStoreTypes {
    products: AllProductResponseModel | null;
    getProducts: (page: number) => Promise<void>;
    searchProducts: (query: string) => Promise<AxiosResponse<AllProductResponseModel>>;
}

const useProductsStore = create<ProductStoreTypes>(set => ({
    products: null,

    getProducts: async (page: number) => {
        try {
            const response = await ProductService.getProductsList(page);
            set({ products: response.data });
        } catch (error: any) {
            throw error;
        }
    },

    searchProducts: async (query: string) => {
        try {
            const page = parseInt(<string>localStorage.getItem('page')) || 1;
            const response = await ProductService.searchProducts(page, query);
            return response;
        } catch (error: any) {
            throw error;
        }
    },
}));

export default useProductsStore;
