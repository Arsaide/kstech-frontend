'use client';
import React from 'react';
import styles from './Cart.module.scss';
import Breadcrumbs from '@/components/layout/nav/breadcrubms/Breadcrumbs';
import CartItem from '@/components/pages/cart-page/components/cart-item/CartItem';
import useCartStore from '@/api/store/CartStore';
import { calculateTotalPrice } from '@/utils/calculateTotalPrice';
import { priceConvert } from '@/utils/priceConvert';
import CartForm from '@/components/pages/cart-page/components/cart-form/CartForm';

const Cart = () => {
    const breadcrumbsItems = [{ label: 'Кошик' }];

    const cart = useCartStore(state => state.cart);
    const removeProduct = useCartStore(state => state.removeProduct);
    const increaseQuantity = useCartStore(state => state.increaseQuantity);
    const decreaseQuantity = useCartStore(state => state.decreaseQuantity);

    const totalPrice = calculateTotalPrice(cart);

    return (
        <section className={styles.cart}>
            <div className={styles.cnt}>
                <Breadcrumbs items={breadcrumbsItems} />
                <div className={styles.content}>
                    <div className={styles.cartContent}>
                        <ul className={styles.list}>
                            {cart.map(item => (
                                <CartItem
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    imgArr={item.imgArr}
                                    price={item.price}
                                    discount={item.discount}
                                    quantity={item.quantity}
                                    removeProduct={removeProduct}
                                    increaseQuantity={increaseQuantity}
                                    decreaseQuantity={decreaseQuantity}
                                />
                            ))}
                        </ul>
                        <div className={styles.prices}>
                            <h6 className={styles.sumName}>Сума замовлення</h6>
                            <span>{priceConvert(totalPrice.toFixed(2))} грн</span>
                        </div>
                    </div>
                    <div className={styles.formContent}>
                        <CartForm order={parseFloat(totalPrice.toFixed(2))} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;
