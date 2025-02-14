import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import stocky from "../../images/stocky.png";
import "../../style/quiz.css";
import WrongAnswerModal from "./quiz_wrong";

const dummyData = {
    "id": 2,
    "question": "예수금과 미수금의 차이점은?",
    "options": [
      "예수금은 수익금의 다른 말입니다.",
      "예수금은 투자 가능한 금액, 미수금은 미납 대금입니다.",
      "미수금은 해외 주식에만 적용됩니다."
    ],
    "answerIndex": 1,
    "levelType": "ZERO"
};

const Quiz: React.FC = () => {
    const [quiz] = useState(dummyData);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showWrongModal, setShowWrongModal] = useState(false);
    const navigate = useNavigate();
    const quizNumber = quiz.id <= 5 ? quiz.id : (quiz.id - 5);

    const quizLabels = ["첫번째 문제", "두번째 문제", "세번째 문제", "네번째 문제", "다섯번째 문제"];
    const quizText = quizLabels[quizNumber - 1] || "문제";

    /*api연결 전 답안처리 */
    const handleAnswerClick = (index: number) => {
        setSelectedAnswer(index);
        if (index === quiz.answerIndex) {
            const dummyResponse = {
              message: "정답입니다! 30 경험치가 추가되었습니다.",
              addedXp: 30,
              totalXp: 30,
              correct: true
            };
            navigate("/quiz/result", { state: { data: dummyResponse } });
          } else {
            setShowWrongModal(true);
          }
        };

    return (
        <div className={`quiz-page-container ${showWrongModal ? "modal-active" : ""}`}>
            <Header title={
            <div>
            <img src={stocky} alt="logo" style={{width: 35}}/>
            <span>스토기</span>
            </div>
        } 
        showPrevButton  backgroundColor="#ffff"/>
            <main className="quiz-component-container">
            <p className="quiz-number">{quizText}</p>
            <p className="quiz-question">{quiz.question}</p>
            <p className="quiz-guide">정답을 클릭하면 바로 다음으로 넘어갑니다.</p>
            <div className="quiz-options">
                {quiz.options.map((option, index) => (
                    <button
                    key={index}
                    className={`quiz-option ${selectedAnswer === index ? "selected" : ""}`}
            onClick={() => handleAnswerClick(index)}>{option}</button>
                ))}
            </div>
            {showWrongModal && <WrongAnswerModal onClose={() => setShowWrongModal(false)} />}
            </main>
        </div>
    );
};

export default Quiz;