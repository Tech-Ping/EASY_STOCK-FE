import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <Header title="홈"/>
            <main className="home-compoent-container">
                이지스톡
            </main>
           <Footer/>
        </div>
    );
};

export default Home;