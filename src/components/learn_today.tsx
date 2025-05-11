import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './styles/learn_today_comp.css'
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchUserProfile } from "../store/userSlice";
import { nextStep, setTutorialBox } from "../store/tutorialSlice";
import { tutorialSteps } from "../tutorial/level0";
import { useRef } from 'react';

const Learn_new: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const userInfo = useSelector((state: RootState) => state.user.userInfo);
    const loading = useSelector((state: RootState) => state.user.loading);
    const quizButtonRef = useRef<HTMLButtonElement | null>(null);
    const { isTutorial, currentStep } = useSelector((state: RootState) => state.tutorial);

    useEffect(() => {
    if (!userInfo) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (!userInfo) return;

    const updateBox = () => {
      if (quizButtonRef.current) {
        const rect = quizButtonRef.current.getBoundingClientRect();
        const padding = 5;
        dispatch(setTutorialBox({
          top: rect.top - padding,
          left: rect.left - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
        }));
      }
    };

    window.addEventListener('resize', updateBox);
    updateBox();

    return () => {
      window.removeEventListener('resize', updateBox);
    };
  }, [isTutorial, currentStep, userInfo]); // userInfo도 의존성에 추가!

  if (!userInfo || loading) return <p>로딩 중...</p>;

  const steps = tutorialSteps(userInfo.nickname);
  const stepConfig = steps.find(s => s.step === currentStep);
  const isQuizStep = isTutorial && stepConfig?.waitForAction && currentStep === 3;

  const handleQuizClick = () => {
    navigate('/quiz');
    if (isQuizStep) dispatch(nextStep());
  };
  
    return (
        <div className="learn-new-container">
            <div className="learn-new-container-info">
                <div className="img-container"></div>
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
                <button className="tutorial" onClick={() => navigate('/tutorial')}>튜토리얼</button>
                <button ref={quizButtonRef} className="quiz" onClick={handleQuizClick}>퀴즈 풀기</button>
            </div>
        </div>
    );
};

export default Learn_new;
