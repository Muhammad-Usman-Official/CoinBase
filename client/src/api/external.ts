/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import { TCoin, TNewsApi } from "../types";

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const newsApiCatagory = "general";
const NEWS_REQUEST_URL = `https://gnews.io/api/v4/top-headlines?category=${newsApiCatagory}&lang=en&country=us&max=30&apikey=${NEWS_API_KEY}`;

const COIN_REQUEST_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h&locale=en";

export const fetchNews = async (): Promise<TNewsApi> => {
  let response;

  try {
    response = await axios.get(NEWS_REQUEST_URL);
  } catch (err: any) {
    return err;
  }
  return response.data;
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
