import axiosInstance from "./axiosInstance";

export const fetchNews = async (ticker: string) => {
  const response = await axiosInstance.get(
    `${process.env.REACT_APP_API_URL}/api/flask/latest-news`,
    { params: { ticker } }
  );
  return response.data;
};