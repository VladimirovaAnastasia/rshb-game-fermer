import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Bed } from 'entities/Bed';

export const fetchBedsData = createAsyncThunk<
  Bed[],
  string,
  ThunkConfig<string>
>('beds/fetchBedsData', async (user_id, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<Bed[]>(`/beds?user_id=${user_id}`);

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});

export const harvestBeds = createAsyncThunk<
  Bed[],
  {user_id: string; bed_id: string},
  ThunkConfig<string>
>('beds/harvestBeds', async ({ user_id, bed_id }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<Bed[]>('/beds/harvest', {
            user_id,
            bed_id,
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

export const plantBeds = createAsyncThunk<
  Bed[],
  {user_id: string; beds: Bed[]},
  ThunkConfig<string>
>('beds/plantBeds', async ({ user_id, beds }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<Bed[]>('/beds/plant', {
            user_id,
            beds,
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
