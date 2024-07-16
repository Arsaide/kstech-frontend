import { create } from 'zustand';
import ProductService from '@/api/services/ProductService';
import { AllProductResponseModel } from '@/api/models/ProductsModels';

interface ProductStoreTypes {
    products: AllProductResponseModel | null;
    getProducts: (page: number) => Promise<void>;
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
}));

export default useProductsStore;
