export const priceConvert = (price: string | number | undefined) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
