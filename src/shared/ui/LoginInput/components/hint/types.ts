import { ReactNode } from 'react';

export type HintProps = {
  error: boolean;
  children: ReactNode;
  className?: string;
  dataTestId?: string;
};
