import { classNames } from 'shared/lib/classNames/classNames';
import FarmerGirl from 'shared/assets/images/farmer-girl.png';
import { MessageCard } from 'shared/ui/MessageCard/MessageCard';
import { useState } from 'react';
import cls from './GameDialog.module.scss';

interface GameDialogProps {
    className?: string;
}

export const GameDialog = ({ className }: GameDialogProps) => {
    const [isVisible, setVisible] = useState(true);

    const handleCloseClick = () => {
        setVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className={cls['game-bottom']}>
            <div className={classNames(cls.GameDialog, {}, [className])}>
                <MessageCard
                    text="Добро пожаловать обратно! Сегодня у нас на ферме 5 новых заданий!"
                    onClose={handleCloseClick}
                />
                <img src={FarmerGirl} alt="farmer-girl-helper" />
            </div>
        </div>
    );
};
