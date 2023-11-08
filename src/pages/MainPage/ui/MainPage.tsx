import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import GameLogo from 'shared/assets/images/game-logo.png';
import Farmer from 'shared/assets/images/farmer.png';
import { MainPageHeader } from 'pages/MainPage/ui/MainPageHeader/MainPageHeader';
import { LoginModal } from 'features/AuthByUsername';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import Rays from 'shared/assets/images/rays.png';
import cls from './MainPage.module.scss';

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
        navigate(RoutePath.farm);
    }, []);

    return (
        <div className={cls.MainPage}>
            <MainPageHeader />
            <div className={cls['game-logo']}>
                <div className={cls.rays} style={{ backgroundImage: `url(${Rays})` }} />
                <img src={GameLogo} alt="game-logo" className={cls.logo} />
            </div>
            <div className={cls.buttons}>
                <Button theme={ButtonTheme.BACKGROUND} onClick={onShowModal}>
                    {t('Войти на ферму')}
                </Button>
                <Button theme={ButtonTheme.OUTLINE} onClick={onShowModal}>
                    {t('Как играть')}
                </Button>
            </div>
            <img src={Farmer} alt="farmer-logo" />
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
