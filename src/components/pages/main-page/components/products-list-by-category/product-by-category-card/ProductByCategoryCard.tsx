import React, { FC, useState } from 'react';
import Link from 'next/link';
import { priceConvert } from '@/utils/priceConvert';
import { discountPriceCalc } from '@/utils/discountPriceCalc';
import styles from './ProductByCategoryCard.module.scss';
import classNames from 'classnames';
import useCartStore from '@/api/store/CartStore';
import { OneProductTypes } from '@/api/models/ProductsModels';

interface ProductByCategoryCardProps {
    product: OneProductTypes;
    link: string;
}

const ProductByCategoryCard: FC<ProductByCategoryCardProps> = ({ product, link }) => {
    const addProduct = useCartStore(state => state.addProduct);
    const getQuantityById = useCartStore(state => state.getQuantityById);
    const quantity = getQuantityById(product.id);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const discountCalc = priceConvert(discountPriceCalc(product.price, product.discount));
    const priceCalc = priceConvert(product.price);

    return (
        <li
            className={styles.listItem}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={link} className={styles.link}>
                <div className={styles.imgCnt}>
                    <img
                        className={styles.img}
                        src={product.imgArr[0]}
                        alt={`Зображення товару ${product.name} ${product.categoryName ? `категорії ${product.categoryName}` : null}`}
                    />
                </div>
                <div className={styles.name}>{product.name}</div>
                <div className={styles.divider} />
                <div className={styles.priceCnt}>
                    {product.discount != '0' ? (
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
                    <button
                        onClick={() => addProduct(product)}
                        className={classNames(styles.buyBtn)}
                    >
                        {quantity > 0 ? 'Додати ще' : 'Додати в кошик'}
                    </button>
                </div>
            )}
        </li>
    );
};

export default ProductByCategoryCard;
