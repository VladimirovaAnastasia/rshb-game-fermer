import { classNames } from 'shared/lib/classNames/classNames';
import cls from './RatingPage.module.scss';

interface RatingPageProps {
    className?: string;
}

const RatingPage = ({ className }: RatingPageProps) => (
    <div className={classNames(cls.Rating, {}, [className])}>
        Рейтинг
    </div>
);

export default RatingPage;
