import { filterCommonStock } from '../../Utils';

const apiKey = process.env.REACT_APP_FINHUB_APIKEY;

const baseURL = 'https://finnhub.io/api/v1';

export const searchStockBySymbol = async (searchString) => {
  if (!searchString.trim()) return [];
  const searchUrl = `${baseURL}/search?q=${searchString}&token=${apiKey}`;
  const response = await fetch(searchUrl);
  const { result, count } = await response.json();

  return { count, result: filterCommonStock(result) };
};

export const fetchStockPrice = async (stockInfo) => {
  if (!stockInfo) {
    return {};
  }
  const searchUrl = `${baseURL}/quote?symbol=${stockInfo.symbol}&token=${apiKey}`;
  const response = await fetch(searchUrl);
  const data = await response.json();

  return data;
};
