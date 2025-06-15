import React from "react";
import stocky from "../images/chatting_landing.png";
import "../style/quiz_wrong.css"

interface NeedLevelupModalProps {
    onClose: () =>void;
}

const NeedLevelupModal: React.FC<NeedLevelupModalProps> = ({ onClose }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
          <h2 className="modal-title">아직 레벨이 부족해요!</h2>
          <p className="modal-c">해당 기능을 사용하려면 <br/> 레벨을 올리고 돌아와주세요!</p>
          <img src={stocky} alt="오답" className="modal-image" />
        </div>
      </div>
    );
  };
  
  export default NeedLevelupModal;