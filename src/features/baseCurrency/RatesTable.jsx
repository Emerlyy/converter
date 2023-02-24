import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBaseCurrencyRates, selectBaseCurrency } from "./base-currency-slice";

import './RatesTable.css';

const RatesTable = () => {

  const { code, rates, status, error } = useSelector(selectBaseCurrency);

  const dispatch = useDispatch();

  useEffect(() => {
    const promise = dispatch(loadBaseCurrencyRates());
    return () => promise.abort();
  }, [dispatch]);

  return (
    <>
      {error && <h2>{error}</h2>}
      {status === 'loading' && <h2>Loading ...</h2>}
      {status === 'received' && !error && (
        <table className="rates-table">
          <thead className="rates-table-head">
            <tr className="rates-table-row">
              <th className="rates-table-curr"></th>
              <th className="rates-table-rate">1 {code}</th>
              <th className="rates-table-rate">inv. 1 {code}</th>
            </tr>
          </thead>
          <tbody className="rates-table-body">
            {rates.map(({ code, value }) => (
              <tr key={code} className="rates-table-row">
                <td className="rates-table-curr">{code}</td>
                <td className="rates-table-rate">{value}</td>
                <td className="rates-table-rate">{(1 / value).toFixed(6)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default RatesTable;