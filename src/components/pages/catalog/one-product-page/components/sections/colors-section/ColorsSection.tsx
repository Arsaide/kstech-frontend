import React, { FC } from 'react';
import { OneProductTypes } from '@/api/models/ProductsModels';
import styles from './ColorsSection.module.scss';

interface ColorsSectionProps {
    data: OneProductTypes | undefined;
}

const ColorsSection: FC<ColorsSectionProps> = ({ data }) => {
    return (
        <div className={styles.colorsContent}>
            <h4 className={styles.colorTitle}>Колір виробу:</h4>
            <ul className={styles.colors}>
                {data?.colors.map((item, index) => (
                    <li
                        key={index}
                        style={{
                            backgroundColor: item,
                            border:
                                item === '#ffffff' || 'rgb(255,255,255)'
                                    ? '2px solid #333'
                                    : undefined,
                        }}
                        className={styles.colorItem}
                    />
                ))}
            </ul>
        </div>
    );
};

export default ColorsSection;
