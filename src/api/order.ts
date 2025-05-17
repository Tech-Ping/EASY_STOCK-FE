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

// 현재가 받아오기
const fetchCurrentPrices = async (stockIds: number[]) => {
  const priceMap: Record<number, number> = {};

  await Promise.all(
    stockIds.map(async (id) => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/stocks/${id}`);
        priceMap[id] = res.data.result.currentPrice;
      } catch (err) {
        console.error(`주식 ${id} 현재가 조회 실패`, err);
      }
    })
  );

  return priceMap;
};

// pending 주문 재재요청
const checkAndResubmitOrders = async (
  pendingTrades: any[],
  stockPriceMap: Record<number, number>
) => {
  for (const trade of pendingTrades) {
    const { type, tradePrice, quantity, stockId } = trade;
    const currentPrice = stockPriceMap[stockId];

    if (!currentPrice) continue;

    const shouldReorder =
      (type === "BUY" && currentPrice <= tradePrice) ||
      (type === "SELL" && currentPrice >= tradePrice);

    if (shouldReorder) {
      try {
        const result = await postTrade({
          type,
          quantity,
          tradePrice,
          currentPrice,
          stockId,
        });

        if (result.isSuccess) {
          console.log(`자동 주문 재요청 성공 (type: ${type}, stockId: ${stockId})`);
        } else {
          console.warn(`주문 실패: ${result.message}`);
        }
      } catch (error) {
        console.error(`주문 API 호출 실패`, error);
      }
    }
  }
};
