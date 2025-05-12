import axios from "axios";
import axiosInstance from "./axiosInstance";

export const getMyStockStatus = async () => {
  const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/my/status/stocks`);
  return response.data;
};

export const getBookmarkStockStatus = async () => {
    const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/my/status/bookmarked`);
    return response.data;
  };

  export const fetchMonthlyReport = async () => {
    const tocken = localStorage.getItem("accessToken"); // 또는 다른 방식으로 토큰 주입
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/my/monthly-report`, {
        headers: {
          Authorization: `Bearer ${tocken}`,
          "Content-Type": "application/json",
        },
      });
      return response.data.result; // reportDate, investmentType, topStocks, profitGraph
    } catch (error) {
      console.error("월간 리포트 호출 실패", error);
      throw error;
    }
  };


export const requestLevelUp = async () => {
  const res = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/level/up`);
  return res.data;
};

export const completeTutorial = async () => {
  const res = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/tutorials/complete`);
  return res.data;
};