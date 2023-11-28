import {
    useRef,
    useState,
    useEffect,
    forwardRef,
    MouseEvent,
    FocusEvent,
    ChangeEvent,
    KeyboardEvent,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import CloseIcon from 'shared/assets/icons/my_village-24-24.svg?react';
import { Hint } from './components/hint';
import { Icon } from './components/icon';
import { INPUT_TYPES } from './constants';
import {
    InputRef,
    InputType,
    InputProps,
    IconPressEvent,
    CustomIcon,
} from './types';
import styles from './LoginInput.module.scss';

export const LoginInput = forwardRef<InputRef, InputProps>(
    (
        {
            id,
            name,
            hint,
            role,
            label,
            type = INPUT_TYPES.TEXT,
            value,
            leftIcon,
            rightIcon,
            className,
            maxLength,
            placeholder,
            error = false,
            required = false,
            disabled = false,
            clearable = true,
            isClearIconVisible,
            dataTestId = 'input',
            autoCapitalize = 'on',
            readOnly,
            onHover,
            onFocus,
            onChange,
            onKeyDown,
            onBlur,
            onClear,
            onCopy,
            onPaste,
            onClick,
            ...restProps
        },
        forwardedRef,
    ) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const [hovered, setHover] = useState<boolean>(false);
        const [focused, setFocus] = useState<boolean>(false);
        const [inputType, setInputType] = useState<InputType>(type);

        const isFilled = value != null && value.toString().length > 0;

        const commonIconProps = {
            inputHovered: hovered,
            inputFocused: focused,
            inputDisabled: disabled,
        };

        useEffect(() => setInputType(type), [type]);

        const handleMouseEnter = (event: MouseEvent<HTMLInputElement>) => {
            setHover(true);
            onHover?.(event);
        };

        const handleMouseLeave = () => {
            setHover(false);
        };

        const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
            setFocus(true);
            onFocus?.(event);
        };

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            onChange?.(event);
        };

        const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
            onKeyDown?.(event);
        };

        const handleClear = (event: IconPressEvent) => {
            onClear?.(event);

            /* Гарантируем установку каретки после передачи пустого значения в поле и
       * применения возможных, специфичных правил форматирования
       */
            window.requestAnimationFrame(() => {
                inputRef.current?.focus();
            });
        };

        const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
            setFocus(false);
            onBlur?.(event);
        };

        // Определение компонента таким образом необходимо для того, чтобы переопределяющие классы стилей, собирались в правильном порядке для production-сборки стилей, при работе плагина mini-css-extract-plugin
        const rightIconComponent = (() => {
            let rightIconProps: CustomIcon | null = null;

            const needClearIcon = isClearIconVisible !== undefined
                ? isClearIconVisible
                : clearable && onClear && isFilled && !disabled;

            if (rightIcon) {
                rightIconProps = rightIcon;
            } else if (needClearIcon) {
                rightIconProps = {
                    icon: <CloseIcon />,
                    autoHide: true,
                    onIconPress: handleClear,
                };
            }

            return (
                rightIconProps && (
                    <Icon
                        className={styles['right-icon']}
                        dataTestId={`${dataTestId}-right-icon`}
                        {...rightIconProps}
                        {...commonIconProps}
                    />
                )
            );
        })();

        const handleLabelTextMouseDown = (event: MouseEvent<HTMLSpanElement>) => {
            event.preventDefault();
        };

        const containerClassNames = classNames(
            styles.container,
            {
                [styles['with-left-icon']]: !!leftIcon,
                [styles['with-right-icon']]: !disabled && clearable && !!onClear,
            },
            [className],
        );

        const inputClassNames = classNames(styles.input, {
            [styles.labeled]: label,
            [styles.error]: error && !disabled,
        });

        const labelClassNames = classNames(styles.label, {
            [styles[`${disabled ? 'gray' : 'light'}-ellipsis`]]: !focused,
            [styles.disabled]: disabled,
            [styles['floated-label-blur']]: focused || isFilled,
        });

        const labelTextClassNames = classNames(styles['label-text'], {
            [styles.floated]: (!disabled && focused) || isFilled,
            [styles.disabled]: disabled,
        });

        const isHintVisible = hint && !(error && disabled);

        return (
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={containerClassNames}
                data-test-id={`${dataTestId}-container`}
            >
                {leftIcon && (
                    <Icon
                        className={styles['left-icon']}
                        dataTestId={`${dataTestId}-left-icon`}
                        {...leftIcon}
                        {...commonIconProps}
                    />
                )}

                <label htmlFor={id} className={labelClassNames}>
                    <span className={styles['label-inner-container']}>
                        {label && (
                            <span
                                className={labelTextClassNames}
                                data-test-id={`${dataTestId}-label`}
                                onMouseDown={handleLabelTextMouseDown}
                            >
                                {label}
                            </span>
                        )}

                        <input
                            {...restProps}
                            id={id}
                            name={name}
                            role={role}
                            value={value}
                            type={inputType}
                            required={required}
                            disabled={disabled}
                            maxLength={maxLength}
                            data-test-id={dataTestId}
                            className={inputClassNames}
                            autoCapitalize={autoCapitalize}
                            placeholder={label ? undefined : placeholder}
                            readOnly={readOnly}
                            onCopy={onCopy}
                            onPaste={onPaste}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            onClick={onClick}
                        />
                    </span>
                </label>

                {rightIconComponent}

                {isHintVisible && (
                    <Hint
                        error={error}
                        className={classNames(styles.hint, { [styles.disabled]: disabled })}
                        dataTestId={`${dataTestId}-hint`}
                    >
                        {hint}
                    </Hint>
                )}
            </div>
        );
    },
);

LoginInput.displayName = 'LoginInput';
