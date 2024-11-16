import axios from "axios";
import { ACCESS_TOKEN, BASE_URL } from "./constants";

export const axiosReg = axios.create({
  baseURL: BASE_URL,
});

export const axiosToken = axios.create({
  baseURL: BASE_URL,
});

let logoutUser: (() => Promise<void>) | null = null;

export const setLogoutUserRef = (logoutFunction: () => Promise<void>) => {
  logoutUser = logoutFunction;
}

axiosToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, 
  (error) => {
    return Promise.reject(error);
  }
);

axiosToken.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && logoutUser) {
      await logoutUser();
    }
    return Promise.reject(error);
  }
);