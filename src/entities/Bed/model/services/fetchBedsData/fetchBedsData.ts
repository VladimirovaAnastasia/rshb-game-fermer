import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Bed } from "entities/Bed";

export const fetchBedsData = createAsyncThunk<
  Bed[],
  undefined,
  ThunkConfig<string>
>("beds/fetchBedsData", async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<Bed[]>(`/beds`);

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});

export const harvestBeds = createAsyncThunk<
  Bed[],
  { bed_id: string },
  ThunkConfig<string>
>("beds/harvestBeds", async ({ bed_id }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.post<Bed[]>("/beds/harvest", {
      bed_id,
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

export const plantBeds = createAsyncThunk<
  undefined,
  { bed: Bed },
  ThunkConfig<string>
>("beds/plantBeds", async ({ bed }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.post<Bed[]>("/beds/plant", bed);

    if (response.status !== 200) {
      throw new Error();
    }

    return;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});
