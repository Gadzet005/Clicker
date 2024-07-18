import axios from "axios";
import { setNotAuthAction } from "../store/userReducers";
import { store } from "../store";

export const host = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export const authHost = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export const walletHost = axios.create({
  baseURL: process.env.REACT_APP_WALLET_SERVER_URL,
});

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

const authErrorHandler = (error) => {
  if (error.response.status === 401) {
    localStorage.removeItem("token");
    store.dispatch(setNotAuthAction());
    return Promise.reject("Unauthorized");
  }
  return Promise.reject(error);
};

authHost.interceptors.request.use(authInterceptor);
authHost.interceptors.response.use(
  (response) => response,
  (error) => authErrorHandler(error)
);
