import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Survey } from '../../types/survey';

export const fetchSurveyData = createAsyncThunk<
  Survey,
  string,
  ThunkConfig<string>
>('surveys/fetchSurveyData', async (task_id, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<Survey>(`/surveys?task_id=${task_id}`);

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
