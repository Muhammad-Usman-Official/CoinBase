import { Url } from "url";

export type TNavs = {
  name: string;
  link: string;
  active: boolean;
  id: number;
};

export type TLoginCredentials = {
  email: string;
  password: string;
};

export type TRegisterCredentials = {
  email: string;
  username: string;
  password: string;
  name: string;
};

export interface TArticle {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  source: {
    id: string | null;
    name: string;
  };
}

export interface TNewsApi {
  source: {
    id: string | null;
    name: string;
  };
  articles: TArticle[];
}

export interface TCoin {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_24h: number;
}

export interface TBlog {
  _id: string;
  title: string;
  photoPath: string;
  content: string;
  author: string;
  createdAt?: number;
  updatedAt?: number;
}
