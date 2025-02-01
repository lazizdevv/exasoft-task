import axios from "axios";
import { loadState } from "../utils/states";

const BASE_URL = import.meta.env.VITE_API_URL;

const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "/",
  },
});

request.interceptors.request.use((config) => {
  const token = loadState<string>("exasoft", "");
  console.log(token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("Request yuborilmoqda:", config);
  return config;
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("exasoft");
      window.history.pushState(null, "", "/");
    }
    console.error("Xatolik yuz berdi:", error);
    return Promise.reject(error);
  }
);

export default request;
