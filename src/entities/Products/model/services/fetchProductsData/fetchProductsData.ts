import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Products } from 'entities/Products';

export const fetchProductsData = createAsyncThunk<
  Products,
    { user_id: string, filter: string },
  ThunkConfig<string>
>('user/fetchProductsData', async ({ user_id, filter }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<Products>(`/products?user_id=${user_id}&filter=${filter}`);

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
