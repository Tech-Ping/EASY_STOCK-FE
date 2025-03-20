import React from "react";
import "../components/styles/stock_header.css";
interface StockHeaderProps {
  logo: string; // URL for stock logo
  name: string;
  currentPrice: string;
  change: string;
  changeRate: string;
  market: string;
  extraInfo: string; // e.g., "중3D 담140 신10개"
}

const StockHeader: React.FC<StockHeaderProps> = ({
  logo,
  name,
  currentPrice,
  change,
  changeRate,
  market,
  extraInfo,
}) => {
  const isPositive = change.startsWith("+");

  return (
    <div className="stock-header">
      <div className="stock-header-top">
        <img src={logo} alt={`${name} logo`} className="stock-logo" />
        <h2 className="stock-name">{name}</h2>
      </div>

      <div className="stock-price-section">
        <span className="stock-price">{currentPrice}</span>
        <span className={`stock-change ${isPositive ? "up" : "down"}`}>
          {isPositive ? "▲" : "▼"} {change} {changeRate}
        </span>
      </div>

      <div className="stock-extra-info">
        <span>{market}</span> | <span>{extraInfo}</span>
      </div>
    </div>
  );
};

export default StockHeader;
