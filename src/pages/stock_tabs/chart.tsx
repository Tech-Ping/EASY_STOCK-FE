import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ApexOptions } from 'apexcharts';

import '../../style/candlechart.css';
import ReactApexChart from 'react-apexcharts';

interface StockData {
  x: string;
  y: [number, number, number, number]; // open, high, low, close
}

const intervals = [
    { label: '1년', value: '1month' },
    { label: '한 달', value: '1week' },
    { label: '주간', value: '1day' },
    { label: '일간', value: '15min' },
];

const StockChart: React.FC = () => {
    const [chartData, setChartData] = useState<StockData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedInterval, setSelectedInterval] = useState('1month');
    
    const fetchStockData = async () => {
      setLoading(true);
      const symbol = '005930'; // Change to your target stock
      const apiKey = process.env.REACT_APP_STOCK_API; 
  
      try {
        const response = await axios.get(
          `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${selectedInterval}&outputsize=30&apikey=${apiKey}`
        );
  
        if (response.data && response.data.values) {
          const formattedData = response.data.values.map((item: any) => ({
            x: item.datetime,
            y: [
              parseFloat(item.open),
              parseFloat(item.high),
              parseFloat(item.low),
              parseFloat(item.close),
            ],
          })).reverse();
  
          setChartData(formattedData);
        } else {
          throw new Error('데이터 형식 이상');
        }
      } catch (err: any) {
        console.error('주식 정보 불러오기 실패', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
      useEffect(() => {
        fetchStockData();
      }, [selectedInterval]);

    if (loading) return <p>차트 불러오는 중...</p>;
    if (error) return <p>Error: {error}</p>;


    const chartOptions: ApexOptions = {
    chart: {
      type: 'candlestick' as const,
      height: 350,
      toolbar: { show: true }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        rotate: -45,
        style: {
          colors: '#888',
          fontSize: '10px'
        }
      }
    },
    yaxis: {
      tooltip: { enabled: true },
      opposite: true,
      labels: {
        formatter: (value: number) => `${value.toLocaleString()}`
      }
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['transparent'],
        opacity: 0.5
      }
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#3681EB', 
          downward: '#EB3639'
        },
        wick: {
          useFillColor: true
        }
      }
    }
  };

  const series = [{ data: chartData }];

  return (
    <div className="chart-container">
      <div className="chart-intervals">
        {intervals.map(interval => (
          <button
            key={interval.value}
            className={`interval-btn ${selectedInterval === interval.value ? 'active' : ''}`}
            onClick={() => setSelectedInterval(interval.value)}
          >
            {interval.label}
          </button>
        ))}
      </div>
      <ReactApexChart options={chartOptions} series={series} type="candlestick" height={400} />

    </div>
  );
};

export default StockChart;