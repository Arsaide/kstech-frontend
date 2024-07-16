import { AxiosResponse } from 'axios';
import $api from '@/api/request';
import { CategoryResponseModel } from '@/api/models/CategoriesModels';

export default class CategoriesService {
    static async getCategories(): Promise<
        AxiosResponse<CategoryResponseModel[]>
    > {
        return $api.get<CategoryResponseModel[]>(`/category/getcategories`);
    }
}
