import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import GameLogo from 'shared/assets/images/game-logo.png';
import Fermer from 'shared/assets/images/fermer.png';
import cls from "./MainPage.module.scss";

const MainPage = () => {
    const { t } = useTranslation();
    const [value, setValue] = useState('');
    const [isLoading, setLoading] = useState(false);
    const onLoginClick = () => {
        setValue('');
    };

    return (
        <div className={cls.MainPage}>
            <img
                src={GameLogo}
                className={cls.logo}
            />
            <div className={cls.buttons}>
                <Button
                    theme={ButtonTheme.BACKGROUND}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    {t('Войти на ферму')}
                </Button>
                <Button
                    theme={ButtonTheme.OUTLINE}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    {t('Как играть')}
                </Button>
            </div>
            <img
                src={Fermer}
            />
        </div>
    );
};

export default MainPage;
