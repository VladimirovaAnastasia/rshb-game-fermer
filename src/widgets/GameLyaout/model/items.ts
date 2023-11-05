import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { GameHeaderTheme } from 'widgets/GameLyaout/ui/GameHeader/ui/GameHeader';

export const gameRoutes = {
    [RoutePath.rating]: {
        route: RoutePath.rating,
        headerTheme: GameHeaderTheme.LIGHT,
    },
    [RoutePath.shop]: {
        route: RoutePath.shop,
        headerTheme: GameHeaderTheme.LIGHT,
    },
    [RoutePath.farm]: {
        route: RoutePath.farm,
        headerTheme: GameHeaderTheme.GREEN,
    },
    [RoutePath.profile]: {
        route: RoutePath.profile,
        headerTheme: GameHeaderTheme.LIGHT,
    },
};
