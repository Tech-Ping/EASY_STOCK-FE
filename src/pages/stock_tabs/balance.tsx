import React, { useState } from 'react';
import './balance.css';

const keyMap: { [key: string]: string } = {
  marketType: "시장구분",
  growthType: "우회상장구분",
  marketCap: "시가총액(억)",
  shares: "상장주식수(주)",
  parValue: "자본금(억)",
  foreignOwnership: "액면가(원)",
  revenue: "매출액(억)",
  profit: "영업이익(억)",
  assets: "자산(억)",
  debt: "부채(억)",
  capital: "자본(억)",
};

const dummyData = {
  companyInfo: {
    marketType: "코스피",
    growthType: "정상",
    marketCap: "3,128,186",
    shares: "5,968,782,900",
    parValue: "7,780",
    foreignOwnership: "100",
  },
  debtInfo: {
    periods: ["24.09", "24.06", "24.03"], // 기간 (가로 헤더)
    categories: [
      { name: "revenue", values: ["2,250,000", "1,452,400", "718,640"] },
      { name: "profit", values: ["262,000", "185,400", "95,400"] },
      { name: "assets", values: ["4,913,680", "4,852,674", "4,789,700"] },
      { name: "debt", values: ["1,096,020", "1,062,220", "1,034,780"] },
      { name: "capital", values: ["3,817,250", "3,727,324", "3,712,243"] },
    ],
  },
};

const StockBalance: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"기업" | "재무">("기업");

  return (
    <div className="stock-balance-container">
      {/* 탭 버튼 */}
      <div className="stock-balance-buttons">
        <button
          className={`stock-balance-button ${selectedTab === "기업" ? "active" : ""}`}
          onClick={() => setSelectedTab("기업")}
        >
          기업
        </button>
        <button
          className={`stock-balance-button ${selectedTab === "재무" ? "active" : ""}`}
          onClick={() => setSelectedTab("재무")}
        >
          재무
        </button>
      </div>

      <div className="stock-balance-table-container">
        {/* 기업 정보 (companyInfo) */}
        {selectedTab === "기업" ? (
          <div>
            <div className="stock-balance-table-wrapper">
              <table className="stock-balance-table">
                <tbody>
                  {Object.entries(dummyData.companyInfo).map(([key, value]) => (
                    <tr key={key}>
                      <td className="font-medium">{keyMap[key] || key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* 재무 정보 (debtInfo) */
          <div>
            <div className="stock-balance-table-wrapper">
              <table className="stock-balance-table">
                <thead>
                  <tr>
                    <th>기간</th>
                    {dummyData.debtInfo.periods.map((period, index) => (
                      <th key={index}>{period}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dummyData.debtInfo.categories.map((category, index) => (
                    <tr key={index}>
                      <td className="font-medium">{keyMap[category.name] || category.name}</td>
                      {category.values.map((value, idx) => (
                        <td key={idx}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockBalance;
