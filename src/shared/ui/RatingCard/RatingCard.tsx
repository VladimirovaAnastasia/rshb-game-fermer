import classNames from "classNames";
import {memo} from "react";
import CoinIcon from "shared/assets/icons/coin-16-16.svg?react";
import cls from "./RaitingCard.module.scss";

interface RatingCardProps {
  className?: string;
  img: any;
  name: string;
  city: string;
  coinsCount: string;
  isCurrent?: boolean;
}

export const RatingCard = memo((props: RatingCardProps) => {
  const {className, img, name, city, coinsCount, isCurrent} = props;

  const Icon = img;

  return (
    <div
      className={classNames(
        cls.RatingCard,
        {
          [cls.active]: isCurrent,
        },
        [className]
      )}
    >
      <div className={cls.info}>
        <Icon />
        <div>
          <p className={cls.text}>{name}</p>
          <p className={cls.text}>{city}</p>
        </div>
      </div>
      {coinsCount && (
        <div className={cls.coinsCount}>
          <CoinIcon />
          <p className={cls.coinsCountText}>{coinsCount}</p>
        </div>
      )}
    </div>
  );
});
