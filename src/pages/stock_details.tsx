import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useParams, useLocation } from "react-router-dom";
import StockHeader from "../components/stock_header";
import StockNews from "./stock_tabs/news";
import StockDebt from "./stock_tabs/balance";
import StockInvestors from "./stock_tabs/investors";
import StockOrders from "./stock_tabs/order";
import StockChart from "./stock_tabs/chart";
import "../style/stock_details.css";
import axios from "axios";
import { getStockDetail } from "../api/stocks";


interface StockDetail {
  id: number;
  stockCode: string;
  stockName: string;
  stockInfo: string;
  imgUrl: string;
  stockIndustry: string;
  stckPrpr: number;
  prdyVrss: number;
  prdyCtrt: number;
  acmlTrPbmn: number;
  acmlVol: number;
}

  const Stock_details: React.FC = () => {
    const { stockName } = useParams<{ stockName: string }>();
    const [stockData, setStockData] = useState<StockDetail>();
    const [activeTab, setActiveTab] = useState("주문")

    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { stockId } = useParams<{ stockId: string }>();

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
  
    useEffect(() => {
      const fetchStock = async () => {
        try {
          const res = await getStockDetail(stockId!);
          if (res.isSuccess) {
            setStockData(res.result);
          } else {
            console.error("API 오류:", res.message);
          }
        } catch (err) {
          console.error("데이터 불러오기 실패:", err);
        } finally {
          setLoading(false);
        }
      };
    
      if (stockId) fetchStock();
    }, [stockId]);

    if (loading) return <div>불러오는 중...</div>;
    if (!stockData) return <div>주식 정보를 불러올 수 없습니다.</div>;


    return (
      <div className="stock-page-container">
        <Header title="주식 상세" showPrevButton backgroundColor="#F5F6F8" />
        <main className="stock-component-container">
          <div className="stock-info">
            <div className="stock-name">
              <img src={stockData.imgUrl} className="stock-logo" />
              {stockData.stockName}
            </div>
            <div className="stock-price-container">
              <h3 className="stock-price">{stockData.stckPrpr.toLocaleString()}</h3>
              <span
                className="stock-change"
                style={{ color: stockData.prdyVrss < 0 ? '#3681EB' : '#EB3639' }}
              >
                {stockData.prdyVrss < 0 ? '▼' : '▲'} {Math.abs(stockData.prdyVrss).toLocaleString()} {stockData.prdyCtrt}%
              </span>
            </div>
            <p className="stock-extra">{stockData.stockIndustry} {stockData.stockInfo}</p>
          </div>
    
          {/* 탭 영역 */}
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
          <div className="tab-content">{renderTabContent()}</div>
        </main>
        <Footer />
      </div>
    );
  }
  
  export default Stock_details;