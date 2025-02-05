import React from "react";
import stocky from "../images/chatting_landing.png"
interface WrongAnswerModalProps {
    onClose: () =>void;
}

const WrongAnswerModal: React.FC<WrongAnswerModalProps> = ({ onClose }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>오답입니다!</h2>
          <p>다시 한 번 시도해 주세요.</p>
          <img src={stocky} alt="오답" className="modal-image" />
          <button className="close-button" onClick={onClose}>닫기</button>
        </div>
      </div>
    );
  };
  
  export default WrongAnswerModal;