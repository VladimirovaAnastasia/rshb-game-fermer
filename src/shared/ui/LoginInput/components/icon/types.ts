import { CustomIcon } from '../../types';

export type IconProps =
  {
    className?: string;
    dataTestId?: string;
    inputHovered?: boolean;
    inputFocused?: boolean;
    inputDisabled?: boolean;
  } & CustomIcon;
