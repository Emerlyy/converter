const BASE_URL = 'https://api.exchangerate.host';

export const LATEST_RATES = BASE_URL + 'latest';

export const getAllCurrencies = () => BASE_URL + '/symbols';

export const getLatestRates = (base) => BASE_URL + '/lates?base=' + base;

export const convert = (from, to, amount) => BASE_URL + '/convert?from=' + from + '&to=' + to + '&amount=' + amount;