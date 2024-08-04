import React, { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './SelectInput.module.scss';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SelectInputProps {
    label: string;
    value: string;
    onChange: (e: string) => void;
    options: { value: string; label: string }[];
    isPending?: boolean;
    isError?: boolean;
    error?: string;
    placeholder?: string;
}

const SelectInput: FC<SelectInputProps> = ({
    label,
    value,
    onChange,
    options,
    isPending = false,
    isError = false,
    error = '',
    placeholder = 'Select an option',
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const handleSelectClick = () => {
        if (!isPending) {
            setIsOpen(prev => !prev);
        }
    };

    const handleOptionClick = (event: React.MouseEvent, optionValue: string) => {
        event.stopPropagation();
        onChange(optionValue);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const selectedLabel = options.find(option => option.value === value)?.label || '';

    const selectClass = classNames(styles.select, {
        [styles.pending]: isPending,
        [styles.error]: isError,
    });

    return (
        <div
            className={classNames(styles.wrapper, { [styles.disabled]: isPending })}
            ref={selectRef}
        >
            <label className={styles.label}>{label}</label>
            <div className={selectClass} onClick={handleSelectClick}>
                <div className={styles.selected}>
                    {selectedLabel || <span className={styles.placeholder}>{placeholder}</span>}
                </div>
                <div className={styles.arrow}>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}{' '}
                </div>
                {isOpen && (
                    <ul className={styles.options}>
                        {options.map(option => (
                            <li
                                key={option.value}
                                className={styles.option}
                                onClick={event => {
                                    handleOptionClick(event, option.value);
                                }}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {isError && error && <span className={styles.errMsg}>{error}</span>}
        </div>
    );
};

export default SelectInput;
