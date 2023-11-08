import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BedsSchema, Bed } from '../types/bed';
import {
    fetchBedsData,
    harvestBeds,
    plantBeds,
} from '../services/fetchBedsData/fetchBedsData';

const initialState: BedsSchema = {
    isLoading: false,
    error: undefined,
    data: {
        beds: [],
    },
};

export const bedsSlice = createSlice({
    name: 'beds',
    initialState,
    reducers: {
        initBedsData: (state) => {
            state.data.beds = [];
        },
        setBedsData: (state, action: PayloadAction<Bed[]>) => {
            state.data.beds = action.payload;
        },
        resetBedsDate: (state) => {
            state.data.beds = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBedsData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchBedsData.fulfilled,
                (state, action: PayloadAction<Bed[]>) => {
                    state.isLoading = false;
                    state.data.beds = action.payload;
                },
            )
            .addCase(fetchBedsData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(harvestBeds.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(harvestBeds.fulfilled, (state, action: PayloadAction<Bed[]>) => {
                state.isLoading = false;
                state.data.beds = action.payload;
            })
            .addCase(harvestBeds.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(plantBeds.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(plantBeds.fulfilled, (state, action: PayloadAction<Bed[]>) => {
                state.isLoading = false;
                state.data.beds = action.payload;
            })
            .addCase(plantBeds.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: bedsActions } = bedsSlice;
export const { reducer: bedsReducer } = bedsSlice;
