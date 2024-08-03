import React, { FC } from 'react';
import styles from './CartItem.module.scss';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { priceConvert } from '@/utils/priceConvert';
import { discountPriceCalc } from '@/utils/discountPriceCalc';

interface CartItemProps {
    id: string;
    name: string;
    imgArr: string[];
    price: string;
    discount: string;
    quantity: number;
    removeProduct: (id: string) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
}

const CartItem: FC<CartItemProps> = ({
    id,
    name,
    imgArr,
    price,
    discount,
    quantity,
    removeProduct,
    increaseQuantity,
    decreaseQuantity,
}) => {
    return (
        <li className={styles.item}>
            <div className={styles.top}>
                <Trash2 className={styles.icon} onClick={() => removeProduct(id)} />
                <div className={styles.imgCnt}>
                    <img
                        src={imgArr[0]}
                        alt={`Зображення товару ${name} в кошик`}
                        className={styles.img}
                    />
                </div>
                <div className={styles.info}>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.price}>
                        {priceConvert(
                            (parseFloat(discountPriceCalc(price, discount)) * quantity).toFixed(2),
                        )}{' '}
                        грн
                    </div>
                </div>
            </div>
            <div className={styles.bot}>
                <div className={styles.tools}>
                    <div className={styles.counter}>
                        <button
                            className={styles.countBtn}
                            onClick={() => decreaseQuantity(id)}
                            disabled={quantity === 1}
                        >
                            <Minus size={12} />
                        </button>
                        <span className={styles.quantity}>{quantity}</span>
                        <button
                            className={styles.countBtn}
                            onClick={() => increaseQuantity(id)}
                            disabled={quantity >= 50}
                        >
                            <Plus size={12} />
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default CartItem;
