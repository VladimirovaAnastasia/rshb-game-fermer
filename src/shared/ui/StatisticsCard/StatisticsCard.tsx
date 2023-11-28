import { memo } from 'react';
import { cardTypeIconMapper } from 'shared/ui/StatisticsCard/items';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './StatisticsCard.module.scss';
import { StatisticsCardType } from './types';

interface StatisticsCardProps {
    className?: string;
    cardType: StatisticsCardType;
    text?: string;
}

export const StatisticsCard = memo((props: StatisticsCardProps) => {
    const {
        className,
        cardType,
        text,
    } = props;

    const Icon = cardTypeIconMapper[cardType];

    return (
        <div className={classNames(cls.Card, {}, [className])}>
            <Icon />
            {!!text && <p className={cls.text}>{text}</p>}
        </div>
    );
});
