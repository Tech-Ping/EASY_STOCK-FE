import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

const Stock_details: React.FC = () => {
    return (
        <div className="stock-page-container">
            <Header title="주식 상세" showPrevButton backgroundColor="#F5F6F8"/>
            <main className="stock-compoent-container">
            주식 상세
            </main>
           <Footer/>
        </div>
    );
};

export default Stock_details;