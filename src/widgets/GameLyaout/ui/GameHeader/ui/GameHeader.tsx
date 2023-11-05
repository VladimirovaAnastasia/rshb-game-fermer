import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import { StatisticsCard, StatisticsCardType } from 'shared/ui/StatisticsCard/StatisticsCard';
import cls from './GameHeader.module.scss';

export enum GameHeaderTheme {
    LIGHT = 'light',
    GREEN = 'green'
}

interface GameHeaderProps {
    theme: GameHeaderTheme;
    className?: string;
}

export const GameHeader = memo(({ theme, className }: GameHeaderProps) => (
    <div className={classNames(cls.GameHeader, {}, [className])}>
        <div className={cls.content}>
            <StatisticsCard className={cls[theme]} cardType={StatisticsCardType.COINS} text="20" />
        </div>
        <div className={cls.content}>
            <StatisticsCard className={cls[theme]} cardType={StatisticsCardType.DAYS} text="День 6" />
            <StatisticsCard className={cls[theme]} cardType={StatisticsCardType.RATING} text="10" />
        </div>
    </div>
));
