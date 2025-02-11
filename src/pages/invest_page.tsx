import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import UserField from "../components/user_field";
import "../style/invest_page.css";
import { useNavigate } from "react-router-dom";

const Stock_inv: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("owned");
    const [favorites, setFavorites] = useState<string[]>([]); //관심주식

    const toggleFavorite = (stockName: string) => {
      setFavorites((prevFavorites) =>
        prevFavorites.includes(stockName)
          ? prevFavorites.filter((name) => name !== stockName)
          : [...prevFavorites, stockName] 
      );
    };

    /* dummy data*/
    const stockData = [
      { name: "LG에너지솔루션", price: "412,500", change: "+5,000", rate: "1.23%", market: "KOSPI" },
      { name: "현대차", price: "213,500", change: "-1,500", rate: "0.70%", market: "KOSPI" },
      { name: "SK하이닉스", price: "182,200", change: "+4,100", rate: "2.20%", market: "KOSPI" },
      { name: "비에이치아이", price: "11,800", change: "-470", rate: "4.15%", market: "KOSDAQ" },
    ];

    return (
        <div className="invest-page-container">
            <Header title="투자하기" backgroundColor="#F5F6F8"/>
            <main className="invest-page-compoent-container">
            <UserField/>
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
            {/* 관심 주식 버튼 */}
            <div className="favorite-buttons">
              {stockData.map((stock) => (
                <button
                  key={stock.name}
                  className={`favorite-btn ${favorites.includes(stock.name) ? "active" : ""}`}
                  onClick={() => toggleFavorite(stock.name)}
                >
                ★
                </button>
                ))}
          </div>

          {/* Stock Table */}
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
              {stockData.map((stock) => {
              const isPositive = stock.change.startsWith("+");
              return (
              <tr key={stock.name}>
                <td>
                  <a href="#" onClick={() => navigate(`/stocks/${stock.name}`)} className="stock-link">
                  {stock.name}
                  </a>
                  <div className="market-name">{stock.market}</div>
                </td>
                <td className={`price ${isPositive ? "up" : "down"}`}>{stock.price}</td>
                <td className={`change ${isPositive ? "up" : "down"}`}>
                  {isPositive ? "▲" : "▼"} {stock.change.replace("+", "").replace("-", "")}
                </td>
                <td className={`change-rate ${isPositive ? "up" : "down"}`}>
                  {stock.rate}
                </td>
              </tr>
              );
              })}
            </tbody>
          </table>
      </div>
            </main>
           <Footer/>
        </div>
    );
};

export default Stock_inv;


