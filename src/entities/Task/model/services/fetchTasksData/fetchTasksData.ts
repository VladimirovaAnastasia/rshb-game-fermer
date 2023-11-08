import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Task } from 'entities/Task';

export const fetchTasksData = createAsyncThunk<
  Task[],
  string,
  ThunkConfig<string>
>('tasks/fetchTasksData', async (user_id, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<Task[]>(`/tasks?user_id=${user_id}`);

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});

export const completeTask = createAsyncThunk<
  Task[],
  {task_id: string},
  ThunkConfig<string>
>('tasks/completeTask', async ({ task_id }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<Task[]>('/tasks/complete', {
            task_id,
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
