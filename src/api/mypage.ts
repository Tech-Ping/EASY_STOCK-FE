import axiosInstance from "./axiosInstance";

export const getMyStockStatus = async () => {
  const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/my/status/stocks`);
  return response.data;
};

export const getBookmarkStockStatus = async () => {
    const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/my/status/bookmarked`);
    return response.data;
  };