import axios from "axios";
import axiosInstance from "./axiosInstance";

export const getStockList = async () => {
  const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/stocks`);
  return response.data;
};

export const getInventory = async () => {
  const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/inventories`);
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

  interface QuoteResult {
    tradeType: 'BUY' | 'SELL';
    stockName: string;
    marketPrice: string;
    [key: string]: string; 
  }
  
  interface QuoteResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: QuoteResult;
  }
  
  export const getStockQuotes = async (
    stockId: string | number,
    type: 'BUY' | 'SELL'
  ): Promise<QuoteResult> => {
    const response = await axios.get<QuoteResponse>(
      `${process.env.REACT_APP_API_URL}/api/stocks/${stockId}/quotes?type=${type}`,
      {
        params: { type },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
  
    return response.data.result;
  };