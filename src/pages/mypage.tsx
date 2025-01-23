import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import '../style/mypage.css';
import UserField from "../components/user_field";
import Open_Report from "../components/open_report";

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
                    
                </div>
            </main>
           <Footer/>
        </div>
    );
};

export default MyPage;