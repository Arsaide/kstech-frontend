import React, { FC } from 'react';
import Link from 'next/link';
import { priceConvert } from '@/utils/priceConvert';
import { discountPriceCalc } from '@/utils/discountPriceCalc';
import styles from './ProductByCategoryCard.module.scss';

interface ProductByCategoryCardProps {
    img: string;
    name: string;
    categoryName?: string;
    price: string;
    discount: string;
    link: string;
}

const ProductByCategoryCard: FC<ProductByCategoryCardProps> = ({
    img,
    name,
    categoryName,
    price,
    discount,
    link,
}) => {
    return (
        <li className={styles.listItem}>
            <Link href={link} className={styles.link}>
                <div className={styles.imgCnt}>
                    <img
                        className={styles.img}
                        src={img}
                        alt={`Зображення товару ${name} ${categoryName ? `категорії ${categoryName}` : null}`}
                    />
                </div>
                <div className={styles.name}>{name}</div>
                <div className={styles.divider} />
                <div className={styles.priceCnt}>
                    <div className={styles.discount}>
                        {priceConvert(discountPriceCalc(price, discount))} грн
                    </div>
                    <div className={styles.price}>{priceConvert(price)} грн</div>
                </div>
            </Link>
        </li>
    );
};

export default ProductByCategoryCard;
