import React, {useEffect, useRef, useState} from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import '../style/home.css';
import UserField from "../components/user_field";
import Learn_new from "../components/learn_today";
import { getUserProfile } from "../api/auth";
import NewsCardComponent from "../components/news_comp";
import { fetchAllNews } from "../api/news";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setTutorialBox } from "../store/tutorialSlice";

const Home: React.FC = () => {
    const [userInfo, setUserInfo] = useState<null | {
        profileImage: number;
        level: string;
        tokenBudget: number;
        nickname: string;
        xpGuage: number;
      }>(null);
      const [news, setNews] = useState<any[]>([]);
      const uniqueNews = news.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.link === item.link)
      );
   
      const stockBtnRef = useRef<HTMLDivElement>(null);
      const { isTutorial, currentStep } = useSelector((state: RootState) => state.tutorial);
      const dispatch = useDispatch<AppDispatch>();
      const userFieldRef = useRef<HTMLDivElement>(null);

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
        const loadNews = async () => {
          try {
            const allNews = await fetchAllNews();
            setNews(allNews);
          } catch (err) {
            console.error("뉴스 로드 실패:", err);
          }
        };
    
        fetchProfile();
        loadNews();
      }, []);

      useEffect(() => {
    if (isTutorial && currentStep === 12 && stockBtnRef.current) {
      const rect = stockBtnRef.current.getBoundingClientRect();
      const padding = 5;
      dispatch(setTutorialBox({
        top: rect.top - padding,
        left: rect.left - padding,
        width: rect.width + padding * 2,
        height: rect.height + padding* 2 ,
      }));
    }
  }, [isTutorial, currentStep, dispatch]);

  useEffect(() => {
  if (isTutorial && currentStep === 13 && userFieldRef.current) {
    const rect = userFieldRef.current.getBoundingClientRect();
    const padding = 5;
    dispatch(setTutorialBox({
      top: rect.top - padding,
      left: rect.left - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
    }));
  }
}, [isTutorial, currentStep, dispatch]);

    return (
        <div className="home-container">
            <Header title="홈"/>
            <main className="home-component-container">
                <Learn_new/>
                <div className="userfield-container">
                  <div ref={userFieldRef}>
                  <UserField userInfo={userInfo} />
                </div>
                <div ref={stockBtnRef}>
                  <div className="news-today">오늘의 뉴스</div>
                  <div className="news-container">
                    {uniqueNews.slice(0, 5).map((item, idx) => (
                    <NewsCardComponent
                      key={idx}
                      type="home"
                      title={item.title}
                      summary={""}
                      link={item.link}
                      thumbnail="https://via.placeholder.com/50"
                    />
                    ))}
                  </div>
                </div>
              </div>
            </main>
           <Footer/>
        </div>
    );
};

export default Home;