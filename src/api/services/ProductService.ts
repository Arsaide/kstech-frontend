import {AxiosResponse} from 'axios';
import $api from '@/api/request';
import {
    AllProductResponseModel,
    OneProductResponseModel,
    OneProductTypes,
    OrderTypes,
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

    static async getProduct(id: string | null): Promise<AxiosResponse<OneProductResponseModel>> {
        return await $api.get<OneProductResponseModel>(`/products/getone?id=${id}`);
    }

    static async buy(
        products: OneProductTypes[],
        order: number,
        clientName: string,
        surname: string,
        number: string,
        email: string,
        feedback: boolean,
        country: string,
        town: string,
        street: string,
        deliveryMethod: string,
        office?: string,
        comment?: string,
    ): Promise<AxiosResponse<OrderTypes>> {
        const data = {
            products: products.map(item => ({
                id: item.id,
                name: item.name,
                article: item.article,
            })),
            client: {
                order,
                clientName,
                surname,
                number,
                email,
                feedback,
                country,
                town,
                street,
                deliveryMethod,
                office,
                comment,
            },
        };

        return $api.post('/products/buy', data);
    }
}
