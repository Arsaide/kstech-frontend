'use client';
import React, { FC } from 'react';

interface PaginationProps {
    totalPages: number | undefined;
    currentPage: number;
    onPageChange: (newPage: number) => void;
}

const Pagination: FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
    return (
        <div>
            {Array.from({ length: totalPages || currentPage }, (_, i) => (
                <button
                    key={i + 1}
                    onClick={() => onPageChange(i + 1)}
                    disabled={currentPage === i + 1}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
