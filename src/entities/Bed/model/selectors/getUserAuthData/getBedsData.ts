import { StateSchema } from 'app/providers/StoreProvider';

export const getBedsData = (state: StateSchema) => state.beds.data.beds;
