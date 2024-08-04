import React from 'react';
import Cart from '@/components/pages/cart-page/Cart';
import styles from './page.module.scss';

const CartPage = () => {
    return (
        <main className={styles.main}>
            <Cart />
        </main>
    );
};

export default CartPage;
