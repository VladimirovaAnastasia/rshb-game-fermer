import { TabProps } from "../tab/types";
import {TabsProps} from "shared/ui/Tabs/Tabs";


export type HeaderProps = Required<Pick<TabsProps, "size">> & {
  tabs: Array<TabProps>;
  activeTabIndex: number;
  setActiveTab: (tabIndex: number) => void;
  dataTestId: string;
};
