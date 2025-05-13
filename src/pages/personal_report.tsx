import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import '../style/personal_report.css';
import { fetchMonthlyReport } from "../api/mypage";
import ReactApexChart from "react-apexcharts";
import StockInfo from "../components/stock_info";
import image from "../images/stocky-clear.png";

type Stock = {
    stockCode: string;
    stockName: string;
    currentPrice: number;
    lastMonthChangeRate: string;
  };
  
  type ProfitGraphEntry = {
    date: string;
    totalTradeAmount: number;
    realProfit: number;
    realProfitRate: string;
  };
  

const Report: React.FC = () => {
    const [reportDate, setReportDate] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [topStocks, setTopStocks] = useState<Stock[]>([]);
    const [profitGraph, setProfitGraph] = useState<ProfitGraphEntry[]>([]);
  
    useEffect(() => {
        const loadReport = async () => {
        try {
            const data = await fetchMonthlyReport();
            setReportDate(data.reportDate);
            setType(data.investmentType.type);
            setDescription(data.investmentType.description);
            setTopStocks(data.topStocks);
            setProfitGraph(data.profitGraph);
        } catch (err) {
            console.error("리포트 로딩 실패", err);
        }
        };

        loadReport();
    }, []);


    const parsedProfitRates: number[] = [];
    profitGraph.forEach((entry, index) => {
  const raw = entry.realProfitRate?.replace("%", "");
  let rate = raw ? parseFloat(raw) : 0;

  if (rate === -100.0 && index > 0) {
    // 주말 등의 -100.0% → 전날 값으로 대체
    rate = parsedProfitRates[index - 1] ?? 0;
  }

  parsedProfitRates.push(rate);
});

    const chartOptions = {
        chart: {
          type: "line" as const,
          height: 350,
          zoom: { enabled: false },
        },
        xaxis: {
            categories: profitGraph.map((item) => item.date),
            labels: {
              show: false,
            },
          },
        tooltip: {
          y: {
            formatter: (val: number) => `${val.toLocaleString()}%`,
          },
        },
      };
    
      const chartSeries = [
        {
          name: "실 수익률(%)",
          data: parsedProfitRates,
        },
      ];

      
  
    return (
        <div className="report-container">
            <Header title="투자 리포트" backgroundColor="#F5F6F8" showPrevButton/>
            <main className="report-component-container">
                <div className="top-container">
                    <div className="report-date">{reportDate}</div>
                    <div className="investment-type-row">
                        <div className="investment-type-text">
                        <span className="investment-label">나의 이번 달 투자 유형은<br /></span>
                        <span className="investment-type">{type}</span>
                        </div>
                        <img src={image} alt="투자 유형 아이콘" className="type-image" />
                    </div>
                    <div className="type-description">{description}</div>
                </div>
                <div className="bottom-container">
                    <div className="monthly-stock">
                        <h3 className="title">
                        이번 달 주요 투자 주식 Top 5
                        </h3>
                        <div className="top-stock-container">
                            {topStocks.map((stock) => (
                            <StockInfo
                            key={stock.stockCode}
                            stockName={stock.stockName}
                            stokenValue={stock.currentPrice}
                            changePercentage={
                            stock.lastMonthChangeRate === "-" ? "-" : parseFloat(stock.lastMonthChangeRate)
                            }
                            />
                            ))}
                        </div>
                        <h3 className="title">
                        수익률 그래프
                        </h3>
                        <div className="chart-wrapper">
                            <ReactApexChart
                            options={chartOptions}
                            series={chartSeries}
                            type="line"
                            height={250}
                            />
                        </div>
                    </div>
                </div>
            </main>
           <Footer/>
        </div>
    );
};

export default Report;