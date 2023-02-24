import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLatestRates } from "../../client";

export const loadBaseCurrencyRates = createAsyncThunk(
  'baseCurrency/loadRates',
  async (_, { getState, rejectWithValue }) => {
    try {
      const code = getState().baseCurrency.code;
      const res = await fetch(getLatestRates(code));
      const data = await res.json();
      return data.rates;
    } catch (err) {
      return rejectWithValue('Cannot load rates');
    }
  })

const baseCurrency = createSlice({
  name: 'baseCurrency',
  initialState: {
    code: 'USD',
    rates: [],
    status: 'idle',
    error: null
  },
  reducers: {
    setBaseCurrency: (state, action) => { state.code = action.payload; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBaseCurrencyRates.fulfilled, (state, action) => {
        const rates = [];
        for (const key in action.payload) {
          const item = {
            code: key,
            value: action.payload[key]
          }
          rates.push(item);
        }
        state.rates = rates;
        state.status = 'received';
      })
      .addCase(loadBaseCurrencyRates.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadBaseCurrencyRates.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.error.message;
      })
  }
});

const baseCurrencyReducer = baseCurrency.reducer;

export default baseCurrencyReducer;

export const {
  setBaseCurrency
} = baseCurrency.actions;

export const selectBaseCurrency = (state) => state.baseCurrency;

export const selectBaseCurrencyInfo = (state) => [state.baseCurrency.status, state.baseCurrency.error];

export const selectBaseCurrencyCode = (state) => state.baseCurrency.code;

export const selectBaseCurrencyRates = (state) => state.baseCurrency.rates;