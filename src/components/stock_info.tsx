import React from "react";
import Stoken from "./stocken";
import "./styles/stock_info.css";

interface StockInfoProps {
  stockName: string;
  stokenValue: number;
  changePercentage: number | string;
}

const StockInfo: React.FC<StockInfoProps> = ({ stockName, stokenValue, changePercentage }) => {
  
  const isEmpty = changePercentage === "" || changePercentage === null || changePercentage === undefined;

  const isNegative =
    typeof changePercentage === "string"
      ? changePercentage.trim().startsWith("-")
      : changePercentage < 0;
  const color = isNegative ? "#3681EB":"#EB3639";

  return (
    <div className="stock-info-container">
      <h2 className="stock-name">{stockName}</h2>
      <div className ="stocken-length">
      <Stoken stokenValue={stokenValue} color={color}/>
      </div>
      <div className="stock-change">
        <span>저번 달보다 </span>
        {!isEmpty ?  (
          <>
        <span 
          className="change-value" 
          style={{ color: color }}
        >
          {String(changePercentage).replace("-", "").trim()}%
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
