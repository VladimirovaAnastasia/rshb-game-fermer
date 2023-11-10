import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, ReactNode } from 'react';
import { GameHeader } from 'widgets/GameLyaout/ui/GameHeader';
import { GameMenu } from 'widgets/GameLyaout/ui/GameMenu';
import { useLocation } from 'react-router-dom';
import { gameRoutes } from 'widgets/GameLyaout/model/items';
import { GameDialog } from 'widgets/GameDialog';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import cls from './GameLayout.module.scss';

interface GameHeaderProps {
    className?: string;
    children: ReactNode;
}

export const GameLayout = memo(({ children, className }: GameHeaderProps) => {
    const location = useLocation();
    const isAuth = useSelector(getUserAuthData);

    if (!isAuth || !Object.keys(gameRoutes).includes(location.pathname)) {
        return <>{children}</>;
    }

    return (
        <div className={classNames(cls.GameLayout, {}, [className])}>
            <GameHeader theme={gameRoutes[location.pathname].headerTheme} />
            {children}
            <GameMenu />
            <GameDialog />
        </div>
    );
});
