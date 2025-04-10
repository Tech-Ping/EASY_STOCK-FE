import React, {useEffect, useState} from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import '../style/home.css';
import UserField from "../components/user_field";
import Learn_new from "../components/learn_today";
import { getUserProfile } from "../api/auth";
import NewsCardComponent from "../components/news_comp";

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
                <div className="news-today">오늘의 뉴스</div>
                <div className="news-container">
                <NewsCardComponent
                  type="home"
                  title="“원재료비 증가 탓”… 롯데칠성음료, 3분기 영업익 전년대비 감소"
                  summary="롯데칠성음료는 연결 기준 3분기 영업이익이 787억원으로 전년 동기 대비 6.6% 감소했다고 5일 밝혔다. 반면 매출은 전년대비…"
                  link="https://example.com/news/lotte"
                  thumbnail="https://via.placeholder.com/50"
                />
                </div>
                </div>
            </main>
           <Footer/>
        </div>
    );
};

export default Home;