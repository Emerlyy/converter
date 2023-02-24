import RatesTable from "../features/baseCurrency/RatesTable";
import BaseCurrencySelector from "../features/baseCurrency/BaseCurrencySelector";

import './TablePage.css';

const TablePage = () => {
  return (
    <div className="table-page">
      <div className="container">
        <div className="table-page-wrapper">
          <div>
            <h2>Currency:</h2>
            <BaseCurrencySelector />
          </div>
          <RatesTable />
        </div>
      </div>
    </div>
  );
}

export default TablePage;