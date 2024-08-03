import React from 'react';
import styles from './CartMenu.module.scss';
import useCartStore from '@/api/store/CartStore';
import CartProduct from '@/components/layout/nav/header/components/cart-menu/components/cart-product/CartProduct';
import { calculateTotalPrice } from '@/utils/calculateTotalPrice';
import { priceConvert } from '@/utils/priceConvert';
import { useRouter } from 'next/navigation';
import useCategoryStore from '@/api/store/CategoriesStore';

const CartMenu = () => {
    const router = useRouter();
    const cart = useCartStore(state => state.cart);
    const { setIsOpenCart } = useCategoryStore();
    const removeProduct = useCartStore(state => state.removeProduct);
    const increaseQuantity = useCartStore(state => state.increaseQuantity);
    const decreaseQuantity = useCartStore(state => state.decreaseQuantity);

    const totalPrice = calculateTotalPrice(cart);

    return (
        <div className={styles.content}>
            <div className={styles.cnt}>
                <ul className={styles.list}>
                    {cart.map(item => (
                        <CartProduct
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
                <div className={styles.info}>
                    <span>Разом:</span>
                    <span>{priceConvert(totalPrice.toFixed(2))} грн</span>
                </div>
                <div className={styles.btnCnt}>
                    <button
                        disabled={cart.length <= 0}
                        className={styles.btn}
                        onClick={() => {
                            router.push('/cart');
                            setIsOpenCart(false);
                        }}
                    >
                        {cart.length > 0 ? 'Оформити замовлення' : 'Немає товарів'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartMenu;
