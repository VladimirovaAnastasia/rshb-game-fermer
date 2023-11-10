import {
    Children, ReactElement, useEffect, useMemo, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Header } from './components/header';
import { Content } from './components/content';
import { TabProps } from './components/tab/types';
import cls from './Tabs.module.scss';

const TAB_SIZES = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
} as const;

export type TabSize = typeof TAB_SIZES[keyof typeof TAB_SIZES];

export interface TabsProps {
    size?: TabSize;
    children: ReactElement<TabProps> | Array<ReactElement<TabProps>>;
    dataTestId?: string;
    className: string;
}

export const Tabs = ({
    size = 'medium',
    children,
    className,
    dataTestId = 'tabs',
}: TabsProps) => {
    const enabledTabs = useMemo(() => {
        const newTabs: Array<TabProps> = [];

        Children.forEach(children, (child) => {
            if (!child.props.disabled) {
                newTabs.push(child.props);
            }
        });

        return newTabs;
    }, [children]);

    let initialActiveTabIndex = 0;

    enabledTabs.forEach(({ active }, tabIndex) => {
        if (active) {
            initialActiveTabIndex = tabIndex;
        }
    });

    const [activeTabIndex, setActiveTabIndex] = useState(initialActiveTabIndex);

    useEffect(() => {
        setActiveTabIndex(initialActiveTabIndex);
    }, [initialActiveTabIndex]);

    return (
        <div
            className={classNames(className, {}, [cls.Tabs])}
            data-test-id={`${dataTestId}-container`}
        >
            <Header
                size={size}
                tabs={enabledTabs}
                activeTabIndex={activeTabIndex}
                setActiveTab={setActiveTabIndex}
                dataTestId={dataTestId}
            />

            <Content
                tabs={enabledTabs}
                activeTabIndex={activeTabIndex}
                dataTestId={dataTestId}
            />
        </div>
    );
};
