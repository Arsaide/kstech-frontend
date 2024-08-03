import React from 'react';
import { OneProductTypes } from '@/api/models/ProductsModels';
import useCartStore from '@/api/store/CartStore';
import styles from '@/components/pages/catalog/one-product-page/OneProduct.module.scss';

const AddToCartBtn: React.FC<{ product: OneProductTypes }> = ({ product }) => {
    const addProduct = useCartStore(state => state.addProduct);
    const getQuantityById = useCartStore(state => state.getQuantityById);
    const quantity = getQuantityById(product.id);

    return (
        <>
            <button className={styles.buyBtn} onClick={() => addProduct(product)}>
                <div className={styles.cartIconCnt}>
                    <img
                        className={styles.cartIcon}
                        src={'/icons/cart-menu-page-icon.svg'}
                        alt={'Іконка кошику'}
                    />
                </div>
                {quantity > 0 ? 'Додати ще' : 'Додати в коршик'}
            </button>
            {quantity > 0 && (
                <span className={styles.quantity}>В кошику {quantity} шт. товару</span>
            )}
        </>
    );
};

export default AddToCartBtn;