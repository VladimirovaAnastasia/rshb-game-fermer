import CoinsIcon from 'shared/assets/icons/coins-20-20.svg?react';
import RatingIcon from 'shared/assets/icons/rating-20-20.svg?react';
import DaysIcon from 'shared/assets/icons/days-16-16.svg?react';
import { StatisticsCardType } from 'shared/ui/StatisticsCard/types';
import React from 'react';

type CardTypeIconMapperType = Record<
  StatisticsCardType,
  React.VFC<React.SVGProps<SVGSVGElement>>
>;
export const cardTypeIconMapper: CardTypeIconMapperType = {
    [StatisticsCardType.COINS]: CoinsIcon,
    [StatisticsCardType.DAYS]: DaysIcon,
    [StatisticsCardType.RATING]: RatingIcon,
};
