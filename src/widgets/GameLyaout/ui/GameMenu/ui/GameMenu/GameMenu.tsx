import { useLocation } from 'react-router-dom';
import { memo, useMemo } from 'react';
import { GameMenuItem } from 'widgets/GameLyaout/ui/GameMenu/ui/GameMenuItem/GameMenuItem';
import cls from './GameMenu.module.scss';
import { MenuItemsList } from '../../model/items';

interface GameMenuProps {
    className?: string;
}

export const GameMenu = memo(({ className }: GameMenuProps) => {
    const location = useLocation();

    const itemsList = useMemo(() => MenuItemsList.map((item) => (
        <GameMenuItem
            item={item}
            key={item.path}
            isActive={location.pathname === item.path}
        />
    )), [location.pathname]);

    return (
        <div
            data-testid="menu"
            className={cls.Menu}
        >
            <div className={cls.items}>
                {itemsList}
            </div>
        </div>
    );
});
