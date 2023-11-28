import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import CoinIcon from 'shared/assets/icons/coin-16-16.svg?react';
import cls from './TaskCard.module.scss';

interface TaskCardProps {
    className?: string;
    text?: string;
    coinsCount?: string;
    isActive?: boolean;
}

export const TaskCard = memo((props: TaskCardProps) => {
    const {
        className,
        text,
        coinsCount,
        isActive,
    } = props;

    const mods: Mods = {
        [cls.active]: isActive,
    };

    return (
        <div className={classNames(cls.TaskCard, mods, [className])}>
            {text && <p className={cls.text}>{text}</p>}
            {coinsCount && (
                <div className={cls.coinsCount}>
                    <CoinIcon />
                    <p className={cls.coinsCountText}>{coinsCount}</p>
                </div>
            )}
        </div>
    );
});
