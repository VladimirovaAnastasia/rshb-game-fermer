import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import CloseIcon from 'shared/assets/icons/close-44-44.svg?react';
import cls from './MessageCard.module.scss';

interface MessageCardProps {
    className?: string;
    text?: string;
    onClose: () => void;
}

export const MessageCard = memo((props: MessageCardProps) => {
    const {
        className,
        text,
        onClose,
    } = props;

    return (
        <div className={classNames(cls.MessageCard, {}, [className])}>
            {text && <p className={cls.text}>{text}</p>}
            <CloseIcon className={cls['close-icon']} onClick={onClose} />
        </div>
    );
});
