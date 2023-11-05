import { classNames } from 'shared/lib/classNames/classNames';
import { Heading } from 'shared/ui/Heading/Heading';
import { useMemo } from 'react';
import { RatingCardsList } from 'shared/ui/RatingCard/items';
import { RatingCard } from 'shared/ui/RatingCard/RatingCard';
import cls from './RatingPage.module.scss';

interface RatingPageProps {
    className?: string;
}

const RatingPage = ({ className }: RatingPageProps) => {
    const itemsList = useMemo(() => RatingCardsList.map((item, index) => (
        <RatingCard
            img={item.img}
            coinsCount={item.coinsCount}
            name={item.name}
            city={item.city}
            isCurrent={index === RatingCardsList.length - 1}
        />
    )), []);

    return (
        <div className={classNames(cls.Rating, {}, [className])}>
            <Heading level={1} className={cls.ratingHeading}>Рейтинг</Heading>
            <div className={cls.ratingCardsList}>
                {itemsList}
            </div>
        </div>
    );
};

export default RatingPage;
