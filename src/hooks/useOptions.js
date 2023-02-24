export const useOptions = (currenciesList) => {

  const optionsMap = {};

  for (const { code, description } of Object.values(currenciesList)) {
    optionsMap[code] = {
      value: code,
      label: `${code} - ${description}`
    }
  };

  const options = Object.values(optionsMap);

  return [optionsMap, options];
};