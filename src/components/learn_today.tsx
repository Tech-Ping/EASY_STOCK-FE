import React, { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import './styles/learn_today_comp.css'
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchUserProfile } from "../store/userSlice";
import { setTutorialBox } from "../store/tutorialSlice";
import { tutorial0Steps } from "../tutorial/level0";

import profile_img from "../images/user_img-removebg.png";

const Learn_new: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const userInfo = useSelector((state: RootState) => state.user.userInfo);
    const loading = useSelector((state: RootState) => state.user.loading);
    const quizButtonRef = useRef<HTMLButtonElement | null>(null);
    const { isTutorial, currentStep } = useSelector((state: RootState) => state.tutorial);
    const tutorialRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
    if (!userInfo) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (!userInfo) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    const updateBox = () => {
      const padding = 5;

      if (isTutorial) {
        if (currentStep === 2 && quizButtonRef.current) {
          const rect = quizButtonRef.current.getBoundingClientRect();
          dispatch(setTutorialBox({
            top: rect.top - padding,
            left: rect.left - padding,
            width: rect.width + padding * 2,
            height: rect.height + padding * 2,
          }));
        } else if (currentStep === 14 && tutorialRef.current) {
          const rect = tutorialRef.current.getBoundingClientRect();
          dispatch(setTutorialBox({
            top: rect.top - padding,
            left: rect.left - padding,
            width: rect.width + padding * 2,
            height: rect.height + padding * 2,
          }));
        }
      }
    };
    

    window.addEventListener('resize', updateBox);
    updateBox();

    return () => {
      window.removeEventListener('resize', updateBox);
    };
  }, [isTutorial, currentStep, userInfo]); // userInfo도 의존성에 추가!

  if (!userInfo || loading) return <p>로딩 중...</p>;

  const handleQuizClick = () => {
    navigate('/quiz');
  };
  
    return (
        <div className="learn-new-container">
            <div className="learn-new-container-info">
                <div className="img-container">
                  <img src={profile_img}
                alt="profile image"
                className="profile-img"
                style={{
                    borderRadius:100,
                    width: 70,

                }}/>
                </div>
                <div className="info-container">
    <h3>
        <span className="highlight-name">{userInfo.nickname}</span>님 안녕하세요!
    </h3>
    <h3 className="date">2024년 10월 10일</h3>
    <h2 className="main">
        <span className="highlight-main">오늘의 주식 공부</span>하기
    </h2>
</div>
            </div>
            <div className="buttons">
                <button ref ={tutorialRef} className="tutorial" onClick={() => navigate('/tutorial')}>튜토리얼</button>
                <button ref={quizButtonRef} className="quiz" onClick={handleQuizClick}>퀴즈 풀기</button>
            </div>
        </div>
    );
};

export default Learn_new;
