import { useSelector } from "react-redux";
import Select from "react-select";
import { useOptions } from "../../hooks/useOptions";
import { selectAllCurrencies } from "../currencies/currencies-slice";
import { useBaseCurrency } from "./useBaseCurrency";

const BaseCurrencySelector = ({ children, ...props }) => {
  const currenciesList = useSelector(selectAllCurrencies);

  const [baseCurrency, handleSelect] = useBaseCurrency();
  const [optionsMap, options] = useOptions(currenciesList);

  return (
    <Select
      options={options}
      value={optionsMap[baseCurrency]}
      onChange={handleSelect}
      {...props}>
      {children}
    </Select>
  );
}

export default BaseCurrencySelector;