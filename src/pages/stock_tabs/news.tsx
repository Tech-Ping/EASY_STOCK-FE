import React, { useEffect, useState } from 'react';
import { fetchNews } from '../../api/news';
import NewsCardComponent from '../../components/news_comp';

interface NewsItem {
  date: string;
  link: string;
  title: string;
}
interface StockNewsProps {
  ticker: string;
}

const StockNews: React.FC<StockNewsProps> = ({ ticker }) => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetchNews(ticker);
        setNewsList(response.news); // response.news에 배열이 있음
      } catch (err) {
        console.error("뉴스 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    if (ticker) loadNews();
  }, [ticker]);
  
  return (
    <div className="stock-news">
      <h3>뉴스</h3>
      {loading ? (
        <p>뉴스를 불러오는 중...</p>
      ) : (
        <div className="news-list">
          {newsList.map((item, idx) => (
            <NewsCardComponent
              key={idx}
              type="inpage"
              title={item.title}
              date={item.date}
              link={item.link}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StockNews;