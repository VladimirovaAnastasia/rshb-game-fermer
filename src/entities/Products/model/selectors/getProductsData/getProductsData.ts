import { StateSchema } from 'app/providers/StoreProvider';

export const getProductsData = (state: StateSchema) => state.products?.data;
export const getProductsLoading = (state: StateSchema) => state.products?.isLoading;
