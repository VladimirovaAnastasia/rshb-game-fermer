import CoinsIcon from 'shared/assets/icons/coins-20-20.svg';
import RatingIcon from 'shared/assets/icons/days-16-16.svg';
import DaysIcon from 'shared/assets/icons/coin-16-16.svg';
import { StatisticsCardType } from 'shared/ui/StatisticsCard/StatisticsCard';
import React from 'react';

type CardTypeIconMapperType = Record<StatisticsCardType, React.VFC<React.SVGProps<SVGSVGElement>>>
export const cardTypeIconMapper: CardTypeIconMapperType = {
    [StatisticsCardType.COINS]: CoinsIcon,
    [StatisticsCardType.DAYS]: DaysIcon,
    [StatisticsCardType.RATING]: RatingIcon,
};
