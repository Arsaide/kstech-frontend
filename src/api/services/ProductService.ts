import { AxiosResponse } from 'axios';
import $api from '@/api/request';
import {
    AllProductResponseModel,
    OneProductResponseModel,
    OneProductTypes,
} from '@/api/models/ProductsModels';

export default class ProductService {
    static async getProductsList(page: number): Promise<AxiosResponse<AllProductResponseModel>> {
        return $api.get<AllProductResponseModel>(`/products/get?page=${page}`);
    }

    static async getProductByCategory(
        categoryId: string | null,
        page: number,
    ): Promise<AxiosResponse<AllProductResponseModel>> {
        return $api.get<AllProductResponseModel>(
            `/products/getforcategory?category=${categoryId}&page=${page}`,
        );
    }

    static async getProductBySubcategory(
        categoryId: string | null,
        page: number,
    ): Promise<AxiosResponse<AllProductResponseModel>> {
        return $api.get<AllProductResponseModel>(
            `/products/getforsubcategory?subcategory=${categoryId}&page=${page}`,
        );
    }

    static async searchProducts(
        page: number,
        query: string,
    ): Promise<AxiosResponse<AllProductResponseModel>> {
        return $api.get<AllProductResponseModel>(`/products/search?page=${page}&query=${query}`);
    }

    static async getPopularProducts(page: number): Promise<AxiosResponse<AllProductResponseModel>> {
        return $api.get<AllProductResponseModel>(`/products/getforpromotions?page=${page}`);
    }

    static async getProduct(id: null | string): Promise<AxiosResponse<OneProductResponseModel>> {
        return $api.get<OneProductResponseModel>(`/products/getone?id=${id}`);
    }
}
