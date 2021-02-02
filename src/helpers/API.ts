const BASE_URL = "https://www.alphavantage.co/query";
const API_KEY = process.env.REACT_APP_API_KEY;

export const getCurrentExchangeRate = async (
  currencyFrom: string | undefined,
  currencyTo: string | undefined
) => {
  const response = await fetch(
    `${BASE_URL}?function=CURRENCY_EXCHANGE_RATE&from_currency=${currencyFrom}&to_currency=${currencyTo}&apikey=${API_KEY}`
  ).then((resp) => resp.json());

  return response["Realtime Currency Exchange Rate"];
};

export const getExchangeHistoryData = async (
  currencyFrom: string | undefined,
  currencyTo: string | undefined
) => {
  const response = await fetch(
    `${BASE_URL}?function=FX_DAILY&from_symbol=${currencyFrom}&to_symbol=${currencyTo}&apikey=${API_KEY}`
  ).then((resp) => resp.json());

  return response["Time Series FX (Daily)"];
};
