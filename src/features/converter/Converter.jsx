import { useDispatch, useSelector } from "react-redux";
import ConverterSelect from "./ConverterSelect"
import { changeCurrencies, convertValues, selectInitialCurrency, selectQuoteCurrency, setInitialCurrencyCode, setInitialCurrencyValue, setQuoteCurrencyCode, setQuoteCurrencyValue } from "./converter-slice";
import { useEffect } from "react";
import { FaExchangeAlt } from 'react-icons/fa';
import './Converter.css';

const Converter = () => {

  const dispatch = useDispatch();

  const { code: initialCode, value: initialValue } = useSelector(selectInitialCurrency);

  const { code: quoteCode, value: quoteValue } = useSelector(selectQuoteCurrency);


  useEffect(() => {
    dispatch(convertValues());
  }, [dispatch]);

  const handleInitialSelect = (cur) => {
    dispatch(setInitialCurrencyCode(cur?.value || ''));
    dispatch(convertValues());
  }

  const handleInitialChange = (e) => {
    let value = e.target.value;
    dispatch(setInitialCurrencyValue(value));
    if (value.length > 0) {
      dispatch(convertValues());
    }
  }

  const handleQuoteSelect = (cur) => {
    dispatch(setQuoteCurrencyCode(cur?.value || ''));
    dispatch(convertValues());
  }

  const handleQuoteChange = (e) => {
    let value = e.target.value;
    dispatch(setQuoteCurrencyValue(value));
    if (value.length > 0) {
      dispatch(convertValues(true));
    }
  }
  return (
    <div className="converter">
      <h2 className="converter-title">Converter</h2>
      <div className="converter-main">
        <ConverterSelect currCode={initialCode} currValue={initialValue} handleSelect={handleInitialSelect} handleChange={handleInitialChange} />
        <FaExchangeAlt onClick={() => dispatch(changeCurrencies())} className="arrow-icon" />
        <ConverterSelect currCode={quoteCode} currValue={quoteValue} handleSelect={handleQuoteSelect} handleChange={handleQuoteChange} />
      </div>
    </div>
  )
}

export default Converter;