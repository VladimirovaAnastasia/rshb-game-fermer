import { memo } from 'react';
import { cardTypeIconMapper } from 'shared/ui/StatisticsCard/items';
import cls from './StatisticsCard.module.scss';

export const enum StatisticsCardType {
    COINS = 'coins',
    DAYS = 'days',
    RATING = 'rating',
}

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
        <div className={cls.Card}>
            <Icon />
            {text && <p className={cls.text}>{text}</p>}
        </div>
    );
});
