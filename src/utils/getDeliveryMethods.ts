import { CartProduct } from '@/api/store/CartStore';

export const getDeliveryMethods = (cart: CartProduct[]): { value: string; label: string }[] => {
    if (cart.length === 0) return [];

    const deliveryMethods = cart.map(product => product.deliveryMethod).flat();
    const methodCounts = deliveryMethods.reduce(
        (acc, method) => {
            acc[method] = (acc[method] || 0) + 1;
            return acc;
        },
        {} as { [key: string]: number },
    );

    const commonMethods = Object.keys(methodCounts).filter(
        method => methodCounts[method] === cart.length,
    );

    return commonMethods.map(method => ({ value: method, label: method }));
};
