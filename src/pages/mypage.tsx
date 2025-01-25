import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import '../style/mypage.css';
import UserField from "../components/user_field";
import Open_Report from "../components/open_report";
import StockInfo from "../components/stock_info";

const MyPage: React.FC = () => {
    return (
        <div className="mypage-container">
            <Header title="마이페이지" backgroundColor="#F5F6F8"/>
            <main className="mypage-component-container">
                <UserField/>
                <Open_Report/>
                <h3 className="title">
                    내가 투자한 주식 현황
                </h3>
                <div className="stock-componet-container">
                    <StockInfo stockName="삼성전자" stokenValue={60300} changePercentage={10.3} />
                </div>
                <h3 className="title">
                    북마크한 관심 기업
                </h3>
                <div className="bookmark-stock-container">
                    
                </div>
            </main>
           <Footer/>
        </div>
    );
};

export default MyPage;