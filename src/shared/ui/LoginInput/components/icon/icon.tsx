import { MouseEvent, FocusEvent } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { IconProps } from './types';
import styles from './styles.module.scss';

export const Icon = ({
    icon,
    autoHide,
    className,
    dataTestId,
    inputHovered,
    inputFocused,
    inputDisabled,
    onIconBlur,
    onIconFocus,
    onIconPress,
    onIconMouseEnter,
    onIconMouseLeave,
}: IconProps) => {
    const handleMouseEnter = (event: MouseEvent<HTMLButtonElement>) => {
        onIconMouseEnter?.(event);
    };

    const handleMouseLeave = (event: MouseEvent<HTMLButtonElement>) => {
        onIconMouseLeave?.(event);
    };

    const handleFocus = (event: FocusEvent<HTMLButtonElement>) => {
        onIconFocus?.(event);
    };

    const handleBlur = (event: FocusEvent<HTMLButtonElement>) => {
        onIconBlur?.(event);
    };

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        onIconPress?.(event);
    };

    const iconDisabled = inputDisabled;

    const iconClassNames = classNames(styles.icon, {
        [styles.hidden]:
      autoHide && !(inputHovered || inputFocused) && !iconDisabled,
    }, [className]);

    return (
        <button
            type="button"
            disabled={iconDisabled}
            className={iconClassNames}
            data-test-id={dataTestId}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {icon}
        </button>
    );
};
