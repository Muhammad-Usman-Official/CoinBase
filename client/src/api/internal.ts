import axios from "axios";
import { TLoginCredentials, TRegisterCredentials } from "../types";

const homeUri = "http://localhost:3000";

const api = axios.create({
  baseURL: homeUri,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (loginCredentials: unknown) => {
  let response;

  try {
    response = await api.post(`/login`, loginCredentials);
  } catch (err) {
    return err;
  }

  return response;
};

export const register = async (registerCredentials: unknown) => {
  let response;

  try {
    response = await api.post("/register", registerCredentials);
  } catch (err: unknown) {
    return console.log(err);
  }

  return response;
};

export const logout = async () => {
  let response;

  try {
    response = await api.post("/logout");
    console.log("Logout response: ", response);
  } catch (err) {
    return err;
  }

  return response;
};
