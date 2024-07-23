export const discountPriceCalc = (price: string | number, discount: string | number) => {
    return (
        parseFloat(price as string) -
        (parseFloat(price as string) * parseFloat(discount as string)) / 100
    ).toFixed(2);
};
