import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import dataService from "./dataService";

const initialState = {
  notlar: [],
  isHata: false,
  isBasari: false,
  isYukleniyor: false,
  mesaj: "",
};
export const voteSlice = createSlice({
  name: "vote",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVote.pending, (state) => {
        state.isYukleniyor = true;
      })
      .addCase(getVote.fulfilled, (state, action) => {
        state.isYukleniyor = false;
        state.isBasari = true;
        state.notlar.unshift(action.payload);
      })
      .addCase(getVote.rejected, (state, action) => {
        state.isYukleniyor = false;
        state.isHata = true;
        state.isBasari = false;
        state.mesaj = action.payload;
      });
  },
});

export const getVote = createAsyncThunk(
  "coin/getAll",
  async (voteData, thunkAPI) => {
    await dataService.getVote(voteData);
    return thunkAPI.rejectWithValue("not working");
  }
);

export const { reset } = getVote.actions;
export default getVote.reducer;
