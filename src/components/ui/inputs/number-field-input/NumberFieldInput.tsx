import React, { FC } from 'react';
import classNames from 'classnames';
import InputMask from 'react-input-mask';
import styles from '../text-field-input/TextFieldInput.module.scss';

interface NumberFieldInputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isPending?: boolean;
    isSuccess?: boolean;
    isError?: boolean;
    error?: string;
    disabled?: boolean;
    placeholder?: string;
}

const NumberFieldInput: FC<NumberFieldInputProps> = ({
    label,
    value,
    onChange,
    isPending = false,
    isSuccess = false,
    isError = false,
    error = '',
    disabled = false,
    placeholder = '',
}) => {
    const inputClass = classNames(styles.input, {
        [styles.pending]: isPending,
        [styles.success]: isSuccess,
        [styles.error]: isError,
    });

    return (
        <div className={classNames(styles.wrapper, { [styles.disabled]: disabled })}>
            <label className={styles.label}>{label}</label>
            <InputMask
                mask="+\38\ (999) 999-99-99"
                value={value}
                onChange={onChange}
                className={inputClass}
                disabled={disabled}
                placeholder={placeholder}
            />
            {isError && error && <span className={styles.errMsh}>{error}</span>}
        </div>
    );
};

export default NumberFieldInput;
