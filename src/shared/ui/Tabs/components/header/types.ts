import { TabsProps } from 'shared/ui/Tabs/Tabs';
import { TabProps } from '../tab/types';

export type HeaderProps = Required<Pick<TabsProps, 'size'>> & {
  tabs: Array<TabProps>;
  activeTabIndex: number;
  setActiveTab: (tabIndex: number) => void;
  dataTestId: string;
};
