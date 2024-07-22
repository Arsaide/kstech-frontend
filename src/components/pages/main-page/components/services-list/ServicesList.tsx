import React from 'react';
import styles from './ServicesList.module.scss';
import { services } from '@/components/pages/main-page/components/services-list/services';

const ServicesList = () => {
    return (
        <section className={styles.services}>
            <div className={styles.cnt}>
                <ul className={styles.list}>
                    {services.map((item, index) => (
                        <li key={index} className={styles.listItem}>
                            <div className={styles.img}>
                                <img
                                    src={item.img}
                                    alt={`Зображення сервісної послуги: "${item.name}"`}
                                />
                            </div>
                            <div className={styles.name}>{item.name}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default ServicesList;
