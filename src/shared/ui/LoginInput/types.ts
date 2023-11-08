import React, {
    MouseEvent,
    FocusEvent,
    ChangeEvent,
    KeyboardEvent,
    ClipboardEvent,
    AriaAttributes,
} from 'react';
import { INPUT_TYPES } from './constants';

export type IconPressEvent =
  | MouseEvent<HTMLButtonElement>
  | KeyboardEvent<HTMLButtonElement>;

export type InputRef = { focus: () => void };

type Values<T> = T[keyof T];
export type InputType = Values<typeof INPUT_TYPES>;

export type CustomIcon = {
  /**
   * Компонент иконки
   */
  icon: JSX.Element;
  /**
   * Автоматически скрывает отображение иконки при отсутствии взаимодействия с полем ввода
   */
  autoHide?: boolean;
  /**
   * Обработчик вызываемый при клике или при нажатии клавиши Enter на иконке
   */
  onIconPress?: (event: IconPressEvent) => void;
  /**
   * Обработчик вызываемый при наведении курсора мыши на иконку
   */
  onIconMouseEnter?: (event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Обработчик вызываемый при смещении курсора мыши с иконки
   */
  onIconMouseLeave?: (event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Обработчик вызываемый при установке фокуса на иконку
   */
  onIconFocus?: (event: FocusEvent<HTMLButtonElement>) => void;
  /**
   * Обработчик вызываемый при потере фокуса с иконки
   */
  onIconBlur?: (event: FocusEvent<HTMLButtonElement>) => void;
};

export type InputProps = {
  /**
   * Тип поля
   */
  type?: InputType;
  /**
   * Значение поля
   */
  value?: string | number;
  /**
   * Текст лейбла в поле ввода
   */
  label?: string;
  /**
   * Текст-подсказка, появляется под полем ввода
   */
  hint?: React.ReactNode;
  /**
   * Устанавливает в поле обязательное состояние
   */
  required?: boolean;
  /**
   * Управляет отключенным состоянием поля
   */
  disabled?: boolean;
  /**
   * Управляет отображением иконки крестика для очистки поля
   */
  clearable?: boolean;
  /**
   * Управляет отображением иконки крестика для очистки поля в ручном режиме
   * Необходимо для сценариев отличных от поведения по умолчанию
   */
  isClearIconVisible?: boolean;
  /**
   * Управляет состоянием ошибки для стилизации компонента и текста-подсказки
   */
  error?: boolean;
  /**
   * Значение атрибута id
   */
  id?: string;
  /**
   * Значение атрибута name
   */
  name?: string;
  /**
   * Максимально допустимое количество символов в поле
   */
  maxLength?: number;
  /**
   * Значение атрибута placeholder
   */
  placeholder?: string;
  /**
   * Семантическое значение поля
   */
  role?: string;
  /**
   * Иконка слева от содержимого поля
   */
  leftIcon?: CustomIcon;
  /**
   * Иконка справа от содержимого поля
   */
  rightIcon?: CustomIcon;
  /**
   * Пользовательское имя класса
   */
  className?: string;
  /**
   * Идентификатор для автоматизированного тестирования
   */
  dataTestId?: string;
  /**
   * Значение атрибута autoCapitalize
   */
  autoCapitalize?: string;
  /**
   * Значение атрибута readOnly
   */
  readOnly?: HTMLInputElement['readOnly'];
  /**
   * Значение атрибута autocomplete
   */
  autoComplete?: HTMLInputElement['autocomplete'];
  /**
   * Обработчик вызываемый при наведении курсора мыши на поле
   */
  onHover?: (event: MouseEvent<HTMLInputElement>) => void;
  /**
   * Обработчик вызываемый при установке фокуса на поле
   */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  /**
   * Обработчик вызываемый при изменении значения поля ввода
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Обработчик вызываемый при срабатывании события `keydown`
   */
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  /**
   * Обработчик вызываемый при очистке поля с помощью иконки крестика
   */
  onClear?: (event: IconPressEvent) => void;
  /**
   * Обработчик вызываемый при потере фокуса с поля
   */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /**
   * Обработчик вызываемый при копировании значения
   */
  onCopy?: (event: ClipboardEvent<HTMLInputElement>) => void;
  /**
   * Обработчик вызываемый при вставке значения
   */
  onPaste?: (event: ClipboardEvent<HTMLInputElement>) => void;
  /**
   * Обработчик вызываемый при клике на поле ввода
   */
  onClick?: (event: MouseEvent<HTMLInputElement>) => void;
} & AriaAttributes;
