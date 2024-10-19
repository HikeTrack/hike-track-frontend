import axios from "axios";
import { ACCESS_TOKEN, BASE_URL } from "./constants";

export const axiosReg = axios.create({
  baseURL: BASE_URL,
});

export const axiosToken = axios.create({
  baseURL: BASE_URL,
});

axiosToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    console.log('Token:', token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, 
  (error) => {
    return Promise.reject(error);
  }
);