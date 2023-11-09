import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { FarmPage } from 'pages/FarmPage';
import { ShopPage } from 'pages/ShopPage';
import { RatingPage } from 'pages/RatingPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
}

export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  MY_FARM = 'farm',
  RATING = 'rating',
  SHOP = 'shop',
  // last
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.MY_FARM]: '/farm',
    [AppRoutes.RATING]: '/rating',
    [AppRoutes.SHOP]: '/shop',
    // последний
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />,
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.MY_FARM]: {
        path: RoutePath.farm,
        element: <FarmPage />,
        authOnly: true,
    },
    [AppRoutes.RATING]: {
        path: RoutePath.rating,
        element: <RatingPage />,
        authOnly: true,
    },
    [AppRoutes.SHOP]: {
        path: RoutePath.shop,
        element: <ShopPage />,
        authOnly: true,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
