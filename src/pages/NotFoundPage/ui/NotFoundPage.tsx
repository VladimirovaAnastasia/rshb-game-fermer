import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './NotFoundPage.module.scss';
import {useEffect, useState} from "react";

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
    const { t } = useTranslation();

    const [text, setText] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            setText(t('Страница не найдена'))
        }, 1_500)
    }, []);

    return (
        <div className={classNames(cls.NotFoundPage, {}, [className])}>
            {text}
        </div>
    );
};
