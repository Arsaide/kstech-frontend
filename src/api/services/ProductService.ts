import { AxiosResponse } from 'axios';
import $api from '@/api/request';
import { AllProductResponseModel } from '@/api/models/ProductsModels';

export default class ProductService {
    static async getProductsList(
        page: number,
    ): Promise<AxiosResponse<AllProductResponseModel>> {
        return $api.get<AllProductResponseModel>(`/products/get?page=${page}`);
    }
}
