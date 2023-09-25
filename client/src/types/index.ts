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
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  content: string;
  source: {
    url: string;
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
  market_cap_rank: number;
}

export interface TBlog {
  _id: string;
  title: string;
  photo: string;
  content: string;
  authorUserName: string;
  authorName: string;
  authorEmail: string;
  createdAt: number | string;
  updatedAt: number | string;
}

export interface TCreateBlog {
  _id: string;
  author: string;
  content: string;
  title: string;
  photo: string;
}

export interface TSubmitBLog {
  title: string;
  content: string;
  photo: string | ArrayBuffer | null;
  author?: string;
}

export interface TUser {
  _id: string;
  email: string;
  username: string;
  auth: boolean;
}

export interface TState {
  user: TUser;
}

export interface TLoginUser {
  user: {
    _id: string;
    email: string;
    username: string;
  };
  auth: boolean;
}

export interface TComment {
  _id: string;
  authorUsername: string;
  content: string;
  createdAt: string;
}

export interface TPostComment {
  author: string;
  content: string;
  blog: string;
}

export interface TEditBlog {
  title: string;
  content: string;
  photo?: string | ArrayBuffer | null;
  blogId: string;
  author: string;
}
