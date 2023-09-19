/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import { newsApiKey } from "../config";
import { TCoin, TNewsApi } from "../types";

const NEWS_REQUEST_URL = `https://newsapi.org/v2/everything?q=business AND blockchain&sortBy=publishedAt&language=en&apiKey=${newsApiKey}`;

const COIN_REQUEST_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h&locale=en";

export const fetchNews = async (): Promise<TNewsApi> => {
  try {
    const response: AxiosResponse<TNewsApi> = await axios.get(NEWS_REQUEST_URL);
    return response.data;
  } catch (err: any) {
    return err;
  }
};

export const fetchCoins = async (): Promise<AxiosResponse> => {
  let res: AxiosResponse<TCoin[]>;

  try {
    res = await axios.get(COIN_REQUEST_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err: any) {
    return err;
  }
  return res;
};
