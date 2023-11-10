import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProductsData } from 'entities/Products/model/services/fetchProductsData/fetchProductsData';
import { updateProductsData } from 'entities/Products/model/services/updateProductsData/updateProductsData';
import { ProductsSchema, Products } from '../types/Products';

const initialState: ProductsSchema = {
    data: [],
    isLoading: false,
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                fetchProductsData.fulfilled,
                (state, action: PayloadAction<Products>) => {
                    state.data = action.payload;
                    state.isLoading = false;
                },
            )
            .addCase(fetchProductsData.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(updateProductsData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                updateProductsData.fulfilled,
                (state, action: PayloadAction<Products>) => {
                    state.data = action.payload;
                    state.isLoading = false;
                },
            )
            .addCase(updateProductsData.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: productsActions } = productsSlice;
export const { reducer: productsReducer } = productsSlice;
