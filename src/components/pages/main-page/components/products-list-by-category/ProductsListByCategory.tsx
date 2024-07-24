import React, { FC } from 'react';
import { priceConvert } from '@/utils/priceConvert';
import { discountPriceCalc } from '@/utils/discountPriceCalc';
import { AllProductResponseModel } from '@/api/models/ProductsModels';
import styles from './ProductsListByCategory.module.scss';
import Link from 'next/link';

interface ProductsListProps {
    categoryName: string;
    productsArr: AllProductResponseModel | undefined;
}

const ProductsListByCategory: FC<ProductsListProps> = ({ categoryName, productsArr }) => {
    if (productsArr?.products.length == 0) {
        return null;
    }

    return (
        <div className={styles.category}>
            <div className={styles.info}>
                <h6 className={styles.infoName}>{categoryName}</h6>
                <Link className={styles.infoLink} href={''}>
                    Показати всі
                </Link>
            </div>
            <ul className={styles.list}>
                {productsArr &&
                    productsArr?.products.slice(0, 5).map(product => (
                        <li key={product.id} className={styles.listItem}>
                            <Link href={''} className={styles.link}>
                                <div className={styles.imgCnt}>
                                    <img
                                        className={styles.img}
                                        src={product.imgArr[0]}
                                        alt={`Зображення товару ${product.name} категорії ${categoryName}`}
                                    />
                                </div>
                                <div className={styles.name}>{product.name}</div>
                                <div className={styles.divider} />
                                <div className={styles.priceCnt}>
                                    <div className={styles.discount}>
                                        {priceConvert(
                                            discountPriceCalc(product.price, product.discount),
                                        )}{' '}
                                        грн
                                    </div>
                                    <div className={styles.price}>
                                        {priceConvert(product.price)} грн
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
            </ul>
            <div className={styles.btnCnt}>
                <Link className={styles.btn} href={'/products-by-category'}>
                    Показати більше
                </Link>
            </div>
        </div>
    );
};

export default ProductsListByCategory;
