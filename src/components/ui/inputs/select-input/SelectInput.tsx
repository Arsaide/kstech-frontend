import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './SelectInput.module.scss';

interface SelectInputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    isPending?: boolean;
    isError?: boolean;
    error?: string;
}

const SelectInput: FC<SelectInputProps> = ({
    label,
    value,
    onChange,
    options,
    isPending = false,
    isError = false,
    error = '',
}) => {
    const selectClass = classNames(styles.select, {
        [styles.pending]: isPending,
        [styles.error]: isError,
    });

    return (
        <div className={classNames(styles.wrapper, { [styles.disabled]: isPending })}>
            <label className={styles.label}>{label}</label>
            <select value={value} onChange={onChange} className={selectClass} disabled={isPending}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {isError && error && <span className={styles.errMsg}>{error}</span>}
        </div>
    );
};

export default SelectInput;
