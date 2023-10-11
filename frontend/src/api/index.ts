import axios from "axios";

const AUTH_URL = import.meta.env.VITE_TWITCH_AUTH_URL;
const API_URL = import.meta.env.VITE_TWITCH_API_URL;
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const instance = () => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL + "api/v1/",
    timeout: 5000,
  });
  return axiosInstance;
};

export const authInstance = () => {
  const axiosInstance = axios.create({
    baseURL: AUTH_URL,
    timeout: 5000,
  });
  return axiosInstance;
};

export interface IHeaders {
  accessToken?: string;
  clientId?: string;
}

export const helixInstance = (headers?: IHeaders) => {
  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: headers?.accessToken,
      "Client-Id": headers?.clientId,
    },
    timeout: 5000,
  });
  return axiosInstance;
};
