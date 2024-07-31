import React, { FC } from 'react';
import Link from 'next/link';
import { priceConvert } from '@/utils/priceConvert';
import { discountPriceCalc } from '@/utils/discountPriceCalc';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
    img: string;
    name: string;
    categoryName?: string;
    price: string;
    discount: string;
    link: string;
    query?: string | null;
}

const ProductCard: FC<ProductCardProps> = ({
    img,
    name,
    categoryName,
    price,
    discount,
    link,
    query,
}) => {
    const discountCalc = priceConvert(discountPriceCalc(price, discount));
    const priceCalc = priceConvert(price);

    console.log(
        `Original Price: ${price}, Discount: ${discount}, Calculated Discount Price: ${discountCalc}`,
    );

    return (
        <li className={styles.listItem}>
            <Link
                href={{
                    pathname: link,
                    query: { id: query },
                }}
                className={styles.link}
            >
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
                    {discount != '0' ? (
                        <>
                            <div className={styles.discount}>{priceCalc} грн</div>
                            <div className={styles.price}>{discountCalc} грн</div>
                        </>
                    ) : (
                        <div className={styles.price}>{priceCalc} грн</div>
                    )}
                </div>
            </Link>
        </li>
    );
};

export default ProductCard;
