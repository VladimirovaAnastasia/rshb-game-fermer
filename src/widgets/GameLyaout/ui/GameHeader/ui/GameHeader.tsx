import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { StatisticsCard, StatisticsCardType } from 'shared/ui/StatisticsCard/StatisticsCard';
import cls from './GameHeader.module.scss';

interface GameHeaderProps {
    className?: string;
}

export const GameHeader = memo(({ className }: GameHeaderProps) => (
    <div className={classNames(cls.GameHeader, {}, [className])}>
        <div className={cls.content}>
            <StatisticsCard cardType={StatisticsCardType.COINS} text="20" />
        </div>
        <div className={cls.content}>
            <StatisticsCard cardType={StatisticsCardType.DAYS} text="День 6" />
            <StatisticsCard cardType={StatisticsCardType.RATING} text="10" />
        </div>
    </div>
));
