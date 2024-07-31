import React, { FC } from 'react';
import { OneProductTypes } from '@/api/models/ProductsModels';
import classNames from 'classnames';
import styles from './ProductInfoSection.module.scss';
import { Ban, Check, History } from 'lucide-react';

interface ProductInfoSectionProps {
    data: OneProductTypes | undefined;
}

const ProductAdaptiveInfoSection: FC<ProductInfoSectionProps> = ({ data }) => {
    return (
        <div className={styles.textContentAdaptive}>
            <h2 className={styles.title}>{data?.name}</h2>
            <div className={styles.availabilityContent}>
                <div
                    className={classNames(styles.availabilityCnt, {
                        [styles.isAvailability]: data?.inAvailability === 'В наявності',
                        [styles.isOrder]: data?.inAvailability === 'Під замовлення',
                        [styles.isNotAvailability]: data?.inAvailability === 'Немає в наявності',
                        [styles.undefinedAvailability]: ![
                            'В наявності',
                            'Під замовлення',
                            'Немає в наявності',
                        ].includes(data?.inAvailability as string),
                    })}
                >
                    {data?.inAvailability === 'В наявності' ? (
                        <>
                            <Check size={25} />В наявності
                        </>
                    ) : data?.inAvailability === 'Під замовлення' ? (
                        <>
                            <History size={20} /> Під замовлення
                        </>
                    ) : data?.inAvailability === 'Немає в наявності' ? (
                        <>
                            <Ban size={20} /> Немає в наявності
                        </>
                    ) : (
                        <>
                            <Ban size={20} /> data?.inAvailability
                        </>
                    )}
                </div>
                {data?.inAvailability === 'Під замовлення' && (
                    <p className={styles.term}>Термін виготовлення: 7-14 днів</p>
                )}
            </div>
        </div>
    );
};

export default ProductAdaptiveInfoSection;
