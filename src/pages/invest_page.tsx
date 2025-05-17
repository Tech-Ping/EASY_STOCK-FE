import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import UserField from "../components/user_field";
import "../style/invest_page.css";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../api/auth";
import { getInventory, getStockList } from "../api/stocks"; 
import { setBookmark } from "../api/stocks";
import { cancelTrade, getTradeList, postTrade } from "../api/order";
import { getBookmarkStockStatus } from "../api/mypage";

interface InventoryItem {
  memberId: number;
  stockId: number;
  stockName: string;
  quantity: number;
  purchasePrice: number;
}

const StockInv: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("owned");
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [stockList, setStockList] = useState<any[]>([])
  const [favorites, setFavorites] = useState<string[]>([]);
  const [completedTrades, setCompletedTrades] = useState<any[]>([]);
  const [pendingTrades, setPendingTrades] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useState<null | {
          profileImage: number;
          level: string;
          tokenBudget: number;
          nickname: string;
          xpGuage: number;
        }>(null);
  const [inventoryList, setInventoryList] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile();
        if (res.isSuccess) {
          setUserInfo(res.result);
        } else {
          console.error("프로필 불러오기 실패:", res.message);
        }
      } catch (err) {
        console.error("API 에러:", err);
      }
    };

    const fetchAll = async () => {
      try {
        setLoading(true);
        const [
          stockRes,
          inventoryRes,
          completedRes,
          pendingRes,
          bookmarkRes
        ] = await Promise.all([
          getStockList(),
          getInventory(),
          getTradeList("COMPLETED"),
          getTradeList("PENDING"),
          getBookmarkStockStatus()
        ]);

        if (inventoryRes.isSuccess) setInventoryList(inventoryRes.result);
        if (completedRes.isSuccess) setCompletedTrades(completedRes.result);
        if (pendingRes.isSuccess) setPendingTrades(pendingRes.result);

        if (stockRes.isSuccess && bookmarkRes.isSuccess) {
          const bookmarkedNames = bookmarkRes.result.map((item: any) => item.stockName);
          const merged = stockRes.result.map((stock: any) => ({
            ...stock,
            bookmarked: bookmarkedNames.includes(stock.stockName)
          }));
          setStockList(merged);
        }
      } catch (err) {
        console.error("전체 데이터 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchAll();
  }, []);

  const stockMap = useMemo(() => {
    const map = new Map();
    stockList.forEach((s) => map.set(s.id, s));
    return map;
  }, [stockList]);
              
  const getCurrentPriceMap = useMemo(() => {
  const priceMap: Record<number, number> = {};
  stockList.forEach((s) => {
    priceMap[s.id] = s.stckPrpr;
  });
  return priceMap;
}, [stockList]);

  const handleCancel = async (tradeId: number) => {
  try {
    const result = await cancelTrade(tradeId);
    if (result.isSuccess) {
      alert("주문이 취소되었습니다.");
    } else {
      alert(`취소 실패: ${result.message}`);
    }
  } catch (error) {
    console.error(error);
    alert("요청 중 오류가 발생했습니다.");
  }
};

  const filteredInven = useMemo(() => inventoryList.filter((item) => item.quantity > 0), [inventoryList]);
  const visibleInven = useMemo(() => showAll ? filteredInven : filteredInven.slice(0, 3), [showAll, filteredInven]);
  const visiblePending = useMemo(() => showAll ? pendingTrades : pendingTrades.slice(0, 3), [showAll, pendingTrades]);
  const visibleComplete = useMemo(() => showAll ? completedTrades : completedTrades.slice(0, 3), [showAll, completedTrades]);

    const handleBookmarkToggle = async (stockId: number) => {
      try {
        const res = await setBookmark(stockId);
        console.log("북마크 응답:", res.result);
        if (res.isSuccess) {
          const isNowBookmarked = res.result.bookmarked;
          // 변경된 bookmarked 상태 반영
          setStockList((prevList) =>
            prevList.map((stock) =>
              stock.id === stockId ? { ...stock, bookmarked: !stock.bookmarked } : stock
            )
          );
        } else {
          console.error("북마크 토글 실패:", res.message);
        }
      } catch (err) {
        console.error("북마크 API 오류:", err);
      }
    };

    if (loading) {
      return (
        <div className="loading-container">
          <div className="spinner" />
          <p>주식 정보를 불러오는 중입니다...</p>
        </div>
      );
    }

    return (
        <div className="invest-page-container">
            <Header title="투자하기" backgroundColor="#F5F6F8"/>
            <main className="invest-page-component-container">
            <UserField userInfo={userInfo} />
            <div className="tab-buttons">
        <button
          className={activeTab === "owned" ? "active" : ""}
          onClick={() => setActiveTab("owned")}
        >
          보유주식
        </button>
        <button
          className={activeTab === "pending" ? "active" : ""}
          onClick={() => setActiveTab("pending")}
        >
          미체결 주문
        </button>
        <button
          className={activeTab === "history" ? "active" : ""}
          onClick={() => setActiveTab("history")}
        >
          거래 체결 내역
        </button>
      </div>

      {/*탭별 컨텐츠 */}
      <div className="tab-content">
        {activeTab === "owned" && (
          <div className="owned-stocks">
            <table>
              <thead>
                <tr>
                  <th>종목명</th>
                  <th>수량, 평가금액</th>
                  <th>매입가, 현재가</th>
                </tr>
              </thead>
              <tbody>
  {visibleInven.map((inv) => {
    
    
    const matchedStock = stockMap.get(inv.stockId);
    
    const currentPrice = matchedStock?.stckPrpr || 0;
    const evaluation = currentPrice * inv.quantity;

    return (
      <tr key={inv.stockId}>
        <td>{inv.stockName}</td>
        <td>
          {inv.quantity.toLocaleString()}
          <br />
          {evaluation.toLocaleString()}
        </td>
        <td>
          {inv.purchasePrice.toLocaleString()}
          <br />
          {currentPrice.toLocaleString()}
        </td>
      </tr>
    );
  })}
</tbody>
            </table>
            {filteredInven.length > 3 && (
      <button
        className="toggle-history-btn"
        onClick={() => setShowAll((prev) => !prev)}
      >
        {showAll ? "접기" : "더보기"}
      </button>
    )}
          </div>
        )}

        {activeTab === "pending" && (
          <div className="pending-orders">
             <table>
              <thead>
                <tr>
                  <th>종목명</th>
                  <th>주문 종류</th>
                  <th>체결 단가, 수량</th>
                </tr>
              </thead>
              <tbody>
              {visiblePending.map((trade) => (
                <tr key={trade.tradeId}>
                  <td 
                  onClick={() => handleCancel(trade.tradeId)}
                  style={{ cursor: "pointer", textDecoration: "underline" }}>{trade.stockName}</td>
                  <td>{trade.type === "BUY" ? "매수" : "매도"}</td>
                  <td>
                    {trade.price.toLocaleString()}
                    <br />
                    {trade.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {pendingTrades.length > 3 && (
      <button
        className="toggle-history-btn"
        onClick={() => setShowAll((prev) => !prev)}
      >
        {showAll ? "접기" : "더보기"}
      </button>
    )}
          </div>
        )}

        {activeTab === "history" && (
          <div className="trade-history">
             <table>
              <thead>
              <tr>
                  <th>종목명</th>
                  <th>주문 종류</th>
                  <th>체결 단가, 수량</th>
                </tr>
              </thead>
              <tbody>
              {visibleComplete.map((trade) => (
          <tr key={trade.tradeId}>
                  <td>{trade.stockName}</td>
                  <td>{trade.type === "BUY" ? "매수" : "매도"}</td>
                  <td>
                    {trade.price.toLocaleString()}
                    <br />
                    {trade.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
            {completedTrades.length > 3 && (
      <button
        className="toggle-history-btn"
        onClick={() => setShowAll((prev) => !prev)}
      >
        {showAll ? "접기" : "더보기"}
      </button>
    )}
  </div>
        )}
        </div>
        <div className="fixed-stock-list">

        {/* Stock Table */}
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>종목명</th>
                <th>현재가</th>
                <th>등락</th>
                <th>등락률</th>
              </tr>
            </thead>
            <tbody>
            {stockList.map((stock) => {
    const isPositive = stock.prdyVrss >= 0;
    return (
      <tr key={stock.id}>
        <td>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <button
            className={`favorite-btn ${stock.bookmarked ? "active" : ""}`}
            onClick={() => handleBookmarkToggle(stock.id)}
            >
              ★
            </button>
            <div>
              <a
                onClick={() => navigate(`/stocks/${stock.id}`)}
                className="stock-link"
              >
                {stock.stockName}
              </a>
              <div className="market-name">{stock.stockIndustry}</div>
            </div>
          </div>
        </td>
        <td className={`price ${isPositive ? "up" : "down"}`}>
          {stock.stckPrpr.toLocaleString()}
        </td>
        <td className={`change ${isPositive ? "up" : "down"}`}>
          {isPositive ? "▲" : "▼"} {Math.abs(stock.prdyVrss).toLocaleString()}
        </td>
        <td className={`change-rate ${isPositive ? "up" : "down"}`}>
          {stock.prdyCtrt}%
        </td>
      </tr>
    );
  })}
</tbody>
</table>
  </div>
    </div>
      </main>
      <Footer/>
    </div>
    );
};

export default StockInv;
