/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import {
  TBlog,
  TComment,
  TEditBlog,
  TLoginCredentials,
  TPostComment,
  TRegisterCredentials,
  TSubmitBLog,
  TUser,
} from "../types";

const homeUri = "http://localhost:3000";

const api = axios.create({
  baseURL: homeUri,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (loginCredentials: TLoginCredentials) => {
  let response: AxiosResponse<TUser>;

  try {
    response = await api.post(`/login`, loginCredentials);
  } catch (err: any) {
    return err;
  }

  return response;
};

export const register = async (registerCredentials: TRegisterCredentials) => {
  let response: any;

  try {
    response = await api.post("/register", registerCredentials);
  } catch (err: any) {
    return err;
  }

  return response;
};

export const logout = async () => {
  let response;

  try {
    response = await api.post("/logout");
  } catch (err) {
    return err;
  }

  return response;
};

export const fetchBlogs = async (): Promise<AxiosResponse> => {
  let response: AxiosResponse<TBlog[]>;
  try {
    response = await api.get("/blog/all");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return err;
  }
  return response;
};

export const fetchBLogById = async (blogId: string) => {
  let response: AxiosResponse<TBlog>;

  try {
    response = await api.get(`/blog/${blogId}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return err;
  }

  return response;
};

export const postBlog = async (data: TSubmitBLog): Promise<AxiosResponse> => {
  let response: AxiosResponse<TSubmitBLog>;
  try {
    response = await api.post("/blog", data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return err;
  }
  return response;
};

export const fetchComments = async (blogId: string) => {
  let response: AxiosResponse<TComment>;
  try {
    response = await api.get(`/comment/${blogId}`);
  } catch (err: any) {
    return err;
  }
  return response;
};

export const createComment = async (data: TPostComment) => {
  let response: AxiosResponse<{ message: string }>;

  try {
    response = await api.post("/comment", data);
  } catch (err: any) {
    return err;
  }

  return response;
};

export const deleteBlog = async (blogId: string) => {
  let response: AxiosResponse<{ message: string }>;
  try {
    response = await api.delete(`/blog/${blogId}`);
  } catch (error: any) {
    return error;
  }

  return response;
};

export const editBlog = async (blog: TEditBlog) => {
  let response: AxiosResponse<{
    message: string;
  }>;
  try {
    response = await api.put("/blog", blog);
  } catch (error: any) {
    return error;
  }

  return response;
};

export const refreshUser = async () => {
  let response;
  try {
    response = await api.get("/refresh");
  } catch (err: any) {
    return err;
  }

  return response;
};
