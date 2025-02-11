import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useParams } from "react-router-dom";
import StockHeader from "../components/stock_header";

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

    const [loading, setLoading] = useState(false);
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
          {loading ? (
            <p>Loading...</p>
          ) : stockData ? (
            <>
              {/* Stock Header Component */}
              <StockHeader
                logo={stockData.logo}
                name={stockData.name}
                currentPrice={stockData.currentPrice}
                change={stockData.change}
                changeRate={stockData.changeRate}
                market={stockData.market}
                extraInfo={stockData.extraInfo}
              />
  
              {/* Other content (e.g., news, orders, etc.) */}
              <div className="stock-detail-tab">
                
              </div>
            </>
          ) : (
            <p>주식 정보를 불러올 수 없습니다.</p>
          )}
        </main>
        <Footer />
      </div>
    );
  };
  
  export default Stock_details;
  