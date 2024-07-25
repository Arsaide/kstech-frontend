import React, { FC } from 'react';
import { priceConvert } from '@/utils/priceConvert';
import { discountPriceCalc } from '@/utils/discountPriceCalc';
import { AllProductResponseModel } from '@/api/models/ProductsModels';
import styles from './ProductsListByCategory.module.scss';
import Link from 'next/link';
import ProductCard from '@/components/layout/ui/product-card/ProductCard';

interface ProductsListProps {
    categoryName: string;
    productsArr: AllProductResponseModel | undefined;
    link: string;
}

const ProductsListByCategory: FC<ProductsListProps> = ({ categoryName, productsArr, link }) => {
    if (productsArr?.products.length == 0) {
        return null;
    }

    return (
        <div className={styles.category}>
            <div className={styles.info}>
                <h6 className={styles.infoName}>{categoryName}</h6>
                <Link className={styles.infoLink} href={link}>
                    Показати всі
                </Link>
            </div>
            <ul className={styles.list}>
                {productsArr &&
                    productsArr?.products
                        .slice(0, 5)
                        .map(product => (
                            <ProductCard
                                key={product.id}
                                name={product.name}
                                img={product.imgArr[0]}
                                categoryName={categoryName}
                                price={product.price}
                                discount={product.discount}
                                link={''}
                            />
                        ))}
            </ul>
            <div className={styles.btnCnt}>
                <Link className={styles.btn} href={link}>
                    Показати більше
                </Link>
            </div>
        </div>
    );
};

export default ProductsListByCategory;
