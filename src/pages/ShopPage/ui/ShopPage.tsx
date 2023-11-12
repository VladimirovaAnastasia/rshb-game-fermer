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
import NotFound from 'shared/assets/images/not-found.png';
import { BuyProductModal } from 'features/BuyProduct/BuyProductModal';
import cls from './ShopPage.module.scss';
import {fetchGameData} from "entities/Game/model/services/fetchGameData/fetchGameData";

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
        name: 'available',
        title: 'Доступные мне',
        isActive: false,
    },
    {
        name: 'mine',
        title: 'Приобретённые',
        isActive: false,
    },
];

const ShopPage = ({ className }: ShopPageProps) => {
    const dispatch = useAppDispatch();

    const [activeTabName, setActiveTabName] = useState('all');
    const [productId, setProductId] = useState('');
    const handleChangeActiveTabByName = (tabName: string) => {
        setActiveTabName(tabName);
    };

    const user = useSelector(getUserAuthData);
    const products = useSelector(getProductsData);
    const isProductsLoading = useSelector(getProductsLoading);

    const handleClickShopCard = (productId: string) => {
        setProductId(productId);
    };
    const handleCloseBuyProductModal = () => {
        setProductId('');
    };

    const handleSubmitBuyProduct = () => {
        dispatch(fetchGameData(user?.id));
        dispatch(fetchProductsData({ user_id: user?.id || '', filter: 'all' }));
        setActiveTabName('all');
    };

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
            onClick={() => handleClickShopCard(item.id)}
        />
    )), [products]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <BuyProductModal
                onClose={handleCloseBuyProductModal}
                onSubmit={handleSubmitBuyProduct}
                opened={!!productId}
                product={products?.find((item) => item.id === productId)}
            />
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
                                    {itemsList?.length === 0 ? (
                                        <div className={cls['not-found']}>
                                            <img src={NotFound} alt="not-found" className={cls.img} />
                                            <p>Ничего не найдено</p>
                                        </div>
                                    ) : itemsList}
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
