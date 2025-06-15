import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      //console.log("Access Token:", token); 
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
