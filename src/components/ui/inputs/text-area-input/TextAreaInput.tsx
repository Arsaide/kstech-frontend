import React, { FC } from 'react';
import styles from './TextAreaInput.module.scss';
import classNames from 'classnames';

interface TextAreaInputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    isPending?: boolean;
    isSuccess?: boolean;
    isError?: boolean;
    error?: string;
    disabled?: boolean;
    placeholder?: string;
}

const TextAreaInput: FC<TextAreaInputProps> = ({
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
    const textAreaClass = classNames(styles.textarea, {
        [styles.pending]: isPending,
        [styles.success]: isSuccess,
        [styles.error]: isError,
    });

    return (
        <div className={classNames(styles.wrapper, { [styles.disabled]: disabled })}>
            <label className={styles.label}>{label}</label>
            <textarea
                value={value}
                onChange={onChange}
                className={textAreaClass}
                disabled={disabled}
                placeholder={placeholder}
            />
            {isError && error && <span className={styles.errMsg}>{error}</span>}
        </div>
    );
};

export default TextAreaInput;
