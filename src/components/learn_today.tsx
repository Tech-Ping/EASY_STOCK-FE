import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './styles/learn_today_comp.css'
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchUserProfile } from "../store/userSlice";

const Learn_new: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const userInfo = useSelector((state: RootState) => state.user.userInfo);
    const loading = useSelector((state: RootState) => state.user.loading);

  useEffect(() => {
    if (!userInfo) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, userInfo]);
  if (loading || !userInfo) return <p>로딩 중...</p>;
  
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
                <button className="quiz" onClick={() => navigate('/quiz')}>퀴즈 풀기</button>
            </div>
        </div>
    );
};

export default Learn_new;
