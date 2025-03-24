import React, {useEffect, useState} from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import '../style/home.css';
import UserField from "../components/user_field";
import Learn_new from "../components/learn_today";
import { getUserProfile } from "../api/auth";

const Home: React.FC = () => {
    const [userInfo, setUserInfo] = useState<null | {
        profileImage: number;
        level: string;
        tokenBudget: number;
        nickname: string;
        xpGauge: number;
      }>(null);
    
      useEffect(() => {
        const fetchProfile = async () => {
          try {
            const res = await getUserProfile();
            if (res.isSuccess) {
              setUserInfo(res.result);
            } else {
              console.error("프로필 불러오기 실패:", res.message);
            }
          } catch (err) {
            console.error("API 에러:", err);
          }
        };
    
        fetchProfile();
      }, []);

    return (
        <div className="home-container">
            <Header title="홈"/>
            <main className="home-component-container">
                <Learn_new/>
                <div className="userfield-container">
                <UserField userInfo={userInfo} />
                </div>
            </main>
           <Footer/>
        </div>
    );
};

export default Home;