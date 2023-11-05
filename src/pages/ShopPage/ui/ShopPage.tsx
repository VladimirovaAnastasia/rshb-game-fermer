import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    profileReducer,
} from 'entities/Profile';
import cls from './ShopPage.module.scss';

const reducers: ReducersList = {
    profile: profileReducer,
};

interface ShopPageProps {
    className?: string;
}

const ShopPage = ({ className }: ShopPageProps) => (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <div className={classNames(cls.Shop, {}, [className])}>
            Магазин
        </div>
    </DynamicModuleLoader>
);

export default ShopPage;
