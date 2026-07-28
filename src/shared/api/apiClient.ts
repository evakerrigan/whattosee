import axios, { type AxiosInstance } from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://your-api-url.com/';

let bearerToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  bearerToken = token;
};

export const getAuthToken = (): string | null => bearerToken;

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  if (bearerToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${bearerToken}`;
  }
  return config;
});
