import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {fetchGameData} from "entities/Game/model/services/fetchGameData/fetchGameData";
import {GameSchema} from "entities/Game/model/types/Game";

const initialState: GameSchema = {
    data: undefined,
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGameData.pending, (state) => {
            })
            .addCase(
                fetchGameData.fulfilled,
                (state, action: PayloadAction<number>) => {
                    state.data = action.payload;
                },
            )
            .addCase(fetchGameData.rejected, (state, action) => {
            })
    },
});

// Action creators are generated for each case reducer function
export const { actions: gameActions } = gameSlice;
export const { reducer: gameReducer } = gameSlice;
