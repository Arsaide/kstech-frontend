import ReactPixel from 'react-facebook-pixel';

export const trackAddToCart = (productId: string, productName: string, price: string) => {
    ReactPixel.track('AddToCart', {
        content_name: productName,
        content_ids: [productId],
        content_type: 'Товар',
        value: price,
        currency: 'UAH',
    });
};
