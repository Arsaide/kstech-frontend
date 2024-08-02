import React, { FC, useState } from 'react';
import Link from 'next/link';
import { priceConvert } from '@/utils/priceConvert';
import { discountPriceCalc } from '@/utils/discountPriceCalc';
import styles from './ProductCard.module.scss';
import classNames from 'classnames';

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
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const discountCalc = priceConvert(discountPriceCalc(price, discount));
    const priceCalc = priceConvert(price);

    return (
        <li
            className={styles.listItem}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
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
            {isHovered && (
                <div className={styles.buy}>
                    <button className={classNames(styles.buyBtn)}>Купити</button>
                </div>
            )}
        </li>
    );
};

export default ProductCard;
