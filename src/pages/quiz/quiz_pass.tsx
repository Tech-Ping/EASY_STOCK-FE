// src/pages/quiz/AnswerRevealModal.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import stocky from "../../images/chatting_landing.png";
import "../../style/quiz_wrong.css";

interface AnswerRevealModalProps {
  correctAnswer: string;
}

const AnswerRevealModal: React.FC<AnswerRevealModalProps> = ({ correctAnswer }) => {
  const navigate = useNavigate();

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">문제를 틀렸어요!</h2>
        <p className="modal-c">정답은 "<strong>{correctAnswer}</strong>"입니다.</p>
        <img src={stocky} alt="정답 공개" className="modal-image" />
        <button className="home-button" onClick={() => navigate("/home")}>
          홈으로
        </button>
      </div>
    </div>
  );
};

export default AnswerRevealModal;
