export const discountPriceCalc = (
    price: string | number | undefined,
    discount: string | number | undefined,
) => {
    const parsedPrice = parseFloat(price as string);
    const parsedDiscount = parseFloat(discount as string);

    if (parsedDiscount >= 100) {
        return '0.00';
    }

    const calc = (parsedPrice - (parsedPrice * parsedDiscount) / 100).toFixed(2);

    console.log(`Price: ${parsedPrice}, Discount: ${parsedDiscount}, Calculated Price: ${calc}`);

    return calc;
};
