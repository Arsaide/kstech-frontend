export const discountPriceCalc = (
    price: string | number | undefined,
    discount: string | number | undefined,
) => {
    const parsedPrice = parseFloat(price as string);
    const parsedDiscount = parseFloat(discount as string);

    if (parsedDiscount >= 100) {
        return '0.00';
    }

    return (parsedPrice - (parsedPrice * parsedDiscount) / 100).toFixed(2);
};
