import axios from "axios";
import axiosInstance from "./axiosInstance";

export const getStockList = async () => {
  const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/stocks`);
  return response.data;
};

export const getStockDetail = async (stockId: string) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/stocks/${stockId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  };

  export const setBookmark = async (stockId: number) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/bookmarks`, {
      stockId,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });
  
    return response.data;
  };