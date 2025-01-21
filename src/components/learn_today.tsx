import React from "react";
import './styles/learn_today_comp.css'

const Learn_new: React.FC = () => {
    return (
        <div className="learn-new-container">
            <div className="learn-new-container-info">
                <div className="img-container"></div>
                <div className="info-container">
    <h3>
        <span className="highlight-name">테크핑</span>님 안녕하세요!
    </h3>
    <h3 className="date">2024년 10월 10일</h3>
    <h2 className="main">
        <span className="highlight-main">오늘의 주식 공부</span>하기
    </h2>
</div>
            </div>
            <div className="buttons">
                <button className="tutorial">튜토리얼</button>
                <button className="quiz">퀴즈 풀기</button>
            </div>
        </div>
    );
};

export default Learn_new;
