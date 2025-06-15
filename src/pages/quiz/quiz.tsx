import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import stocky from "../../images/stocky.png";
import "../../style/quiz.css";
import WrongAnswerModal from "./quiz_wrong";
import { fetchQuizQuestion, submitQuizAnswer } from "../../api/quiz";
import AnswerRevealModal from "./quiz_pass";
/*
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
*/
interface QuizData {
    id: number;
    question: string;
    options: string[];
    answerIndex: number;
    levelType: string;
}

const Quiz: React.FC = () => {
    //const [quiz] = useState(dummyData);
    const [quiz, setQuiz] = useState<QuizData | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showWrongModal, setShowWrongModal] = useState(false);
    const navigate = useNavigate();
    const [wrongCount, setWrongCount] = useState(0);
    const [showAnswerModal, setShowAnswerModal] = useState(false);

    useEffect(() => {
        const loadQuiz = async () => {
          try {
            const data = await fetchQuizQuestion();
            if (data.isSuccess) {
              setQuiz(data.result);
            } else {
              alert("퀴즈를 불러오지 못했습니다.");
            }
          } catch {
            alert("퀴즈 요청 중 오류가 발생했습니다.");
          }
        };
        loadQuiz();
      }, []);


    /*api연결 전 답안처리 */
    const handleAnswerClick = async (index: number) => {
        if (!quiz) return;

        setSelectedAnswer(index);
    try {
      const res = await submitQuizAnswer(quiz.id, index);
       if (res.isSuccess) {
      if (res.result.correct) {
        navigate("/quiz/result", { state: { data: res.result } });
      } else {
        const newWrongCount = wrongCount + 1;
        setWrongCount(newWrongCount);

        if (newWrongCount === 1) {
          setShowWrongModal(true);
        } else {
          setShowAnswerModal(true); // 두 번째 오답이면 정답 공개
        }
      }
    } else {
      alert("답안 제출 실패");
    }
  } catch (e) {
    alert("서버 오류");
  }
};

  if (!quiz) {
    return (
      <div className="quiz-page-container">
        <Header
          title={<div><img src={stocky} alt="logo" style={{ width: 35 }} /><span>스토기</span></div>}
          showPrevButton
          backgroundColor="#ffff"
        />
        <main className="quiz-component-container">
          <p>문제를 불러오는 중입니다...</p>
        </main>
      </div>
    );
  }
  
  const quizNumber = quiz.id <= 5 ? quiz.id : quiz.id - 5;
  const quizLabels = ["첫번째 문제", "두번째 문제", "세번째 문제", "네번째 문제", "다섯번째 문제"];
  const quizText = quizLabels[quizNumber - 1] || "문제";
  
  return (
    <div className={`quiz-page-container ${showWrongModal ? "modal-active" : ""}`}>
      <Header
        title={<div><img src={stocky} alt="logo" style={{ width: 35 }} /><span>스토기</span></div>}
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
        {showWrongModal && (
    <WrongAnswerModal onClose={() => setShowWrongModal(false)} />
  )}

  {/* 2차 오답 시 정답 공개 모달 */}
  {showAnswerModal && (
    <AnswerRevealModal correctAnswer={quiz.options[quiz.answerIndex]} />
  )}
</main>
    </div>
  );
};

export default Quiz;