export interface CategoryResponseModel {
    id: string;
    category: string;
    iconImg: string;
    mainImg: string;
}

export interface GetOneCategoryResponseModel {
    category: CategoryResponseModel;
    subcategory: SubcategoryResponseModel[];
}

export interface SubcategoryResponseModel {
    id: string;
    iconImg: string;
    mainImg: string;
    subcategory: string;
}
