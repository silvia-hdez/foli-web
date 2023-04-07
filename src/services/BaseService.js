import axios from "axios";
import { getAccessToken, logout } from "../stores/AccesTokenStore";

const INVALID_STATUS_CODES = [401];

export const createHttp = (useAccessToken = false) => {
  const http = axios.create({
    baseURL: "http://localhost:3000",
  });


  http.interceptors.request.use(
    (config) => {
      if (useAccessToken && getAccessToken()) {
       
        config.headers.Authorization = `Bearer ${getAccessToken()}`;
      }

      return config;
    },
    (err) => Promise.reject(err)
  );

  http.interceptors.response.use(
    (response) => response,
    (err) => {
      
      if (
        err?.response?.status &&
        INVALID_STATUS_CODES.includes(err.response.status)
      ) {
        if (getAccessToken()) {
          logout();

          if (window.location.pathname !== "/login") {
            window.location.assign("/login");
          }
        }
      }

      return Promise.reject(err);
    }
  );

  return http;
};
