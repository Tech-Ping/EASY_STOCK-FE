import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import UserField from "../components/user_field";
import "../style/invest_page.css";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../api/auth";
import { getStockList } from "../api/stocks"; 
import { setBookmark } from "../api/stocks";

const Stock_inv: React.FC = () => {
  const [userInfo, setUserInfo] = useState<null | {
          profileImage: number;
          level: string;
          tokenBudget: number;
          nickname: string;
          xpGauge: number;
        }>(null);
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
                const fetchStocks = async () => {
                  try {
                    const res = await getStockList();
                    if (res.isSuccess) {
                      setStockList(res.result);
                    } else {
                      console.error("주식 목록 불러오기 실패:", res.message);
                    }
                  } catch (err) {
                    console.error("주식 API 에러:", err);
                  }
                };
            
                fetchProfile();
                fetchStocks();
              }, []);
              
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("owned");
    const [stockList, setStockList] = useState<any[]>([])
    const [favorites, setFavorites] = useState<string[]>([]); //관심주식

    const handleBookmarkToggle = async (stockId: number) => {
      try {
        const res = await setBookmark(stockId);
        console.log("북마크 응답:", res.result);
        if (res.isSuccess) {
          // 변경된 bookmarked 상태 반영
          setStockList((prevList) =>
            prevList.map((stock) =>
              stock.id === stockId ? { ...stock, bookmarked: !stock.bookmarked } : stock
            )
          );
        } else {
          console.error("북마크 토글 실패:", res.message);
        }
      } catch (err) {
        console.error("북마크 API 오류:", err);
      }
    };

   

    return (
        <div className="invest-page-container">
            <Header title="투자하기" backgroundColor="#F5F6F8"/>
            <main className="invest-page-component-container">
            <UserField userInfo={userInfo} />
            <div className="tab-buttons">
        <button
          className={activeTab === "owned" ? "active" : ""}
          onClick={() => setActiveTab("owned")}
        >
          보유주식
        </button>
        <button
          className={activeTab === "pending" ? "active" : ""}
          onClick={() => setActiveTab("pending")}
        >
          미체결 주문
        </button>
        <button
          className={activeTab === "history" ? "active" : ""}
          onClick={() => setActiveTab("history")}
        >
          거래 체결 내역
        </button>
      </div>

      {/*탭별 컨텐츠 */}
      <div className="tab-content">
        {activeTab === "owned" && (
          <div className="owned-stocks">
            <table>
              <thead>
                <tr>
                  <th>종목명</th>
                  <th>수량, 평가금액</th>
                  <th>매입가, 현재가</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>삼성전자</td>
                  <td>2<br />20,000</td>
                  <td>10,234<br />10,000</td>
                </tr>
                <tr>
                  <td>현대차</td>
                  <td>2<br />20,000</td>
                  <td>25,000<br />10,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "pending" && (
          <div className="pending-orders">
             <table>
              <thead>
                <tr>
                  <th>종목명</th>
                  <th>주문 종류</th>
                  <th>체결 단가, 수량</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>삼성전자</td>
                  <td>매도</td>
                  <td>10,000<br />2</td>
                </tr>
                <tr>
                  <td>현대차</td>
                  <td>매수</td>
                  <td>25,000<br />3</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "history" && (
          <div className="trade-history">
             <table>
              <thead>
              <tr>
                  <th>종목명</th>
                  <th>주문 종류</th>
                  <th>체결 단가, 수량</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>삼성전자</td>
                  <td>매도</td>
                  <td>10,000<br />2</td>
                </tr>
                <tr>
                  <td>현대차</td>
                  <td>매수</td>
                  <td>25,000<br />3</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        </div>
        <div className="fixed-stock-list">

        {/* Stock Table */}
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>종목명</th>
                <th>현재가</th>
                <th>등락</th>
                <th>등락률</th>
              </tr>
            </thead>
            <tbody>
            {stockList.map((stock) => {
    const isPositive = stock.prdyVrss >= 0;
    return (
      <tr key={stock.id}>
        <td>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <button
            className={`favorite-btn ${stock.bookmarked ? "active" : ""}`}
            onClick={() => handleBookmarkToggle(stock.id)}
            >
              ★
            </button>
            <div>
              <a
                href="#"
                onClick={() => navigate(`/stocks/${stock.id}`)}
                className="stock-link"
              >
                {stock.stockName}
              </a>
              <div className="market-name">{stock.stockIndustry}</div>
            </div>
          </div>
        </td>
        <td className={`price ${isPositive ? "up" : "down"}`}>
          {stock.stckPrpr.toLocaleString()}
        </td>
        <td className={`change ${isPositive ? "up" : "down"}`}>
          {isPositive ? "▲" : "▼"} {Math.abs(stock.prdyVrss).toLocaleString()}
        </td>
        <td className={`change-rate ${isPositive ? "up" : "down"}`}>
          {stock.prdyCtrt}%
        </td>
      </tr>
    );
  })}
</tbody>
</table>
  </div>
    </div>
      </main>
      <Footer/>
    </div>
    );
};

export default Stock_inv;


