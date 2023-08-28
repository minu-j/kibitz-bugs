import axios from "axios";

const API_URL = import.meta.env.VITE_TWITCH_API_URL;

export const instance = () => {
  const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
  });
  return axiosInstance;
};
