'use client';
import React, { FC } from 'react';
import styles from './Pagination.module.scss';
import classNames from 'classnames';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    totalPages: number | undefined;
    currentPage: number;
    onPageChange: (newPage: number) => void;
}

const Pagination: FC<PaginationProps> = ({ totalPages = 1, currentPage, onPageChange }) => {
    const pageRange = 4;
    const generatePageNumbers = () => {
        const pages = [];
        const halfRange = Math.floor(pageRange / 2);
        let startPage = Math.max(1, currentPage - halfRange);
        let endPage = Math.min(totalPages, currentPage + halfRange);

        // Adjust range if too close to the start
        if (currentPage - halfRange < 1) {
            endPage = Math.min(totalPages, endPage + (1 - (currentPage - halfRange)));
            startPage = 1;
        }

        // Adjust range if too close to the end
        if (currentPage + halfRange > totalPages) {
            startPage = Math.max(1, startPage - (currentPage + halfRange - totalPages));
            endPage = totalPages;
        }

        // Collect page numbers within the calculated range
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div className={styles.pagination}>
            <button
                className={classNames(styles.prevBtn, styles.btn)}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeft size={16} />
            </button>
            {totalPages > pageRange && currentPage > Math.ceil(pageRange / 2) + 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className={classNames(styles.pagBtn, styles.btn)}
                    >
                        1
                    </button>
                    <span>...</span>
                </>
            )}

            {generatePageNumbers().map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    disabled={currentPage === page}
                    className={classNames(styles.pagBtn, styles.btn)}
                >
                    {page}
                </button>
            ))}

            {totalPages > pageRange && currentPage < totalPages - Math.ceil(pageRange / 2) - 1 && (
                <>
                    <span>...</span>
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className={classNames(styles.pagBtn, styles.btn)}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            {/*{Array.from({ length: totalPages || currentPage }, (_, i) => (*/}
            {/*    <button*/}
            {/*        key={i + 1}*/}
            {/*        onClick={() => onPageChange(i + 1)}*/}
            {/*        disabled={currentPage === i + 1}*/}
            {/*        className={classNames(styles.pagBtn, styles.btn)}*/}
            {/*    >*/}
            {/*        {i + 1}*/}
            {/*    </button>*/}
            {/*))}*/}
            <button
                className={classNames(styles.nextBtn, styles.btn)}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <ChevronRight size={16} />
            </button>
        </div>
    );
};

export default Pagination;
