import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://api.spaceflightnewsapi.net/v4/articles';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};
