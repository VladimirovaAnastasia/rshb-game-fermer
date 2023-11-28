import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Task } from "entities/Task";

export const fetchTasksData = createAsyncThunk<
  Task[],
  undefined,
  ThunkConfig<string>
>("tasks/fetchTasksData", async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<Task[]>(`/tasks`);

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});

export const completeTask = createAsyncThunk<
  Task[],
  string,
  ThunkConfig<string>
>("tasks/completeTask", async (taskId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.post<Task[]>("/tasks/complete", {
      id: taskId,
    });

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});
