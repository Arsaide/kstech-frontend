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

const Pagination: FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
    return (
        <div className={styles.pagination}>
            <button
                className={classNames(styles.prevBtn, styles.btn)}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages || currentPage }, (_, i) => (
                <button
                    key={i + 1}
                    onClick={() => onPageChange(i + 1)}
                    disabled={currentPage === i + 1}
                    className={classNames(styles.pagBtn, styles.btn)}
                >
                    {i + 1}
                </button>
            ))}
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
