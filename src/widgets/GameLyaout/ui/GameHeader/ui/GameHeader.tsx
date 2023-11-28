import { classNames } from 'shared/lib/classNames/classNames';
import { useEffect, useMemo } from 'react';
import {
  StatisticsCard,
} from 'shared/ui/StatisticsCard/StatisticsCard';
import { StatisticsCardType } from 'shared/ui/StatisticsCard/types';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import cls from './GameHeader.module.scss';
import { fetchGameData } from 'entities/Game/model/services/fetchGameData/fetchGameData';
import { getGameData } from 'entities/Game/model/selectors/getGameData/getGameData';

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
  const balance = useSelector(getGameData);

  const dispatch = useDispatch();

  const date = useMemo(
    () =>
      Math.ceil(
        (new Date().valueOf() - new Date(user?.signup_date!).valueOf()) /
          (1000 * 60 * 60 * 24)
      ),
    [user?.signup_date]
  );

  useEffect(() => {
    dispatch(fetchGameData(user?.id));
  }, []);

  return (
    <div className={classNames(cls.GameHeader, {}, [className])}>
      <div className={cls.content}>
        <StatisticsCard
          className={cls[theme]}
          cardType={StatisticsCardType.COINS}
          text={`${balance ?? ''}`}
        />
      </div>
      <div className={cls.content}>
        <StatisticsCard
          className={cls[theme]}
          cardType={StatisticsCardType.DAYS}
          text={date ? `День ${date}` : ''}
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
