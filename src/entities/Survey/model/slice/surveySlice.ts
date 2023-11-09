import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SurveysSchema, Survey } from '../types/survey';
import { fetchSurveyData } from '../services/fetchSurveyData/fetchSurveyData';

const initialState: SurveysSchema = {
    isLoading: false,
    error: undefined,
    data: {
        survey: null,
    },
};

export const surveySlice = createSlice({
    name: 'survey',
    initialState,
    reducers: {
        initTasksData: (state) => {
            state.data.survey = null;
        },
        setTasksData: (state, action: PayloadAction<Survey>) => {
            state.data.survey = action.payload;
        },
        resetTasksDate: (state) => {
            state.data.survey = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSurveyData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchSurveyData.fulfilled,
                (state, action: PayloadAction<Survey>) => {
                    state.isLoading = false;
                    state.data.survey = action.payload;
                },
            )
            .addCase(fetchSurveyData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: surveyActions } = surveySlice;
export const { reducer: surveyReducer } = surveySlice;
