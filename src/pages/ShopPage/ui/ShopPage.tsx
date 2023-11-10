import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    profileReducer,
} from 'entities/Profile';
import { useEffect, useMemo, useState } from 'react';
import { ShopCardsList } from 'pages/ShopPage/model/items';
import { ShopCard } from 'shared/ui/ShopCard/ShopCard';
import { Heading } from 'shared/ui/Heading/Heading';
import { Tabs } from 'shared/ui/Tabs/Tabs';
import { Tab } from 'shared/ui/Tabs/components/tab';
import { fetchProductsData } from 'entities/Products/model/services/fetchProductsData/fetchProductsData';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getProductsData } from 'entities/Products';
import { getUserAuthData } from 'entities/User';
import { Loader } from 'shared/ui/Loader/Loader';
import { getProductsLoading } from 'entities/Products/model/selectors/getProductsData/getProductsData';
import cls from './ShopPage.module.scss';

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
];

const ShopPage = ({ className }: ShopPageProps) => {
    const dispatch = useAppDispatch();

    const [activeTabName, setActiveTabName] = useState('all');

    const handleChangeActiveTabByName = (tabName: string) => {
        setActiveTabName(tabName);
    };

    const user = useSelector(getUserAuthData);
    const products = useSelector(getProductsData);
    const isProductsLoading = useSelector(getProductsLoading);

    useEffect(() => {
        dispatch(fetchProductsData({ user_id: user?.id || '', filter: activeTabName }));
    }, [activeTabName]);

    const itemsList = useMemo(() => products?.map((item) => (
        <ShopCard
            key={`${item?.name}_${item?.price}`}
            text={item?.name}
            coinsCount={item.price}
            href={item?.content}
            img={item.picture}
        />
    )), [products]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.Shop, {}, [className])}>
                <Heading level={1} className={cls.shopHeading}>Магазин</Heading>
                <Tabs className={cls.tabs}>
                    {tabs.map((tab, index) => (
                        <Tab
                            key={index}
                            title={tab.title.toUpperCase()}
                            active={tab.isActive}
                            onClick={() => handleChangeActiveTabByName(tab.name)}
                        >
                            {isProductsLoading ? <div className={cls.loader}><Loader /></div> : (
                                <div className={cls.shopCardsList}>
                                    {itemsList}
                                </div>
                            )}
                        </Tab>
                    ))}
                </Tabs>
            </div>
        </DynamicModuleLoader>
    );
};

export default ShopPage;
