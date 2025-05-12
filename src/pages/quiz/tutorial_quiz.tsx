import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import stocky from "../../images/stocky.png";
import "../../style/quiz.css";
import WrongAnswerModal from "./quiz_wrong";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store"
import { fetchUserProfile } from "../../store/userSlice";
import { setTutorialBox } from "../../store/tutorialSlice";

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
  const dispatch = useDispatch<AppDispatch>();
  const { isTutorial, currentStep } = useSelector((state: RootState) => state.tutorial);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
  if (isTutorial && currentStep === 3 && step3Ref.current) {
    const rect = step3Ref.current.getBoundingClientRect();
    const padding = 5;
    dispatch(setTutorialBox({
      top: rect.top + 4*padding,
      left: rect.left - padding,
      width: rect.width + padding * 2,
      height: rect.height - 4*padding,
    }));
  }
}, [isTutorial, currentStep, dispatch]);

  useEffect(() => {
    if (isTutorial && currentStep === 4 && nextButtonRef.current) {
      const rect = nextButtonRef.current.getBoundingClientRect();
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
        <div ref={step3Ref}>
          <p className="quiz-number">{quizText}</p>
          <p className="quiz-question">{quiz.question}</p>
          <p className="quiz-guide"> 정답을 클릭하면 바로 다음으로 넘어갑니다.</p>
        </div>
        <div className="quiz-options">
          {quiz.options.map((option, index) => (
            <button
              key={index}
              ref={index === quiz.answerIndex ? nextButtonRef : null} // ✅ 정답 버튼에만 ref 연결
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
