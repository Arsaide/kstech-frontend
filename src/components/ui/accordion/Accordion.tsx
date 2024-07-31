import React, { FC, ReactNode, useState } from 'react';
import styled from '@emotion/styled';
import styles from './Accordion.module.scss';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionProps {
    title: string;
    children: ReactNode;
    img: string;
    alt: string;
}

const Accordion: FC<AccordionProps> = ({ title, children, img, alt }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className={styles.accordion}>
            <TitleResponsive onClick={() => setIsOpen(!isOpen)}>
                <img src={img} className={styles.icon} alt={alt} />
                {title}
                {isOpen ? <ChevronUp /> : <ChevronDown />}
            </TitleResponsive>
            {!isOpen && <div className={styles.divider} />}
            <ContentResponsive isOpen={isOpen}>{children}</ContentResponsive>
        </div>
    );
};

const TitleResponsive = styled.h4`
    color: var(--black);
    cursor: pointer;
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
`;

const ContentResponsive = styled.div<{ isOpen: boolean }>`
    max-height: ${({ isOpen }) => (isOpen ? '200px' : '0')};
    overflow: hidden;
    transition: max-height 0.3s ease;
    list-style: none;
    padding: 0;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    color: var(--black);
    font-size: 16px;
    font-weight: 500;
`;

export default Accordion;
