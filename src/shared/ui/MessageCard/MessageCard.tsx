import { classNames } from 'shared/lib/classNames/classNames';
import {memo, useState} from 'react';
import { ReactComponent as CloseIcon } from 'shared/assets/icons/close-44-44.svg';
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
        onClose
    } = props;

    return (
        <div className={classNames(cls.MessageCard, {}, [className])}>
            {text && <p className={cls.text}>{text}</p>}
            <CloseIcon className={cls['close-icon']} onClick={onClose}/>
        </div>
    );
});
