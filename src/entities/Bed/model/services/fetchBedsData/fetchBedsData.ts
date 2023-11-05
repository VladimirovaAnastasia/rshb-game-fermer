import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/StoreProvider";
import {Bed} from "entities/Bed";

export const fetchBedsData = createAsyncThunk<
  Bed[],
  string,
  ThunkConfig<string>
>("beds/fetchBedsData", async (user_id, thunkApi) => {
  const {extra, rejectWithValue} = thunkApi;

  try {
    const response = await extra.api.get<Bed[]>(`/beds?user_id=${user_id}`);

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});
