import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const instance = () => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL + "api/v1/",
    timeout: 5000,
  });
  return axiosInstance;
};
