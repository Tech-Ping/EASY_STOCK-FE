import axios from './axiosInstance'; // 토큰 포함된 인스턴스라면

export const postTrade = async (data: {
  type: 'BUY' | 'SELL',
  quantity: number,
  tradePrice: number,
  currentPrice: number,
  stockId: number
}) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/trades`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    },
  });
  
    return response.data;
  };

  
  export const getTradeList = async (status: string)=> {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/trades`, {
      params: { status },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  };

export const cancelTrade = async (tradeId: number) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_API_URL}/api/trades/${tradeId}/cancel`,
    null,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
};
