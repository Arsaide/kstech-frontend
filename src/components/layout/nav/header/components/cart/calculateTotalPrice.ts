import { discountPriceCalc } from '@/utils/discountPriceCalc';
import { OneProductTypes } from '@/api/models/ProductsModels';

type CartProduct = OneProductTypes & {
    quantity: number;
};

export const calculateTotalPrice = (cart: CartProduct[]) => {
    return cart.reduce((total, item) => {
        const itemPrice = parseFloat(discountPriceCalc(item.price, item.discount));
        return total + itemPrice * item.quantity;
    }, 0);
};
