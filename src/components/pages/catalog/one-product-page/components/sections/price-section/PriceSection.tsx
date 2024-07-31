import React, { FC } from 'react';
import { OneProductTypes } from '@/api/models/ProductsModels';
import styles from './PriceSection.module.scss';
import { priceConvert } from '@/utils/priceConvert';
import { discountPriceCalc } from '@/utils/discountPriceCalc';

interface PriceSectionProps {
    data: OneProductTypes | undefined;
}

const PriceSection: FC<PriceSectionProps> = ({ data }) => {
    const discountCalc = priceConvert(discountPriceCalc(data?.price, data?.discount));
    const priceCalc = priceConvert(data?.price);

    return (
        <div className={styles.pricesContent}>
            {data?.discount == '0' ? (
                <>
                    <div className={styles.price}>{priceCalc} грн</div>
                </>
            ) : (
                <div className={styles.priceCnt}>
                    <div className={styles.price}>{discountCalc} грн</div>
                    <div className={styles.discount}>{priceCalc} грн</div>
                </div>
            )}
            <div className={styles.productHint}>
                Код товару:{' '}
                <button onClick={() => navigator.clipboard.writeText(data?.article as string)}>
                    {data?.article}
                </button>
            </div>
        </div>
    );
};

export default PriceSection;
