import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    profileReducer,
} from 'entities/Profile';
import {useMemo, useState} from 'react';
import { ShopCardsList } from 'pages/ShopPage/model/items';
import { ShopCard } from 'shared/ui/ShopCard/ShopCard';
import { Heading } from 'shared/ui/Heading/Heading';
import cls from './ShopPage.module.scss';
import {Tabs} from "shared/ui/Tabs/Tabs";
import {Tab} from "shared/ui/Tabs/components/tab";

const reducers: ReducersList = {
    profile: profileReducer,
};

interface ShopPageProps {
    className?: string;
}

const tabs = [
    {
        name: 'all',
        title: 'Все товары',
        isActive: true,
    },
    {
        name: 'mine',
        title: 'Доступные мне',
        isActive: false,
    },
]

const ShopPage = ({ className }: ShopPageProps) => {
    const itemsList = useMemo(() => ShopCardsList.map((item) => (
        <ShopCard
            text={item.text}
            coinsCount={item.coinsCount}
            img={item.img}
        />
    )), []);

    const [activeTabName, setActiveTabName] = useState('all')

    const handleChangeActiveTabByName = (tabName: string) => {
        setActiveTabName(tabName)
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.Shop, {}, [className])}>
                <Heading level={1} className={cls.shopHeading}>Магазин</Heading>
                <Tabs className={cls.tabs} >
                    {tabs.map((tab, index) => (
                        <Tab
                            key={index}
                            title={tab.title.toUpperCase()}
                            active={tab.isActive}
                            onClick={() => handleChangeActiveTabByName(tab.name)}
                        >
                            <div className={cls.shopCardsList}>
                                {itemsList}
                            </div>
                        </Tab>
                    ))}
                </Tabs>
            </div>
        </DynamicModuleLoader>
    );
};

export default ShopPage;
