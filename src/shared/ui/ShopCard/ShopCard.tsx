import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import CoinIcon from 'shared/assets/icons/coin-16-16.svg';
import cls from './ShopCard.module.scss';

interface ShopCardProps {
    className?: string;
    text?: string;
    coinsCount?: string;
    img: any;
}

export const ShopCard = memo((props: ShopCardProps) => {
    const {
        className,
        text,
        coinsCount,
        img,
    } = props;

    return (
        <div className={cls.ShopCard}>
            <img src={img} className={cls.img} />
            <div className={cls.info}>
                {text && <p className={cls.text}>{text}</p>}
                {coinsCount && (
                    <div className={cls.coinsCount}>
                        <CoinIcon />
                        <p className={cls.coinsCountText}>{coinsCount}</p>
                    </div>
                )}
            </div>
        </div>
    );
});
