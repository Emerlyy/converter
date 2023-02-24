import { combineReducers, configureStore } from "@reduxjs/toolkit";
import baseCurrencyReducer from "./features/baseCurrency/base-currency-slice";
import converterReducer from "./features/converter/converter-slice";
import currenciesReducer from "./features/currencies/currencies-slice";

const rootReducer = combineReducers({
  baseCurrency: baseCurrencyReducer,
  currencies: currenciesReducer,
  converter: converterReducer
});

export const store = configureStore({
  devTools: true,
  reducer: rootReducer,
})