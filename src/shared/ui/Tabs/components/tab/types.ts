export type TabProps = {
  /**
   * Заголовок вкладки
   */
  title: React.ReactNode | React.ReactNode[];
  /**
   * Содержимое вкладки
   */
  children?: React.ReactNode;
  /**
   * Флаг активности вкладки
   */
  active?: boolean;
  /**
   * Флаг отключения вкладки
   */
  disabled?: boolean;
  /**
   * Идентификатор для автоматизированного тестирования
   */
  dataTestId?: string;
  /**
   * Пользовательское имя класса
   */
  className?: string;
  /**
   * Обработчик вызываемый при клике на вкладку
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
