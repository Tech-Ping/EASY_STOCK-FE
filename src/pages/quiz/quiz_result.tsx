import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import stocky from "../images/stocky.png";
import stocky_clear from "../images/stocky-clear.png";
import "../style/quiz_result.css";

const dummyResponse = {
    message: "정답입니다! 30 경험치가 추가되었습니다.",
    addedXp: 30,
    totalXp: 30,
    correct: true,
};

const Quiz_Correct: React.FC = () => {
    const navigate = useNavigate();
    const nextLevelXpRequirement = getNextLevelXpRequirement(dummyResponse.totalXp);

    return (
        <div className="quiz-page-container">
            <Header title={
            <div>
            <img src={stocky} alt="logo" style={{width: 35}}/>
            <span>스토기</span>
            </div>
        } 
        showPrevButton  backgroundColor="#ffff"/>
        <main className="quiz-result-page">
        <img src={stocky_clear} alt="정답 캐릭터" className="correct-image" />
      <h2 className="correct-title">정답입니다!</h2>
      <p className="xp-gained">
        <span className="xp-highlight">+{dummyResponse.addedXp}xp</span>를 획득했어요.
      </p>
      <p className="next-level-info">
        다음 레벨까지 +{nextLevelXpRequirement}xp가 필요합니다.
      </p>
      <button className="home-button" onClick={() => navigate("/")}>
        홈으로
      </button>

        </main>

        </div>
    );
};

const getNextLevelXpRequirement = (currentXp: number) => {
    const levelXpRequirements = [
      { level: 0, name: "주식 뉴비", minXp: 0, maxXp: 49 },
      { level: 1, name: "주린이", minXp: 50, maxXp: 199 },
      { level: 2, name: "초보자", minXp: 200, maxXp: 600 },
      { level: 3, name: "중급자", minXp: 601, maxXp: 999 },
      { level: 4, name: "주식 고수", minXp: 1000, maxXp: 2000 },
      { level: 5, name: "주식 마니아", minXp: 2000, maxXp: 3499 },
      { level: 6, name: "주식 마스터", minXp: 3500, maxXp: Infinity }, // 마지막 레벨은 무한대 처리
    ];
  
    const currentLevelData = levelXpRequirements.find((level) => 
      currentXp >= level.minXp && currentXp <= level.maxXp
    );
  
    if (!currentLevelData) return 0; // 기본값 (예외 처리)
  
    return currentLevelData.maxXp - currentXp + 1; // 다음 레벨까지 필요한 XP
  };

export default Quiz_Correct;