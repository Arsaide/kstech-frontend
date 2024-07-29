import { AxiosResponse } from 'axios';
import $api from '@/api/request';
import { CategoryResponseModel, GetOneCategoryResponseModel } from '@/api/models/CategoriesModels';

export default class CategoriesService {
    static async getCategories(): Promise<AxiosResponse<CategoryResponseModel[]>> {
        return $api.get<CategoryResponseModel[]>(`/category/getcategories`);
    }

    static async getOneCategory(
        id: string | null,
    ): Promise<AxiosResponse<GetOneCategoryResponseModel>> {
        return $api.get(`/category/getonecategory?id=${id}`);
    }
}
