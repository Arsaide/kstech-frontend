import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import styles from './AccordionInfo.module.scss';

interface AccordionProps {
    title: string;
    items: any[];
}

const AccordionInfo: FC<AccordionProps> = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.accordion}>
            <TitleResponsive onClick={() => setIsOpen(!isOpen)}>
                {title}
                {isOpen ? <ChevronUp /> : <ChevronDown />}
            </TitleResponsive>
            {!isOpen && <div className={styles.divider} />}
            <ListResponsive isOpen={isOpen}>
                {items.map((item, index) => (
                    <ListItemResponsive key={index}>
                        {item?.link ? (
                            <Link className={styles.link} href={item.link}>
                                {item.name}
                            </Link>
                        ) : (
                            item.name
                        )}
                    </ListItemResponsive>
                ))}
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

const ListItemResponsive = styled.li``;

export default AccordionInfo;
