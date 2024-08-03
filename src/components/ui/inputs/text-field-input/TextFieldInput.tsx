import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './TextFieldInput.module.scss';

interface TextFieldInputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isPending?: boolean;
    isSuccess?: boolean;
    isError?: boolean;
    error?: string;
    disabled?: boolean;
    placeholder?: string;
    hint?: string;
}

const TextFieldInput: FC<TextFieldInputProps> = ({
    label,
    value,
    onChange,
    isPending = false,
    isSuccess = false,
    isError = false,
    error = '',
    disabled = false,
    placeholder = '',
    hint = '',
}) => {
    const inputClass = classNames(styles.input, {
        [styles.pending]: isPending,
        [styles.success]: isSuccess,
        [styles.error]: isError,
    });

    return (
        <div className={classNames(styles.wrapper, { [styles.disabled]: disabled })}>
            <label className={styles.label}>{label}</label>
            <input
                type={'text'}
                value={value}
                onChange={onChange}
                className={inputClass}
                disabled={disabled}
                placeholder={placeholder}
            />
            {isError && error && <span className={styles.errMsh}>{error}</span>}
            {hint && <span className={styles.hint}>{hint}</span>}
        </div>
    );
};

export default TextFieldInput;
