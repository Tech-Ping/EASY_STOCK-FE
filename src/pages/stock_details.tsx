import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useParams } from "react-router-dom";
import StockHeader from "../components/stock_header";
import StockNews from "./stock_tabs/news";
import StockDebt from "./stock_tabs/chart";
import StockInvestors from "./stock_tabs/investors";
import StockOrders from "./stock_tabs/order";
import StockChart from "./stock_tabs/chart";

interface StockDetail {
    logo: string;
    name: string;
    currentPrice: string;
    change: string;
    changeRate: string;
    market: string;
    extraInfo: string;
  }

const dummyStockData = {
    logo: "../images/stocky.png",
    name: "삼성전자",
    currentPrice: "213,500",
    change: "-1,500",
    changeRate: "0.70%",
    market: "KOSPI",
    extraInfo: "중3D 담140 신10개",
  };

  
  const Stock_details: React.FC = () => {
    const { stockName } = useParams<{ stockName: string }>();
    const [stockData, setStockData] = useState<StockDetail | null>(dummyStockData);
    const [activeTab, setActiveTab] = useState("주문")

    const [loading, setLoading] = useState(false);

    const renderTabContent = () => {
      switch (activeTab) {
        case "주문":
          return <StockOrders />;
        case "차트":
          return <StockChart />;
        case "투자자":
          return <StockInvestors />;
        case "뉴스":
          return <StockNews />;
        case "기업채무":
          return <StockDebt />;
      }
    };
  
  /*
    useEffect(() => {
      setLoading(true);
  
      // Simulate API call with a delay
      setTimeout(() => {
        if (!stockName) {
          console.error("Stock name is undefined");
          setLoading(false);
          return;
        }
        
        fetch()
          .then((response) => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
          })
          .then((data) => {
            setStockData(data);
          })
          .catch((error) => {
            console.error("Error fetching stock details:", error);
            setStockData(dummyStockData); // Use dummy data on error
          })
          .finally(() => {
            setLoading(false);
          });
      }, 1500); // Simulate a delay of 1.5 seconds
    }, [stockName]);
  */
    return (
      <div className="stock-page-container">
        <Header title="주식 상세" showPrevButton backgroundColor="#F5F6F8" />
        <main className="stock-component-container">
          <div className="stock-header">
            <img src={dummyStockData.logo} alt="Stock Logo" className="stock-logo" />
            <div className="stock-info">
              <h2 className="stock-name">{dummyStockData.name}</h2>
              <h3 className="stock-price">
                {dummyStockData.currentPrice}{" "}
                <span className="stock-change" style={{ color: dummyStockData.change.startsWith('-') ? 'blue' : 'red' }}>
                  {dummyStockData.change} {dummyStockData.changeRate}
                </span>
              </h3>
              <p className="stock-extra">{dummyStockData.market} | {dummyStockData.extraInfo}</p>
            </div>
          </div>
  
          {/* 탭 메뉴 */}
          <div className="tab-buttons">
            {["주문", "차트", "투자자", "뉴스", "기업채무"].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
  
          {/* 탭별 콘텐츠 렌더링 */}
          <div className="tab-content">{renderTabContent()}</div>
        </main>
        <Footer />
      </div>
    );
  };
  
  export default Stock_details;
  