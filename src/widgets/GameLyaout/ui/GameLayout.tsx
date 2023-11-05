import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, ReactNode } from 'react';
import { GameHeader } from 'widgets/GameLyaout/ui/GameHeader';
import { GameMenu } from 'widgets/GameLyaout/ui/GameMenu';
import { useLocation } from 'react-router-dom';
import { gameRoutes } from 'widgets/GameLyaout/model/items';
import cls from './GameLayout.module.scss';

interface GameHeaderProps {
    className?: string;
    children: ReactNode;
}

export const GameLayout = memo(({ children, className }: GameHeaderProps) => {
    const location = useLocation();

    if (!gameRoutes.includes(location.pathname)) {
        return <>{children}</>;
    }

    return (
        <div className={classNames(cls.GameLayout, {}, [className])}>
            <GameHeader />
            {children}
            <GameMenu />
        </div>
    );
});
