import React from "react";
import Stoken from "./stocken";
import "./styles/stock_info.css";

interface StockInfoProps {
  stockName: string;
  stokenValue: number;
  changePercentage: number | string;
}

const StockInfo: React.FC<StockInfoProps> = ({ stockName, stokenValue, changePercentage }) => {
  
  const isNumber = typeof changePercentage === "number";
  const isNegative = isNumber && changePercentage < 0;
  const color = isNegative ? "#EB3639" : "#3681EB";

  return (
    <div className="stock-info-container">
      <h2 className="stock-name">{stockName}</h2>
      <div className ="stocken-length">
      <Stoken stokenValue={stokenValue} color={color}/>
      </div>
      <div className="stock-change">
        <span>저번 달보다 </span>
        {isNumber ? (
          <>
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
        </>
        ) : (
          <span className="change-value">-</span>
        )}
      </div>
    </div>
  );
};

export default StockInfo;
