import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import stocky from "../../images/stocky.png";
import "../../style/quiz.css";
import WrongAnswerModal from "./quiz_wrong";

const dummyData = {
  id: 1,
  question: "'주식을 매도한다'의 의미는 무엇일까요?",
  options: [
    "주식을 새로 구입하는 것",
    "보유하던 주식을 판매하는 것",
    "주식 가격을 조정하는 것",
  ],
  answerIndex: 1,
  levelType: "ZERO",
};

const Quiz_tutorial: React.FC = () => {
  const [quiz] = useState(dummyData);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showWrongModal, setShowWrongModal] = useState(false);
  const navigate = useNavigate();

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);

    if (index === quiz.answerIndex) {
      const dummyResult = {
        message: "정답입니다! 30 경험치가 추가되었습니다.",
        addedXp: 30,
        totalXp: 90,
        correct: true,
        allQuizProblemsSolved: true,
      };
      navigate("/quiz/result", { state: { data: dummyResult } });
    } else {
      setShowWrongModal(true);
    }
  };

  const quizNumber = quiz.id <= 5 ? quiz.id : quiz.id - 5;
  const quizLabels = ["첫번째 문제", "두번째 문제", "세번째 문제", "네번째 문제", "다섯번째 문제"];
  const quizText = quizLabels[quizNumber - 1] || "문제";

  return (
    <div className={`quiz-page-container ${showWrongModal ? "modal-active" : ""}`}>
      <Header
        title={
          <div>
            <img src={stocky} alt="logo" style={{ width: 35 }} />
            <span>스토기</span>
          </div>
        }
        showPrevButton
        backgroundColor="#ffff"
      />
      <main className="quiz-component-container">
        <p className="quiz-number">{quizText}</p>
        <p className="quiz-question">{quiz.question}</p>
        <div className="quiz-options">
          {quiz.options.map((option, index) => (
            <button
              key={index}
              className={`quiz-option ${selectedAnswer === index ? "selected" : ""}`}
              onClick={() => handleAnswerClick(index)}
            >
              {option}
            </button>
          ))}
        </div>
        {showWrongModal && <WrongAnswerModal onClose={() => setShowWrongModal(false)} />}
      </main>
    </div>
  );
};

export default Quiz_tutorial;
