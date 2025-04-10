import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import '../style/mypage.css';
import UserField from "../components/user_field";
import Open_Report from "../components/open_report";
import StockInfo from "../components/stock_info";
import { getUserProfile } from "../api/auth";
import { getMyStockStatus, getBookmarkStockStatus } from "../api/mypage";

interface MyStock {
  stockCode: string;
  stockName: string;
  currentPrice: number;
  lastMonthChangeRate: string;
}
interface BookmarkStock {
  stockCode: string;
  stockName: string;
  currentPrice: number;
  lastMonthChangeRate: string;
}

const MyPage: React.FC = () => {
    const [userInfo, setUserInfo] = useState<null | {
            profileImage: number;
            level: string;
            tokenBudget: number;
            nickname: string;
            xpGauge: number;
          }>(null);
    const [myStocks, setMyStocks] = useState<MyStock[]>([]);
    const [myBookmarkStocks, setBookmarkStocks] = useState<BookmarkStock[]>([]);
          useEffect(() => {
                  const fetchProfile = async () => {
                    try {
                      const res = await getUserProfile();
                      if (res.isSuccess) {
                        setUserInfo(res.result);
                      } else {
                        console.error("프로필 불러오기 실패:", res.message);
                      }
                    } catch (err) {
                      console.error("API 에러:", err);
                    }
                  };
              
                  const fetchMyStocks = async () => {
                    try {
                      const res = await getMyStockStatus();
                      if (res.isSuccess) {
                        setMyStocks(res.result);
                      } else {
                        console.error("내 투자 주식 데이터 실패:", res.message);
                      }
                    } catch (err) {
                      console.error("투자 주식 API 오류:", err);
                    }
                  };

                  const fetchBookmarkStocks = async () => {
                    try {
                      const res = await getBookmarkStockStatus();
                      if (res.isSuccess) {
                        setBookmarkStocks(res.result);
                      } else {
                        console.error("내 투자 주식 데이터 실패:", res.message);
                      }
                    } catch (err) {
                      console.error("투자 주식 API 오류:", err);
                    }
                  };
                  fetchBookmarkStocks();
                  fetchProfile();
                  fetchMyStocks();
                }, []);
                
    return (
        <div className="mypage-container">
            <Header title="마이페이지" backgroundColor="#F5F6F8"/>
            <main className="mypage-component-container">
            <UserField userInfo={userInfo} />
                <Open_Report/>
                <h3 className="title">
                    내가 투자한 주식 현황
                </h3>
                <div className="stock-componet-container">
                {myStocks.map((stock) => (
            <StockInfo
              key={stock.stockCode}
              stockName={stock.stockName}
              stokenValue={stock.currentPrice}
              changePercentage={
                stock.lastMonthChangeRate === "-" ? "-" : parseFloat(stock.lastMonthChangeRate)
              }
            />
          ))}
        </div>
                <h3 className="title">
                    북마크한 관심 기업
                </h3>
                <div className="bookmark-stock-container">
                {myBookmarkStocks.map((stock) => (
            <StockInfo
              key={stock.stockCode}
              stockName={stock.stockName}
              stokenValue={stock.currentPrice}
              changePercentage={
                stock.lastMonthChangeRate === "-" ? "-" : parseFloat(stock.lastMonthChangeRate)
              }
            />
          ))}
                </div>
            </main>
           <Footer/>
        </div>
    );
};

export default MyPage;