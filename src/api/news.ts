import axios from "axios";
import axiosInstance from "./axiosInstance";

export const fetchNews = async (ticker: string) => {
  const token = localStorage.getItem("accessToken");
  const response = await axiosInstance.get(
    `${process.env.REACT_APP_API_URL}/api/flask/latest-news`,
    {
      params: { ticker },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
