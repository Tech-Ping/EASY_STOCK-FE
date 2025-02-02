import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import stocky from "../images/stocky.png";

const Quiz: React.FC = () => {
    return (
        <div className="quiz-page-container">
            <Header title={
            <div className="header-title-container">
            <img src={stocky} alt="logo" className="header-logo" style={{width: 35}}/>
            <span>스토기</span>
            </div>
        } 
        showPrevButton  backgroundColor="#ffff"/>
            <main className="quiz-compoent-container">
            주식 상세
            </main>
           <Footer/>
        </div>
    );
};

export default Quiz;