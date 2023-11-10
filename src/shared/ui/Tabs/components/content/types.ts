import { TabProps } from '../tab/types';

export type ContentProps = {
  tabs: Array<TabProps>;
  activeTabIndex: number;
  dataTestId: string;
};
