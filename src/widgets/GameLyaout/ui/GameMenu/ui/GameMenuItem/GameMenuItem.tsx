import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './MenuItem.module.scss';
import { SidebarItemType } from '../../model/items';

interface GameMenuItemProps {
    item: SidebarItemType;
    isActive: boolean;
}

export const GameMenuItem = memo(({ item, isActive }: GameMenuItemProps) => {
    const { t } = useTranslation();
    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) {
        return null;
    }

    const mods: Mods = {
        [cls.active]: isActive,
    };

    return (
        <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={item.path}
            className={classNames(cls.item, mods)}
        >
            <item.Icon className={cls.icon} />
            <span className={cls.link}>
                {t(item.text)}
            </span>
        </AppLink>
    );
});
