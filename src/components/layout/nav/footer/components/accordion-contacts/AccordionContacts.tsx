import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from './AccordionContacts.module.scss';
import { contactsList, socialNetworksList } from '@/components/layout/ui/nav';

const AccordionContacts = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className={styles.accordion}>
            <TitleResponsive onClick={() => setIsOpen(!isOpen)}>
                Для зв’язку та запитань
                {isOpen ? <ChevronUp /> : <ChevronDown />}
            </TitleResponsive>
            {!isOpen && <div className={styles.divider} />}
            <ListResponsive isOpen={isOpen}>
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
            </ListResponsive>
        </div>
    );
};

const TitleResponsive = styled.h4`
    color: var(--white);
    cursor: pointer;
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
`;

const ListResponsive = styled.ul<{ isOpen: boolean }>`
    max-height: ${({ isOpen }) => (isOpen ? '200px' : '0')};
    overflow: hidden;
    transition: max-height 0.3s ease;
    list-style: none;
    padding: 0;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    color: var(--black-02);
    font-size: 16px;
    font-weight: 500;
`;

export default AccordionContacts;
