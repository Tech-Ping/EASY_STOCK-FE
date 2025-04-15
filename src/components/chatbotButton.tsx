import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/chatbotButton.css"; // 새로운 스타일 추가
import chatbuttonImage from "../images/chat-button-clear.png";

const ChatbotButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if(location.pathname.startsWith("/stocki") || location.pathname === "/" || location.pathname === "/signup"){
    return null;
  }

  return (
    <button className="chatbot-move-button" onClick={() => navigate("/stocki")}>
      <img src={chatbuttonImage} alt="chatbot button" className="chatbot-icon" />
    </button>
  );
};

export default ChatbotButton;
