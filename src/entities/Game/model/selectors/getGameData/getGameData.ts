import { StateSchema } from 'app/providers/StoreProvider';

export const getGameData = (state: StateSchema) => state.game?.data;
