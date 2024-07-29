export interface AllProductResponseModel {
    products: OneProductTypes[];
    totalPages: number;
    Category: CategoryTypes;
    Subcategory: SubcategoryTypes;
}

interface CategoryTypes {
    category: string;
    id: string;
}

interface SubcategoryTypes {
    subcategory: string;
    id: string;
}

export interface OneProductResponseModel {
    product: OneProductTypes;
}

export interface OneProductResponseModelForRender {
    product: OneProductForRenderTypes;
}

export interface OneProductTypes {
    id: string;
    name: string;
    imgArr: string[];
    oldImgArr: string[];
    colors: string[];
    description: string;
    price: string;
    discount: string;
    inAvailability: string;
    category: string;
    categoryName: string;
    subcategory: string;
    subcategoryName: string;
    weight: string;
    height: string;
    width: string;
    long: string;
    deliveryMethod: string[];
    turningMethod: string[];
    paymentMethod: string[];
    article: string;
}

export interface OneProductForRenderTypes {
    id: string;
    name: string;
    imgArr: string[];
    oldImgArr: string[];
    colors: string[];
    description: string;
    price: string;
    discount: string;
    inAvailability: string;
    category: string;
    subcategory: string;
    weight: string;
    height: string;
    width: string;
    long: string;
    deliveryMethod: string[];
    turningMethod: string;
    paymentMethod: string[];
    article: string;
}
