import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Products } from 'entities/Products';

export const updateProductsData = createAsyncThunk<
  Products,
  {user_id: string, product_id: string},
  ThunkConfig<string>
>('user/updateProductsData', async ({ user_id, product_id }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<Products>('/products', {
            product_id,
            user_id,
        });

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
