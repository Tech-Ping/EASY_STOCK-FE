import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import '../style/home.css';
import UserField from "../components/user_field";
import Learn_new from "../components/learn_today";
const Home: React.FC = () => {
    return (
        <div className="home-container">
            <Header title="홈"/>
            <main className="home-component-container">
                <Learn_new/>
                <UserField/>
            </main>
           <Footer/>
        </div>
    );
};

export default Home;