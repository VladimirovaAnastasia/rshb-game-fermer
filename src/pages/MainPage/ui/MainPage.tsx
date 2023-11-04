import React, {useCallback, useState} from 'react';
import { useTranslation } from 'react-i18next';
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import GameLogo from 'shared/assets/images/game-logo.png';
import Fermer from 'shared/assets/images/fermer.png';
import {MainPageHeader} from "pages/MainPage/ui/MainPageHeader/MainPageHeader";
import cls from "./MainPage.module.scss";
import {LoginModal} from "features/AuthByUsername";
import {useNavigate} from "react-router-dom";

const MainPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isAuthModal, setIsAuthModal] = useState(false);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onSuccess = useCallback(() => {
        navigate('/game')
    }, []);

    return (
        <div className={cls.MainPage}>
            <MainPageHeader />
            <img
                src={GameLogo}
                className={cls.logo}
            />
            <div className={cls.buttons}>
                <Button
                    theme={ButtonTheme.BACKGROUND}
                    onClick={onShowModal}
                >
                    {t('Войти на ферму')}
                </Button>
                <Button
                    theme={ButtonTheme.OUTLINE}
                    onClick={onShowModal}
                >
                    {t('Как играть')}
                </Button>
            </div>
            <img
                src={Fermer}
            />
            {isAuthModal && (
                <LoginModal
                    isOpen={isAuthModal}
                    onClose={onCloseModal}
                    onSuccess={onSuccess}
                />
            )}
        </div>
    );
};

export default MainPage;
