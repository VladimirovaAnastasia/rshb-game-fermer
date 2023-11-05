import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    profileReducer,
} from 'entities/Profile';
import { useMemo } from 'react';
import { ShopCardsList } from 'pages/ShopPage/model/items';
import { ShopCard } from 'shared/ui/ShopCard/ShopCard';
import { Heading } from 'shared/ui/Heading/Heading';
import cls from './ShopPage.module.scss';

const reducers: ReducersList = {
    profile: profileReducer,
};

interface ShopPageProps {
    className?: string;
}

const ShopPage = ({ className }: ShopPageProps) => {
    const itemsList = useMemo(() => ShopCardsList.map((item) => (
        <ShopCard
            text={item.text}
            coinsCount={item.coinsCount}
            img={item.img}
        />
    )), []);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.Shop, {}, [className])}>
                <Heading level={1} className={cls.shopHeading}>Магазин</Heading>
                <div className={cls.shopCardsList}>
                    {itemsList}
                </div>
            </div>
        </DynamicModuleLoader>
    );
};

export default ShopPage;
