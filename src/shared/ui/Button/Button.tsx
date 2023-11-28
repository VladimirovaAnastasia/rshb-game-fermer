import classNames from "classNames";
import {ButtonHTMLAttributes, memo, ReactNode} from "react";
import cls from "./Button.module.scss";

export enum ButtonTheme {
  CLEAR = "clear",
  CLEAR_INVERTED = "clearInverted",
  OUTLINE = "outline",
  OUTLINE_RED = "outline_red",
  BACKGROUND = "background",
  BACKGROUND_INVERTED = "backgroundInverted",
}

export enum ButtonSize {
  M = "size_m",
  L = "size_l",
  XL = "size_xl",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
}

export const Button = memo((props: ButtonProps) => {
  const {
    className,
    children,
    theme = ButtonTheme.OUTLINE,
    square,
    disabled,
    size = ButtonSize.M,
    ...otherProps
  } = props;

  return (
    <button
      type="button"
      className={classNames(cls.Button, cls[theme], cls[size], [className], {
        [cls.square]: square,
        [cls.disabled]: disabled,
      })}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
});
