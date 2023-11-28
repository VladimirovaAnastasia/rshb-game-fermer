import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MyVillageIcon from 'shared/assets/icons/my_village-24-24.svg?react';
import ProfileIcon from 'shared/assets/icons/profile-24-24.svg?react';
import RatingIcon from 'shared/assets/icons/rating-24-24.svg?react';
import ShopIcon from 'shared/assets/icons/shop-24-24.svg?react';

export interface SidebarItemType {
    path: string;
    text: string;
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
    authOnly?: boolean;
}

export const MenuItemsList: SidebarItemType[] = [
    {
        path: RoutePath.farm,
        Icon: MyVillageIcon,
        text: 'Моё село',
        authOnly: true,
    },
    {
        path: RoutePath.rating,
        Icon: RatingIcon,
        text: 'Рейтинг',
        authOnly: true,
    },
    {
        path: RoutePath.shop,
        Icon: ShopIcon,
        text: 'Магазин',
        authOnly: true,

    },
    {
        path: RoutePath.profile,
        Icon: ProfileIcon,
        text: 'Профиль',
        authOnly: true,
    },
];
