import { ContentProps } from './types';

export const Content = ({ tabs, activeTabIndex, dataTestId }: ContentProps) => (
    <section data-test-id={`${dataTestId}-content`}>
        {tabs[activeTabIndex].children}
    </section>
);
