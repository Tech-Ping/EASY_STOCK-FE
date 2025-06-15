import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import '../../style/candlechart.css';
import { getStockList } from '../../api/stocks';

interface StockData {
  x: string;
  y: [number, number, number, number];
}

interface StockItem {
  stockCode: string;
  stockName: string;
}

const Charts_tmp: React.FC = () => {
  const [stockList, setStockList] = useState<StockItem[]>([]);
  const [selectedStock, setSelectedStock] = useState<StockItem | null>(null);
  const [chartData, setChartData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // 선택된 종목 차트 데이터 가져오기
  const fetchStockData = async (stockCode: string) => {
  setLoading(true);
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const url = `${proxy}https://finance.naver.com/item/sise_day.nhn?code=${stockCode}&page=1`;

  try {
    const response = await axios.get(url);
    console.log('📥 HTML 로드 완료');

    const html = new DOMParser().parseFromString(response.data, 'text/html');
    const table = html.querySelector('table.type2');
    if (!table) {
      console.warn('❌ 테이블 안 찾힘 (HTML 구조 변경 가능)');
      setError('네이버 페이지 구조가 바뀌었을 수 있어요.');
      return;
    }

    const rows = Array.from(table.querySelectorAll('tr'))
      .filter(row => row.querySelectorAll('td').length === 7)
      .map(row => {
        const tds = row.querySelectorAll('td');
        const date = tds[0].textContent?.trim().replace(/\./g, '-') ?? '';
        const open = parseInt(tds[3].textContent!.replace(/,/g, ''));
        const high = parseInt(tds[4].textContent!.replace(/,/g, ''));
        const low = parseInt(tds[5].textContent!.replace(/,/g, ''));
        const close = parseInt(tds[1].textContent!.replace(/,/g, ''));
        return { x: date, y: [open, high, low, close] as [number, number, number, number] };
      });

    console.log('✅ 파싱된 rows 수:', rows.length);
    setChartData(rows.reverse());
    setError(null);
  } catch (e) {
    console.error('🧨 크롤링 에러', e);
    setError('네이버 데이터 크롤링 실패');
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    getStockList();
  }, []);

  useEffect(() => {
    if (selectedStock) {
      fetchStockData(selectedStock.stockCode);
    }
  }, [selectedStock]);

  const chartOptions: ApexOptions = {
    chart: { type: 'candlestick', height: 350 },
    xaxis: { type: 'category' },
    yaxis: { tooltip: { enabled: true } },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#3681EB',
          downward: '#EB3639',
        },
        wick: { useFillColor: true },
      },
    },
  };

  if (!selectedStock) return <p>종목을 불러오는 중입니다...</p>;
  if (loading) return <p>차트 불러오는 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="chart-container">
      <h2>{selectedStock.stockName} 일간 주가</h2>

      <select
        value={selectedStock.stockCode}
        onChange={(e) => {
          const next = stockList.find(s => s.stockCode === e.target.value);
          setSelectedStock(next || null);
        }}
      >
        {stockList.map(stock => (
          <option key={stock.stockCode} value={stock.stockCode}>
            {stock.stockName}
          </option>
        ))}
      </select>

      <ReactApexChart
        options={chartOptions}
        series={[{ data: chartData }]}
        type="candlestick"
        height={400}
      />
    </div>
  );
};

export default Charts_tmp;
