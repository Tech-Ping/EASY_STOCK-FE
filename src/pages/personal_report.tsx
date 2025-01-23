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
                <div className="bottom-container"></div>
            </main>
           <Footer/>
        </div>
    );
};

export default Report;