import React, { useEffect, useState } from 'react';
import '../stock_tabs/order.css';
import { useParams } from 'react-router-dom';
import { getStockQuotes } from '../../api/stocks';
import { postTrade } from '../../api/order';
import { getInventory } from '../../api/stocks';

const StockOrders: React.FC = () => {
  const { stockId } = useParams<{ stockId: string }>();
  const [orderType, setOrderType] = useState<'BUY' | 'SELL'>('SELL');
  const [quantity, setQuantity] = useState(3);
  const [availableShares, setAvailableShares] = useState<number>(0);
  const [buyData, setBuyData] = useState<any>(null);
  const [sellData, setSellData] = useState<any>(null);
  const [price, setPrice] = useState<number>(0);
  const orderLabel = orderType === 'SELL' ? '매도' : '매수';


  useEffect(() => {
    if (buyData?.marketPrice) {
      setPrice(parseInt(buyData.marketPrice));
    }
  }, [buyData]);

  useEffect(() => {
    if (!stockId) return;

    const fetchQuotes = async () => {
      try {
        const [buy, sell] = await Promise.all([
          getStockQuotes(stockId, 'BUY'),
          getStockQuotes(stockId, 'SELL'),
        ]);
        
        setBuyData(buy);
        setSellData(sell);
      } catch (err) {
        console.error("호가 정보 요청 실패:", err);
      }
    };
    const fetchInventory = async () => {
      try {
        const res = await getInventory();
        if (res.isSuccess && res.result) {
          const matchingStock = res.result.find((item: any) => item.stockId === parseInt(stockId!));
          if (matchingStock) {
            setAvailableShares(matchingStock.quantity);
          }
        }
      } catch (err) {
        console.error("보유 주식 정보 불러오기 실패", err);
      }
    };

    fetchQuotes();
    fetchInventory();
    
  }, [stockId]);

  if (!buyData || !sellData) return <div>호가 정보를 불러오는 중...</div>;

  const currentPrice = parseInt(buyData.marketPrice);
  const stockName = buyData.stockName;

  const displayedSell = Array.from({ length: 5 }, (_, i) => ({
    price: parseInt(sellData[`ask${5 - i}`]),
    quantity: parseInt(sellData[`quantity${5 - i}`]),
  }));

  const displayedBuy = Array.from({ length: 5 }, (_, i) => ({
    price: parseInt(buyData[`ask${i + 1}`]),
    quantity: parseInt(buyData[`quantity${i + 1}`]),
  }));

  const totalAmount = quantity * price;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 100) setQuantity(newQuantity);
  };
  const handlePriceChange = (delta: number) => {
    const newPrice = price + delta;
    if (newPrice >= 0) setPrice(newPrice);
  };
  

  const handleOrder = async () => {
    if (orderType === 'SELL' && quantity > availableShares) {
      alert(`보유 수량보다 많은 수량을 매도할 수 없습니다.\n현재 보유: ${availableShares}주`);
      return;
    }
    const requestBody = {
      type: orderType,
      quantity,
      tradePrice: price,
      currentPrice,
      stockId: parseInt(stockId!)
    };

    try {
      const response = await postTrade(requestBody);
      alert(`[주문 완료]\n주문 상태: ${response.result.status}\n메시지: ${response.message}`);
    } catch (err) {
      console.error("주문 실패", err);
      alert("주문 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="order-container">
      <div className="order-book">
        <table>
          <thead>
            <tr><th>호가</th><th>잔량</th></tr>
          </thead>
          <tbody>
          {displayedSell.map((ask, idx) => (
          <tr
            key={`ask-${idx}`}
            className={`sell-row ${ask.price === currentPrice ? 'highlight-row' : ''}`}
          >
            <td>{ask.price.toLocaleString()}</td>
            <td>{ask.quantity.toLocaleString()}</td>
          </tr>
        ))}

          {displayedBuy.map((bid, idx) => (
          <tr
            key={`bid-${idx}`}
            className={`buy-row ${bid.price === currentPrice ? 'highlight-row' : ''}`}
          >
            <td>{bid.price.toLocaleString()}</td>
            <td>{bid.quantity.toLocaleString()}</td>
          </tr>
        ))}
          </tbody>
        </table>
      </div>

      <div className="order-panel">
        <div className="order-tabs">
          <button className={orderType === 'SELL' ? 'active' : ''} onClick={() => setOrderType('SELL')}>매도</button>
          <button className={orderType === 'BUY' ? 'active' : ''} onClick={() => setOrderType('BUY')}>매수</button>
        </div>

        <div className="stock-title">
          <strong>{stockName}</strong> 주식
        </div>

      <div className="quantity-selector">
        <button onClick={() => handleQuantityChange(-1)}>-</button>
        <span className="highlight-quantity">{quantity}주</span>
        <button onClick={() => handleQuantityChange(1)}>+</button>
      </div>
      <div className="price-input-container">
  <label htmlFor="price-input">주문가 (₩):</label>
  <div className="price-adjust">
    <button onClick={() => handlePriceChange(-100)}>-</button>
    <input
      type="number"
      id="price-input"
      value={price}
      onChange={(e) => setPrice(Number(e.target.value))}
      className="price-input"
      min={0}
    />
    <button onClick={() => handlePriceChange(100)}>+</button>
  </div>
</div>


      <p className="available-info">
        현재 <span className="highlight-owned">{availableShares}주 보유중</span>
      </p>
      <p className="total-price">
        총액 <strong>{totalAmount.toLocaleString()}</strong>원<br/>을 {orderLabel}합니다.
      </p>

      <button className="submit-order-btn" onClick={handleOrder}>
      {orderLabel}하기
      </button>

      </div>
    </div>
  );
};

export default StockOrders;