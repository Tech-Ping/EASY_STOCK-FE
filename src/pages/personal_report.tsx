import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import '../style/personal_report.css';

const Report: React.FC = () => {
    return (
        <div className="report-container">
            <Header title="투자 리포트" backgroundColor="#F5F6F8" showPrevButton/>
            <main className="report-component-container">
                투자리포트
                <div className="top-container">

                </div>
                <div className="bottom-container">
                    <div className="monthly-stock">
                        <h3 className="title">
                        이번 달 주요 투자 주실 Top 5
                        </h3>
                        <h3 className="title">
                        총 투자금-실 수익 변동 그래프
                        </h3>
                    </div>
                </div>
            </main>
           <Footer/>
        </div>
    );
};

export default Report;