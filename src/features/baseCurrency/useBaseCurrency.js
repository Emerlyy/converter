import { useDispatch, useSelector } from "react-redux";
import { loadBaseCurrencyRates, selectBaseCurrencyCode, setBaseCurrency } from "./base-currency-slice";

export const useBaseCurrency = () => {
  const dispatch = useDispatch();

  const baseCurrency = useSelector(selectBaseCurrencyCode);

  const handleSelect = (cur) => {
    dispatch(setBaseCurrency(cur?.value || ''));
    dispatch(loadBaseCurrencyRates());
  }

  return [baseCurrency, handleSelect];
}