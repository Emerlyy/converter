import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { convert } from "../../client";

export const convertValues = createAsyncThunk(
  'converter/loadValues',
  async (inv = false, { getState }) => {

    const {
      initialCurrency: {
        code: initialCode,
        value: initialValue
      },
      quoteCurrency: {
        code: quoteCode,
        value: quoteValue
      }
    } = getState().converter;

    let res;

    if (!inv) {
      res = await fetch(convert(initialCode, quoteCode, initialValue));
    } else {
      res = await fetch(convert(quoteCode, initialCode, quoteValue));
    }
    const data = await res.json();
    data.inv = inv;
    return data;
  }
)

const converterSlice = createSlice({
  name: 'converter',
  initialState: {
    initialCurrency: {
      code: 'USD',
      value: '1'
    },
    quoteCurrency: {
      code: 'UAH',
      value: ''
    }
  },
  reducers: {
    setInitialCurrencyCode: (state, action) => { state.initialCurrency.code = action.payload },
    setInitialCurrencyValue: (state, action) => { state.initialCurrency.value = action.payload },
    setQuoteCurrencyCode: (state, action) => { state.quoteCurrency.code = action.payload },
    setQuoteCurrencyValue: (state, action) => { state.quoteCurrency.value = action.payload },
    changeCurrencies: (state) => { [state.initialCurrency, state.quoteCurrency] = [state.quoteCurrency, state.initialCurrency] }
  },
  extraReducers: (builder) => {
    builder
      .addCase(convertValues.fulfilled, (state, action) => {
        console.log('from -', action.payload.query.from, ' to -', action.payload.query.to);
        if (action.payload.inv) {
          state.quoteCurrency.value = action.payload.query.amount;
          state.initialCurrency.value = action.payload.result === null ? 0 : action.payload.result;
        } else {
          state.initialCurrency.value = action.payload.query.amount;
          state.quoteCurrency.value = action.payload.result === null ? 0 : action.payload.result;
        }
      })
  }
});



const converterReducer = converterSlice.reducer;

export default converterReducer;

export const {
  setInitialCurrencyCode,
  setQuoteCurrencyCode,
  setInitialCurrencyValue,
  setQuoteCurrencyValue,
  changeCurrencies
} = converterSlice.actions;

export const selectInitialCurrency = (state) => state.converter.initialCurrency;

export const selectQuoteCurrency = (state) => state.converter.quoteCurrency;