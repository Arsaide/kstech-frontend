import exp from 'node:constants';

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
    country: string;
    deliveryMethod: string[];
    turningMethod: string[];
    paymentMethod: string[];
    article: string;
}

export interface OrderTypes {
    product: OneProductTypes[];

    order: number;
    clientName: string;
    surname: string;
    number: string;
    email: string;
    feedback: boolean;
    country: string;
    town: string;
    street: string;
    office?: string;
    comment?: string;
}
