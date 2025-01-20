import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import '../style/home.css';
import UserField from "../components/user_field";
const Home: React.FC = () => {
    return (
        <div className="home-container">
            <Header title="홈"/>
            <main className="home-compoent-container">
                이지스톡
                <UserField/>
            </main>
           <Footer/>
        </div>
    );
};

export default Home;