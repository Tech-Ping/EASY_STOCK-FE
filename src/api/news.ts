import axios from "axios";
import axiosInstance from "./axiosInstance";

export const fetchNews = async (ticker: string) => {
  const token = localStorage.getItem("accessToken");
  const response = await axiosInstance.get(
    `${process.env.REACT_APP_API_URL}/flask/latest-news`,
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

const tickers = ["삼성전자", "LG에너지솔루션", "SK하이닉스", "현대차", "비에이치아이"];

export const fetchAllNews = async () => {
  const allNews: any[] = [];
  try {
    for (const ticker of tickers) {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/flask/latest-news`,
        {
          params: { ticker }
        }
      );
      if (res.data.news) {
        const newsWithTicker = res.data.news.map((item: any) => ({
          ...item,
          ticker,
        }));
        allNews.push(...newsWithTicker);
      }
    }

    // 2. 중복 제거 (title + link 기준)
    const uniqueNews = allNews.filter(
      (item, index, self) =>
        index === self.findIndex(
          (t) => t.title === item.title && t.link === item.link
        )
    );

    // 3. ticker별 top 3 추출
    const top3PerTicker: any[] = [];
    for (const ticker of tickers) {
      const filtered = uniqueNews
        .filter((n) => n.ticker === ticker)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      top3PerTicker.push(...filtered.slice(0, 3));
    }

    // 4. 전체 정렬
    top3PerTicker.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return top3PerTicker;
  } catch (err) {
    console.error("뉴스 데이터 요청 실패:", err);
    throw err;
  }
};