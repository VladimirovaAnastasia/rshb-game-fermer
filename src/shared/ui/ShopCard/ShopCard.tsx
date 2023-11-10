import {classNames, Mods} from "shared/lib/classNames/classNames";
import {memo} from "react";
import {ReactComponent as CoinIcon} from "shared/assets/icons/coin-16-16.svg";
import cls from "./ShopCard.module.scss";

interface ShopCardProps {
  className?: string;
  text?: string;
  coinsCount?: number;
  href?: string;
  img: string;
  onClick: () => void;
}

export const ShopCard = memo((props: ShopCardProps) => {
  const {className, text, coinsCount, href, img, onClick} = props;

  return (
    <div className={classNames(cls.ShopCard, {[cls.active]: !!href})} onClick={onClick}>
      <div className={cls.img}>
        <img src={`http://localhost:8000/images/products?image=${img}`} />
      </div>
      <div className={cls.info}>
        {text && <p className={cls.text}>{text}</p>}
        {coinsCount && !href ? (
          <div className={cls.coinsCount}>
            <CoinIcon />
            <p className={cls.coinsCountText}>{coinsCount}</p>
          </div>
        ) : (
          <p>
            <a href={href} className={cls.link}>
              Подробнее
            </a>
          </p>
        )}
      </div>
    </div>
  );
});
