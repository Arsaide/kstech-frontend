import React, { FC } from 'react';
import { OneProductTypes } from '@/api/models/ProductsModels';
import styles from './CharacteristicsSection.module.scss';

interface CharacteristicsSectionProps {
    data: OneProductTypes | undefined;
}

const CharacteristicsSection: FC<CharacteristicsSectionProps> = ({ data }) => {
    return (
        <div className={styles.cnt} id={'characteristics'}>
            <h4 className={styles.title}>Основні характеристики</h4>
            <div className={styles.content}>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <div className={styles.cell}>Ширина</div>
                        <div className={styles.line} />
                        <div className={styles.cell}>{data?.width}</div>
                    </li>
                    <li className={styles.item}>
                        <div className={styles.cell}>Висота</div>
                        <div className={styles.line} />
                        <div className={styles.cell}>{data?.height}</div>
                    </li>
                    <li className={styles.item}>
                        <div className={styles.cell}>Довжина</div>
                        <div className={styles.line} />
                        <div className={styles.cell}>{data?.long}</div>
                    </li>
                    <li className={styles.item}>
                        <div className={styles.cell}>Вага</div>
                        <div className={styles.line} />
                        <div className={styles.cell}>{data?.weight}</div>
                    </li>
                    <li className={styles.item}>
                        <div className={styles.cell}>Країна виробник</div>
                        <div className={styles.line} />
                        <div className={styles.cell}>{data?.country}</div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default CharacteristicsSection;
