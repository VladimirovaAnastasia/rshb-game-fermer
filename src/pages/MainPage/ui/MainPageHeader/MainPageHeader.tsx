import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import cls from './MainPageHeader.module.scss';
import LogoIcon from "shared/assets/icons/logo-47-47.svg";

interface ProfilePageHeaderProps {
    className?: string;
}

export const MainPageHeader = (props: ProfilePageHeaderProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('profile');

    return (
        <div className={classNames(cls.MainPageHeader, {}, [className])}>
            <LogoIcon />
            <div className={cls.logoText}>
                <p className={cls.logoTextMain} >{t('Я в агро')}</p>
                <p className={cls.logoTextMinor}>{t('От Россельхозбанка')}</p>
            </div>
        </div>
    );
};
