import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

const Stock_inv: React.FC = () => {
    return (
        <div className="invest-page-container">
            <Header title="투자하기" backgroundColor="#F5F6F8"/>
            <main className="invest-page-compoent-container">
                투자하기
            </main>
           <Footer/>
        </div>
    );
};

export default Stock_inv;