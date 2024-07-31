import React, { FC } from 'react';
import styles from './ServiceSection.module.scss';
import Accordion from '@/components/ui/accordion/Accordion';

interface ServiceSectionProps {
    title: string;
    iconSrc: string;
    iconAlt: string;
    items: string[] | undefined;
    ItemComponent?: React.ComponentType<{ method: string }>;
}

const ServiceSection: FC<ServiceSectionProps> = ({
    title,
    iconSrc,
    iconAlt,
    items,
    ItemComponent,
}) => (
    <>
        <div className={styles.service}>
            <h5 className={styles.listTitle}>
                <img src={iconSrc} className={styles.icon} alt={iconAlt} /> {title}
            </h5>
            <ul className={styles.list}>
                {items?.map((item, index) => (
                    <li key={index} className={styles.item}>
                        {ItemComponent && <ItemComponent method={item} />}
                        {item}
                    </li>
                ))}
            </ul>
        </div>
        <Accordion title={title} img={iconSrc} alt={iconAlt}>
            <ul className={styles.list}>
                {items?.map((item, index) => (
                    <li key={index} className={styles.item}>
                        {ItemComponent && <ItemComponent method={item} />}
                        {item}
                    </li>
                ))}
            </ul>
        </Accordion>
    </>
);

export default ServiceSection;
