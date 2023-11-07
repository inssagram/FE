import axios, { AxiosInstance } from "axios";

const BASE_URL = process.env.BASE_URL;

const customAxios: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

customAxios.interceptors.request.use(
  async (config) => {
    try {
      const accessToken = sessionStorage.getItem("token") || null;

      if (accessToken) {
        config.headers["Authorization"] = accessToken;
      }

      return config;
    } catch (error) {
      console.error("Error getting access token:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  async (error) => {
    const err = error;

    if (err.response?.status === 405) {
      alert("로그아웃 되었습니다.");
    }

    return Promise.reject(error);
  }
);

export default customAxios;
