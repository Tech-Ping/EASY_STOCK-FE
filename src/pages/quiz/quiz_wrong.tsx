import React from "react";
import stocky from "../../images/chatting_landing.png"
import "../../style/quiz_wrong.css";

interface WrongAnswerModalProps {
    onClose: () =>void;
}

const WrongAnswerModal: React.FC<WrongAnswerModalProps> = ({ onClose }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
          <h2 className="modal-title">오답입니다!</h2>
          <p className="modal-c">다시 한 번 시도해 주세요.</p>
          <img src={stocky} alt="오답" className="modal-image" />
        </div>
      </div>
    );
  };
  
  export default WrongAnswerModal;