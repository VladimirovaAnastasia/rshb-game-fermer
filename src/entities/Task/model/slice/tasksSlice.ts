import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TasksSchema, Task } from '../types/task';
import {
    completeTask,
    fetchTasksData,
} from '../services/fetchTasksData/fetchTasksData';

const initialState: TasksSchema = {
    isLoading: false,
    error: undefined,
    data: {
        tasks: [],
    },
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        initTasksData: (state) => {
            state.data.tasks = [];
        },
        setTasksData: (state, action: PayloadAction<Task[]>) => {
            state.data.tasks = action.payload;
        },
        resetTasksDate: (state) => {
            state.data.tasks = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasksData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchTasksData.fulfilled,
                (state, action: PayloadAction<Task[]>) => {
                    state.isLoading = false;
                    state.data.tasks = action.payload;
                },
            )
            .addCase(fetchTasksData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(completeTask.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                completeTask.fulfilled,
                (state, action: PayloadAction<Task[]>) => {
                    state.isLoading = false;
                    state.data.tasks = action.payload;
                },
            )
            .addCase(completeTask.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: tasksActions } = tasksSlice;
export const { reducer: tasksReducer } = tasksSlice;
