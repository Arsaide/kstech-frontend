import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './ToggleSwitchInput.module.scss';

interface ToggleSwitchInputProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    isPending?: boolean;
    isError?: boolean;
    label: string;
    error?: string;
}

const ToggleSwitchInput: FC<ToggleSwitchInputProps> = ({
    checked,
    onChange,
    isPending,
    isError,
    label,
    error,
}) => {
    const handleToggle = () => {
        if (!isPending) {
            onChange(!checked);
        }
    };

    return (
        <div className={styles.toggleSwitchWrapper}>
            <label className={styles.label}>{label}</label>
            <div className={styles.toggleSwitch} onClick={handleToggle}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {}}
                    disabled={isPending}
                    className={classNames(styles.switch, {
                        [styles.pending]: isPending,
                        [styles.error]: isError,
                    })}
                />
                <span className={styles.slider}></span>
            </div>
            {isError && <div className={styles.error}>{error}</div>}
        </div>
    );
};

export default ToggleSwitchInput;
