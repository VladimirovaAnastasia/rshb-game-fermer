import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import { StatisticsCard, StatisticsCardType } from 'shared/ui/StatisticsCard/StatisticsCard';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import cls from './GameHeader.module.scss';

export enum GameHeaderTheme {
  LIGHT = 'light',
  GREEN = 'green',
}

interface GameHeaderProps {
  theme: GameHeaderTheme;
  className?: string;
}

// TODO: Добавить здесь вызовы, подцепить к беку
export const GameHeader = ({ theme, className }: GameHeaderProps) => {
    const user = useSelector(getUserAuthData);

    return (
        <div className={classNames(cls.GameHeader, {}, [className])}>
            <div className={cls.content}>
                <StatisticsCard
                    className={cls[theme]}
                    cardType={StatisticsCardType.COINS}
                    text={`${user?.ballance}`}
                />
            </div>
            <div className={cls.content}>
                <StatisticsCard
                    className={cls[theme]}
                    cardType={StatisticsCardType.DAYS}
                    text={`День ${Math.ceil(
                        (new Date().valueOf() - new Date(user?.signup_date!).valueOf())
              / (1000 * 60 * 60 * 24),
                    ).toString()}`}
                />
                <StatisticsCard
                    className={cls[theme]}
                    cardType={StatisticsCardType.RATING}
                    text="10"
                />
            </div>
        </div>
    );
};
