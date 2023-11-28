import { Suspense, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/router';
import { useDispatch } from 'react-redux';
import { userActions } from 'entities/User';
import { GameLayout } from 'widgets/GameLyaout';

function App() {
    const { theme } = useTheme();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <div className="content-page">
                    <GameLayout>
                        <AppRouter />
                    </GameLayout>
                </div>
            </Suspense>
        </div>
    );
}

export default App;
