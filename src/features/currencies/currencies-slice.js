import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCurrencies } from "../../client";

export const loadAllCurrencies = createAsyncThunk(
  'currencies/loadAllCurrencies',
  async () => {
    const res = await fetch(getAllCurrencies());
    const data = await res.json();
    return data.symbols;
  }
)

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAllCurrencies.fulfilled, (state, action) => action.payload)
  }
})

const currenciesReducer = currenciesSlice.reducer;

export default currenciesReducer;

export const selectAllCurrencies = (state) => state.currencies;