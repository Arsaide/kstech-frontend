'use client';
import React from 'react';
import styles from './Footer.module.scss';
import { contactsList, navMenu, socialNetworksList, workArr } from '@/components/layout/ui/nav';
import Link from 'next/link';
import AccordionInfo from '@/components/layout/ui/nav/footer/components/accordion-info/AccordionInfo';
import AccordionContacts from '@/components/layout/ui/nav/footer/components/accordion-contacts/AccordionContacts';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.cnt}>
                <div className={styles.logoCnt}>
                    <Link href={'/'}>
                        <img className={styles.logo} src={'/logo.svg'} alt="Logo" />
                    </Link>
                </div>
                <div className={styles.info}>
                    <h4 className={styles.title}>Інформація</h4>
                    <ul className={styles.list}>
                        {navMenu.map((item, index) => (
                            <li key={index} className={styles.listItem}>
                                <Link className={styles.link} href={item.link}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <AccordionInfo title={'Інформація'} items={navMenu} />
                <div className={styles.work}>
                    <h4 className={styles.title}>Час роботи</h4>
                    <ul className={styles.list}>
                        {workArr.map((item, index) => (
                            <li key={index} className={styles.listItem}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <AccordionInfo title={'Час роботи'} items={workArr} />
                <div className={styles.contacts}>
                    <h4 className={styles.title}>Для зв’язку та запитань</h4>
                    <ul className={styles.contactsList}>
                        {contactsList.map((item, index) => (
                            <li key={index} className={styles.contactsListItem}>
                                <a href={`${item.link}`} className={styles.contactLink}>
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <ul className={styles.socNetworksList}>
                        {socialNetworksList.map((item, index) => (
                            <li key={index} className={styles.socNetworksItem}>
                                <img
                                    className={styles.icon}
                                    src={item.icon}
                                    alt={`Логотип соціальної мережі - ${item.name}`}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <AccordionContacts />
                <div className={styles.logoCntResp}>
                    <Link href={'/'}>
                        <img className={styles.logoResp} src={'/logo.svg'} alt="Logo" />
                    </Link>
                </div>
            </div>
            <div className={styles.copyright}>
                ©Магазин створили{' '}
                <a href={'https://t.me/arsaide'} target={'_blank'}>
                    @Кірілл
                </a>{' '}
                та{' '}
                <a href={'https://t.me/shinerfa'} target={'_blank'}>
                    @Артем
                </a>
            </div>
        </footer>
    );
};

export default Footer;
