import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
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
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState<number | null>(null);
    const [animationDuration, setAnimationDuration] = useState<string>('0s');

    useEffect(() => {
        if (contentRef.current) {
            const height = contentRef.current.scrollHeight;
            setContentHeight(height);
            setAnimationDuration(`${Math.min(Math.max(height / 200, 0.2), 0.3)}s`); // Длительность анимации от 0.5 до 1.5 секунд
        }
    }, [children]);

    useEffect(() => {
        if (contentHeight !== null) {
            setAnimationDuration(`${Math.min(Math.max(contentHeight / 200, 0.2), 0.3)}s`);
        }
    }, [isOpen, contentHeight]);

    return (
        <div className={styles.accordion}>
            <TitleResponsive onClick={() => setIsOpen(!isOpen)}>
                <img src={img} className={styles.icon} alt={alt} />
                {title}
                {isOpen ? <ChevronUp /> : <ChevronDown />}
            </TitleResponsive>
            {!isOpen && <div className={styles.divider} />}
            <ContentWrapper
                ref={contentRef}
                isOpen={isOpen}
                contentHeight={contentHeight}
                animationDuration={animationDuration}
            >
                <ContentResponsive>{children}</ContentResponsive>
            </ContentWrapper>
        </div>
    );
};

const TitleResponsive = styled.h4`
    color: var(--black);
    cursor: pointer;
    font-size: clamp(18px, 2vw, 22px);
    font-weight: 600;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
`;

const ContentWrapper = styled.div<{
    isOpen: boolean;
    contentHeight: number | null;
    animationDuration: string;
}>`
    max-height: ${({ isOpen, contentHeight }) => (isOpen ? `${contentHeight}px` : '0')};
    overflow: hidden;
    transition: max-height ${({ animationDuration }) => animationDuration} ease-out;
    list-style: none;
    padding: 0;
    margin-top: 10px;
`;

const ContentResponsive = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    color: var(--black);
    font-size: 16px;
    font-weight: 500;
`;

export default Accordion;
