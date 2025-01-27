import React from "react";
import Stoken from "./stocken"; // Import the Stoken component you previously created
import "./styles/stock_info.css";

interface StockInfoProps {
  stockName: string;
  stokenValue: number;
  changePercentage: number;
}

const StockInfo: React.FC<StockInfoProps> = ({ stockName, stokenValue, changePercentage }) => {
  
  const isNegative = changePercentage < 0;
  const color = isNegative ? "#EB3639" : "#3681EB";

  return (
    <div className="stock-info-container">
      <h2 className="stock-name">{stockName}</h2>
      <div className ="stocken-length">
      <Stoken stokenValue={stokenValue} color={color} />
      </div>
      <div className="stock-change">
        <span>저번 달보다 </span>
        <span 
          className="change-value" 
          style={{ color: color }}
        >
          {Math.abs(changePercentage).toFixed(2)}%
        </span>
        {isNegative ? (
          <span className="down-icon" style={{ color: color }}>▼</span>
        ) : (
          <span className="up-icon" style={{ color: color }}>▲</span>
        )}
      </div>
    </div>
  );
};

export default StockInfo;
